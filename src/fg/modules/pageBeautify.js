/**
 * 页面美化
 */
class PageBeautify extends AcFunHelperFgFrame {
  constructor() {
    super();
    this.personInfo = "https://www.acfun.cn/rest/pc-direct/user/personalInfo";
    this.devMode = false;
    //往里边添加 栏目原来名称 与 导航上显示的名称
    this.navWord = {
      猴子推荐: "推荐",
      正在直播: "直播",
      "「年」在一起": "春节",
      "舞蹈·偶像": "舞蹈",
      "主角竟是我": "春节",
    };
  }

  //-----------------导航---------------------
  navBeautify() {
    this.addRightNav();
    this.macNavPosition(); //导航常显（导航更像导航），mbp（13寸）导航条位置调整（别的mac版本不知道会不会爆炸）
    let homeDiv = $(".home-main-content>div");
    let targetDiv = $("#back-top>.rightnav>div");
    let length = homeDiv.length;
    let ticking = false;
    let b = () => {
      let scrop = $(document).scrollTop(); //获取页面滚动条离顶部的距离
      let a = [];
      for (let i = 0; i < length; i++) {
        if (!homeDiv.eq(i).children().length) {
          continue
        }
        a.push(homeDiv.eq(i).offset().top);
      }
      for (let i = 0; i < length; i++) {
        if (scrop < a[0]) {
          targetDiv.removeClass("isSelected").eq(i).addClass("isSelected");
          break;
        }
        if (scrop >= a[i] && scrop <= a[i + 1]) {
          targetDiv.removeClass("isSelected").eq(i).addClass("isSelected");
          break;
        }
      }
      ticking = false;
    };
    $(document).scroll(() => {
      if (!ticking) {
        requestAnimationFrame(b);
        ticking = true;
      }
    });
  }

  changeWord(item) {
    return this.navWord[item] ? this.navWord[item] : item;
  }

  addRightNav() {
    //右侧导航样式
    let style_link = document.createElement("link");
    style_link.href = chrome.runtime.getURL("fg/css/home_nav.css");
    style_link.type = "text/css";
    style_link.real = "stylesheet";
    (document.head || document.documentElement).appendChild(style_link);
    let navArr = [];
    Array.prototype.slice
      .call(document.getElementsByClassName("home-main-content")[0].children)
      .forEach((item, index) => {
        if (!item.children.length) {
          return
        }
        Array.prototype.slice
          .call(item.getElementsByClassName("header-title"))
          .forEach(
            (j) =>
              j.innerText != "排行榜" &&
              (navArr[index] = [item.id, j.innerText])
          );
      });
    $("#back-top").css({
      "font-size": "12px",
      "background-color": "rgb(250, 249, 249)",
      "line-height": "30px",
      border: "1px solid rgb(235, 233, 233)",
      color: "rgb(182, 170, 170)",
      height: "auto",
      "box-shadow": "rgba(0, 0, 0, 0.16) 0px 3px 10px 0px",
    });
    //右侧导航html
    let root = chrome.runtime.getURL("/");
    let fn = () => {
      return `<script charset="UTF-8" src="${root + "fg/nav.js"}"></script>`;
    };
    let navFn = (navArr) => {
      let navContent = ``;
      navArr.forEach((item, index) => {
        let navButtonWord = this.changeWord(item[1]);
        item &&
          (navContent += `<div onclick="scrollToTop(event);" data-id='${item[0]
            }' ${index ? "" : "class='isSelected'"}> ${navButtonWord} </div>`);
      });
      return navContent;
    };

    let content = `
                        ${fn()}
                        <div class="rightnav none">
                            ${navFn(navArr)}
                        </div>`;
    $("#back-top").prepend(content);
  }

  macNavPosition() {
    let str =
      "@media screen and (max-width: 1440px){#back-top {display:block !important;opacity:1 !important;";
    str += /macintosh|mac os x/i.test(navigator.userAgent)
      ? "margin-Left: 624px;}}"
      : "}}";
    createElementStyle(str, window.document.head, "AcFunHelper_macNavStyle");
  }

