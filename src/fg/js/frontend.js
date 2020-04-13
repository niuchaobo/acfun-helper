class ODHFront {

    constructor() {
        this.options = null;
        this.div = new Div();
        this.activateKey = 17; // shift 16, ctl 17, alt 18


        chrome.runtime.onMessage.addListener(this.onBgMessage.bind(this));
        window.addEventListener('message', e => this.onFrameMessage(e));
        window.addEventListener('load', e => this.onLoad(e));

        chrome.storage.onChanged.addListener(function (changes,areaName) {

        });

        document.addEventListener('DOMContentLoaded',e=>this.onDomContentLoaded(e));




    }

    onBgMessage(request, sender, callback) {
        const { action, params } = request;
        const method = this['api_' + action];
        if (typeof(method) === 'function') {
            params.callback = callback;
            method.call(this, params);
        }
        callback();
    }

    uuid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    addStyle(){
        let nod = document.createElement("style");
        let str = ".comment-mark-parent{bottom: -80px!important;}" +
            "#mark-div{top:50%;left:50%;display:none;position:fixed;z-index:999999}" +
            "span.simple {background-color: #d69acc !important;cursor: pointer;}" +
            "span.pos {display:inline;text-transform: lowercase;font-size: 0.9em;margin: 5px;padding: 0px 4px;color: white;border-radius: 3px;}";
        nod.type="text/css";
        nod.innerHTML = str;
        document.getElementsByTagName('head')[0].appendChild(nod);
    }

    addMarkDiv(){
        let div = document.createElement("div");
        div.id="mark-div";
        div.className='';
        let str = "<label for='mark-input'>name:</label><input id='mark-input'>";
        div.innerHTML = str;
        document.body.appendChild(div);

    }

    addNightStyle(){
        let div = document.createElement("div");
        div.id="acfun_night_conver";
        div.style='width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;';
        //let cover = '<div id="__nightingale_view_cover" ' +
          //  'style="width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;"></div>';
        document.body.appendChild(div);
    }

    onDomContentLoaded(e){
        //夜间模式
        if(this.options.night){
            this.addNightStyle();
        }

    }

    async onLoad(e){

        //tab页创建时会从bg发消息过来写入options数据,但可能存在延迟
        this.options = await optionsLoad();
        if(!this.options.enabled){
            return;
        }
        //添加自定义样式
        this.addStyle();
        var pageInfo = null;

        let href = window.location.href;
        //视频
        let video = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/.*');
        //番剧
        let bangumi = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*');
        //文章
        let article = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/.*');

        //视频
        if(video.test(href) || bangumi.test(href)){
            var div = document.createElement('div');
            div.style.display="none";
            let uuid = this.uuid();
            div.id=uuid;
            document.body.appendChild(div);
            div.setAttribute('onclick',  "document.getElementById('"+uuid+"').innerText=JSON.stringify(window.pageInfo)");
            div.click();
            pageInfo = JSON.parse(document.getElementById(uuid).innerText);
            document.body.removeChild(div);

            let currentVideoInfo = pageInfo.currentVideoInfo;
            let title = pageInfo.title;
            if(currentVideoInfo==undefined || currentVideoInfo=="" || currentVideoInfo==null){
                return;
            }
            this.div.show(pageInfo,this.options,'video');
        }
        //文章
        if(article.test(href)){
            this.div.show(pageInfo,this.options,'article');
        }
    }

    async api_throwBanana(params) {
        if(!this.options.enabled){
            return;
        }
        var up_name = '';
        var banana_num = 0;
        if(!this.options.auto_throw){
            return;
        }
        if(this.options.to_attention){
            //判断是否为已关注up主
            let followed = document.getElementsByClassName('follow-up followed');
            if(!followed || followed.length<=0){
                return;
            }
            up_name = document.getElementsByClassName('up-name')[0].innerText;
            banana_num = this.options.to_attention_num;
        }else{
            //判断是否为指定up主
            let up_url = document.getElementsByClassName('up-name')[0].href;
            let flag = false;
            let special_items = this.options.to_special_items;
            for(let item of special_items){
                if(item.up_url == up_url){
                    up_name = item.name;
                    banana_num = item.bananaNum;
                    flag = true;
                }
            }
            if(!flag){
                return;
            }
        }
        //如果已投蕉
        var arr = document.getElementsByClassName('banana active');
        if(arr.length>0){
            return;
        }
        let { key, callback } = params;
        let header = new Map();
        header.set("Content-Type","application/x-www-form-urlencoded");
        let data = "resourceId="+key+"&count="+banana_num+"&resourceType=2";
        let result = await ajax('POST',"https://www.acfun.cn/rest/pc-direct/banana/throwBanana",data,header);
        //如果开启投蕉通知,通知background发提醒
        if(this.options.banana_notice){
            let action = "notice";
            let msg = '您成功给'+up_name+'投食'+banana_num+'蕉';
            let p={
                title:"自动投蕉通知",
                msg:msg,
            }
            chrome.runtime.sendMessage({action:action,params:p}, function(response) {

            });
        }
    }
    api_notice(params){
        let action = "notice";
        chrome.runtime.sendMessage({action:action,params:params}, function(response) {

        });
    }

    api_setFrontendOptions(params) {
        let { options, callback } = params;
        this.options = options;
        callback();
    }

    onFrameMessage(e) {
        const { action, params } = e.data;
        const method = this['api_' + action];
        if (typeof(method) === 'function') {
            method.call(this, params);
        }
    }

    async api_download(params){
        if(this.options==null){
            this.options = await optionsLoad();
        }
        let activeKey = this.options.activeTabKey;
        let { url, title, id, qualityLabel} = params;
        let tabId =await getStorage(activeKey).then(result=>{return result[activeKey]});
        let fileName = title+"-"+qualityLabel+".mp4";
        this.downloadVideo(url,fileName,id);
    }

    async downloadVideo(m3u8,fileName,id,tabId){
        var MyBlobBuilder = function() {
            this.parts = [];
        }
        MyBlobBuilder.prototype.append = function(part) {
            this.parts.push(part);
            this.blob = undefined; // Invalidate the blob
        };

        MyBlobBuilder.prototype.getBlob = function() {
            if (!this.blob) {
                this.blob = new Blob(this.parts, { type: "" });
            }
            return this.blob;
        };
        let reg = new RegExp('https:\\/\\/.*\\.acfun\\.cn\\/.*\\/segment\\/|http:\\/\\/.*\\.acfun\\.cn\\/.*\\/segment\\/');
        var prefix = "";
        if (reg.test(m3u8)) {
            prefix = m3u8.match(reg)[0];
        }
        let res = await parseM3u8(m3u8);
        let segments = res.segments;
        let seArr = new Array();
        if (segments.length == 0) {
            let action = 'notice';
            let p={
                title:"警告",
                msg:"视频信息已过期，请刷新当前页面",
            }
            chrome.runtime.sendMessage({action:action,params:p}, function(response) {

            });
            return;
        } else {
            let arr = new Array();
            for (let seg of segments) {
                let uri = prefix + seg.uri;
                //acfun的视频片段路径是不完整的,缺少http:// ,需要补全
                // eg:"EKT8PxpARFg1bzNoUldlcTQ2MU5POWFpVms5cWVDOFl1anVNMzgxV3p3d2pqSkxvMVdhMDBXejJnZ3NGTC1aUE1CbjlkRw.ts?safety_id=AALXcXOtLbPnEichVENCciwF&pkey=AAPvrDb0ntD0obeNv1goe2Rn2rC1sdIAik9UsCzQq_yxTY3W9WNrUlN1eGpSjV-EjVmxl3z99SlX5TCzpithT_DZBDZJL5mAj1f41Be5oIKqNr_qiZ2Xv1OwUCkEyborQJqcBylYF4EpLvIeYh2EWlkfo_ONzw51ohvTuV1bx_9XQcb8nHDciQGrbRNOkym05eDAKVb9_7zd3I4fK5RbscRXsJBO8NLJe4ER9XTyf32L0dSuPhNFzn5ik58aF4Lp1zzOw9sGyCps8tsI10NDewh_K5_Jw5aJclpKhYOjHLnO6A"
                seArr.push(uri);

            }
        }
        let index = 0;
        var myBlobBuilder = new MyBlobBuilder();
        for(let url of seArr){
            index++;
            var a = null;
            try{
                a = await getVideo(url);
            }catch (e) {
                let action = 'notice';
                let p={
                    title:"警告",
                    msg:"视频下载失败，请刷新后重试",
                }
                /*chrome.runtime.sendMessage({action:action,params:p}, function(response) {

                });*/
            }

            myBlobBuilder.append(a);

            //计算当前进度
            let progress = parseInt(index/seArr.length*100);
            //console.log(progress);
            //更新storage数据
            var obj = document.getElementById("acfun-popup-helper");
            var frameWindow = obj.contentWindow;
            frameWindow.postMessage({
                action: 'updateProgress',
                params: {
                    progress:progress,
                    id:id,
                }
            }, '*');
            //this.updateStorage(progress,id,tabId);
        }
        if ('download' in document.createElement('a')) {
            let elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(myBlobBuilder.getBlob());
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        } else {
            navigator.msSaveBlob(myBlobBuilder.getBlob(), fileName);
        }


    }

    api_mark(params){
        let {value} = params;
        this.options.mark=value;
        optionsSave(this.options);
        if(value){
            this.renderMark();
        }else{
            this.clearMark();
        }
    }
    api_scan(params){
        let {value} = params;
        this.options.scan=value;
        optionsSave(this.options);
        if(value){
            this.renderScan();
        }else{
            this.clearScan();
        }
    }

    clearMark(){
        //解绑事件
        $('.area-comm-more').off('click','.comment-mark');
        $(".comment-mark").remove();
        $(".area-comm-more").removeClass('comment-mark-parent');
    }

    clearScan(){
        $(".area-comment-title .pos.simple").remove();
    }


    api_renderSub(params){
        let {url,rootCommentId} = params;
        if(this.options.mark){
            this.renderSubMark(rootCommentId);
        }
        if(this.options.scan){
            this.renderSubScan(rootCommentId);
        }
    }

    renderSubScan(rootCommentId){
        var timer = setInterval(function () {
            let nodes = $("div[data-commentid='"+rootCommentId+"']").find('a.name');
            if(nodes.length>0){
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.simple');
                    if(exists.length==0){
                        let userId = $(this).data('userid');
                        let userName = $(this).text();
                        let tagInfo = await getStorage("AC_"+userId).then(res=>{return res["AC_"+userId]});
                        if(tagInfo!=undefined &&tagInfo.tag!='' && tagInfo.tag!=undefined){
                            if(userName!=tagInfo.name){
                                $(this).after('<span title="'+tagInfo.name+'" class="pos simple">'+tagInfo.tag+'</span>');
                            }else{
                                $(this).after('<span class="pos simple">'+tagInfo.tag+'</span>');
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }



    renderSubMark(rootCommentId){
        var timer = setInterval(function () {
            let nodes = $("div[data-commentid='"+rootCommentId+"']").find('.area-comm-more');
            if(nodes.length>0){

                nodes.each(function () {
                    let text = $(this).text();
                    if(text.indexOf('标记')==-1){
                        $(this).addClass('comment-mark-parent');
                        $(this).append('<span class="comment-mark">标记</span>');
                        $(this).on('click','.comment-mark',function () {
                            let userNode = $(this).parent().parent().parent().find('.name').eq(0);
                            let username = userNode.text();
                            let userId = userNode.data("userid");
                            let title = '为『'+username+'』添加标记，最多10个字符';
                            let tag=prompt(title,"");
                            let tag_trim = tag.trim();
                            if(tag_trim!='' && tag_trim!=null && tag_trim.length<=10){
                                let key = "AC_"+userId;
                                let value = {name:username,tag:tag};
                                chrome.storage.local.set({[key]:value}, function () {
                                    userNode.parent().find('.pos.simple').remove();
                                    userNode.after('<span class="pos simple">'+tag+'</span>');

                                });
                            }
                        });
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }

    api_renderList(params){
        let {url} = params.url;
        if(this.options.mark){
            this.renderMark();
        }
        if(this.options.scan){
            this.renderScan();
        }

    }

    //渲染扫描到的用户tag信息
    renderScan(){
        var timer = setInterval(function () {
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if(nodes.length>0 && loading==''){
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.simple');
                    if(exists.length==0){
                        let userId = $(this).data('userid');
                        let userName = $(this).text();
                        let tagInfo = await getStorage("AC_"+userId).then(res=>{return res["AC_"+userId]});
                        if(tagInfo!=undefined &&tagInfo.tag!='' && tagInfo.tag!=undefined){
                            if(userName!=tagInfo.name){
                                $(this).after('<span title="'+tagInfo.name+'" class="pos simple">'+tagInfo.tag+'</span>');
                            }else{
                                $(this).after('<span class="pos simple">'+tagInfo.tag+'</span>');
                            }
                        }
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }

    //渲染标记按钮
    renderMark(){
        var timer = setInterval(function () {
            let nodes = $('.area-comm-more');
            let loading = $('.ac-comment-loading').html();
            if(nodes.length>0 && loading == ''){
                nodes.each(function(){
                    let text = $(this).text();
                    if(text.indexOf('标记')==-1){
                        $(this).addClass('comment-mark-parent');
                        $(this).append('<span class="comment-mark">标记</span>');
                        $(this).on('click','.comment-mark',function () {
                            let userNode = $(this).parent().parent().parent().find('.name').eq(0);
                            let username = userNode.text();
                            let userId = userNode.data("userid");
                            let title = '为『'+username+'』添加标记，最多10个字符';
                            let tag=prompt(title,"");
                            let tag_trim = tag.trim();
                            if(tag_trim!='' && tag_trim!=null && tag_trim.length<=10){
                                let key = "AC_"+userId;
                                let value = {name:username,tag:tag};
                                chrome.storage.local.set({[key]:value}, function () {
                                    userNode.parent().find('.pos.simple').remove();
                                    userNode.after('<span class="pos simple">'+tag+'</span>');
                                });
                            }

                        });
                    }
                });
                clearInterval(timer);
            }
        },1000);
    }
}



window.odhfront = new ODHFront();