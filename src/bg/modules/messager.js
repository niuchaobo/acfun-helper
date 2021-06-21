/**
 * 通知、提醒和推送的后台守护模块
 */
class MsgNotifs {
    constructor() {
        this.initMod();
        this.browserType = "";
    }

    async initMod() {
        console.log('Register MsgNotifs Mod.')
        /**
         * @description 挂载直播通知气泡按钮动作监听器
         * @drawback 模块在初始化时，如果两个直播通知模块的开关是有一个开着的，那么将会挂接 系统通知上按钮的监听器，但是麻烦的是，你如果在初始化时开关都是关的，那么在模块初始化之后，再打开开关，它是不会响应你的。
         * @notice 但是这玩意儿绝对不应该放到循环里面去。
         */
        let liveNoifSwitch = await getStorage("liveFloowNotif").then(e => { return e.liveFloowNotif }) || await getStorage("followLiveNotif").then(e => { return e.followLiveNotif });
        liveNoifSwitch && chrome.notifications.onButtonClicked.addListener((e) => {
            chrome.tabs.create({ url: 'https://live.acfun.cn/live/' + e })
        });
        this.browserType = myBrowser();
    }

    /**
     * 开播通知创建
     * @param {*} liveUserId 
     * @param {*} userName 
     */
    createLiveNotif(liveUserId, userName) {
        if (this.browserType == "Chrome") {
            chrome.notifications.create(liveUserId, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                buttons: [{ title: "前往直播间" }],
                message: `${userName}  正在直播了！`
            });
        } else {
            chrome.notifications.create(liveUserId, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                message: `${userName}  正在直播了！`
            });
        }
    }

    /**
     * 自定义关注用户直播通知
     */
    liveOnlineNotif() {
        console.log('    Start LiveUpNotificationFetching Routine.')
        window.setInterval(() => {
            chrome.storage.local.get(['liveFloowNotif'], (Ifswitch) => {
                if (Ifswitch.liveFloowNotif) {
                    // 获取自定义直播用户关注字典
                    chrome.storage.local.get(['liveFloowings'], (items) => {
                        //获取上次直播状态字典
                        chrome.storage.local.get(['broadcastingUIDlist'], (broadcastingUIDlist) => {
                            // console.log(broadcastingUIDlist);
                            // 构造本次直播状态信息字典
                            let y = {}
                            // 判空直播状态字典，空则使自定义主播用户填充
                            if (JSON.stringify(broadcastingUIDlist) == '{}') {
                                chrome.storage.local.get(['liveFloowings'], function (a) { for (let j in items.liveFloowings) { y[j] = false } });
                                chrome.storage.local.set({ 'broadcastingUIDlist': y });
                                console.log('BroadcastingUIDlist Is Blank. Filling...')
                                return;
                            }
                            // 遍历自定义直播用户关注
                            for (let i in items.liveFloowings) {
                                //i就是UID
                                let ApiUrl = 'https://www.acfun.cn/rest/pc-direct/user/userInfo?userId='
                                fetch(ApiUrl + i).then((res) => { return res.text() })
                                    .then((res) => {
                                        //判断直播状态
                                        let x = JSON.parse(res);
                                        if (x.profile.liveId != undefined) {
                                            var state = true;
                                        } else {
                                            var state = false;
                                        }
                                        //将状态写入本次直播状态信息字典
                                        y[i] = state;
                                        //如果上次直播状态就是现在的直播状态就不提示，否则
                                        if (state == broadcastingUIDlist.broadcastingUIDlist[i]) {
                                            // console.log('same!');
                                        } else {
                                            let lastState = broadcastingUIDlist.broadcastingUIDlist[i]
                                            //假如上次直播状态为 否,并且上次直播状态与本次直播状态不一致（意思是现在为 是）
                                            if (lastState == false) {
                                                this.createLiveNotif(i, x.profile.name);
                                                chrome.storage.local.get(['liveFollowOpenNow'], function (a) {
                                                    if (a.liveFollowOpenNow) {
                                                        chrome.tabs.create({ url: `https://live.acfun.cn/live/${i}` });
                                                    }
                                                });
                                            } else {
                                                chrome.storage.local.get(['liveCloseNotif'], function (a) {
                                                    a.liveCloseNotif && chrome.notifications.create(null, {
                                                        type: 'basic',
                                                        iconUrl: 'images/notice.png',
                                                        title: 'AcFun助手',
                                                        message: `${x.profile.name}  下播了！`
                                                    });
                                                })
                                            }
                                        }
                                        // 状态写入存储
                                        chrome.storage.local.set({ 'broadcastingUIDlist': y });
                                        // chrome.storage.local.get(['broadcastingUIDlist'],function(e){console.log(e)});
                                    });
                            }
                        });
                    });
                }
            });
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
            let y = {}
            // 假如信息为空字典就填充一下
            if (JSON.stringify(broadcastingUIDlistFollowing) == '{}') {
                chrome.storage.local.set({ 'broadcastingUIDlistFollowing': y });
                console.log('[Log]Backend-Messager>followLiveNotifEx: BroadcastingUIDlistFollowing Is Blank. Filling...')
                return;
            }
            let rawResult = await fetchResult("https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:3,+%22filterId%22:0%7D]");
            let result = JSON.parse(rawResult);
            //处理直播状态，将直播状态信息写入 此次直播状态字典
            for (let i = 0; i < result.liveList.length; i++) {
                y[result.liveList[i].authorId] = true;
            }
            // 获取关注的UP上次的正在直播UID字典
            let a = await getStorage('broadcastingUIDlistFollowing');
            // 获取关注的UP上次的正在直播UID列表
            let b = Object.keys(a.broadcastingUIDlistFollowing);
            // 获取本次从API获取的正在直播的Up的UID列表
            let c = Object.keys(y);
            let j, k
            // 假如上次直播的Up现在不在本次获取的直播列表中则状态置false
            for (j in b) {
                if (c.indexOf(b[j]) != -1) {
                } else {
                    y[b[j]] = false;
                }
            }
            // 假如上次正在直播UID列表(b)长小于此次获取的正在直播列表(c)长，则不在上次正在直播UID列表中的用户一定是在直播的
            if (b.length < c.length) {
                for (let l = 0; l < c.length; l++) {
                    if (b.indexOf(c[l]) == -1) {
                        let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${c[l]}`)
                        // console.log(`${JSON.parse(uInfo).profile.name}  正在直播了！`)
                        this.createLiveNotif(c[l], JSON.parse(uInfo).profile.name);
                    }
                }
            }
            // 上次直播列表中的，假如某个上次正在直播UID列表中的用户在正在直播信息字典中的状态(a.broadcastingUIDlistFollowing[b[k]]) 不等于 此次获取的正在直播信息字典中的状态(y[b[k]]) 而且他的状态等于 true 则为正在直播
            for (k in b) {
                // console.log(b.indexOf(b[k])==-1)
                if (a.broadcastingUIDlistFollowing[b[k]] != y[b[k]]) {
                    if (y[b[k]] == true) {
                        let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${b[k]}`)
                        // console.log(`${JSON.parse(uInfo).profile.name}  正在直播了！`)
                        this.createLiveNotif(b[k], JSON.parse(uInfo).profile.name);
                    } else {
                        chrome.storage.local.get(['liveCloseNotif'], async function (a) {
                            let uInfo = await fetchResult(`https://www.acfun.cn/rest/pc-direct/user/userInfo?userId=${b[k]}`)
                            a.liveCloseNotif && chrome.notifications.create(b[k], {
                                type: 'basic',
                                iconUrl: 'images/notice.png',
                                title: 'AcFun助手',
                                message: `${JSON.parse(uInfo).profile.name}  下播了！`
                            });
                        })
                    }
                }
            }
            // 将此次直播状态信息字典写入存储
            chrome.storage.local.set({ 'broadcastingUIDlistFollowing': y });
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
        var startAgent = window.setInterval(async function () {
            clearInterval(startAgent);
        }, 1000)
        var _thread = window.setInterval(async () => {
            let sw = await getStorage("timer4Unread_daemonsw")
            if (sw.timer4Unread_daemonsw == false) { chrome.browserAction.setTitle({ title: `AcFun助手，Ac在爱一直在` }); chrome.browserAction.setBadgeText({ text: "" }); return }
            chrome.storage.local.get(['LocalUserId'], function (Uid) {
                if (Uid.LocalUserId == "0") { clearInterval(_thread) }
                fetch('https://member.acfun.cn/common/api/getUnreadMess', {
                    method: "POST", credentials: 'include', headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', 'Accept': "accept: application/json, text/plain, */*"
                    }, body: ""
                })
                    .then((res => { return res.text() }))
                    .then((res) => {
                        let b = JSON.parse(res);
                        if (b.unReadCount == undefined || b.unReadCount.new_system_notify == undefined) {
                            return;
                        }
                        let a0 = b.unReadCount.new_comment;//评论
                        let a1 = b.unReadCount.new_comment_like;//赞
                        let a2 = b.unReadFollowFeedCount;//动态
                        let a3 = b.unReadCount.new_content_notify;//系统通知
                        let a4 = b.unReadCount.new_system_notify;//站内公告
                        var pushNum = a0 + a1 + a2 + a3 + a4;
                        chrome.browserAction.setTitle({ title: `AcFun助手，Ac在爱一直在；\n通知\n评论未读：${a0}\n点赞：${a1}\n系统通知：${a3}\n站内公告：${a4}` })
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

}