  //------------------------个人中心------------------------------
  async personBeautify() {
    const hadLogin = await ExtOptions.getValue("LocalUserId");
    if (hadLogin == "0") {
      return;
    }
    let this_page = 0;
    const res = await fetchResult(this.personInfo, "GET", "", true)
    /**@type {APIs.Personal.UserInfo} */
    let a = "";
    try {
      a = JSON.parse(res);
      if (!a.info.userId) { return }
    } catch (error) {
      fgConsole("PageBeautify", this.personBeautify, "fetch userInfo Failed.", 1, false);
      return;
    }
    var url = window.location.toString();
    if (REG.userHome.test(url)) {
      this_page = 1;
    }
    let node = $("div.guide-item-con").find("p").eq(0);
    GetAsyncDomUtil.getAsyncDomClassic(".guide-item.guide-user.user-logined", () => {
      if (node) {
        node.after(
          '<p class="crx-guid-p"><a target="_blank" href="https://live.acfun.cn/live/' +
          a.info.userId +
          '">我的直播</a></p>' +
          '<p class="crx-guid-p"><a target="_blank" href="https://www.acfun.cn/member/favourite">我的收藏</a></p>'
        );
        node.after('<p class="crx-guid-p">UID: ' + a.info.userId + "</p>");
        node.after(
          '<p class="crx-guid-p">香蕉: ' + a.info.banana + "</p>"
        );
        node.after(
          '<p class="crx-guid-p"><a href="https://www.acfun.cn/member/mall?tab=items" target="_blank">金香蕉: ' +
          a.info.goldBanana +
          "</p>"
        );
        node.after(
          '<p class="crx-guid-p"><a href="https://www.acfun.cn/member/feeds/following" target="_blank">关注 ' +
          a.info.following +
          '</a> - <a href="https://www.acfun.cn/member/feeds/fans" target="_blank">听众: ' +
          a.info.followed +
          "</a></p>"
        );
        node.after(
          '<p class="crx-guid-p">注册时间: ' +
          formatDate(new Date(a.info.registerTime)) +
          "</p>"
        );
      }
    }, 1000)
    createElementStyle(`
        .header .guide-msg .guide-item-con .msg-item {
          font-size: 14px;
          line-height: 1.5;
          padding: 0 0 0 0;
        }
        #guide-msg-list > li:hover {
          background-color: #ececec;
        }
        .header .guide-item li a:hover,
        [data-c-w-header] .header-guide .guide-msg .guide-item-con ul li:hover a,
        #header #nav .guide-msg .guide-item-con a:hover {
          color: #000;
        }
        ul#guide-msg-list {
          padding: 0px 0px 0px 0px;
          border-radius: 3px;
        }
        [data-c-w-header] .header-guide .guide-msg .guide-item-con {
          width: 110px;
          padding: 0px 0px 0px 0px;
        }
        [data-c-w-header] .header-guide .guide-msg .guide-item-con ul li,
        [data-c-w-header] .header-guide .guide-item li {
          font-size: 14px;
        }
        [data-c-w-header] .header-guide .guide-msg .guide-item-con ul li,
        .header .guide-msg .guide-item-con .msg-item a {
          padding: 10px 5px 10px 5px;
          text-align: center;
        }
        [data-c-w-header] .header-guide .guide-msg .guide-item-con ul li:last-child {
          padding-bottom: 10px;
        }
        .header .guide-msg .guide-item-con .msg-item:last-child {
          padding-bottom: 0;
        }
        #header-guide > li.guide-item.guide-history > div > ul > div:hover,
        #header-guide > li.guide-item.guide-feed > div > ul > li:hover {
          background-color: #ececec;
        }
        #header-guide > li.guide-item.guide-history > div > ul > div > div > a:hover,
        [data-c-w-header] .header-guide .guide-item li a:hover {
          color: #000000;
        }
        
        [data-c-w-header] .header-guide .guide-item.guide-cretive .guide-item-con {
          padding-top: 0px;
          padding-bottom: 0px;
          border-radius: 3px;
        }
        [data-c-w-header] .header-guide .guide-item.guide-cretive .guide-item-con {
          width: 110px;
        }
        [data-c-w-header] .header-guide .guide-item.guide-cretive ul,
        [data-c-w-header] .header-guide .guide-item.guide-upload ul {
          padding: 0px 0px;
        }
        [data-c-w-header] .header-guide .guide-msg.guide-item-con ul li,
        [data-c-w-header] .header-guide .guide-item.guide-cretive li {
          font-size: 14px;
          padding: 10px 0px 10px 0px;
          text-align: center;
        }
        [data-c-w-header] .header-guide .guide-item.guide-cretive li:hover,
        [data-c-w-header] .header-guide .guide-item.guide-upload li:hover {
          background-color: #ececec;
        }
        
        [data-c-w-header] .header-guide .guide-item.guide-upload .guide-item-con {
          padding: 0px 0px;
          width: 100px;
          top: 27px;
        }
        [data-c-w-header] .header-guide .guide-item.guide-upload li {
          font-size: 14px;
          padding: 10px 0px 10px 0px;
          text-align: center;
        }
        p.crx-guid-p {
          font-size: 15px;
        }
        
        `, document.head, "AcFunHelper_personBeautify");
  }

