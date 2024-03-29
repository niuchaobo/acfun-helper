/**
 * 通知、提醒和推送的后台守护模块
 */
class MsgNotifs extends AcFunHelperBgFrame {
    constructor() {
        super();
        this.initMod();
        this.browserType = ToolBox.thisBrowser();
    }

    initMod() {
        /**通知按钮响应注册 */
        //直播通知
        this.runtime.dataset.notificationBtnTriggerData["live"] = (e, index) => {
            chrome.tabs.create({ url: 'https://live.acfun.cn/live/' + e.replace(/live([0-9]).*/, "") });
        }
        //评论回复
        this.runtime.dataset.notificationBtnTriggerData["ncid"] = (e, index) => {
            switch (index) {
                case 0:
                    chrome.tabs.create({ url: 'https://www.acfun.cn' + e });
                    break;
                case 1:
                    chrome.tabs.create({ url: 'https://message.acfun.cn/' });
                    break;
            }
        }
        //at消息
        this.runtime.dataset.notificationBtnTriggerData["atMsg-"] = (e, index) => {
            e = e.replace("atmsgcid", "ncid").replace("atMsg-", "");
            switch (index) {
                case 0:
                    chrome.tabs.create({ url: 'https://www.acfun.cn/v/' + e });
                    break;
                case 1:
                    chrome.tabs.create({ url: 'https://message.acfun.cn/atmine' });
                    break;
            }
        }
        /**计划任务注册 */
        this.runtime.dataset.core.scheduler["liveInfo"] = {
            option: { periodInMinutes: 1 },
            tasks: {
                liveFollowing: {
                    callback: this.followLiveNotifEx.bind(this)
                },
                live: {
                    callback: this.liveOnlineNotif.bind(this)
                },
            }
        }
        this.runtime.dataset.core.scheduler["messages"] = {
            option: { periodInMinutes: 1.2 },
            tasks: {
                unread: {
                    callback: this.timer4Unread.bind(this)
                },
                fetchPush: {
                    callback: this.fetchPushList.bind(this)
                }
            }
        }
        this.runtime.dataset.core.status.msgnotifs = true;
        console.log('Register MsgNotifs Mod.');
    }

