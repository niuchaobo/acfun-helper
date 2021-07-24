/**
 * 通知、提醒和推送的后台守护模块
 */
class MsgNotifs {
    constructor() {
        this.initMod();
        this.browserType = myBrowser();
    }

    async initMod() {
        console.log('Register MsgNotifs Mod.')
        /**
         * @description 挂载直播通知气泡按钮动作监听器
         * @notice 应不应该有开关我不知道，我先放个监听在这。而且这玩意儿绝对不应该放到循环里面去。
         */
        chrome.notifications.onButtonClicked.addListener((e, index) => this.notifBuTrigger(e, index));
    }

    notifBuTrigger(e, index) {
        let liveNotifIdRex = new RegExp("live");
        let commentDetailIdRex = new RegExp("ncid");
        if (liveNotifIdRex.exec(e)) {
            chrome.tabs.create({ url: 'https://live.acfun.cn/live/' + e.replace(/live([0-9]).*/, "") });
            return
        } else if (commentDetailIdRex.exec(e)) {
            switch (index) {
                case 0:
                    chrome.tabs.create({ url: 'https://www.acfun.cn' + e });
                    break;
                case 1:
                    chrome.tabs.create({ url: 'https://message.acfun.cn/' });
                    break;
            }
            return
        }
    }

    /**
     * 开播通知创建
     * @param {*} liveUserId
     * @param {*} userName
     */
    createLiveNotif(liveUserId, userName) {
        let date = new Date();
        let notId = liveUserId + "live" + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes();
        if (this.browserType == "Chrome") {
            chrome.notifications.create(notId, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                buttons: [{ title: "前往直播间" }],
                message: `${userName}  正在直播了！`
            });
        } else {
            chrome.notifications.create(notId, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                message: `${userName}  正在直播了！`
            });
        }
    }

    createDetailNotif(commentId, from, msg, avt = "") {
        let img = 'images/notice.png';
        if (avt) {
            img = avt;
        }
        if (this.browserType == "Chrome") {
            chrome.notifications.create(commentId, {
                type: 'basic',
                iconUrl: img,
                title: 'AcFun助手',
                buttons: [{ title: "回复" }, { title: "消息中心" }],
                message: `${from}: ${msg}`
            });
        } else {
            chrome.notifications.create(commentId, {
                type: 'basic',
                iconUrl: img,
                title: 'AcFun助手',
                message: `${from}: ${msg}`
            });
        }
    }

    createLikeDetailNotif(from, msg, avt = "") {
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

    /**
     * 自定义关注用户直播通知
     */
    liveOnlineNotif() {
        console.log('    Start LiveUpNotificationFetching Routine.')
        window.setInterval(async () => {
            let Ifswitch = await getStorage("liveFloowNotif");
            if (Ifswitch.liveFloowNotif) {
                //获取自定义直播用户关注字典
                let items = await getStorage("liveFloowings");
                //获取上次直播状态字典
                let broadcastingUIDlist = await getStorage("broadcastingUIDlist");
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
                    let ApiUrl = 'https://www.acfun.cn/rest/pc-direct/user/userInfo?userId='
                    fetch(ApiUrl + i).then((res) => { return res.text() })
                        .then(async (res) => {
                            //判断直播状态
                            let x = JSON.parse(res);
                            if (x.profile.liveId != undefined) {
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
                                    this.createLiveNotif(i, x.profile.name);
                                    let OpenNow = await getStorage("liveFollowOpenNow");
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
        }, 60000);
    }

    /**
     * 关注用户直播通知
     */
    async followLiveNotifEx() {
        chrome.storage.local.get(['LocalUserId'], async (Uid) => {
            // 用户没有登录就不去获取信息了
            if (Uid.LocalUserId == "0") { return }
            let broadcastingUIDlistFollowing = await getResult('broadcastingUIDlistFollowing');
            let fliveStateWorkDic = {}
            // 假如信息为空字典就填充一下
            if (JSON.stringify(broadcastingUIDlistFollowing) == '{}') {
                chrome.storage.local.set({ 'broadcastingUIDlistFollowing': fliveStateWorkDic });
                console.log('[Log]Backend-Messager>followLiveNotifEx: BroadcastingUIDlistFollowing Is Blank. Filling...')
                return;
            }
            let rawResult = await fetchResult("https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:3,+%22filterId%22:0%7D]");
            let result = JSON.parse(rawResult);
            //处理直播状态，将直播状态信息写入 此次直播状态字典
            for (let i = 0; i < result.liveList.length; i++) {
                fliveStateWorkDic[result.liveList[i].authorId] = true;
            }
            // 获取关注的UP上次的正在直播UID字典
            let lastLiveStateDic = await getStorage('broadcastingUIDlistFollowing');
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
                        this.createLiveNotif(liveUIDList[l], JSON.parse(uInfo).profile.name);
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
                        this.createLiveNotif(lastStateUIDList[k], JSON.parse(uInfo).profile.name);
                    }
                }
            }
            // 将此次直播状态信息字典写入存储
            chrome.storage.local.set({ 'broadcastingUIDlistFollowing': fliveStateWorkDic });
        })
    }

    /**
     * 定时执行&入口 - 关注用户直播通知
     */
    async followLiveNotif() {
        chrome.storage.local.get(['followLiveNotif'], (Ifswitch) => {
            console.log('    Start FollowingLiveNotificationFetching Routine.')
            if (Ifswitch.followLiveNotif) {
                this.followLiveNotifEx();
                window.setInterval(() => {
                    this.followLiveNotifEx();
                }, 120000);
            }
        })
    }

    /**
     * 定时获取用户未读数
     */
    async timer4Unread() {
        console.log("    Start timer4Unread Routine");
        var _thread = window.setInterval(async () => {
            let sw = await getStorage("timer4Unread_daemonsw")
            if (sw.timer4Unread_daemonsw == false) { chrome.browserAction.setTitle({ title: `AcFun助手，Ac在爱一直在` }); chrome.browserAction.setBadgeText({ text: "" }); return }
            chrome.storage.local.get(['LocalUserId'], (Uid) => {
                if (Uid.LocalUserId == "0") { clearInterval(_thread) }
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
                        let notifs = await getStorage("notificationContent");
                        (a0 && notifs.notificationContent.commentNotif) && this.commentDetailNotif(a0);
                        (a1 && notifs.notificationContent.likeNotif) && this.likeDetailNotif(a1);
                        (a5 && notifs.notificationContent.giftNotif) && this.giftDetailNotif(a5);
                        var pushNum = a0 + a1 + a2 + a3 + a4 + a5;
                        chrome.browserAction.setTitle({ title: `AcFun助手，Ac在爱一直在；\n通知\n评论未读：${a0}\n点赞：${a1}\n系统通知：${a3}\n公告：${a4}\n礼物：${a5}` })
                        localStorage.setItem('UnreadNum', `{"comment":${a0},"like":${a1},"content_notify":${a3},"system_notify":${a4}}`);
                        if (pushNum > 0) {
                            chrome.browserAction.setBadgeText({ text: pushNum.toString() });
                        } else {
                            chrome.browserAction.setBadgeText({ text: "" });
                        }
                    })
            })
        }, 60000)
    }

    /**
     * 定时获取用户关注的稿件动态信息
     */
    fetchPushList() {
        console.log("    Start PushListFetching Routine");
        window.setInterval(async function () {
            let sw = await getStorage("fetchPushList_daemonsw")
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
        }, 60000)
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
        let result = JSON.parse(raw)['html'];
        let instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            let avt = instantDom[0].children[i].children[0].children[0].children[0].src;
            let uname = instantDom[0].children[i].children[1].children[0].children[0].innerText;
            let msg = instantDom[0].children[i].children[1].children[2].children[0].children[0].innerText.replace("&nbsp;", " ").replace(/[\r\n]/g, "").trim().replace("[表情]","");
            let msgFrom = instantDom[0].children[i].children[1].children[1].textContent.trim().replace("评论了你的视频", "");
            let commentAddress = instantDom[0].children[0].children[1].children[2].href.replace("chrome-extension://www.acfun.cn", "")
            this.createDetailNotif(commentAddress, uname, msg + " | From:" + msgFrom, avt);
        }
    }

    async likeDetailNotif(num = 1) {
        let raw = await fetch('https://message.acfun.cn/like?quickViewId=upCollageMain&reqID=1&ajaxpipe=1', {
            method: "GET", credentials: 'include', headers: { 'origin': "https://message.acfun.cn/" }
        }).then((res => { return res.text() }))
        raw = raw.replace("/*<!-- fetch-stream -->*/", "");
        let result = JSON.parse(raw)['html'];
        let instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            let avt = instantDom[0].children[i].children[0].children[0].children[0].src;
            let uname = instantDom[0].children[i].children[1].children[0].children[0].innerText.replace(/[\r\n]/g, "").trim();
            let msg = instantDom[0].children[i].children[1].children[0].children[1].innerText.replace(/[\r\n]/g, "").trim();
            let yourMsg = instantDom[0].children[i].children[1].children[1].children[0].children[0].innerText.replace(/[\r\n]/g, "").trim();
            this.createLikeDetailNotif(uname, msg + " " + yourMsg, avt);
        }
    }

    async giftDetailNotif(num = 1) {
        let raw = await fetch('https://message.acfun.cn/gift?quickViewId=upCollageMain&reqID=2&ajaxpipe=1', {
            method: "GET", credentials: 'include', headers: { 'origin': "https://message.acfun.cn/" }
        }).then((res => { return res.text() }))
        raw = raw.replace("/*<!-- fetch-stream -->*/", "");
        let result = JSON.parse(raw)['html'];
        let instantDom = stringToDOM(result);
        for (let i = 0; i < num; i++) {
            let msg = instantDom[0].children[i].children[0].innerText.replace(/[\r\n\t\s]/g, "").replace("，能在香蕉商城兑换哦", "").replace("，可在客户端我的钱包查看收益", "");
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                message: msg
            });
        }
    }

}