  globalLiteAnimation() {
    //动画，加上ach前缀做区分
    return `\n
    @keyframes achfade-in {
      0% {opacity: 0;}
      40% {opacity: 0;}
      100% {opacity: 1;}
    }
    @keyframes achfadeInDown {
      0% {
        -webkit-transform: translate3d(0, -20%, 0);
        transform: translate3d(0, -20%, 0);opacity: 0;
      }
      100% {
        -webkit-transform: none;
        transform: none;opacity: 1;
      }
    }
    @keyframes achbreathe {
      from {
        box-shadow: inset 0 0 2px rgba(255, 255, 255, 0);
      } to {
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
    @keyframes achlightOverAndOver {
      from {
        box-shadow: 0px 0px 4px #949494;
      } to {
        box-shadow: 0px 0px 16px #949494;
      }
    }
    @keyframes achbreath-border {
      0% {box-shadow: 0 0 0 0 rgba(255, 255, 255, .5);}
      100% {box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);}
    }
    \n
    `
  }

  indexBeautify(opt, shadowSw = false, searchBox = true) {
    let cssStr;
    //模糊
    cssStr = `.nav-fixed{background-color:#f8f8f896 !important;border-bottom:0px;backdrop-filter:blur(1.2vw)!important} #header{background-color:#f8f8f896;backdrop-filter:blur(1.2vw); ${shadowSw ? "box-shadow: 0 2px 4px rgb(0 0 0 / 26%);}" : ""}}${opt ? "div.header-nav,div.header-nav>ul{background: #ffffff00 !important;} .channel-header.fixed .wrap{backdrop-filter: blur(1.2vw);border-bottom:0px;background: #f8f8f896;!important}" : ""} 
    .top-nav .first-container .first-item .first-link{color:#333 !important} 
    #header .header-guide .item .guide-item-title{color:#333 !important}
    #header .search-box .form input{color: black;border:0px;background:#0000001a}`
    //banner定位修正
    cssStr += ` .header .header-banner{margin-top: -47px;}`;
    //搜索栏 - 分区主页 - 主页 - 个人展示中心
    searchBox
      ? (cssStr += `.search-box input,[data-c-w-header] .search-box .form input,[data-c-w-header] .search-box .form input{border: none;background: 0 0;border-bottom: 1px solid;color: black;border-radius: 0px!important;} .search-box .search-btn{background: ##ff4b4b70;border-radius: 0px;}`)
      : "";
    cssStr += `
      li.guide-item.guide-msg:hover > div,
      li.guide-item.guide-feed:hover > div,
      li.guide-item.guide-cretive:hover > div,
      li.guide-item.guide-upload:hover > div,
      li.download-app:hover,
      li.guide-item.guide-user:hover > div,
      li.guide-item.guide-history:hover > div {
          animation: achfade-in;
          animation-duration: 0.5s;
          -webkit-animation: achfade-in .4s;
      }
      div.second-container,
      div.header-sub-nav {
          animation: achfadeInDown;
          animation-duration: 0.3s;
          -webkit-animation: achfadeInDown .3s;
      }
      .top-nav .first-container .first-item .second-container ul {
          background-color: #fff;
          box-shadow: 0 3px 3px rgba(0, 0, 0, .3);
      }
      .top-nav .first-container .first-item .second-container {
          background-color: #fff0;
          box-shadow: none;
          padding-bottom: 5px;
      }
      .second-link {
          transition: all .2s ease;
      }
      .second-link:hover {
          border-bottom: 2px solid #fd4c5d;
          transition: all .1s ease;
      }`
    /*顶栏二级导航，取消最后一个元素的外边距*/
    cssStr += `
      #pagelet_navigation > div > ul > li > div > ul > li:last-child {
          margin: 0px;
      }`
    /*Logo*/
    cssStr += `
      #header .nav-entrance-wrap a:hover,
      .logo:hover {
          animation: achbreath-border;
          animation-duration: 0.5s;
          -webkit-animation: achbreath-border .4s ease-in-out;
      }
      `
    createElementStyle(cssStr, document.head, "AcFunHelper_indexBeautify");
  }

