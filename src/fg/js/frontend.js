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
            "span.pos {display:inline;text-transform: lowercase;font-size: 0.9em;margin: 5px;padding: 0px 4px;color: white;border-radius: 3px;}" +
            ".ext-filter-up{display:inline-block;vertical-align:middle;width:30px;height:18px;font-size:13px;line-height:18px;color:#4a8eff;cursor:pointer;margin-left:5px;}" +
            "span.up {background-color: #4a8eff !important;cursor: pointer;}" +
            "";
        nod.type="text/css";
        nod.textContent = str;
        document.getElementsByTagName('head')[0].appendChild(nod);

    }

    addNightStyle(){
        let div = document.createElement("div");
        div.id="acfun_night_conver";
        div.style='width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;';
        //let cover = '<div id="__nightingale_view_cover" ' +
          //  'style="width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;"></div>';
        document.body.appendChild(div);
    }

    homePageFilter(map){
        $(".rank-right").find('li a').each(function () {
            let title = $(this).attr("title");
            if(title=='' || title==undefined){
                return;
            }
            let href = $(this).attr("href");
            let hrefReg = new RegExp("/u/\\d+\\.aspx");
            if(hrefReg.test(href)){
                let up_name = $(this).attr('title');
                let uid = map.get(up_name);
                if(uid!=null && uid!='' && uid!=undefined){
                    $(this).parent().parent().parent().parent().parent().remove();
                    return;
                }
            }

            title = title.replace(/[\r\n]/g,"");
            title  = title.replace(/[\n]/g,"");
            let reg = new RegExp("UP\\:(.*)发布于");
            let res = reg.exec(title);
            if(res!=null && res!=undefined && res.length>1){
                let up_name = res[1];
                if(up_name!=null&&up_name!=''){
                    let uid = map.get(up_name);
                    if(uid!=null && uid!='' && uid!=undefined){
                        $(this).parent().remove();
                    }
                }
            }
        });


    }
    articlePageFilter(map){
        $(".atc-info.clearfix>a.atc-up").each(function () {
            let up_name = $(this).attr('title');
            if(up_name!=''&&up_name!=null && up_name!=undefined){
                let uid = map.get(up_name);
                if(uid!=''&&uid!=null && uid!=undefined){
                    $(this).parent().parent().parent().next().remove();
                    $(this).parent().parent().parent().remove();
                }
            }
        })

    }


    async onDomContentLoaded(e){
        this.options = await optionsLoad();
        if(!this.options.enabled){
            return;
        }
        if(this.options.filter){
            let script = document.createElement("script");
            script.src = chrome.extension.getURL("fg/js/acfunxhr.js");
            script.addEventListener('load', () => {
                let ups = upMapReverse(this.options);
                window.postMessage({ups:ups , to:'acfunxhr'});
            });
            (document.head || document.documentElement).appendChild(script);
        }

        //夜间模式
        if(this.options.night){
            this.addNightStyle();
        }

        //开启右侧导航
        //todo 改变判断条件
        if(this.options.enabled){
            this.addRightNav();
            var length = $('.home-main-content>div').length;
            $(document).scroll(function(){
                for(let i =0;i<length;i++){
                    let top = $('.home-main-content>div').eq(i).offset().top;//获取当前元素离顶部的距离
                    let scrop = $(document).scrollTop();//获取页面滚动条离顶部的距离
                    if(scrop>top){
                        $('.rightnav>div').eq(i).css({'background-color':'#fd4c5d',"color":'#fff'});
                        $('.rightnav>div').eq(i).siblings().css({'background-color':'',"color":''});
                    }
                }
            })
        }
    }

    addRightNav(){
        //右侧导航样式
        let style_link = document.createElement("link");
        style_link.href = chrome.extension.getURL("fg/css/home_nav.css");
        style_link.type="text/css";
        style_link.real="stylesheet";
        (document.head || document.documentElement).appendChild(style_link);



        $("#back-top").css({"font-size": "12px","background-color": "rgb(250, 249, 249)","line-height": "30px","border": "1px solid rgb(235, 233, 233)","color": "rgb(182, 170, 170)","height":"auto"});
        //右侧导航html
        let root = chrome.runtime.getURL('/');
        let fn = ()=>{
            return `<script charset="UTF-8" src="${root+'fg/js/nav.js'}"></script>`;
        }
        let content = `
                        ${fn()}
                        <div class="rightnav none">
                            <div onclick="scrollToTop(event);" data-id="pagelet_monkey_recommend">
                                推荐
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_list_banana">
                                香蕉榜
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_amusement">
                                娱乐
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_game">
                                游戏
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_douga">
                                动画
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_bangumi_list">
                                番剧
                            </div>   
                            <div onclick="scrollToTop(event);" data-id="pagelet_life">
                                生活
                            </div>   
                            <div onclick="scrollToTop(event);" data-id="pagelet_tech">
                                科技
                            </div>  
                            <div onclick="scrollToTop(event);" data-id="pagelet_dance">
                                舞蹈
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_music">
                                音乐
                            </div> 
                            <div onclick="scrollToTop(event);" data-id="pagelet_film">
                                影视
                            </div> 
                            <div onclick="scrollToTop(event);" data-id="pagelet_fishpond">
                                鱼塘
                            </div> 
                            <div onclick="scrollToTop(event);" data-id="pagelet_sport">
                                体育
                            </div>        
                            
                        </div>`;
        $("#back-top").prepend(content);
    }

    async onLoad(e){
        //tab页创建时会从bg发消息过来写入options数据,但可能存在延迟
        this.options = await optionsLoad();
        if(!this.options.enabled){
            return;
        }
        let href = window.location.href;
        //视频
        let video = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+');
        //番剧
        //let bangumi = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*');
        //文章
        let article = new RegExp('http(s)?:\\/\\/www.acfun.cn\\/a\\/ac\\d+');
        //从我的消息-评论跳转
        let msg_comment =  new RegExp('http(s)?:\\/\\/www.acfun.cn\\/(a|v)\\/ac\\d+#ncid=(\\d+)');
        //直播
        let live = new RegExp("https://m.acfun.cn/live/detail/*")
        //开启屏蔽功能
        if(this.options.filter){
            let allFilter = await getStorage(null);
            let upMap = upMapReverse(allFilter);
            this.homePageFilter(upMap);
            this.articlePageFilter(upMap);
            //如果是文章区详情页，添加屏蔽按钮
            if(article.test(href)){
                this.renderFilter();
            }

        }
        //添加自定义样式
        this.addStyle();
        var pageInfo = null;
        //视频
        if(video.test(href)){
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

        //从消息中心(评论)跳转
        if(msg_comment.test(href)){
            let res = msg_comment.exec(href);
            if(res!=null && res!=undefined && res.length==4){
                let cid = res[3];
                let retry = 10;
                while (retry>0){
                    let node = $('div[data-commentid='+cid+']').eq(0);
                    let node_offset = node.offset();
                    if(node_offset!=undefined && node_offset!=null){
                        let top = Number(node_offset.top)-Number(node.height());
                        $("html, body").animate({
                            scrollTop: top
                        }, {
                            duration: 500,
                            easing: "swing"
                        });
                        break;
                    }else{
                       await mysleep(1000);
                    }
                    retry--;
                }
            }
        }

        if(live.test(href)){
            $(".open-app-confirm").hide();
            this.div.show(pageInfo,this.options,'live');

        }
    }


    renderFilter(){
        $('.action-up').append('<a class="ext-filter-up">屏蔽</a>');
        $('.up-abstract').css("width","600px");
        $('.action-up').css("width","100px");
        $('.action-up').on('click','.ext-filter-up',function () {
            let up_name = $('.up-name').find('a:first').text();
            let msg = '确定屏蔽『'+up_name+'』吗？';
            if (confirm(msg)) {
                let hrefReg = new RegExp("/u/(\\d+)\\.aspx");
                let href = $('.up-name').find('a:first').attr("href");
                let regRes = hrefReg.exec(href);
                if(regRes!=undefined && regRes!=null){
                    let key = "FILTER_"+regRes[1];
                    let v = {name:up_name};
                    chrome.storage.local.set({[key]:v}, function () {
                        let params={
                            title:'Acfun助手',
                            msg:'『'+up_name+'』已被屏蔽'
                        }
                        chrome.runtime.sendMessage({action:'notice',params:params}, function(response) {

                        });
                    });
                }
            } else {
                return;
            }
        });

    }

    //下载封面
    api_downloadCover(params) {
        let {link_url,type} = params;
        link_url = link_url.replace("https://www.acfun.cn","");
        $('.home-main-content a,.main a,.tab-content a').each(function () {
            let href = $(this).attr('href');
            if(link_url==href){
                if($(this).has('img').length){
                    let _img = $(this).find('img').eq(0);
                    let img_url = _img.attr('src');
                    let fileName = _img.attr('alt');
                    if(fileName==undefined){
                        fileName = "cover";
                    }

                    img_url = img_url.replace(/(webp)/,'gif').replace("http://","https://");
                    //如果是高清
                    if(type=='high'){
                        //   /w/320/h/180
                        img_url = img_url.replace(/\/w\/\d+\/h\/\d+/,"").replace(/(\?.*)/,'');
                    }
                    let suffix = img_url.replace(/(.*\.)/, '').replace(/(\?.*)/,'');
                    let reg = new RegExp("jpg|jpeg|gif|bmp|png");
                    if(!reg.test(suffix)){
                        suffix = 'png';
                    }
                    let filename =fileName +"."+ suffix;
                    fetch(img_url) // 返回一个Promise对象
                        .then((res)=>{
                            //console.log(res.blob()) // res.blob()是一个Promise对象
                            return res.blob();
                        })
                        .then((res)=>{
                            //console.log(res) // res是最终的结果
                            let a = document.createElement('a');
                            let blob = new Blob([res]);
                            let url = window.URL.createObjectURL(blob);
                            a.href = url;
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        });
                    return false;
                }
            }
        })


    }
    //自动投蕉
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
            this.renderScanForUp();
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

    async api_renderLive(params){
        console.log('live--------------');
        let href = window.location.href;
        let {url} = params;
        let retry = 10;
        while(retry>0){
            //发送
            console.log("retry:"+retry);
            var obj = document.getElementById("acfun-popup-helper");
            if(obj!=null && obj!=undefined){
                var frameWindow = obj.contentWindow;
                frameWindow.postMessage({
                    action: 'updateLiveUrl',
                    params: {
                        live_url:url,
                    }
                }, href);
                break;
            }else{
                await mysleep(1000);
            }
            retry--;
        }

    }



    //评论区折叠部分的标记渲染入口
    api_renderSub(params){
        let {url,rootCommentId} = params;
        if(this.options.mark){
            this.renderSubMark(rootCommentId);
        }
        if(this.options.scan){
            this.renderSubScan(rootCommentId);
        }
        if(this.options.upHighlight){
            this.renderSubScanForUp(rootCommentId);
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


    //评论区(折叠或翻页中)显示up主名字
    renderSubScanForUp(rootCommentId){
        var timer = setInterval(function () {
            let url = window.location.toString();
            let avr = new RegExp("/v/");
            let aar = new RegExp("/a/");
            let av = avr.exec(url);
            let aa=aar.exec(url);
            let up = '';
            if(av!=null && av!=undefined && av.length>=1){
                up=$('a.up-name').text();
            }else if(aa!=null && aa!=undefined && aa.length>=1){
                up=$('div.up-name a.upname').text();
            }
            let nodes = $("div[data-commentid='"+rootCommentId+"']").find('a.name');
            if(nodes.length>0){
                nodes.each(function () {
                    let exists = $(this).parent().find('.pos.up');
                    if(exists.length==0){
                        let userName = $(this).text();
                        if(userName==up){
                            $(this).after('<span class="pos up">UP主</span>');
                        }
                    }
                });
                clearInterval(timer);
            }
        },1020);
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

    //评论区整体部分的标记渲染入口
    api_renderList(params){
        let {url} = params.url;
        if(this.options.mark){
            this.renderMark();
        }
        if(this.options.scan){
            this.renderScan();
        }
        if(this.options.upHighlight){
            this.renderScanForUp();
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

    //评论区显示up主名字
    renderScanForUp(){
        var timer = setInterval(function () {
            var url = window.location.toString();
            let avr = new RegExp("/v/");
            let aar = new RegExp("/a/");
            let av = avr.exec(url);
            let aa=aar.exec(url);
            if(av!=null && av!=undefined && av.length>=1){
                var up=$('a.up-name').text();
            }else if(aa!=null && aa!=undefined && aa.length>=1){
                var up=$('div.up-name a.upname').text();
            }
            let nodes = $('.area-comment-title a.name');
            let loading = $('.ac-comment-loading').html();
            if(nodes.length>0 && loading==''){
                nodes.each(async function () {
                    let exists = $(this).parent().find('.pos.up');
                    if(exists.length==0){
                        let userName = $(this).text();
                        if(userName==up){
                            $(this).after('<span class="pos up">UP主</span>');
                        }
                    }
                });
                clearInterval(timer);
            }
        },1020);
    }
}



window.odhfront = new ODHFront();