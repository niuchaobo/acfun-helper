class ODHBack {
    constructor() {
        this.options = null;

        this.target = null;

        this.agent = new Agent(document.getElementById('sandbox').contentWindow);

        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
        window.addEventListener('message', e => this.onSandboxMessage(e));
        chrome.runtime.onInstalled.addListener(this.onInstalled.bind(this));
        chrome.tabs.onCreated.addListener((tab) => this.onTabReady(tab));
        chrome.tabs.onUpdated.addListener(this.onTabUpdate.bind(this));


        chrome.webRequest.onBeforeRequest.addListener(
             this.onCommentRequest.bind(this),
            {
                urls: ["https://www.acfun.cn/rest/pc-direct/comment/*"]
            },
            []
        );

        chrome.webRequest.onCompleted.addListener(
            function (req) {
                console.log(req.url);
            },
            {
                urls: ["https://webapi.acfun.cn/query/article/list?*"]
            },
            []
        );



        //当关闭标签页时删除此标签页存储的视频信息
        chrome.tabs.onRemoved.addListener(async function (tabId, removeInfo) {
            let result = await getStorage(tabId+"").then(result => {return result[tabId]});
            let obj =await getStorage(result);
            let arr = Object.values(obj);
            for(var lineId of arr){
                delStorage(lineId + "");
            }
            delStorage(tabId + "");
        });

        //当刷新标签页时删除此标签页存储的视频信息
        /*chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab){
            if(changeInfo.status=='loading'){
                let result = await getStorage(tabId+"").then(result => {return result[tabId]});
                let obj =await getStorage(result);
                let arr = Object.values(obj);
                for(var lineId of arr){
                    delStorage(lineId + "");
                }
                delStorage(tabId + "");
            }
        })*/


        //当激活某个tab页时
        chrome.tabs.onActivated.addListener(function (tab) {
            let tabId = tab.tabId;
            chrome.storage.local.set({activeTabId: tabId}, function () {
                if (chrome.runtime.lastError) {
                    notice('发生错误', chrome.runtime.lastError.message);
                }
            });
        });

    }

    onCommentRequest(req){
        if(!this.options.enabled){
            return;
        }
        let url = req.url;
        let tabId = req.tabId;
        let commentListReg = new RegExp("https://www.acfun.cn/rest/pc-direct/comment/list\\?.*");
        let commentSubReg = new RegExp("https://www.acfun.cn/rest/pc-direct/comment/sublist\\?.*rootCommentId=(\\d+).*");
        if(commentListReg.test(url)){
            this.tabInvoke(tabId, 'renderList', {url:url});
        }else if(commentSubReg.test(url)){
            let rootCommentId = url.match(commentSubReg)[1];
            this.tabInvoke(tabId, 'renderSub', {rootCommentId: rootCommentId,url:url});
        }
    }


    onInstalled(details) {
        if (details.reason === 'install') {
            chrome.tabs.create({url: chrome.extension.getURL('bg/guide.html')});
            return;
        }
        if (details.reason === 'update') {
            //todo 发送桌面通知
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'images/notice.png',
                title: 'A站下载助手',
                message: '更新了！'
            });
            return;
        }
        return;
    }

    async onTabReady(tab) {
        this.options =await optionsLoad();
        let tabId = tab.id;
        this.tabInvoke(tabId, 'setFrontendOptions', {options: this.options});
    }

    async onTabUpdate(tabId,changeInfo,tab) {
        this.options =await optionsLoad();
        if(changeInfo.status == 'complete'){
            let url = tab.url;
            let reg = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac(\\d+)');
            if(reg.test(url)){
                let ac = reg.exec(url);
                let ac_num = ac[2];
                //autoThrowBanana();
                let action = 'throwBanana';
                let params = {"key":ac_num};
                chrome.tabs.sendMessage(tabId, {action, params}, function (response) {
                    let resJson = JSON.parse(response);
                    if(resJson && resJson.result == 0){
                        notice("投蕉提醒","A站下载助手已为您自动投蕉");
                    }
                });
                //this.callback();
            }
        }
        this.tabInvoke(tabId, 'setFrontendOptions', {options: this.options});
    }

    setFrontendOptions(options) {

        switch (options.enabled) {
            case false:
                chrome.browserAction.setBadgeText({text: 'off'});
                break;
            case true:
                chrome.browserAction.setBadgeText({text: ''});
                break;
        }
        this.tabInvokeAll('setFrontendOptions', {
            options
        });
    }

    tabInvokeAll(action, params) {
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                this.tabInvoke(tab.id, action, params);
            }
        });
    }

    tabInvoke(tabId, action, params) {
        chrome.tabs.sendMessage(tabId, {action, params}, () => null);
    }


    // Message Hub and Handler start from here ...
    onMessage(request, sender, callback) {
        const {action, params} = request;
        const method = this['api_' + action];

        if (typeof(method) === 'function') {
            params.callback = callback;
            method.call(this, params);
        }
        return true;
    }

    onSandboxMessage(e) {
        const {
            action,
            params
        } = e.data;
        const method = this['api_' + action];
        if (typeof(method) === 'function')
            method.call(this, params);

    }

    api_notice(params){
        let {title,msg} = params;
        notice(title,msg);
    }

    async api_initBackend(params) {
        let options = await optionsLoad();
        //this.ankiweb.initConnection(options);

        //to do: will remove it late after all users migrate to new version.
        if (options.dictLibrary) { // to migrate legacy scripts list to new list.
            options.sysscripts = options.dictLibrary;
            options.dictLibrary = '';
        }
        this.opt_optionsChanged(options);
    }

    async api_Fetch(params) {
        let {url, callbackId} = params;

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


    async api_getBuiltin(params) {
        let {dict, word, callbackId} = params;
        this.callback(this.builtin.findTerm(dict, word), callbackId);
    }

    async api_getLocale(params) {
        let {callbackId} = params;
        this.callback(chrome.i18n.getUILanguage(), callbackId);
    }

    // front end message handler
    async api_isConnected(params) {
        let callback = params.callback;
        callback(await this.opt_getVersion());
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

    async opt_optionUpdate(options){
        this.options = options;
    }






    // Sandbox communication start here
    async loadScripts(list) {
        let promises = list.map((name) => this.loadScript(name));
        let results = await Promise.all(promises);
        return results.filter(x => {
            if (x.result) return x.result;
        });
    }

    async loadScript(name) {
        return new Promise((resolve, reject) => {
            this.agent.postMessage('loadScript', {name}, result => resolve(result));
        });
    }

    async setScriptsOptions(options) {
        return new Promise((resolve, reject) => {
            this.agent.postMessage('setScriptsOptions', {options}, result => resolve(result));
        });
    }

    callback(data, callbackId) {
        this.agent.postMessage('callback', {data, callbackId});
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



function getInstance(){
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