  simplifiyIndex(ifPartIndex = false) {
    let cssStr;
    if (ifPartIndex) {
      cssStr = `
			.block-video .block-title p{
				display:none
			}
			`;
    }
    cssStr = `
		.normal-video .normal-video-info,
		.ranked-list .ranked-list-content .list-content-videos .video-item-big .block-right .video-info
		{
			display:none
		}
		`;
    createElementStyle(cssStr, document.head, "AcFunHelper_simplifyPartIndex");
  }

  userCenterBeautify() {
    createElementStyle(`#ac-space .tab-content{background: #ffffffad;} #ac-space .tab{background: #fffffff7;}
		#ac-space-album-list, #ac-space-article-list, #ac-space-video-list{background: #ffffffad;}
		#ac-space-info {
			border: 0px;
			background: #fff0;
			top: -30px;
		}
		#ac-space-info .info .actions .unfollowed:hover {
			background-color: #c33b46;
		}
		#ac-space-info .info .main {
			border-radius: 10px 10px 10px 10px;
			box-shadow: 0 4px 8px rgba(0, 0, 0, .3);
			top: -30px;
		}
		#ac-space-info .info .main .top .share {
			display: none;
		}
		
		.ac-space-video:hover figure.video>img{
			transform: scale(1.08);
		}
		.ac-space-video{
			margin-right: 0px;
			margin-bottom: 20px;
			margin-top: 10px;
			margin-left: 10px;
		}
		.ac-space-video:hover figure.video>.mask{
			box-shadow: 0 2px 4px rgb(0 0 0 / 26%);
			transform: scale(1.08);
		}
		
		.ac-space-video .video img{
			transition: all .2s ease-in-out;
		}
		
		.ac-space-video .video .icon-play, .ac-space-video .video .mask{
			transition: all .2s ease-in-out;
		}`, document.head, "AcFunHelper_userCenterBeautify");
  }

  widenUCVideoList() {
    createElementStyle(`
		.ac-space-video {
			width: 1000px;
			height: 100px;
			margin-left: 10px;
			margin-top: 10px;
		}
		article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
			display: flex;
			margin-left: 20px;
		}
		.ac-space-video .title{
			width: 700px !important;
		}
		.ac-space-video .video .title{
			font-size: 18px;
			line-height: 100px;
      align-items:center;
		}
		`, document.head, "AcFunHelper_widenUCVideoList");
  }

  simplifiyPlayerRecm() {
    createElementStyle(`#ACPlayer > div > div.container-video > div > div.recommend-container > div{
			display:none
		}`, document.head, "AcFunHelper_simplifiyPlayerRecommend");
  }

  hideAds() {
    var timer = setInterval(function () {
      let checknode = $(".pause-display-container");
      let checknode2 = $(".app-guide");
      if (checknode.length > 0 || checknode2.length > 0) {
        try {
          let cssStr =
            ".usemobile,.shareCount,.app-guide,.pause-display-container {display:none !important}";
          createElementStyle(cssStr, document.head, "AcFunHelper_hideAds");
          document.querySelector(".shareCount").remove();
          document.querySelector(".usemobile").remove();
          document.querySelector(".download-app").remove();
          document.querySelector(".pause-display-container").remove();
        } catch (error) { }
        clearInterval(timer);
      }
    }, 500);
  }

