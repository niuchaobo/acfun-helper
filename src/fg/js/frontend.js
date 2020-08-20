class ODHFront {
  constructor() {
    this.options = null;
    this.href = null;
    this.div = new Div(); //右侧助手
    this.block = new Block(); //up主过滤
    this.pageBeautify = new PageBeautify(); //界面美化
    this.livepageBeautify = new LivePageButfy(); //生放送界面美化
    this.ce = new CommentEnhance(); //评论区增强
    this.download = new Download(); //下载(视频、封面)
    this.live = new Live(); //直播
    this.authInfo = new AuthInfo(); //必要信息获取
    this.banana = new Banana(); //自动投蕉
    this.videoSetting = new VideoSetting(); //视频播放设置：自定义倍速、观影模式等
    this.danmaku = new Danmaku(); //弹幕服务
    this.danmusearch = new Search();//弹幕列表搜索

    this.playerconfig = new PlayerConfig(); //播放器和部分页面配置处理
    this.luckyTurntab = new LuckyTtab(); //幸运轮盘（抽奖）
    
    chrome.runtime.onMessage.addListener(this.onBgMessage.bind(this)); //接收来自后台的消息
    window.addEventListener("message", (e) => this.onFrameMessage(e)); //接收来自iframe的消息
    
    this.loading()
    
    //监听storage变化,可用于数据云同步
    chrome.storage.onChanged.addListener(function (changes, areaName) {
      // console.log('11111111111111111')
      // console.log(document.cookie);
    });
  }

  onBgMessage(request, sender, callback) {
    const { action, params } = request;
    const method = this["api_" + action];
    if (typeof method === "function") {
      params.callback = callback;
      method.call(this, params);
    }
    callback();
  }

  onFrameMessage(e) {
    const { action, params } = e.data;
    const method = this["api_" + action];
    if (typeof method === "function") {
      method.call(this, params);
    }
  }

  addStyle() {
    let nod = document.createElement("style");
    let str =
      ".comment-mark-parent{bottom: -80px!important;}" +
      "#mark-div{top:50%;left:50%;display:none;position:fixed;z-index:999999}" +
      "span.simple {background-color: #d69acc !important;cursor: pointer;}" +
      "span.pos {display:inline;text-transform: lowercase;font-size: 0.9em;margin: 5px;padding: 0px 4px;color: white;border-radius: 3px;}" +
      ".ext-filter-up{display:inline-block;vertical-align:middle;width:30px;height:18px;font-size:13px;line-height:18px;color:#4a8eff;cursor:pointer;margin-left:5px;}" +
      "span.up {background-color: #4a8eff !important;cursor: pointer;}" +
      "p.crx-guid-p{height: 20px !important;line-height: 20px !important;padding: 7px 12px !important;text-align:center;}" +
      "p.crx-member-p{height: 20px !important;line-height: 20px !important;}" +
      "";
    nod.type = "text/css";
    nod.textContent = str;
    document.getElementsByTagName("head")[0].appendChild(nod);
  }

  addNightStyle() {
    let div = document.createElement("div");
    div.id = "acfun_night_conver";
    div.style =
      "width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;";
    //let cover = '<div id="__nightingale_view_cover" ' +
    //  'style="width: 100%; height: 100%; transition: -webkit-transform 10s ease-in-out 0s; z-index: 2147483647; opacity: 0.25; position: fixed !important; left: 0px !important; bottom: 0px !important; overflow: hidden !important; background: rgb(0, 0, 0) !important; pointer-events: none !important;"></div>';
    document.body.appendChild(div);
  }

  
    async loading(){
        this.options = await optionsLoad()
        if (!this.options.enabled) {
            return
        }
        this.href = window.location.href;
        //页面未加载完成式执行的方法 (提前注入的css/dom..)
        //this.unLoad()
        //页面的全部资源加载完后才会执行 包括 图片 视频等
        window.addEventListener("load", (e) => {
            this.onLoad(e)
        });
        //Dom 渲染完即可执行 此时图片视频还可能没加载完
        document.addEventListener("DOMContentLoaded", (e) =>{
            this.onDomContentLoaded(e)
        });
    }

    onDomContentLoaded(e){
        // console.log("options",this.options);
        let href = this.href;
        //直播站功能
        if(REG.live.test(href) && this.options.livePlayerEnhc){
            let timer = setInterval(()=>{
            let checknode=$('div.box-right');
            if(checknode.length>0){
                this.livepageBeautify.appendWidePlayer();
                this.livepageBeautify.simplifyDanmu();
                clearInterval(timer)
            }
        },3000)
        }
        //直播首页及页面优化
        if(!REG.live.test(href) && !REG.liveIndex.test(href)){
            //首页个人资料弹框 (未完成)
            if(this.options.beautify_personal){
                getAsyncDom('#header .header-guide .guide-item',()=>{
                      this.pageBeautify.addMouseAnimation()
                      this.pageBeautify.personBeautify();
                })
            }
            //隐藏ad
            if(this.options.hideAd){
                this.pageBeautify.hideAds();
            }
            //仅首页nav高斯模糊(隐藏功能)
            if(REG.index.test(href) && this.options.Dev_indexBlurSW){
              this.pageBeautify.indexBeautify();
            }
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
        //播放器画质策略
        if((REG.video.test(href) || REG.bangumi.test(href))){
            this.videoSetting.videoQuality();
        }
        //开启右侧导航
        if(REG.index.test(href) && this.options.beautify_nav){
            this.pageBeautify.navBeautify();
        }
        //显示点赞数
        if((REG.video.test(href) || REG.bangumi.test(href)) && this.options.show_like){
            this.pageBeautify.showLikeCount();
        }
        //播放器和弹幕功能
        if(REG.video.test(href)){
            if(this.options.autoOpenVideoDescsw){
                this.pageBeautify.openVideoDesc();
            }
            this.danmaku.cacheStore();
            this.videoSetting.callPicktureInPictureMode();
            if(this.options.autoJumpLastWatchSw){
                this.videoSetting.jumpLastWatchTime();
            }
        }
        //配置同步
        this.playerconfig.PConfProc();
        //直播画中画模式
        if(REG.live.test(href)){
          if(this.options.liveCommentTimeTag){
            this.livepageBeautify.commentTimeTag();
          }
          this.livepageBeautify.callPicktureInPictureModeForLive()
        }
    }

    onLoad(e){
        //tab页创建时会从bg发消息过来写入options数据,但可能存在延迟
        //根据cookie判断当前登录用户是不是up
        //let is_up = this.adjuatUp();
        let href = this.href;
        //直播ad屏蔽
        if(this.options.liveHideAd && REG.liveIndex.test(href)){
            this.livepageBeautify.LivehideAds();
        }
        //直播站首页用户屏蔽
        if(this.options.liveBansw & REG.liveIndex.test(href)){
            this.block.liveUserBlock();
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
            let ConfKey = 'wsyeKfnoCtnemmoCeQ'
            var curKeyName = ConfKey.split("").reverse().join("");
            if(this.options[curKeyName]){
              this.ce.immedComt();
            }
        }
        //文章
        if(REG.article.test(href)){
            let isUp = adjustArticleUp();
            this.div.show(pageInfo,this.options,'article',isUp);
        }
        //从消息中心(评论)跳转
        if(REG.msg_comment.test(href) && this.options.commentEasyJump){
            this.ce.jumpToComment(href);
        }
        //直播
        if(REG.live.test(href)){
            $(".open-app-confirm").hide();
            this.div.show(pageInfo,this.options,'live','');
        }
        //视频与番剧页面功能
        if((REG.video.test(href) || REG.bangumi.test(href))){
          //在视频播放页面监听播放器状态(是否全屏)，控制助手按钮是否显示
          this.videoSetting.monitorFullScreen();
          //自定义倍速
          if(this.options.custom_rate){
            this.videoSetting.customPlaybackRate();
          }
          //全局进度条
          if(this.options.ProgressBarsw){this.videoSetting.FlexProgressBar('out');}else{this.videoSetting.FlexProgressBarws = false;}
          //AB回放
          if(this.options.ABPlaysw){
            this.videoSetting.AddABPlayUI();
          }
          //倍速切换的快捷键
          if(this.options.PlaybackRateKeysw){
            this.videoSetting.PlaybackRateKeyCode(this.options.custom_rate_keyCode);
          }
          //弹幕列表搜索
          if(this.options.PlayerDamakuSearchSw){
                getAsyncDom('.list-title',()=>{
                    this.danmusearch.inject();
                })
            }
           //弹幕列表前往Acer个人主页
           if(this.options.danmuSearchListToUsersw){
               getAsyncDom('.list-title',()=>{
                   this.videoSetting.danmuSearchListToUser()
               })
           }
          //评论空降
          if(this.options.PlayerTimeCommentEasyJump){
            getAsyncDom('.ac-pc-comment',()=>{
                this.ce.searchScanForPlayerTime();
            });
          }
          //快捷键空降
          if(this.options.easySearchScanForPlayerTimesw){
            getAsyncDom('.ac-pc-comment',()=>{
                this.ce.easySearchScanForPlayerTime(this.options.custom_easy_jump_keyCode)
            });
          }
        }
        this.authInfo.cookInfo();
    }
    
  

  //抽奖
  api_lottery(params) {
    let { number, follow } = params;
    let href = window.location.href;
    let reg = /ac(\d+)/;
    let acId = reg.exec(href)[1];
    console.log(this.luckyTurntab.RollOut(acId, number));
  }
  api_lottery2nd(params) {
    let { number, follow } = params;
    let href = window.location.href;
    let reg = /ac(\d+)/;
    let acId = reg.exec(href)[1];
    console.log(this.luckyTurntab.RollOutExp(acId, number));
  }
  //下载封面
  api_downloadCover(params) {
    this.download.downloadCover(params);
  }
  //下载弹幕
  api_downloadDanmaku(params) {
    this.download.downloadDanmaku(params);
  }
  //自动投蕉
  async api_throwBanana(params) {
    if (!this.options.enabled) {
      return;
    }
    this.banana.throwBanana(params);
  }
  api_notice(params) {
    let action = "notice";
    chrome.runtime.sendMessage({ action: action, params: params }, function (
      response
    ) {});
  }

  api_setFrontendOptions(params) {
    let { options, callback } = params;
    this.options = options;
    callback();
  }

  //视频下载
  async api_download(params) {
    if (this.options == null) {
      this.options = await optionsLoad();
    }
    this.download.downloadVideo(params);
  }

  api_mark(params) {
    let { value } = params;
    this.options.mark = value;
    optionsSave(this.options);
    if (value) {
      this.ce.renderMark();
    } else {
      this.ce.clearMark();
    }
  }
  api_scan(params) {
    let { value } = params;
    this.options.scan = value;
    optionsSave(this.options);
    if (value) {
      this.ce.renderScan();
      this.ce.renderScanForUp();
    } else {
      this.ce.clearScan();
    }
  }

  //直播m3u8 url赋值到前台页面
  async api_renderLive(params) {
    this.live.renderLive(params);
  }

  //评论区折叠部分的标记渲染入口
  api_renderSub(params) {
    let { url, rootCommentId } = params;
    if (this.options.mark) {
      this.ce.renderSubMark(rootCommentId);
    }
    if (this.options.scan) {
      this.ce.renderSubScan(rootCommentId);
    }
    if (this.options.upHighlight) {
      this.ce.renderSubScanForUp(rootCommentId);
    }
  }

  //评论区整体部分的标记渲染入口
  api_renderList(params) {
    let { url } = params.url;
    if (this.options.mark) {
      this.ce.renderMark();
    }
    if (this.options.scan) {
      this.ce.renderScan();
    }
    if (this.options.upHighlight) {
      this.ce.renderScanForUp();
    }
  }
}

window.odhfront = new ODHFront();
