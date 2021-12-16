let AcFunHelperLiveFunction = (function LiveFunction() {
  let options;
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
            /**
             * @type {HTMLElement}
             */
            const targetElem = e.target;
            if (
              targetElem.classList[0] == "comment" ||
              targetElem.classList[0] == "user-enter"
            ) {
              let x = new Date();
              let f_c = targetElem.children[0].firstChild;
              let span = document.createElement('span');
              let time_hour = x.getHours().toString().length == 1 ? "0" + x.getHours().toString() : x.getHours();
              let time_min = x.getMinutes().toString().length == 1 ? "0" + x.getMinutes().toString() : x.getMinutes();
              span.innerText = `[${time_hour}:${time_min}]`;
              if (targetElem.classList[0] == "comment") {
                const commentText = targetElem.querySelector("span.nickname").dataset.comment;
                if (/^#/.test(commentText)) {
                  targetElem.classList.toggle("emojiCommand");
                }
              }
              targetElem.children[0].insertBefore(span, f_c);
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

  window.addEventListener("AcFunHelperFrontend", (e) => {
    AcFunHelperFrontendEventInvoker(e);
  })

  /**
   * 消息发送器
   * @param {string} modName videoSetting父模块接收函数/模块
   * @param {MessageSwitchStructs.WindowMsgPayload} msg 消息内容 {source:string,target:string,InvkSetting: {type:"function"},params:{}|[]}
   */
  function LiveMessagePush(payload = {}) {
    window.parent.postMessage({
      to: "AcFunHelperFrontend",
      msg: payload,
    }, "*");
  }

  /**
   * 前端调用处理
   * @param {MessageSwitchStructs.InjectRecievePayload} e 
   */
  function AcFunHelperFrontendEventInvoker(e) {
    if (e.detail.InvkSetting.type === "function" && typeof (AcFunHelperLiveFunction[e.detail.target]) === 'function') {
      AcFunHelperLiveFunction[e.detail.target].call({}, e.detail.params);
    } else {
      console.log(e.detail);
    }
  }

  /**
   * 通用调用处理器
   * @param {MessageSwitchStructs.WindowMsgRespnse} e constraint:{ data: { to: "AcFunHelper_vsInject", msg: {source:string,target:string,InvkSetting: {type:"function"},params:{}|[]} } }
   */
  function LiveMessageCommonInvoker(e) {
    if (e.data.msg.InvkSetting.type === "function" && typeof (AcFunHelperLiveFunction[e.data.msg.target]) === 'function') {
      let paramList;
      if (Array.isArray(e.data.msg.params) == false) {
        paramList = Object.values(e.data.msg.params)
      }
      AcFunHelperLiveFunction[e.data.msg.target].apply({}, paramList);
    } else {
      console.log(e.data.msg);
    }
  }

  function LiveloadOptionData(e) {
    const { title, msg } = e;
    options = msg;
  }

  function enterPlayerAutomate() {
    switch (options.liveplayer_mode) {
      case "default":
        break;
      case "wide":
        let _timer = setInterval(function () {
          let _rc = document.querySelector("#toggleWide");
          if (_rc) {
            document.querySelector("#toggleWide").click();
            clearInterval(_timer);
          }
        }, 1000);
        break;
      case "film":
        let _timer2 = setInterval(function () {
          let _rc1 = document.querySelector(".control-btn.film-model");
          if (_rc1) {
            document.querySelector(".control-btn.film-model").click();
            clearInterval(_timer2);
          }
        }, 1000);
        break;
      case "webfull":
        let _timer3 = setInterval(function () {
          let _rc2 = document.querySelector(".fullscreen.fullscreen-web");
          if (_rc2) {
            document.querySelector(".fullscreen.fullscreen-web").click();
            clearInterval(_timer3);
          }
        }, 1000);
        break;
    }
  }
  return {
    l_setPictureInPictureMode, LiveMessageCommonInvoker, LiveMessagePush, LiveloadOptionData, enterPlayerAutomate
  }
})();
let {
  l_setPictureInPictureMode, LiveMessageCommonInvoker, LiveMessagePush, LiveloadOptionData, enterPlayerAutomate
} = { ...AcFunHelperLiveFunction }