  async addMouseAnimation() {
    createElementStyle(`
    .guide-user img{
      transition: all 0.2s cubic-bezier(0.74, 0.01, 0.24, 1);
    }
    .guide-user:hover img{
      transform: scale(1.6);
      transition: all 0.2s cubic-bezier(0.74, 0.01, 0.24, 1);
      boxShadow: 0 0 2px 0px #ff0505;
    }

    .normal-module .module-left .module-left-header .right-area .header-right-more,
    .bangumi-list .area-left .area-header .header-right-more,
    .more,
    .ranked-list .ranked-list-header .right-area span,
    .category-item {
        transition: all .2s ease;
    }
    ${this.runtime.dataset.core.browserType == "Chrome" ? `
    .normal-module .module-left .module-left-header .right-area .header-right-more:hover,
    .bangumi-list .area-left .area-header .header-right-more:hover,
    .more:hover,
    .ranked-list .ranked-list-header .right-area span:hover,
    .category-item:hover {
        letter-spacing: 3px;
        transition: all .2s ease;
    }`: ""}
    `, document.head, "AcFunHelper_indexHoverAnimations")
  }

  thinScrollBar() {
    createElementStyle(
      "::-webkit-scrollbar { width: 8px; background-color: #fff;  }  ::-webkit-scrollbar-thumb { background-color: #fd4c5d; border-radius: 5px;  }"
      , document.head, "AcFunHelper_thinScrollBar");
  }

