class ODHFront {

    constructor() {
        this.options = null;
        this.div = new Div();//右侧助手
        this.block = new Block();//up主过滤
        this.pageBeautify = new PageBeautify();//界面美化
        this.livepageBeautify = new LivePageButfy();//生放送界面美化
        this.ce = new CommentEnhance();//评论区增强
        this.download = new Download();//下载(视频、封面)
        this.live = new Live();//直播
        this.banana = new Banana();//自动投蕉
        this.videoSetting = new VideoSetting();//视频播放设置：自定义倍速、观影模式等


        this.playerconfig = new PlayerConfig();//播放器和部分页面配置处理
        this.luckyTurntab = new LuckyTtab();//幸运轮盘（抽奖）

        chrome.runtime.onMessage.addListener(this.onBgMessage.bind(this));//接收来自后台的消息
        window.addEventListener('message', e => this.onFrameMessage(e));//接收来自iframe的消息
        //页面的全部资源加载完后才会执行 包括 图片 视频等
        window.addEventListener('load', e => this.onLoad(e));
        //Dom 渲染完即可执行 此时图片视频还可能没加载完
        document.addEventListener('DOMContentLoaded',e=>this.onDomContentLoaded(e));
        //监听storage变化,可用于数据云同步
        chrome.storage.onChanged.addListener(function (changes,areaName) {
            console.log('11111111111111111')
            console.log(document.cookie);
        });
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

    onFrameMessage(e) {
        const { action, params } = e.data;
        const method = this['api_' + action];
        if (typeof(method) === 'function') {
            method.call(this, params);
        }
    }

    addStyle(){
        let nod = document.createElement("style");
        let str = ".comment-mark-parent{bottom: -80px!important;}" +
            "#mark-div{top:50%;left:50%;display:none;position:fixed;z-index:999999}" +
            "span.simple {background-color: #d69acc !important;cursor: pointer;}" +
            "span.pos {display:inline;text-transform: lowercase;font-size: 0.9em;margin: 5px;padding: 0px 4px;color: white;border-radius: 3px;}" +
            ".ext-filter-up{display:inline-block;vertical-align:middle;width:30px;height:18px;font-size:13px;line-height:18px;color:#4a8eff;cursor:pointer;margin-left:5px;}" +
            "span.up {background-color: #4a8eff !important;cursor: pointer;}" +
            "p.crx-guid-p{height: 20px !important;line-height: 20px !important;padding: 7px 12px !important;text-align:center}"+
            "p.crx-member-p{height: 20px !important;line-height: 20px !important;}"+
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



    async onDomContentLoaded(e){
        this.options = await optionsLoad();
        console.log("options",this.options);

        let href = window.location.href;
        if(REG.live.test(href)){
            this.livepageBeautify.appendWidePlayer();
            this.livepageBeautify.simplifyDanmu();
        }
        if(!this.options.enabled){
            return;
        }
        //添加自定义样式
        this.addStyle();
        if(this.options.filter){
            this.block.injectScript();
        }
        //夜间模式
        if(this.options.night){
            this.addNightStyle();
        }
        //开启右侧导航
        if(this.options.beautify_nav){
            this.pageBeautify.navBeautify();
        }
        //显示点赞数
        if((REG.video.test(href) || REG.bangumi.test(href)) && this.options.show_like){
            this.pageBeautify.showLikeCount();
        }
        this.playerconfig.PConfProc();
        this.videoSetting.callPicktureInPictureMode();

    }


    async onLoad(e){
        //tab页创建时会从bg发消息过来写入options数据,但可能存在延迟
        this.options = await optionsLoad();
        if(!this.options.enabled){
            return;
        }
        //根据cookie判断当前登录用户是不是up
        //let is_up = this.adjuatUp();
        let href = window.location.href;
        //顶栏头像下拉个人信息栏内容
        if(this.options.beautify_personal){
            this.pageBeautify.personBeautify();
        }

        //开启屏蔽功能
        if(this.options.filter){
            this.block.block();

        }
        var pageInfo = null;
        //视频
        if(REG.video.test(href)){
            var div = document.createElement('div');
            div.style.display="none";
            let uuid = uuidBuild();
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
            let isUp = adjustVideoUp();
            this.div.show(pageInfo,this.options,'video',isUp);
        }
        //文章
        if(REG.article.test(href)){
            let isUp = adjustArticleUp();
            this.div.show(pageInfo,this.options,'article',isUp);
        }

        //从消息中心(评论)跳转
        if(REG.msg_comment.test(href)){
            this.ce.jumpToComment();
        }

        //直播
        if(REG.live.test(href)){
            $(".open-app-confirm").hide();
            this.div.show(pageInfo,this.options,'live','');
        }
        //自定义倍速
        if((REG.video.test(href) || REG.bangumi.test(href)) && this.options.custom_rate){
            this.videoSetting.customPlaybackRate();
        }
        //在视频播放页面监听播放器状态(是否全屏)，控制助手按钮是否显示
        if((REG.video.test(href) || REG.bangumi.test(href))){
            this.videoSetting.monitorFullScreen();
            //todo 加开关
            this.ce.searchScanForPlayerTime();
        }
    }

    //抽奖
    api_lottery(params){
        let {number,follow} = params;
        let href = window.location.href;
        let reg = /ac(\d+)/;
        let acId = reg.exec(href)[1];
        console.log(this.luckyTurntab.RollOut(acId,number))
    }


    //下载封面
    api_downloadCover(params) {
        this.download.downloadCover(params);

    }
    //自动投蕉
    async api_throwBanana(params) {
        if(!this.options.enabled){
            return;
        }
        this.banana.throwBanana(params);
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


    //视频下载
    async api_download(params){
        if(this.options==null){
            this.options = await optionsLoad();
        }
        this.download.downloadVideo(params);
    }


    api_mark(params){
        let {value} = params;
        this.options.mark=value;
        optionsSave(this.options);
        if(value){
            this.ce.renderMark();
        }else{
            this.ce.clearMark();
        }
    }
    api_scan(params){
        let {value} = params;
        this.options.scan=value;
        optionsSave(this.options);
        if(value){
            this.ce.renderScan();
            this.ce.renderScanForUp();
        }else{
            this.ce.clearScan();
        }
    }


    //直播m3u8 url赋值到前台页面
    async api_renderLive(params){
        this.live.renderLive(params);

    }



    //评论区折叠部分的标记渲染入口
    api_renderSub(params){
        let {url,rootCommentId} = params;
        if(this.options.mark){
            this.ce.renderSubMark(rootCommentId);
        }
        if(this.options.scan){
            this.ce.renderSubScan(rootCommentId);
        }
        if(this.options.upHighlight){
            this.ce.renderSubScanForUp(rootCommentId);
        }
    }


    //评论区整体部分的标记渲染入口
    api_renderList(params){
        let {url} = params.url;
        if(this.options.mark){
            this.ce.renderMark();
        }
        if(this.options.scan){
            this.ce.renderScan();
        }
        if(this.options.upHighlight){
            this.ce.renderScanForUp();
        }

    }
}



window.odhfront = new ODHFront();