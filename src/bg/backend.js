class ODHBack {
    constructor() {
        this.options = null;

        this.target = null;

        this.agent = new Agent(document.getElementById('sandbox').contentWindow);
        this.MsgNotfs = new MsgNotifs();
        this.authInfo = new AuthInfo();
        this.Ominibox = new Ohminibox();
        this.Upgrade = new UpgradeAgent();
        // this.ReqOpDrv = new ReqOperationDrv();
        this.WatchPlan = new WatchPlan();
        this.MusicPlayer = new MusicPlayer();

        this.Ominibox.registerOmnibox();
        this.MsgNotfs.timer4Unread();
        this.MsgNotfs.fetchPushList();
        this.MsgNotfs.liveOnlineNotif();
        this.MsgNotfs.followLiveNotif();
        this.Upgrade.upgradeMain();
        this.WatchPlan.onLoad();

        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
        window.addEventListener('message', e => this.onSandboxMessage(e));
        chrome.runtime.onInstalled.addListener(this.onInstalled.bind(this));
        chrome.tabs.onCreated.addListener((tab) => this.onTabReady(tab));
        chrome.tabs.onUpdated.addListener(this.onTabUpdate.bind(this));

        //监听storage变化,可用于数据云同步
        chrome.storage.onChanged.addListener(function (changes, areaName) {

        });

        chrome.webRequest.onBeforeRequest.addListener(
            this.onCommentRequest.bind(this),
            {
                urls: ["https://www.acfun.cn/rest/pc-direct/comment/*", "*://*/livecloud*"]
            },
            []
        );

        //当关闭标签页时删除此标签页存储的视频信息
        chrome.tabs.onRemoved.addListener(async function (tabId, removeInfo) {
            let result = await getStorage(tabId + "").then(result => { return result[tabId] });
            let obj = await getStorage(result);
            let arr = Object.values(obj);
            for (var lineId of arr) {
                delStorage(lineId + "");
            }
            delStorage(tabId + "");
        });

        chrome.contextMenus.create({
            title: '将此链接添加到App稍后再看',
            id: 'immediateAddLinkWatchLaterToApp',
            contexts: ['link'],
            onclick: (params) => {
                this.WatchPlan.immediateAddWatchLaterToApp(params.linkUrl);
            }
        });

        chrome.contextMenus.create({
            title: '将此页面添加到App稍后再看',
            id: 'immediateAddPageWatchLaterToApp',
            contexts: ['link'],
            onclick: (params) => {
                this.WatchPlan.immediateAddWatchLaterToApp(params.pageUrl);
            }
        });

        //右键菜单
        chrome.contextMenus.create({
            documentUrlPatterns: ['https://*.acfun.cn/*'],
            title: '下载封面',
            contexts: ['link'],
            id: '1'
        });

        chrome.contextMenus.create({
            documentUrlPatterns: ['https://*.acfun.cn/*'],
            title: '下载原始封面',
            contexts: ['link'],
            parentId: '1',
            onclick: function (params, tab) {
                let link_url = params.linkUrl;
                this.tabInvoke(tab.id, 'downloadCover', { link_url: link_url, type: 'normal' });

            }.bind(this)
        });

        chrome.contextMenus.create({
            documentUrlPatterns: ['https://*.acfun.cn/*'],
            title: '下载高清封面',
            contexts: ['link'],
            parentId: '1',
            onclick: function (params, tab) {
                let link_url = params.linkUrl;
                this.tabInvoke(tab.id, 'downloadCover', { link_url: link_url, type: 'high' });
            }.bind(this)
        });

        chrome.contextMenus.create({
            title: '使用AcFun搜索【%s】', // %s表示选中的文字
            contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
            onclick: function (params) {
                chrome.tabs.create({ url: 'https://www.acfun.cn/search?keyword=' + encodeURI(params.selectionText) });
            }
        });

        chrome.contextMenus.create({
            title: '加入到稍后再看',
            contexts: ['link'],
            id: '2',
            onclick: (params) => {
                let link_url = params.linkUrl;
                this.WatchPlan.PushInList(link_url).then(() => {
                    let x = this.WatchPlan.getOpRes();
                    let sw = ""
                    x ? sw = "加入成功。" : sw = "稍后再看已被关闭或为错误对象。"
                    chrome.notifications.create(null, {
                        type: 'basic',
                        iconUrl: 'images/notice.png',
                        title: 'AcFun 助手 - 稍后再看',
                        message: `${sw}`
                    });
                });
            }
        });

        chrome.contextMenus.create({
            title: '添加到音乐播放器列表',
            id: 'addToMusicPlayerlist',
            contexts: ['link'],
            onclick: (params) => {
                this.MusicPlayer.addItem(params.linkUrl);
            }
        });

        chrome.contextMenus.create({
            title: '启动音乐播放器',
            id: 'startMusicPlayer',
            contexts: ['link'],
            onclick: () => {
                this.MusicPlayer.setSign("firstPlay");
                this.MusicPlayer.main();
            }
        });

        chrome.contextMenus.create({
            title: '停止音乐播放器',
            id: 'stopMusicPlayer',
            contexts: ['link'],
            onclick: (params) => {
                console.log("backend stop");
                if (this.MusicPlayer.playInfo.Status) {
                    this.MusicPlayer.setSign("stop");
                    // this.MusicPlayer.main();
                }
            }
        });

        chrome.contextMenus.create({
            title: '从AcFunQml桌面客户端打开', 
            contexts: ['link'], 
            id:'3',
            onclick: (params) =>{
                let link_url = params.linkUrl;
                this.WatchPlan.connectAcFunQmlByUrlScheme(link_url).then(()=>{
                });
            }
        });

        //当激活某个tab页时
        chrome.tabs.onActivated.addListener(function (tab) {
            let tabId = tab.tabId;
            chrome.storage.local.set({ activeTabId: tabId }, function () {
                if (chrome.runtime.lastError) {
                    notice('发生错误', chrome.runtime.lastError.message);
                }
            });
        });

        chrome.commands.onCommand.addListener((command) => {
            if (command === "toggle") {
                window.open("https://www.acfun.cn/")
            } else if (command == "watchLater") {
                this.WatchPlan.execWatch();
            }
        });

    }

    onCommentRequest(req) {
        if (!this.options.enabled) {
            return;
        }
        let url = req.url;
        let tabId = req.tabId;
        let commentListReg = new RegExp("https://www.acfun.cn/rest/pc-direct/comment/list\\?.*");
        let commentSubReg = new RegExp("https://www.acfun.cn/rest/pc-direct/comment/sublist\\?.*rootCommentId=(\\d+).*");

        // let liveReg = new RegExp("http(s)?://.*-acfun-adaptive.hlspull.etoote.com/.*m3u8");
        let liveReg = new RegExp("http(s)?://.*-acfun-adaptive.pull.etoote.com/livecloud/.*");

        if (commentListReg.test(url)) {
            this.tabInvoke(tabId, 'renderList', { url: url });
        } else if (commentSubReg.test(url)) {
            let rootCommentId = url.match(commentSubReg)[1];
            this.tabInvoke(tabId, 'renderSub', { rootCommentId: rootCommentId, url: url });
        } else if (liveReg.test(url)) {
            // console.log("url1",url);
            this.tabInvoke(tabId, 'renderLive', { url: url });
        }
        this.authInfo.fetchPasstoken();
        this.authInfo.getAccessToken();
    }

    onInstalled(details) {
        initializeDBTable();
        if (details.reason === 'install') {
            chrome.tabs.create({ url: chrome.extension.getURL('bg/guide.html') });
            return;
        }
        if (details.reason === 'update') {
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'AcFun助手',
                message: '更新了！'
            });
            return;
        }
        return;
    }

    async onTabReady(tab) {
        this.options = await optionsLoad();
        let tabId = tab.id;
        this.tabInvoke(tabId, 'setFrontendOptions', { options: this.options });
    }

    async onTabUpdate(tabId, changeInfo, tab) {
        this.options = await optionsLoad();
        if (changeInfo.status == 'complete') {
            let url = tab.url;
            if (REG.acVid.test(url)) {
                let ac = REG.acVid.exec(url);
                let ac_num = ac[2];
                //autoThrowBanana();
                let action = 'throwBanana';
                let params = { "key": ac_num };
                chrome.tabs.sendMessage(tabId, { action, params }, function (response) {
                });
                //this.callback();
            }
        }
        this.tabInvoke(tabId, 'setFrontendOptions', { options: this.options });
    }

    //================Message Hub and Handler================//
    tabInvokeAll(action, params) {
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                this.tabInvoke(tab.id, action, params);
            }
        });
    }

    tabInvoke(tabId, action, params) {
        chrome.tabs.sendMessage(tabId, { action, params }, () => null);
    }

    onMessage(request, sender, callback) {
        const { action, params } = request;
        const method = this['api_' + action];

        /*
        调用示例
        chrome.runtime.sendMessage({action:"`调用的函数名`",params:{receipt: `这里选择是否告知被调用函数前台调用函数所在页面的tabid`,responseRequire:`此处选择是否需要返回函数运行结果`,asyncWarp:`此处选择是否需要进行结果返回的异步封装`,...其他参数}},function(resp){//process code})
        */
        if (typeof (method) === 'function') {
            if (params["receipt"]) {
                //信源程序是否需要通过tabid来获取回执<-我也忘记这个注释是什么意思了，好像是说这个参数置true可以告知被调用函数前台调用函数所在页面的tabid以便重新利用。
                params.tabid = sender.tab;
                params.callback = callback;
                method.call(this, params);
            } else if (params["responseRequire"] && params["asyncWarp"] == false) {
                //调用函数需要得到被调用函数的结果，并且被调用函数是同步的，结果不需要进行异步封装。
                params.callback = callback;
                let x = method.call(this, params);
                callback({ data: x });
            } else if (params["responseRequire"] && params["asyncWarp"]) {
                //调用异步函数且返回结果
                params.callback = callback;
                method.call(this, params).then(resp => {
                    callback({ data: resp });
                })
            } else {
                //仅调用
                params.callback = callback;
                method.call(this, params);
            }
        }
        return true;
    }

    onSandboxMessage(e) {
        const {
            action,
            params
        } = e.data;
        const method = this['api_' + action];
        if (typeof (method) === 'function')
            method.call(this, params);
    }

    //================Utils==================//
    setFrontendOptions(options) {
        switch (options.enabled) {
            case false:
                chrome.browserAction.setBadgeText({ text: 'off' });
                break;
            case true:
                chrome.browserAction.setBadgeText({ text: '' });
                break;
        }
        this.tabInvokeAll('setFrontendOptions', {
            options
        });
    }

    //================Inner Api==================//
    api_notice(params) {
        let { title, msg } = params;
        notice(title, msg);
    }

    async api_watchLater() {
        this.WatchPlan.execWatch();
    }

    async api_stopWatchLater() {
        this.WatchPlan.exitWatchPlan();
    }

    async api_syncWatchLaterList() {
        return this.WatchPlan.syncAppWatchLater();
    }

    async api_removeDiffWatchLaterList() {
        this.WatchPlan.removeAllDiffWatchLaterListItemFromLocal();
    }

    // api_historyView(params){
    //     this.WatchPlan.viewHistoryBackend(params)
    // }

    api_getLuckyHistory() {
        return new Promise(async (resolve) => {
            let x = await db_getLuckyHistory("userList");
            resolve(x);
        });
    }

    api_getLiveWatchTimeList() {
        return this.WatchPlan.getLiveWatchTimeList();
    }

    api_livePageWatchTimeRec(params) {
        this.WatchPlan.livePageWatchTimeRec(params);
    }

    api_attentionTabs(params) {
        return this.WatchPlan.attentionTabs(params.windowId);
    }

    api_updateLiveWatchTimeListItem() {
        return this.WatchPlan.updateLiveWatchTimeList();
    }

    api_bananAudio() {
        this.MsgNotfs.bananAudio();
    }

    api_musicPlayerStart(e) {
        this.MusicPlayer.setSign("firstPlay");
        this.MusicPlayer.main(e.index);
    }

    api_musicPlayerSign(e) {
        this.MusicPlayer.setSign(e.sign);
    }

    api_musicPlayerfocusPlayer() {
        this.MusicPlayer.focusPlayer();
    }

    api_musicPlayerAdd(e) {
        this.MusicPlayer.addItem(e.linkUrl);
    }

    async api_initBackend(params) {
        let options = await optionsLoad();
        //this.ankiweb.initConnection(options);
        if (options.dictLibrary) {
            options.sysscripts = options.dictLibrary;
            options.dictLibrary = '';
        }
        this.opt_optionsChanged(options);
    }

    async api_Fetch(params) {
        let { url, callbackId } = params;
        let request = {
            url,
            type: 'GET',
            dataType: 'text',
            timeout: 3000,
            error: (xhr, status, error) => this.callback(null, callbackId),
            success: (data, status) => this.callback(data, callbackId)
        };
        $.ajax(request);
    }

    // Option page and Brower Action page requests handlers.
    async opt_optionsChanged(options) {
        this.setFrontendOptions(options);

        //let defaultscripts = ['builtin_encn_Collins'];
        //let newscripts = `${options.sysscripts},${options.udfscripts}`;
        //let loadresults = null;
        //if (!this.options || (`${this.options.sysscripts},${this.options.udfscripts}` != newscripts)) {
        //    const scriptsset = Array.from(new Set(defaultscripts.concat(newscripts.split(',').filter(x => x).map(x => x.trim()))));
        //    loadresults = await this.loadScripts(scriptsset);
        //}

        this.options = options;
        //if (loadresults) {
        //    let namelist = loadresults.map(x => x.result.objectname);
        //    this.options.dictSelected = namelist.includes(options.dictSelected) ? options.dictSelected : namelist[0];
        //   this.options.dictNamelist = loadresults.map(x => x.result);
        //}
        //await this.setScriptsOptions(this.options);
        optionsSave(this.options);
        return this.options;
    }

    async opt_optionUpdate(options) {
        this.options = options;
    }

    async loadScripts(list) {
        let promises = list.map((name) => this.loadScript(name));
        let results = await Promise.all(promises);
        return results.filter(x => {
            if (x.result) return x.result;
        });
    }

    async loadScript(name) {
        return new Promise((resolve, reject) => {
            this.agent.postMessage('loadScript', { name }, result => resolve(result));
        });
    }

    async setScriptsOptions(options) {
        return new Promise((resolve, reject) => {
            this.agent.postMessage('setScriptsOptions', { options }, result => resolve(result));
        });
    }

    callback(data, callbackId) {
        this.agent.postMessage('callback', { data, callbackId });
    }

    async popTranslation(expression) {
        try {
            let result = await this.findTerm(expression);
            return result;
        } catch (err) {

        }
    }

    /*transferFormat(data) {
        // 将源数据从ArrayBuffer格式保存为可操作的Uint8Array格式
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
        var segment = new Uint8Array(data);
        var combined = true;
        // 接收无音频ts文件，OutputType设置为'video'，带音频ts设置为'combined'
        var outputType = 'combined';
        var remuxedSegments = [];
        var remuxedBytesLength = 0;
        var remuxedInitSegment = null;

        // remux选项默认为true，将源数据的音频视频混合为mp4，设为false则不混合
        var transmuxer = new muxjs.mp4.Transmuxer({remux: true});

        // 监听data事件，开始转换流
        transmuxer.on('data', function (event) {
            console.log(event);
            if (event.type === outputType) {
                remuxedSegments.push(event);
                remuxedBytesLength += event.data.byteLength;
                remuxedInitSegment = event.initSegment;
            }
        });
        // 监听转换完成事件，拼接最后结果并传入MediaSource
        transmuxer.on('done', function () {
            var offset = 0;
            var bytes = new Uint8Array(remuxedInitSegment.byteLength + remuxedBytesLength)
            bytes.set(remuxedInitSegment, offset);
            offset += remuxedInitSegment.byteLength;

            for (var j = 0, i = offset; j < remuxedSegments.length; j++) {
                bytes.set(remuxedSegments[j].data, i);
                i += remuxedSegments[j].byteLength;
            }
            remuxedSegments = [];
            remuxedBytesLength = 0;
            // 解析出转换后的mp4相关信息，与最终转换结果无关
            //vjsParsed = muxjs.mp4.tools.inspect(bytes);
            //console.log('transmuxed', vjsParsed);
            return bytes;
            //this.prepareSourceBuffer(combined, outputType, bytes);
        });
        // push方法可能会触发'data'事件，因此要在事件注册完成后调用
        transmuxer.push(segment); // 传入源二进制数据，分割为m2ts包，依次调用上图中的流程
        // flush的调用会直接触发'done'事件，因此要事件注册完成后调用
        transmuxer.flush(); // 将所有数据从缓存区清出来
    }

    prepareSourceBuffer(combined, outputType, bytes) {
        var buffer;
        video = document.createElement('video');
        video.controls = true;
        // MediaSource Web API: https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource
        mediaSource = new MediaSource();
        video.src = URL.createObjectURL(mediaSource);

        $('#video-wrapper').appendChild(video); // 将H5 video元素添加到对应DOM节点下

        // 转换后mp4的音频格式 视频格式
        var codecsArray = ["avc1.64001f", "mp4a.40.5"];

        mediaSource.addEventListener('sourceopen', function () {
            // MediaSource 实例默认的duration属性为NaN
            mediaSource.duration = 0;
            // 转换为带音频、视频的mp4
            if (combined) {
                buffer = mediaSource.addSourceBuffer('video/mp4;codecs="' + 'avc1.64001f,mp4a.40.5' + '"');
            } else if (outputType === 'video') {
                // 转换为只含视频的mp4
                buffer = mediaSource.addSourceBuffer('video/mp4;codecs="' + codecsArray[0] + '"');
            } else if (outputType === 'audio') {
                // 转换为只含音频的mp4
                buffer = mediaSource.addSourceBuffer('audio/mp4;codecs="' + (codecsArray[1] || codecsArray[0]) + '"');
            }

            buffer.addEventListener('updatestart', logevent);
            buffer.addEventListener('updateend', logevent);
            buffer.addEventListener('error', logevent);
            video.addEventListener('error', logevent);
            // mp4 buffer 准备完毕，传入转换后的数据
            // 将 bytes 放入 MediaSource 创建的sourceBuffer中
            // https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/appendBuffer
            buffer.appendBuffer(bytes);
            // 自动播放
            // video.play();
        });
    }*/

    /*async downloadVideo(m3u8) {
        console.log(m3u8);
        let reg = new RegExp('https:\\/\\/.*\\.acfun\\.cn\\/.*\\/segment\\/|http:\\/\\/.*\\.acfun\\.cn\\/.*\\/segment\\/');
        var prefix = "";
        if (reg.test(m3u8)) {
            prefix = m3u8.match(reg)[0];
        }
        let res = await parseM3u8(m3u8);
        console.log(res);
        let segments = res.segments;
        let seArr = new Array();
        if (segments.length == 0) {
            notice("警告", "该视频无法播放");
        } else {
            let arr = new Array();
            for (let seg of segments) {
                let uri = prefix + seg.uri;
                //acfun的视频片段路径是不完整的,缺少http:// ,需要补全
                // eg:"EKT8PxpARFg1bzNoUldlcTQ2MU5POWFpVms5cWVDOFl1anVNMzgxV3p3d2pqSkxvMVdhMDBXejJnZ3NGTC1aUE1CbjlkRw.ts?safety_id=AALXcXOtLbPnEichVENCciwF&pkey=AAPvrDb0ntD0obeNv1goe2Rn2rC1sdIAik9UsCzQq_yxTY3W9WNrUlN1eGpSjV-EjVmxl3z99SlX5TCzpithT_DZBDZJL5mAj1f41Be5oIKqNr_qiZ2Xv1OwUCkEyborQJqcBylYF4EpLvIeYh2EWlkfo_ONzw51ohvTuV1bx_9XQcb8nHDciQGrbRNOkym05eDAKVb9_7zd3I4fK5RbscRXsJBO8NLJe4ER9XTyf32L0dSuPhNFzn5ik58aF4Lp1zzOw9sGyCps8tsI10NDewh_K5_Jw5aJclpKhYOjHLnO6A"
                seArr.push(uri);

            }
        }
        console.log('----------start-----------');



        let mime = 'video/mp4; codecs="mp4a.40.2,avc1.64001f"';

        let mediaSource = new MediaSource();
        let transmuxer = new muxjs.mp4.Transmuxer();

        let video = document.createElement('video');
        document.body.appendChild(video);
        video.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener("sourceopen", appendFirstSegment);
        video.play();
        let sourceBuffer;
        function appendFirstSegment(){
            if (seArr.length == 0){
                return;
            }

            URL.revokeObjectURL(video.src);
            sourceBuffer = mediaSource.addSourceBuffer(mime);
            sourceBuffer.addEventListener('updateend', appendNextSegment);

            transmuxer.on('data', (segment) => {
                let data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength);
                data.set(segment.initSegment, 0);
                data.set(segment.data, segment.initSegment.byteLength);
                console.log(muxjs.mp4.tools.inspect(data));
                sourceBuffer.appendBuffer(data);
                Uint8ArrayToString(data);
                //Uint8ArrayToString(segment.data.buffer);
                //bufferToStream(segment.data.buffer);
            })

            getVideo(seArr.shift()).then((response)=>{
                return response;
            }).then((response)=>{
                transmuxer.push(new Uint8Array(response));
                transmuxer.flush();
            })
        }

        function appendNextSegment(){
            // reset the 'data' event listener to just append (moof/mdat) boxes to the Source Buffer
            transmuxer.off('data');
            transmuxer.on('data', (segment) =>{
                console.log(muxjs.mp4.tools.inspect(segment.data));
                sourceBuffer.appendBuffer(new Uint8Array(segment.data));
                Uint8ArrayToString(new Uint8Array(segment.data));
                //Uint8ArrayToString(segment.data.buffer);
                //bufferToStream(segment.data.buffer);
            })

            if (seArr.length == 0){
                // notify MSE that we have no more segments to append.
                mediaSource.endOfStream();

                /!*let url = video.src;
                console.log(url);
                let a = document.createElement('a');
                a.download = "ncb-test.mp4";
                a.href = url;
                a.style.display = 'none'
                document.body.appendChild(a)
                a.click();
                a.remove();*!/


                return;
            }

            //seArr.forEach((segment) => {
                // fetch the next segment from the segments array and pass it into the transmuxer.push method
                getVideo(seArr.shift()).then((response)=>{
                    return response;
                }).then((response)=>{
                    transmuxer.push(new Uint8Array(response));
                    transmuxer.flush();
                })
            //})
        }


        function bufferToStream(buffer) {
            stream.getReader()
            let stream = new ReadableStream();
            stream.push(buffer);
            stream.push(null);
            return stream;
        }


        function Uint8ArrayToString(fileData){
           /!* var dataString = "";
            for (var i = 0; i < fileData.length; i++) {
                dataString += String.fromCharCode(fileData[i]);
            }*!/

            /!*var blob = new Blob([fileData], {
                type: 'text/plain'
            });*!/
            var buffer = new ArrayBuffer(fileData);
            var blob = new Blob([buffer]);
            let u = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.download = "ncb.mp4";
            a.href = u;
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click();
            a.remove();
        }

    }*/

}



function getInstance() {
    return new ODHBack();
}
//getInstance();
window.odhback = new ODHBack();

/*var ffmpeg = require("ffmpeg");
window.ffmpeg = ffmpeg;
var fs = require('browserify-fs');
window.fs=fs;
console.log(fs);*/
//window.buffer = buffer;