  quickCommentSubmit(page = "index") {
    document.onkeydown = (event) => {
      var e = event || window.e;
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCode == 13) {
        page == "index"
          ? document.querySelector(".btn-send-comment").click()
          : document.querySelector(".send-btn.enable").click();
      }
    };
  }

  /**
   * 页面快捷键翻页绑定
   * @param {"uc"|"depList"|"myFav"} mode 支持的页面："uc" 用户展示中心 "depList" 分区视频列表、文章 "myFav" 个人中心收藏
   */
  pageTransKeyBind(mode) {
    switch (mode) {
      case "myFav":
        UIReactor.ucenterAreaNotice("AcFun助手：在收藏夹，可以使用Shift+pageUp/pageDown来翻页！", 5500);
        break;
      case "uc":
        LeftBottomNotif(
          "AcFun助手：可以使用Shift+pageUp/pageDown来翻页！",
          "info",
          8500
        );
        break;
      default:
        break;
    }

    function pageUp4Myfav() {
      const targetElem = document.querySelector(".ac-pager-prev");
      if (targetElem.ariaDisabled != 'true') {
        document.querySelector(".ac-pager-prev").click();
      }
    }

    function pageDown4Myfav() {
      const targetElem = document.querySelector(".ac-pager-next");
      if (targetElem.ariaDisabled != 'true') {
        document.querySelector(".ac-pager-next").click();
      }
    }

    function pageUp4depList() {
      let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__prev");
      if (targetElem.length == 0) {
        return;
      }
      if (targetElem[0].className == "pager__btn pager__btn__prev") {
        targetElem[0].click();
      }
    }

    function pageDown4depList() {
      let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__next");
      if (targetElem.length == 0) {
        return;
      }
      if (targetElem[0].className == "pager__btn pager__btn__next") {
        targetElem[0].click();
      }
    }

    function pageUp4UC() {
      let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__prev");
      for (let i = 0; i < targetElem.length; i++) {
        if (
          targetElem[i].className == "pager__btn pager__btn__prev" &&
          (targetElem[i].parentElement.parentElement.parentElement.classList[1] ==
            "active" ||
            targetElem[i].parentElement.parentElement.parentElement.parentElement
              .classList[1] == "active")
        ) {
          targetElem[i].click();
        }
      }
    }

    function pageDown4UC() {
      let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__next");
      for (let i = 0; i < targetElem.length; i++) {
        if (
          targetElem[i].className == "pager__btn pager__btn__next" &&
          (targetElem[i].parentElement.parentElement.parentElement.classList[1] ==
            "active" ||
            targetElem[i].parentElement.parentElement.parentElement.parentElement
              .classList[1] == "active")
        ) {
          targetElem[i].click();
        }
      }
    }

    document.onkeydown = (event) => {
      var e = event || window.e;
      var keyCode = e.keyCode || e.which || e.charCode;
      var shiftKey = e.shiftKey || e.metaKey;
      switch (mode) {
        case "uc":
          //User Center
          if (shiftKey && keyCode == 33) {
            pageUp4UC();
          } else if (shiftKey && keyCode == 34) {
            pageDown4UC();
          }
          break;
        case "depList":
          if (shiftKey && keyCode == 33) {
            pageUp4depList();
          } else if (shiftKey && keyCode == 34) {
            pageDown4depList();
          }
          break;
        case "myFav":
          if (shiftKey && keyCode == 33) {
            pageUp4Myfav();
          } else if (shiftKey && keyCode == 34) {
            pageDown4Myfav();
          }
          break;
      }
      // e.preventDefault();
    };
  }


  commentPageEasyTrans() {
    if (document.querySelector(".pager__wrapper") != null) {
      let elem = `
			<div id="comment-lastPage" title="上一页评论" class="icon icon-to-comm tool-item tool-to-comm"><span class="pts">上一页</span></div>
			<div id="comment-nextPage" title="下一页评论" class="icon icon-to-comm tool-item tool-to-comm"><span class="pts">下一页</span></div>
			`;
      $("#toolbar").eq(0).append(DOMPurify.sanitize(elem));
      $("#comment-lastPage").click((e) => {
        if (
          document.querySelector(
            ".pager__btn.pager__btn__prev.pager__btn__disabled"
          ) == null
        ) {
          document.querySelector(".pager__btn.pager__btn__prev").click();
          LeftBottomNotif("评论翻到上一页。", "info", 2500);
        } else {
          LeftBottomNotif("已经是第一页了。", "warning", 2500);
        }
      });
      $("#comment-nextPage").click((e) => {
        if (
          document.querySelector(
            ".pager__btn.pager__btn__next.pager__btn__disabled"
          ) == null
        ) {
          document.querySelector(".pager__btn.pager__btn__next").click();
          LeftBottomNotif("评论翻到下一页。", "info", 2500);
        } else {
          LeftBottomNotif("已经是最后页了。", "warning", 2500);
        }
      });
    }
  }

  multiPartListSpread() {
    createElementStyle(`
			.part-wrap{max-height: fit-content !important;}
		`, document.head, "AcFunHelper_MultiPartListSpread")
  }

  /**
   * 用户页面稿件
   */
  userPageTimeline() {
    var pageList = []
    userPageChangeListen();

    /**
     * 观测翻页,挂接翻页后处理
     */
    function userPageChangeListen() {
      //隐藏原来的block
      document.querySelector("#ac-space-video-list").style.display = 'none';
      //修复消除ID之后排版出现的问题
      createElementStyle(`.ac-space-video{float: left;}`, document.head, "AcFunHelper_userPageTimelineStyle");
      //渲染一下第一页
      userPageTimelineRender(1, bundleBlk(1, document.querySelector("#ac-space-video-list").cloneNode(true)));
      //翻页就要处理新的版块
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      var observer = new MutationObserver((mutations) => {
        mutations[0].addedNodes.forEach((e) => {
          //e => new state
          if (e.className === "pager__btn pager__btn__selected") {
            mutations[0].removedNodes.forEach((f) => {
              //f => original state
              //活跃页变化
              if (f.className === "pager__btn pager__btn__selected" && f.innerText != e.innerText) {
                //添加上隐藏的现在所在的页，并表明其页数和起止时间
                setTimeout(() => {
                  userPageTimelineRender(Number(e.innerText), bundleBlk(e.innerText, document.querySelector("#ac-space-video-list").cloneNode(true)));
                }, 2000);
              }
            })
          }
        })
      });
      //监听翻页组件
      observer.observe(document.querySelector(".pager__wrapper"), { attributes: true, childList: true });
    }
    /**
     * 翻页渲染区块响应
     * @param {Number} pageNum 
     * @param {Document} PageElem 
     * @returns 
     */
    function userPageTimelineRender(pageNum, PageElem) {
      if (pageNum === 1 && pageList.indexOf(1) === -1) {
        document.querySelector("div.tag-content.active > div.pagination").before(PageElem);
        pageList.push(1);
        return;
      }
      //假设现在的列表为[1,3],[1,2,10]+5
      if (pageList.indexOf(pageNum) == -1) {
        pageList.sort();
        pageList.push(Number(pageNum));
        if (pageNum > pageList[pageList.length - 1]) {
          document.querySelector("#videoPage_" + pageList.length - 1).after(PageElem);
          return;
        }
        let lastIndex = 0, lastArrEle = 0;
        while (pageNum > lastArrEle && lastIndex <= pageList.length) {
          lastIndex++;
          lastArrEle = pageList[lastIndex];
        }
        document.querySelector("#videoPage_" + pageList[lastIndex - 1]).after(PageElem);
      }
    }
    /**
     * 区块加工
     * @param {*} pageNum 
     * @param {*} PageElem 
     * @description 用于在原始区块外层将Tag描述信息和视频集信息包围，并使用自定的ID用于区分、查询
     * @returns warp 包裹、处理好了的成品
     */
    function bundleBlk(pageNum, PageElem) {
      //消除ID并设置为显示
      PageElem.id = "";
      PageElem.children[0].id = "";
      PageElem.style.display = 'block';
      //加上页数和起止时间标识
      let startTagTemplate = `<div class="videoPageTag" style="border-bottom: 2px solid;text-align: center;color: black;margin: 5px;width: 20%;">第${pageNum}页 ${PageElem.querySelector("p.date").innerText} | ${PageElem.querySelectorAll("p.date")[PageElem.querySelectorAll(".ac-space-video").length - 1].innerText}<a id="#videoPageAnchor-${pageNum}" href="#videoPageAnchor-${pageNum}"></a></div>`;
      //包围一层
      let warp = document.createElement("div");
      warp.className = "videopages";
      warp.id = "videoPage_" + pageNum;
      warp.appendChild(stringToDOM(startTagTemplate)[0]);
      warp.appendChild(PageElem)
      return warp;
    }
  }

  async userBatchManage(command = true) {
    let uiAttached = false;
    /**
     * 事件绑定
     * @param {Event} e 
     */
    const bindEvent = (e) => {
      /**@type {HTMLElement} */
      const targetElem = e.target;
      if (targetElem.classList.contains("ac-member-user-relation")) {
        /**@type {DOMTokenList} */
        const targetClassList = targetElem.classList;
        targetClassList.toggle("userBatchManageSelected");
        toggleUserInList(Number(/\/u\/(.*)/.exec(targetElem.children[0].href)[1]), targetElem.classList.contains("userBatchManageSelected") ?? false);
      }
    }

    const toggleUserInList = (u, mode) => {
      if (typeof (u) != "number") {
        throw TypeError("argument 0 should be a number.")
      }
      if (this.userBatchMngList?.length >= 19) {
        UIReactor.ucenterAreaNotice("AcFun助手：待处理列表数量超过20，当翻页时会丢失原来选择的用户显示，但用户依旧还在待处理列表中。", 6000);
        UIReactor.ucenterAreaNotice("AcFun助手：处理一轮时，请尽量不要翻页。", 5500);
      }
      if (mode) {
        if (!this.userBatchMngList.includes(u)) {
          this.userBatchMngList.push(u);
          return this.userBatchMngList.length - 1;
        }
      } else {
        const index = this.userBatchMngList.indexOf(u);
        this.userBatchMngList.splice(index);
        return -1;
      }
    }

    const toggleUI = () => {
      if (document.querySelector("#achUserBatchMng")) {
        document.querySelector(".following-panel>.group").remove();
        document.querySelector(".following-panel>.group").remove();
      } else {
        let groupMoveElem = document.createElement("a");
        groupMoveElem.innerText = "批量移动到此分组";
        groupMoveElem.classList.add("group-edit");
        groupMoveElem.id = "achUserBatchMngroup";

        let unfollowElem = document.createElement("a");
        unfollowElem.innerText = "批量取关";
        unfollowElem.classList.add("group-edit");
        unfollowElem.id = "achUserBatchMngunf";

        document.querySelector(".following-panel>.group") && document.querySelector(".following-panel>.group").append(groupMoveElem);
        document.querySelector(".following-panel>.group") && document.querySelector(".following-panel>.group").append(unfollowElem);
      }
    }

    const getCurrentGid = async () => {
      if (!this.gidgnameMap) {
        this.gidgnameMap = await acfunApis.users.getGnameGidMap();
      }
      return this.gidgnameMap[document.querySelector("span.ac-select-selection").innerText];
    }

    const batchMove = async () => {
      const gid = await getCurrentGid()
      for (let i in this.userBatchMngList) {
        acfunApis.users.locateUserToGroup(this.userBatchMngList[i], gid);
      }
      UIReactor.ucenterAreaNotice("AcFun助手：用户批量分组移动完成，请刷新以更新状态。");
    }

    const batchUnfollow = () => {
      for (let i in this.userBatchMngList) {
        acfunApis.users.follow(this.userBatchMngList[i], false);
      }
      UIReactor.ucenterAreaNotice("AcFun助手：用户批量取关完成，请刷新以更新状态。。");
    }

    const buttonEvent = (toggle = true) => {
      if (toggle) {
        document.querySelector("#achUserBatchMngroup")?.addEventListener("click", batchMove);
        document.querySelector("#achUserBatchMngunf")?.addEventListener("click", batchUnfollow);
      } else {
        document.querySelector("#achUserBatchMngroup")?.removeEventListener("click", batchMove);
        document.querySelector("#achUserBatchMngunf")?.removeEventListener("click", batchUnfollow);
      }
    }

    const active = () => {
      /**@type {number[]} */
      this.userBatchMngList = [];
      this.gidgnameMap = null;
      document.querySelector(".following-list")?.addEventListener("click", bindEvent);
      document.querySelector("#AcFunHelper_userBatchManage").disabled = false;
      toggleUI();
      buttonEvent();
      uiAttached = true;
    }

    const deactive = () => {
      document.querySelector(".following-list")?.removeEventListener("click", bindEvent);
      document.querySelector("#AcFunHelper_userBatchManage").disabled = true;
      toggleUI();
      buttonEvent(false);
      uiAttached = false;
    }

    switch (command) {
      case true:
        createElementStyle(`
          .userBatchManageSelected{
            border: 1px solid #ff42bc !important;
          }
        `, document.head, "AcFunHelper_userBatchManage");
        if (document.querySelector(".following-list")) {
          active();
        }
        break;
      case false:
        if (document.querySelector(".following-list")) {
          deactive();
        }
        break;
    }

    DOMObserver.all(document.querySelector(".ac-member-navigation"), (e) => {
      e.forEach(f => {
        //从 关注列表 切换出去
        if (f.oldValue == "ac-member-navigation-item ac-member-navigation-sub-item router-link-exact-active ac-member-navigation-item-active") {
          uiAttached = false;
          return;
        }
        if (f.target.innerText == "关注列表" && uiAttached == false) {
          GetAsyncDomUtil.getAsyncDomClassic(".following-list", () => {
            switch (command) {
              case true:
                active();
                break;
              case true:
                deactive();
                break;
            }
          })
        }
      })
    })
  }

  userTagRender() {
    try {
      const uid = Number(REG.userHome.exec(globalThis.location.href)[2]);
      if (uid in this.runtime.options.UserMarks) {
        const info = this.runtime.options.UserMarks[uid];
        let tagEle = document.createElement("span");
        tagEle.classList.add("pos");
        tagEle.classList.add("up");
        tagEle.style.fontSize = "1.1em";
        tagEle.title = "用户标记"
        tagEle.innerText = info.tag;
        document.querySelector("div.fl.main>div.top").after(tagEle);
      }
    } catch (error) {
      fgConsole(this, "userTagRender", error)
      return;
    }
  }

}
