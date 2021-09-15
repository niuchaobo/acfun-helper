let AcFunHelperLiveFunction = (function LiveFunction() {
  let testLive = new RegExp("https://live.acfun.cn/live/*").test(
    window.location.href
  );
  if (!testLive) {
    return;
  }
  let _timer = setInterval(function () {
    let node = document.getElementsByClassName("live-feed-messages");
    if (node.length > 0) {
      document
        .getElementsByClassName("live-feed-messages")[0]
        .addEventListener("DOMNodeInserted", (e) => {
          try {
            if (
              e.target.classList[0] == "comment" ||
              e.target.classList[0] == "user-enter"
            ) {
              let x = new Date();
              let f_c = e.target.children[0].firstChild;
              let span = document.createElement('span');
              let time_hour = x.getHours().toString().length == 1 ? "0" + x.getHours().toString() : x.getHours();
              let time_min = x.getMinutes().toString().length == 1 ? "0" + x.getMinutes().toString() : x.getMinutes();
              span.innerText = `[${time_hour}:${time_min}]`;
              e.target.children[0].insertBefore(span, f_c);
            }
          } catch (error) {
            console.log("[LOG]Frontend-videoSettingInject: recheck live-feed-messages items.")
            return;
          }
        });
      clearInterval(_timer);
    }
  }, 2000);

  //调用画中画模式
  function l_setPictureInPictureMode() {
    let v = document.getElementsByTagName("video")[0];
    document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture();
    console.log(
      "[LOG]Frontend-videoSettingInject: Calling PictureInPicture Mode."
    );
  }
  return {
    l_setPictureInPictureMode
  }
})();
let {
  l_setPictureInPictureMode
} = { ...AcFunHelperLiveFunction }
