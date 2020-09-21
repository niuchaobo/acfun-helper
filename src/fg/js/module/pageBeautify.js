/**
 * 页面美化
 */
class PageBeautify {
  constructor() {
    this.personInfo = "https://www.acfun.cn/rest/pc-direct/user/personalInfo";
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
        a.push(homeDiv.eq(i).offset().top);
      }
      for (let i = 0; i < length; i++) {
        if (scrop < a[0]) {
          targetDiv.removeClass("isSelected").eq(i).addClass("isSelected");
          break;
        }
        if ((scrop >= a[i]) & (scrop <= a[i + 1])) {
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

  addRightNav() {
    //右侧导航样式
    let style_link = document.createElement("link");
    style_link.href = chrome.extension.getURL("fg/css/home_nav.css");
    style_link.type = "text/css";
    style_link.real = "stylesheet";
    (document.head || document.documentElement).appendChild(style_link);

    $("#back-top").css({
      "font-size": "12px",
      "background-color": "rgb(250, 249, 249)",
      "line-height": "30px",
      border: "1px solid rgb(235, 233, 233)",
      color: "rgb(182, 170, 170)",
      height: "auto",
    });
    //右侧导航html
    let root = chrome.runtime.getURL("/");
    let fn = () => {
      return `<script charset="UTF-8" src="${root + "fg/js/nav.js"}"></script>`;
    };
    let content = `
                        ${fn()}
                        <div class="rightnav none">
                            <div onclick="scrollToTop(event);" data-id="pagelet_monkey_recommend" class='isSelected'>
                                推荐
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_list_banana">
                                香蕉榜
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_douga">
                                动画
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_game">
                                游戏
                            </div>
                            <div onclick="scrollToTop(event);" data-id="pagelet_amusement">
                                娱乐
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

  macNavPosition() {
    let str =
      "@media screen and (max-width: 1440px){#back-top {display:block !important;opacity:1 !important;";
    str += /macintosh|mac os x/i.test(navigator.userAgent)
      ? "margin-Left: 624px;}}"
      : "}}";
    createElementStyle(str,window.document.head)
  }

  //------------------------个人中心------------------------------
  async personBeautify() {
    chrome.storage.local.get(['LocalUserId'],function(Uid){
      if(Uid.LocalUserId=="0"){return}
    });
    fetch(this.personInfo)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        let a = JSON.parse(res);
        var url = window.location.toString();
        let member = new RegExp("https://www.acfun.cn/member/.?");
        let memberRes = member.exec(url);
        if (memberRes) {
          let node = $("#win-info-guide>div").find("a").eq(0);
          if (node) {
            node.after(
              '<p class="crx-member-p"><a target="_blank" href="https://live.acfun.cn/live/' +
                a.info.userId +
                '">我的直播间</a></p>'
            );
            node.after(
              '<p class="crx-member-p">UID: ' + a.info.userId + "</p>"
            );
            node.after(
              '<p class="crx-member-p">金香蕉: ' + a.info.goldBanana + "</p>"
            );
            node.after(
              '<p class="crx-member-p">香蕉: ' + a.info.banana + "</p>"
            );
            node.after(
              '<p class="crx-member-p">听众: ' + a.info.followed + "</p>"
            );
            node.after(
              '<p class="crx-member-p">注册时间: ' +
                formatDate(new Date(a.info.registerTime)) +
                "</p>"
            );
          }
        } else {
          let node = $("#header-guide .guide-item-con").find("p").eq(0);
          if (node) {
            node.after(
              '<p class="crx-guid-p"><a target="_blank" href="https://live.acfun.cn/live/' +
                a.info.userId +
                '">我的直播间</a></p>'
            );
            node.after('<p class="crx-guid-p">UID: ' + a.info.userId + "</p>");
            node.after(
              '<p class="crx-guid-p">金香蕉: ' + a.info.goldBanana + "</p>"
            );
            node.after('<p class="crx-guid-p">香蕉: ' + a.info.banana + "</p>");
            node.after(
              '<p class="crx-guid-p">听众: ' + a.info.followed + "</p>"
            );
            node.after(
              '<p class="crx-guid-p">注册时间: ' +
                formatDate(new Date(a.info.registerTime)) +
                "</p>"
            );
          }
        }
      });
  }

  indexBeautify(opt){
    let cssStr;
    opt ? cssStr=".header-top{backdrop-filter: blur(2.25926vw);background-color: #f8f8f896 !important;} .header .nav{border-bottom: 1px solid #ffffff00 !important} .header.fixed .nav{backdrop-filter: blur(2.25926vw);background-color: #f8f8f896;}" : cssStr=".nav-fixed{background-color:#f8f8f896;border-bottom:0px;backdrop-filter:blur(2.25926vw)} #header{background-color:#f8f8f896;backdrop-filter:blur(2.25926vw)}";
    createElementStyle(cssStr);
  }

  hideAds(){
    var timer = setInterval(function () {
      let checknode=$('.pause-display-container');
      let checknode2=$('.app-guide');
      if(checknode.length>0||checknode2.length>0){
        try {
          let cssStr = ".usemobile,.shareCount,.app-guide,.pause-display-container {display:none !important}"
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
    },500)
  }

  async addMouseAnimation(){
    let obj = document.querySelector('[data-c-w-header] .header-guide .guide-item');
    let imgObj = document.querySelector('[data-c-w-header] .header-guide .guide-user .user-avatar img');
    const before_style = document.createElement('style');
    before_style.style = 'text/css';
    before_style.innerHTML = '[data-c-w-header] .header-guide .guide-user .user-avatar img:before{animaition: avatar-wave cubic-bezier(0.22, 0.58, 0.12, 0.98) 0.6s forwards}';
    document.getElementsByTagName('head')[0].appendChild(before_style);
    try {
      obj.addEventListener('mouseenter',function(){
          imgObj.style.transform = "scale(1.6)";
          imgObj.style.transition = "all 0.2s cubic-bezier(0.74, 0.01, 0.24, 1)";
          imgObj.style.boxShadow = "0 0 2px 0px #ff0505;";
      })
      obj.addEventListener('mouseleave',function(){
          imgObj.style.transform = "scale(1)";
          imgObj.style.transition = "all 0.2s cubic-bezier(0.74, 0.01, 0.24, 1)";
      })
    } catch (error) {
      // console.log("[LOG]Frontend-pageBeautify: error")
    }
  }

  userMoment(href){
    let x = document.createElement('li');
    x.dataset.index = 'moment';
    x.textContent = "动态";
    document.getElementsByClassName("tab")[0].children[0].appendChild(x);
    let y = RegExp("http(s)?://www.acfun.cn/u/(.*)");
    let uid = y.exec(href);
    this.renderMoment(uid[2]);
  }

  async renderMoment(uid){
    let Api = `https://mini.pocketword.cn/api/acfun/user/moment?pcursor=0&userId=${uid}&count=30`;
    let data = await fetchResult(Api);
    let x = JSON.parse(data);
    // console.log(x);
    let y = `<div class="tab-content" tab-index="moment"><div id="ac-space-moment" style="text-align:center"><ul>`;
    let z = 0;
    for(let i = 0; i < x.feedList.length; i++){
      if(x.feedList[i].resourceType ==10){
        z++;y=y+`
        <li>
          <div class="moment-title" style="text-align:left;padding-left:280px;padding-right: 230px;padding-top:20px;font-size: 18px;">
              ${x.feedList[i].moment.text}
          </div>
          <div class="moment-sub">
            <a href="${x.feedList[i].shareUrl}" target="_blank" class="douga">
              <img src="${x.feedList[i].coverUrl}" style="width:calc(50%)">
            </a>
          </div>
          <div class="moment-info" style="font-size:15px;">发布于 ${getTimeSinceNow(x.feedList[i].createTime,true)} - ${x.feedList[i].bananaCount}根香蕉 - ${x.feedList[i].commentCount}个评论 - <a href="${x.feedList[i].shareUrl}" target="_blank">原文</a></div>
          <hr style="FILTER:alpha(opacity=100,finishopacity=0,style=3)" width="50%"color=#987cb9 SIZE=3>
        </li>
        `;
      }
    }
    // console.log(y)
    y+=`</ul>
      </div>
      </div>`;
    $("#ac-space>.wp").eq(0).append(y);
    document.getElementsByClassName("tab")[0].children[0].children[3].innerText=`动态 ${z}`;
    // document.getElementsByClassName("tab-list")[0].children[3].classList[0] == "active"
  }
}
