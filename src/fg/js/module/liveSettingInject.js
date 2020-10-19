let liveFunction = (function () {
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
          if (
            e.target.classList[0] == "comment" ||
            e.target.classList[0] == "user-enter"
          ) {
            let x = new Date();
            let w = e.target.children[0].innerHTML;
            e.target.children[0].innerHTML =
              `<span>[${x.getHours()}:${x.getMinutes()}] </span>` + w;
          }
        });
      clearInterval(_timer);
    }
  }, 2000);

  //调用画中画模式(其实跟video是一个函数)
  function l_setPictureInPictureMode() {
    let v = document.getElementsByTagName("video")[0];
    v.requestPictureInPicture();
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
} = {...liveFunction}