    createNotif(type, ...args) {
        switch (type) {
            case "live":
                createLiveNotif.call(this, ...args);
                break;
            case "detail":
                createDetailNotif.call(this, ...args);
                break;
            case "like":
                createLikeDetailNotif.call(this, ...args);
            case "at":
                createAtMeNotif.call(this, ...args);
                break;
        }

        /**
         * 开播通知创建
         * @param {*} liveUserId
         * @param {*} userName
         */
        function createLiveNotif(liveUserId, userName, liveTitle = "", userHeadImg = "") {
            let date = new Date();
            let notId = liveUserId + "live" + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes();
            if (this.browserType == "Chrome") {
                chrome.notifications.create(notId, {
                    type: 'basic',
                    iconUrl: `${userHeadImg ? userHeadImg : "images/notice.png"}`,
                    title: 'AcFun助手',
                    buttons: [{ title: "前往直播间" }],
                    message: `${userName} ${liveTitle ? "直播：《" + liveTitle + "》" : "正在直播了！"}`
                });
            } else {
                chrome.notifications.create(notId, {
                    type: 'basic',
                    iconUrl: `${userHeadImg ? userHeadImg : "images/notice.png"}`,
                    title: 'AcFun助手',
                    message: `${userName} ${liveTitle ? liveTitle : "正在直播了！"}`
                });
            }
        }

        function createDetailNotif(commentId, from, msg, avt = "") {
            let img = 'images/notice.png';
            if (avt) {
                img = avt;
            }
            if (this.browserType == "Chrome") {
                chrome.notifications.create(commentId, {
                    type: 'basic',
                    iconUrl: img,
                    title: 'AcFun助手',
                    priority: 1,
                    buttons: [{ title: "回复" }, { title: "消息中心" }],
                    message: `${from}: ${msg}`
                });
            } else {
                chrome.notifications.create(commentId, {
                    type: 'basic',
                    iconUrl: img,
                    title: 'AcFun助手',
                    priority: 1,
                    message: `${from}: ${msg}`
                });
            }
        }

        function createAtMeNotif(avt, user, time, jumpUrl) {
            let img = 'images/notice.png';
            let notId = "atMsg-" + jumpUrl
            if (avt) {
                img = avt;
            }
            if (this.browserType == "Chrome") {
                chrome.notifications.create(notId, {
                    type: 'basic',
                    iconUrl: img,
                    title: 'AcFun助手',
                    priority: 1,
                    buttons: [{ title: "前往呼叫地点" }, { title: "消息中心" }],
                    message: `${time} ${user} 提到了你`
                });
            } else {
                chrome.notifications.create(notId, {
                    type: 'basic',
                    iconUrl: img,
                    title: 'AcFun助手',
                    priority: 1,
                    message: `${time} ${user} 提到了你`
                });
            }
        }

        function createLikeDetailNotif(from, msg, avt = "") {
            let img = 'images/notice.png';
            if (avt) {
                img = avt;
            }
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: img,
                title: 'AcFun助手',
                message: `${from}: ${msg}`
            });
        }

    }

    /**
     * 自定义关注用户直播通知
     */
    async liveOnlineNotif() {
        let Ifswitch = await ExtOptions.get("liveFloowNotif");
        if (Ifswitch.liveFloowNotif) {
            //获取自定义直播用户关注字典
            let items = await ExtOptions.get("liveFloowings");
            //获取上次直播状态字典
            let broadcastingUIDlist = await ExtOptions.get("broadcastingUIDlist");
            // console.log(broadcastingUIDlist);
            // 构造本次直播状态信息字典
            let liveStateWorkDic = {}
            // 判空直播状态字典，空则使自定义主播用户填充
            if (JSON.stringify(broadcastingUIDlist) == '{}') {
                chrome.storage.local.get(['liveFloowings'], function () { for (let j in items.liveFloowings) { liveStateWorkDic[j] = false } });
                chrome.storage.local.set({ 'broadcastingUIDlist': liveStateWorkDic });
                console.log('BroadcastingUIDlist Is Blank. Filling...')
                return;
            }
            // 遍历自定义直播用户关注
            for (let i in items.liveFloowings) {
                //i就是UID
                fetch(acfunApis.live.liveInfo + i).then((res) => { return res.text() })
                    .then(async (res) => {
                        //判断直播状态
                        let x = JSON.parse(res);
                        if (x.isError) {
                            return;
                        }
                        if (x.liveId != undefined) {
                            var state = true;
                        } else {
                            var state = false;
                        }
                        //将状态写入本次直播状态信息字典
                        liveStateWorkDic[i] = state;
                        //如果上次直播状态就是现在的直播状态就不提示
                        if (state == broadcastingUIDlist.broadcastingUIDlist[i]) {
                            // console.log('same!');
                        } else {
                            let lastState = broadcastingUIDlist.broadcastingUIDlist[i]
                            //假如上次直播状态为 否,并且上次直播状态与本次直播状态不一致（意思是现在为 是）
                            if (lastState == false) {
                                this.createNotif("live", i, x.user.name, x.title, x.user.headUrl);
                                let OpenNow = await ExtOptions.get("liveFollowOpenNow");
                                if (OpenNow.liveFollowOpenNow) {
                                    chrome.tabs.create({ url: `https://live.acfun.cn/live/${i}` });
                                }
                            }
                        }
                        // 状态写入存储
                        chrome.storage.local.set({ 'broadcastingUIDlist': liveStateWorkDic });
                    });
            }
        }

    }

    /**
     * 关注用户直播通知
     */
    async followLiveNotifEx() {
        const sw = await ExtOptions.get("followLiveNotif").then(e => { return e.followLiveNotif });
        if (!sw) {
            return;
        }
        chrome.storage.local.get(['LocalUserId'], async (Uid) => {
            // 用户没有登录就不去获取信息了
            if (Uid.LocalUserId == "0") { return }
            let broadcastingUIDlistFollowing = await ExtOptions.get('broadcastingUIDlistFollowing');
            let fliveStateWorkDic = {}, fetchLivesInfoDic = {};
            // 假如信息为空字典就填充一下
            if (JSON.stringify(broadcastingUIDlistFollowing) == '{}') {
                chrome.storage.local.set({ 'broadcastingUIDlistFollowing': fliveStateWorkDic });
                console.log('[Log]Backend-Messager>followLiveNotifEx: BroadcastingUIDlistFollowing Is Blank. Filling...')
                return;
            }
            let rawResult = await fetchResult("https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:3,+%22filterId%22:0%7D]");
            let result = JSON.parse(rawResult);
            if (result?.isError) {
                return;
            }
            //处理直播状态，将直播状态信息写入 此次直播状态字典
            for (let i = 0; i < result.liveList.length; i++) {
                fliveStateWorkDic[result.liveList[i].authorId] = true;
                fetchLivesInfoDic[result.liveList[i].authorId] = { title: result.liveList[i].title, userAvatar: result.liveList[i].user.headUrl.replace("40/h/40", "100/h/100") }
            }
            // 获取关注的UP上次的正在直播UID字典
            let lastLiveStateDic = await ExtOptions.get('broadcastingUIDlistFollowing');
            // 获取关注的UP上次的正在直播UID列表
            let lastStateUIDList = Object.keys(lastLiveStateDic.broadcastingUIDlistFollowing);
            // 获取本次从API获取的正在直播的Up的UID列表
            let liveUIDList = Object.keys(fliveStateWorkDic);
            let j, k
            // 假如上次直播的Up现在不在本次获取的直播列表中则状态置false
            for (j in lastStateUIDList) {
                if (liveUIDList.indexOf(lastStateUIDList[j]) != -1) {
                } else {
                    fliveStateWorkDic[lastStateUIDList[j]] = false;
                }
            }
            // 假如上次正在直播UID列表(b)长小于此次获取的正在直播列表(liveUIDList)长，则不在上次正在直播UID列表中的用户一定是在直播的
            if (lastStateUIDList.length < liveUIDList.length) {
                for (let l = 0; l < liveUIDList.length; l++) {
                    if (lastStateUIDList.indexOf(liveUIDList[l]) == -1) {
                        let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${liveUIDList[l]}`)
                        // console.log(`${JSON.parse(uInfo).profile.name}  正在直播了！`)
                        this.createNotif("live", liveUIDList[l], JSON.parse(uInfo).profile.name, fetchLivesInfoDic[liveUIDList[l]].title, fetchLivesInfoDic[liveUIDList[l]].userAvatar);
                    }
                }
            }
            // 上次直播列表中的，假如某个上次正在直播UID列表中的用户在正在直播信息字典中的状态(lastLiveStateDic.broadcastingUIDlistFollowing[lastStateUIDList[k]]) 不等于 此次获取的正在直播信息字典中的状态(fliveStateWorkDic[lastStateUIDList[k]]) 而且他的状态等于 true 则为正在直播
            for (k in lastStateUIDList) {
                // console.log(b.indexOf(b[k])==-1)
                if (lastLiveStateDic.broadcastingUIDlistFollowing[lastStateUIDList[k]] != fliveStateWorkDic[lastStateUIDList[k]]) {
                    if (fliveStateWorkDic[lastStateUIDList[k]] == true) {
                        let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${lastStateUIDList[k]}`)
                        // console.log(`${JSON.parse(uInfo).profile.name}  正在直播了！`)
                        this.createNotif("live", lastStateUIDList[k], JSON.parse(uInfo).profile.name, fetchLivesInfoDic[lastStateUIDList[k]].title, fetchLivesInfoDic[lastStateUIDList[k]].userAvatar);
                    }
                }
            }
            // 将此次直播状态信息字典写入存储
            chrome.storage.local.set({ 'broadcastingUIDlistFollowing': fliveStateWorkDic });
        })
    }

    async timer4Unread() {
        const sw = await ExtOptions.get("timer4Unread_daemonsw").then(e => { return e.timer4Unread_daemonsw });
        if (!sw) {
            chrome.action.setTitle({ title: `AcFun助手，Ac在爱一直在` });
            chrome.action.setBadgeText({ text: "" });
            return;
        }
        chrome.storage.local.get(['LocalUserId'], (Uid) => {
            if (Uid.LocalUserId == "0") { return }
            fetch('https://member.acfun.cn/common/api/getUnreadMess', {
                method: "POST", credentials: 'include', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*"
                }, body: ""
            })
                .then((res => { return res.text() }))
                .then(async (res) => {
                    let b = JSON.parse(res);
                    if (b.unReadCount == undefined || b.unReadCount.new_system_notify == undefined) {
                        return;
                    }
                    let a0 = b.unReadCount.new_comment;//评论
                    let a1 = b.unReadCount.new_comment_like;//赞
                    let a2 = b.unReadFollowFeedCount;//动态
                    let a3 = b.unReadCount.new_content_notify;//系统通知
                    let a4 = b.unReadCount.new_system_notify;//站内公告
                    let a5 = b.unReadCount.new_gift;//礼物
                    let atNotif = b.unReadCount.at_notify;//@消息
                    let notifs = await ExtOptions.get("notificationContent");
                    let pushNum = a0 + a1 + a2 + a3 + a4 + a5 + atNotif;
                    (a0 && notifs.notificationContent.commentNotif) && this.commentDetailNotif(a0);
                    (a1 && notifs.notificationContent.likeNotif) && this.likeDetailNotif(a1);
                    (a5 && notifs.notificationContent.giftNotif) && this.giftDetailNotif(a5);
                    (atNotif && notifs.notificationContent.atNotif) && this.atMeDetailNotif(atNotif);
                    chrome.browserAction.setTitle({ title: `AcFun助手，Ac在爱一直在；\n通知\n评论未读：${a0}\n点赞：${a1}\n系统通知：${a3}\n公告：${a4}\n礼物：${a5}` });
                    localStorage.setItem('UnreadNum', `{"comment":${a0},"like":${a1},"content_notify":${a3},"system_notify":${a4}}`);
                    if (pushNum > 0) {
                        chrome.browserAction.setBadgeText({ text: pushNum.toString() });
                    } else {
                        chrome.browserAction.setBadgeText({ text: "" });
                    }
                })
        })

    }

    async fetchPushList() {
        let sw = await ExtOptions.get("fetchPushList_daemonsw")
        if (sw.fetchPushList_daemonsw == false) { return }
        chrome.storage.local.get(['LocalUserId'], function (Uid) {
            if (Uid.LocalUserId == "0") { return }
            fetch('https://www.acfun.cn/rest/pc-direct/feed/followFeed?isGroup=0&gid=-1&count=30&pcursor=1')
                .then((res) => { return res.text(); })
                .then((res) => {
                    let rawdata = JSON.parse(res);
                    // db_putPushLst(rawdata);
                    let out_data = '';
                    for (let i = 0; i <= 29; i++) {
                        let data = rawdata.feedList[i];
                        let xmlData = `<div class="inner ${data.isArticle ? "article" : "video"}" id="${data.aid}" data-type="${data.isArticle}" >
                        <label title="稍后打开" class="mdui-checkbox popupLater">
                            <input type="checkbox">
                            <i class="mdui-checkbox-icon"></i>
                        </label> 
                        <div class="l">
                            <a target="_blank" href="https://www.acfun.cn${data.isArticle ? '/a/ac' : '/v/ac'}${data.cid}" class="thumb thumb-preview">
                                <img class="lazyload preview" data-aid=${data.aid} src = './images/prpr.jpg' data-src = ${data.titleImg} style='width:100%'>
                                <div class="cover"></div> 
                            </a> 
                        </div> 
                        <div class="r"> 
                            <a data-aid=${data.aid} target="_blank" href="https://www.acfun.cn${data.isArticle ? "/a/ac" : "/v/ac"}${data.cid}" class="title">
                                ${data.title}
                            </a> 
                            <div class="info">
                                <a target="_blank" data-uid=${data.aid} href="https://www.acfun.cn/u/${data.userId}" class="name">
                                    ${data.username}
                                </a>
                                <span class="time">
                                    ${getTimeSinceNow(data.releaseDate, true, false)}发布
                                </span>
                            </div>
                        </div>          
                    </div>`;
                        out_data += xmlData;
                    }
                    // chrome.storage.local.set({'AcpushList1': out_data});
                    db_putPushListHtml(out_data);
                });
        })

    }

    bananAudio() {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute("preload", "auto");
        audioElement.autobuffer = true;
        audioElement.id = "bananAudio";

        var source1 = document.createElement('source');
        source1.type = 'audio/mpeg';
        source1.src = '../snd/banana.mp3';
        audioElement.appendChild(source1);
        audioElement.id = "bananaSrc";

        audioElement.load;
        audioElement.play();
    }

    async commentDetailNotif(num = 1) {
        let raw = await fetch('https://message.acfun.cn/?quickViewId=upCollageMain&reqID=1&ajaxpipe=1', {
            method: "GET", credentials: 'include', headers: { 'origin': "https://message.acfun.cn/" }
        }).then((res => { return res.text() }))
        raw = raw.replace("/*<!-- fetch-stream -->*/", "");
        const result = JSON.parse(raw)['html'];
        const instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            let avt = instantDom[0].children[i].children[0].children[0].children[0].src;
            let uname = instantDom[0].children[i].children[1].children[0].children[0].innerText;
            let msg = instantDom[0].children[i].children[1].children[2].children[0].children[0].innerText.replace("&nbsp;", " ").replace(/[\r\n]/g, "").trim().replace("[表情]", "");
            let msgFrom = instantDom[0].children[i].children[1].children[1].textContent.trim().replace("评论了你的视频", "");
            let commentAddress = instantDom[0].children[0].children[1].children[2].href.replace("chrome-extension://www.acfun.cn", "")
            this.createNotif("detail", commentAddress, uname, msg + " | From:" + msgFrom, avt);
        }
    }

    async likeDetailNotif(num = 1) {
        let raw = await fetch('https://message.acfun.cn/like?quickViewId=upCollageMain&reqID=1&ajaxpipe=1', {
            method: "GET", credentials: 'include', headers: { 'origin': "https://message.acfun.cn/" }
        }).then((res => { return res.text() }))
        raw = raw.replace("/*<!-- fetch-stream -->*/", "");
        const result = JSON.parse(raw)['html'];
        const instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            const elem = instantDom[0].children[i];
            let avt = elem.children[0].children[0].children[0].src;
            let uname = elem.children[1].children[0].children[0].innerText.replace(/[\r\n]/g, "").trim();
            let msg = elem.children[1].children[0].children[1].innerText.replace(/[\r\n]/g, "").trim();
            let yourMsg = elem.children[1].children[1].children[0].children[0].innerText.replace(/[\r\n]/g, "").trim();
            this.createNotif("like", uname, msg + " " + yourMsg, avt);
        }
    }

    async giftDetailNotif(num = 1) {
        let raw = await fetch('https://message.acfun.cn/gift?quickViewId=upCollageMain&reqID=2&ajaxpipe=1', {
            method: "GET", credentials: 'include', headers: { 'origin': "https://message.acfun.cn/" }
        }).then((res => { return res.text() }))
        raw = raw.replace("/*<!-- fetch-stream -->*/", "");
        const result = JSON.parse(raw)['html'];
        const instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            /**@type {HTMLElement} */
            const elem = instantDom[0].children[i];
            /**@type {string} */
            let msg;
            if (elem.className.includes("moment-gift")) {
                //动态的香蕉
                msg = elem.children[1].innerText;
            } else {
                //稿件、直播香蕉收益
                msg = elem.children[0].innerText;
            }
            msg = msg.replace(/[\r\n\t]/g, "").replace("，能在香蕉商城兑换哦").replace("，能在香蕉商城兑换商品哦", "").replace("，可在客户端我的钱包查看收益", "").replace("前往动态", "");
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                message: msg
            });
        }
    }

    async atMeDetailNotif(num = 1) {
        let raw = await fetch('https://message.acfun.cn/atmine?quickViewId=upCollageMain&reqID=1', {
            method: "GET", credentials: 'include', headers: { 'origin': "https://message.acfun.cn/" }
        }).then((res => { return res.text() }))
        raw = raw.replace("/*<!-- fetch-stream -->*/", "");
        const result = JSON.parse(raw)['html'];
        const instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            /**@type {HTMLElement} */
            const elem = instantDom[0].children[i];
            let atFromUserAvatar = elem.querySelector("img.avatar").src;
            let atFromUser = elem.querySelector("a.name").innerText;
            let time = elem.querySelector("span.time").innerText;
            //这里将ncid改成atmsgcid是为了躲避评论回复的正则冲突。
            let jumpUrl = elem.querySelector("a.msg-text").href.replace("ncid", "atmsgcid");
            this.createNotif("at", atFromUserAvatar, atFromUser, time, new RegExp("/(ac.*)").exec(jumpUrl)[1])
        }
    }


}