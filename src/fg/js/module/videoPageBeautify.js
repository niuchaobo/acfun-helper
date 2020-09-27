/**
 * 页面美化
 */
class videoPageBeautify {
  constructor() {

  }

  openVideoDesc() {
    getAsyncDom(".desc-operate", () => {
      document.getElementsByClassName("desc-operate")[0].click();
    });
  }

  //------------------------------Pc端视频点赞、投桃数------------------------------
  showLikeCount() {
    window.addEventListener("message", async (e) => {
      if (e.data.to == "pageBtfy") {
        let node = $("div.video-description.clearfix.dark-style>div")
          .find("div.left-area")
          .eq(0);
        let node2 = $("div.video-description.clearfix>div.action-area")
          .find("div.left-area")
          .eq(0);
        if (e.data.msg != "undefined") {
          var a = JSON.parse(e.data.msg);
        } else {
          console.log(
            "[LOG]Frontend-pageBeautify: Douga Info Receive From InjectScript Fail,May Influent sth."
          );
          let url = window.location.toString();
          let videoPage = new RegExp("http(s)?://www.acfun.cn/v/ac(.*)");
          let acVid = videoPage.exec(url)[2];
          let res2 = await fetchResult(
            "https://mini.pocketword.cn/api/acfun/info?dougaId=" + acVid
          );
          var a = JSON.parse(res2);
        }
        if (node.length) {
          node.append(
            '<div class="like" style="padding-right: 15px;"><span class="likeCount">' +
              a.likeCount +
              '</span>点赞</div><div class="peach" style="padding-right: 15px;"><span class="likeCount">' +
              a.giftPeachCount +
              "</span>桃子</div>"
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
      } else {}
    });
  }
  
}
