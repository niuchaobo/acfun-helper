/**
 * 页面美化
 */
class PageBeautify {
  constructor() {
    this.personInfo = "https://www.acfun.cn/rest/pc-direct/user/personalInfo";
    this.devMode = false;
    //往里边添加 栏目原来名称 与 导航上显示的名称
    this.navWord = {
      猴子推荐: "推荐",
      正在直播: "直播",
      "「年」在一起": "春节",
      "舞蹈·偶像": "舞蹈",
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
          if(!homeDiv.eq(i).children().length){
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
    style_link.href = chrome.extension.getURL("fg/css/home_nav.css");
    style_link.type = "text/css";
    style_link.real = "stylesheet";
    (document.head || document.documentElement).appendChild(style_link);
    let navArr = [];
    Array.prototype.slice
      .call(document.getElementsByClassName("home-main-content")[0].children)
      .forEach((item, index) => {
        if(!item.children.length){
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
          (navContent += `<div onclick="scrollToTop(event);" data-id='${
            item[0]
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
    createElementStyle(str, window.document.head);
  }

  //------------------------个人中心------------------------------
  async personBeautify() {
    chrome.storage.local.get(["LocalUserId"], function (Uid) {
      if (Uid.LocalUserId == "0") {
        return;
      }
    });
    let this_page = 0;
    fetch(this.personInfo)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        let a = JSON.parse(res);
        var url = window.location.toString();
        if (REG.userHome.test(url)) {
          this_page = 1;
        } else {
        }
        let node = $("#header-guide .guide-item-con").find("p").eq(0);
        if (node) {
          node.after(
            '<p class="crx-guid-p"><a target="_blank" href="https://live.acfun.cn/live/' +
              a.info.userId +
              '">我的直播间</a></p>'
          );
          node.after('<p class="crx-guid-p">UID: ' + a.info.userId + "</p>");
          node.after(
            '<p class="crx-guid-p"><a href="https://www.acfun.cn/member/#area=banana" target="_blank">香蕉: ' +
              a.info.banana +
              "</a></p>"
          );
          node.after(
            '<p class="crx-guid-p"><a href="https://www.acfun.cn/member/#area=golden-banana" target="_blank">金香蕉: ' +
              a.info.goldBanana +
              "</p>"
          );
          node.after(
            '<p class="crx-guid-p"><a href="https://www.acfun.cn/member/#area=following" target="_blank">关注 ' +
              a.info.following +
              '</a> - <a href="https://www.acfun.cn/member/#area=followers" target="_blank">听众: ' +
              a.info.followed +
              "</a></p>"
          );
          node.after(
            '<p class="crx-guid-p">注册时间: ' +
              formatDate(new Date(a.info.registerTime)) +
              "</p>"
          );
        }
        let cssStr = `
				[data-c-w-header] .header-guide .guide-msg .guide-item-con{
					${this_page ? "width: 114px;" : ""}
					padding:0px 0px 0px 0px;
				}
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li{
					${this_page ? "text-align: center;" : ""}
					font-size:14px;
				}
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li:hover{
					background-color:#ececec;
				}
				ul#guide-msg-list{
					padding:0px 0px 0px 0px;
				}
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li,
				.header .guide-msg .guide-item-con .msg-item a{
					padding:10px 5px 10px 5px;
				}
				[data-c-w-header] .header-guide .guide-item.guide-history .guide-item-con li{
					font-size: 14px;
					line-height: 22px;
					margin: 12px 0px 12px 0px;
					height: 18px;
				}
				[data-c-w-header] .header-guide .guide-item.guide-history .guide-item-con li a .item-title{
					height: 20px;
					line-height: 16px;
				}
				[data-c-w-header] .header-guide .guide-item.guide-history .guide-item-con li a i.device{
					height: 20px;
					line-height: 16px;
				}
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li a .badget{
					top: 18px;
				}
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li.followed-users .followed-live-title{
					line-height: 14px;
					height: 14px;
				}

				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li.dynamics{
					padding-top: 10px;
				}
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li:last-child{
					padding-bottom: 10px;
				}

				.header .guide-msg .guide-item-con .msg-item{
					font-size: 14px;
					line-height: 1.5;
					padding: 0 0 0 0;
				}
				#guide-msg-list > li:hover{
					background-color:#ececec;
				}
				.header .guide-item li a:hover,
				[data-c-w-header] .header-guide .guide-msg .guide-item-con ul li:hover a,
				#header #nav .guide-msg .guide-item-con a:hover
				{
					color: #000;
				}
				.header .guide-msg .guide-item-con .msg-item:last-child{
					padding-bottom: 0;
				}
				`;
        createElementStyle(cssStr);
      });
  }

  indexBeautify(opt, shadowSw = false, searchBox = true) {
    let cssStr;
    //模糊
    opt
      ? (cssStr =
          ".header-top{backdrop-filter: blur(2.25926vw);background-color: #f8f8f896 !important;} .header .nav{border-bottom: 1px solid #ffffff00 !important} .header.fixed .nav{backdrop-filter: blur(2.25926vw);background-color: #f8f8f896;}")
      : (cssStr = `.nav-fixed{background-color:#f8f8f896;border-bottom:0px;backdrop-filter:blur(1.2vw)} #header{background-color:#f8f8f896;backdrop-filter:blur(1.2vw);${
          shadowSw ? "box-shadow: 0 2px 4px rgb(0 0 0 / 26%)" : ""
        };}`);
    //banner定位修正
    cssStr += `.header .header-banner{margin-top: -47px;}`;
    //搜索栏 - 分区主页 - 主页 - 个人展示中心
    searchBox
      ? (cssStr += `.search-box input,[data-c-w-header] .search-box .form input,[data-c-w-header] .search-box .form input{border: none;background: 0 0;border-bottom: 1px solid;color: black;border-radius: 0px!important;} .search-box .search-btn{background: ##ff4b4b70;border-radius: 0px;}`)
      : "";
    createElementStyle(cssStr);
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
    createElementStyle(cssStr, document.head, "simplifiyPartIndex");
  }

  userCenterBeautify() {
    let cssStr;
    cssStr = `#ac-space .tab-content{background: #ffffffad;} #ac-space .tab{background: #fffffff7;}
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
		}`;
    createElementStyle(cssStr, document.head, "simplifiyPartIndex");
  }

  widenUCVideoList() {
    let cssStr = `
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
		}
		`;
    createElementStyle(cssStr, document.head, "widenUCVideoList");
  }

  simplifiyPlayerRecm() {
    let cssStr;
    cssStr = `#ACPlayer > div > div.container-video > div > div.recommend-container > div{
			display:none
		}`;
    createElementStyle(cssStr, document.head, "simplifiyPlayerRecommend");
  }

  hideAds() {
    var timer = setInterval(function () {
      let checknode = $(".pause-display-container");
      let checknode2 = $(".app-guide");
      if (checknode.length > 0 || checknode2.length > 0) {
        try {
          let cssStr =
            ".usemobile,.shareCount,.app-guide,.pause-display-container {display:none !important}";
          createElementStyle(cssStr);
          document.querySelector(".shareCount").remove();
          document.querySelector(".usemobile").remove();
        } catch (error) {}
        try {
          document.querySelector(".download-app").remove();
        } catch (error) {}
        try {
          document.querySelector(".pause-display-container").remove();
        } catch (error) {}
        clearInterval(timer);
      }
    }, 500);
  }

  async addMouseAnimation() {
    let obj = document.querySelector(
      "[data-c-w-header] .header-guide .guide-item"
    );
    let imgObj = document.querySelector(
      "[data-c-w-header] .header-guide .guide-user .user-avatar img"
    );
    const before_style = document.createElement("style");
    before_style.style = "text/css";
    before_style.innerHTML =
      "[data-c-w-header] .header-guide .guide-user .user-avatar img:before{animaition: avatar-wave cubic-bezier(0.22, 0.58, 0.12, 0.98) 0.6s forwards}";
    document.getElementsByTagName("head")[0].appendChild(before_style);
    try {
      obj.addEventListener("mouseenter", function () {
        imgObj.style.transform = "scale(1.6)";
        imgObj.style.transition = "all 0.2s cubic-bezier(0.74, 0.01, 0.24, 1)";
        imgObj.style.boxShadow = "0 0 2px 0px #ff0505;";
      });
      obj.addEventListener("mouseleave", function () {
        imgObj.style.transform = "scale(1)";
        imgObj.style.transition = "all 0.2s cubic-bezier(0.74, 0.01, 0.24, 1)";
      });
    } catch (error) {}
  }

  thinScrollBar() {
    createElementStyle(
      "::-webkit-scrollbar { width: 8px; background-color: #fff;  }  ::-webkit-scrollbar-thumb { background-color: #fd4c5d; border-radius: 5px;  }"
    );
  }

  darkenArticlePartIndex() {
    document
      .getElementsByClassName("main")[0]
      .style.setProperty("background", "#303030", "important");
    document.getElementsByTagName("html")[0].style.cssText =
      "background:#303030";
    createElementStyle(
      ".delveField .ArticleDelveFieldContent li .article-delve-text a,.dynamicsUpdateTitle .dynamicsUpdateSub,.dynamicsUpdateTitle .dynamicsUpdateChange span,#container > div.ArticleBlockLeft.ArticleDynamicsContent.extend-pab > div.ArticleLeftTitle > div:nth-child(2) > a,#container > div.ArticleBlockLeft.ArticleDynamicsContent.extend-pab > div.ArticleLeftTitle > div:nth-child(1) > a,#container > div.delveField.ArticleBlockRight > div > b,.atc-title,.gg-title,.HotArticleText,.bar-action,.ArticleRightTitle,.ArticleRightTitle,.ref-bar-btn,.header .nav li a,.ArticleListUser .ArticleListUserContent>a,.atc-info>a{color:white !important;}",
      document.getElementsByTagName("head")[0]
    );
    createElementStyle(
      ".header .nav .nav-parent,.header .nav{background-color:#303030;}",
      document.getElementsByTagName("head")[0]
    );
    createElementStyle(
      ".nav-sub, .footer{display:none !important;}",
      document.getElementsByTagName("head")[0]
    );
    createElementStyle(
      ".footer{display:none !important;}",
      document.getElementsByTagName("head")[0]
    );
  }

  darkenArticle() {}

  userMoment(href) {
    let x = document.createElement("li");
    x.dataset.index = "moment";
    x.textContent = "动态";
    document.getElementsByClassName("tab")[0].children[0].appendChild(x);
    let y = RegExp("http(s)?://www.acfun.cn/u/(.*)");
    let uid = y.exec(href);
    this.renderMoment(uid[2]);
  }

  async renderMoment(uid) {
    let Api = `https://mini.pocketword.cn/api/acfun/user/moment?pcursor=0&userId=${uid}&count=30`;
    let data = await fetchResult(Api);
    let x = JSON.parse(data);
    let y = `<div class="tab-content" tab-index="moment"><div id="ac-space-moment" style="text-align:center"><ul>`;
    let z = 0;
    for (let i = 0; i < x.feedList.length; i++) {
      if (x.feedList[i].resourceType == 10) {
        z++;
        y =
          y +
          `
        <li>
          <div class="moment-title" style="text-align:left;padding-left:280px;padding-right: 230px;padding-top:20px;font-size: 18px;">
              ${x.feedList[i].moment.text}
          </div>
          <div class="moment-sub">
            <a href="${x.feedList[i].shareUrl}" target="_blank" class="douga">
              <img src="${x.feedList[i].coverUrl}" style="width:calc(50%)">
            </a>
          </div>
          <div class="moment-info" style="font-size:15px;">发布于 ${getTimeSinceNow(
            x.feedList[i].createTime,
            true
          )} - ${x.feedList[i].bananaCount}根香蕉 - ${
            x.feedList[i].commentCount
          }个评论 - <a href="${
            x.feedList[i].shareUrl
          }" target="_blank">原文</a></div>
          <hr style="FILTER:alpha(opacity=100,finishopacity=0,style=3)" width="50%"color=#987cb9 SIZE=3>
        </li>
        `;
      }
    }
    y += `</ul>
      </div>
      </div>`;
    $("#ac-space>.wp").eq(0).append(y);
    document.getElementsByClassName(
      "tab"
    )[0].children[0].children[3].innerText = `动态 ${z}`;
    //可以在动态最下面增加一个按钮，点击就增加新的30条动态信息。
    // document.getElementsByClassName("tab-list")[0].children[3].classList[0] == "active"
  }

  quickCommentSubmit(page = "index") {
    document.onkeydown = (event) => {
      var e = event || window.e;
      var keyCode = e.keyCode || e.which || e.charCode;
      var shiftKey = e.shiftKey || e.metaKey;
      if (shiftKey && keyCode == 13) {
        page == "index"
          ? document.querySelector(".btn-send-comment").click()
          : document.querySelector(".send-btn.enable").click();
      }
    };
  }

  /**
   * 页面快捷键翻页绑定
   * @param {*} mode 支持的页面："uc" 用户展示中心 "depList" 分区视频列表、文章
   */
  pageTransKeyBind(mode) {
    switch (mode) {
      case "uc":
        LeftBottomNotif(
          "我们现在可以使用Shift+PageUp/PageDown来翻页啦！",
          "info",
          8500
        );
        break;
      default:
        break;
    }
    document.onkeydown = (event) => {
      var e = event || window.e;
      var keyCode = e.keyCode || e.which || e.charCode;
      var shiftKey = e.shiftKey || e.metaKey;
      switch (mode) {
        case "uc":
          //User Center
          if (shiftKey && keyCode == 33) {
            this.pageUp4UC();
          } else if (shiftKey && keyCode == 34) {
            this.pageDown4UC();
          }
          break;
        case "depList":
          if (shiftKey && keyCode == 33) {
            this.pageUp4depList();
          } else if (shiftKey && keyCode == 34) {
            this.pageDown4depList();
          }
          break;

        default:
          break;
      }
      // e.preventDefault();
    };
  }

  pageUp4depList() {
    this.devMode && console.log("up");
    let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__prev");
    if (targetElem.length == 0) {
      return;
    }
    if (targetElem[0].className == "pager__btn pager__btn__prev") {
      this.devMode && console.log(targetElem[0]);
      this.devMode && console.log("我点了，你呢");
      targetElem[0].click();
    }
  }

  pageDown4depList() {
    let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__next");
    if (targetElem.length == 0) {
      return;
    }
    if (targetElem[0].className == "pager__btn pager__btn__next") {
      this.devMode && console.log(targetElem[0]);
      this.devMode && console.log("我点了，你呢");
      targetElem[0].click();
    }
  }

  pageUp4UC() {
    this.devMode && console.log("down");
    let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__prev");
    for (let i = 0; i < targetElem.length; i++) {
      this.devMode && console.log(targetElem[i]);
      this.devMode &&
        console.log(
          targetElem[i].parentElement.parentElement.parentElement.classList
        );
      this.devMode &&
        console.log(
          targetElem[i].parentElement.parentElement.parentElement
            .classList[1] == "active" ||
            targetElem[i].parentElement.parentElement.parentElement
              .parentElement.classList[1] == "active"
        );
      if (
        targetElem[i].className == "pager__btn pager__btn__prev" &&
        (targetElem[i].parentElement.parentElement.parentElement.classList[1] ==
          "active" ||
          targetElem[i].parentElement.parentElement.parentElement.parentElement
            .classList[1] == "active")
      ) {
        this.devMode && console.log(targetElem[i]);
        this.devMode && console.log("我点了，你呢");
        targetElem[i].click();
      }
    }
  }

  pageDown4UC() {
    this.devMode && console.log("down");
    let targetElem = document.querySelectorAll("a.pager__btn.pager__btn__next");
    for (let i = 0; i < targetElem.length; i++) {
      this.devMode && console.log(targetElem[i]);
      this.devMode &&
        console.log(
          targetElem[i].parentElement.parentElement.parentElement.classList
        );
      this.devMode &&
        console.log(
          targetElem[i].parentElement.parentElement.parentElement
            .classList[1] == "active" ||
            targetElem[i].parentElement.parentElement.parentElement
              .parentElement.classList[1] == "active"
        );

      if (
        targetElem[i].className == "pager__btn pager__btn__next" &&
        (targetElem[i].parentElement.parentElement.parentElement.classList[1] ==
          "active" ||
          targetElem[i].parentElement.parentElement.parentElement.parentElement
            .classList[1] == "active")
      ) {
        this.devMode && console.log(targetElem[i]);
        this.devMode && console.log("我点了，你呢");
        targetElem[i].click();
      }
    }
  }

  commentPageEasyTrans() {
    if (document.querySelector(".pager__wrapper") != null) {
      let elem = `
			<div id="comment-lastPage" title="上一页评论" class="icon icon-to-comm tool-item tool-to-comm"><span class="pts">上一页</span></div>
			<div id="comment-nextPage" title="下一页评论" class="icon icon-to-comm tool-item tool-to-comm"><span class="pts">下一页</span></div>
			`;
      $("#toolbar").eq(0).append(elem);
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
}
