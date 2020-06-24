/**
 * 页面美化
 */

class PageBeautify {
  constructor() {
    this.personInfo = "https://www.acfun.cn/rest/pc-direct/user/personalInfo";
  }
  //--------------------------------------------------导航--------------------------------------------------------------------
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
    let style = document.createElement("style");
    let str =
      "@media screen and (max-width: 1440px){#back-top {display:block !important;opacity:1 !important;";
    str += /macintosh|mac os x/i.test(navigator.userAgent)
      ? "margin-Left: 624px;}}"
      : "}}";
    style.innerHTML = str;
    window.document.head.appendChild(style);
  }
  //-------------------------------------------------个人中心-----------------------------------------------------------------------

  async personBeautify() {
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

  //------------------------------Pc端视频点赞、投桃数----------------------------------------------
  showLikeCount_old() {
    let url = window.location.toString();
    let videoPage = new RegExp("http(s)?://www.acfun.cn/v/ac(.*)");
    let acVid = videoPage.exec(url)[2];
    let node = $("div.video-description.clearfix.dark-style>div")
      .find("div.left-area")
      .eq(0);
    let node2 = $("div.video-description.clearfix>div.action-area")
      .find("div.left-area")
      .eq(0);
    fetch("https://mini.pocketword.cn/api/acfun/info?dougaId=" + acVid)
      .then((res) => {
        return res.text();
      })
      .then((res2) => {
        let a = JSON.parse(res2);
        if (node.length) {
          node.append(
            '<div class="like" style="padding-right: 15px;"><span class="likeCount">' +
              a.likeCount +
              "</span>点赞</div>"
          );
        } else if (node2.length) {
          node2.append(
            '<div class="like" style="padding-right: 15px;"><span class="likeCount">' +
              a.likeCount +
              "</span>点赞</div>"
          );
        }
      });
  }

  showLikeCount() {
    window.addEventListener("message", function (e) {
      // console.log(e);
      if (e.data.to == "pageBtfy") {
        let node = $("div.video-description.clearfix.dark-style>div")
          .find("div.left-area")
          .eq(0);
        let node2 = $("div.video-description.clearfix>div.action-area")
          .find("div.left-area")
          .eq(0);
        let a = JSON.parse(e.data.msg);
        if (node.length) {
          node.append(
            '<div class="like" style="padding-right: 15px;"><span class="likeCount">' +
              a.likeCount +
              "</span>点赞</div>"
          );
        } else if (node2.length) {
          node2.append(
            '<div class="like" style="padding-right: 15px;"><span class="likeCount">' +
              a.likeCount +
              '</span>点赞</div><div class="peach" style="padding-right: 15px;"><span class="likeCount">' +
              a.giftPeachCount +
              "</span>桃子</div>"
          );
        }
      } else {
      }
    });
  }
}
