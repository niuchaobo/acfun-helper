//----------------播放器模式（观影、网页全屏、桌面全屏）--------------------
//通过这种方式和content_script（videoSetting.js）通信，接收videoSetting.js传过来的数据
let videoFunction = (function () {
  let testVideo = new RegExp(
    "((http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+)|(http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*))"
  ).test(window.location.href);
  if (!testVideo) {
    return;
  }

  var lastdropedFrame = 0;
  var nowDropFrame = 0;
  // var option_authinfo_mkey = false;

  var hiddenDiv = document.getElementById("myCustomEventDiv");
  if (!hiddenDiv) {
    hiddenDiv = document.createElement("div");
    hiddenDiv.style.display = "none";
    try {
      document.body.appendChild(hiddenDiv);
    } catch (error) {
      console.log(
        "[LOG]Frontend-videoSettingInject: Fail to appendChildElemt hiddenDiv."
      );
    }
  }

  hiddenDiv.addEventListener("myCustomEvent", function () {
    // console.log(window.player);
    var eventData = document.getElementById("myCustomEventDiv").innerText;
    let options = JSON.parse(eventData);
    switch (options.player_mode) {
      case "default":
        break;
      case "film":
        let _timer = setInterval(function () {
          let _header = document.getElementById("header");
          let _main = document.getElementById("main");
          let _vd = document.querySelector(".video-description");
          let _toolbar = document.getElementById("toolbar");
          let _rc = document.querySelector(".right-column");
          let _retry = 10;
          //如果不判断直接调用会报错，toolbar节点可能还没加载
          if (_header && _main && _vd && _toolbar && _rc) {
            window.player.emit("filmModeChanged", true);
            let w2 = document.getElementsByTagName("video")[0].offsetWidth;
            clearInterval(_timer);
          }
        }, 1000);
        break;
      case "web":
        window.player.emit("fullScreenChange", "web");
        break;
      case "desktop":
        //Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
        //此功能只能由用户触发
        //window.player.emit('fullScreenChange','screen');
        //document.getElementsByClassName('container-player')[0].requestFullscreen();
        //window.player.requestFullscreen();
        //break;

        //换另外一种方法
        document.querySelector(".fullscreen-screen>.btn-fullscreen").click();
        break;
    }

    if (options.endedAutoExitFullscreensw) {
      //自动退出观影模式、网页全屏
      try {
        document
          .getElementsByTagName("video")[0]
          .addEventListener("ended", function () {
            let nowMode =
              document.querySelector("div.btn-film-model").children[0].dataset
                .bindAttr == "true" ||
              document.querySelector("div.btn-fullscreen").children[0].dataset
                .bindAttr == "web";
            if (!window.player._loop && nowMode) {
              window.player.emit("filmModeChanged", false);
              window.player.emit("fullScreenChange", false);
            }
          });
      } catch (error) {
        console.log("[LOG]Frontend-videoSettingInject: May not in douga Page.");
      }
    }

    if (options.endedAutoJumpRecommandFirstDougasw) {
      //自动观看“大家都在看”栏目第一个稿件
      document
        .getElementsByTagName("video")[0]
        .addEventListener("ended", function () {
          document
            .getElementsByClassName("recommendation")[0]
            .children[0].children[0].click();
        });
    }

  });

  try {
    //从Player获取douga & danmaku 信息，传递给父级
    // window.parent.postMessage(
    //   {
    //     to: "pageBtfy",
    //     msg: `${JSON.stringify(window.player.videoInfo)}`,
    //   },
    //   "*"
    // );

    window.parent.postMessage(
      {
        to: "frame_danmaku",
        acId: `${window.player.acId}`,
        msg: `${JSON.stringify(window.player._danmaku.list)}`,
      },
      "*"
    );

    window.parent.postMessage(
      {
        to: "vs_videoInfo",
        msg: `${JSON.stringify(window.player.videoInfo.videoList)}`,
      },
      "*"
    );

    // if(option_authinfo_mkey){
    //     window.parent.postMessage({
    //         to:'authinfo_mkey',
    //         msg:`${JSON.stringify(window.player.mkey)}`
    //     },'*');
    // }
  } catch (error) {
    console.log("[LOG]Frontend-videoSettingInject: Douga Info Sent Faild.");
  }

  /**
   * 评论时间播放器快速跳转 - 处理函数
   * @param {string} time string eg:"00:01"or "00:00:10" 时间
   * @param {number} part int 视频的第几p
   */
  function quickJump(time, part) {
    let v_obj = document.getElementsByTagName("video")[0];
    let url = window.location.href;
    if ($(".part .part-wrap .scroll-div .single-p").length && part) {
      if (
        !(url.split("_")[1] == part || (url.search("_") == -1 && part == 1))
      ) {
        //判断是否为当前part，符合要求直接操作进度条
        url = url.split("_")[0] + "_" + part;
        $(".part .part-wrap .scroll-div .single-p")
          .eq(part - 1)
          .trigger("click");
      }
    }
    setTimeout(() => {
      v_obj.currentTime = Duration2Seconds(time);
      console.log("[LOG]Frontend-videoSettingInject: Jump_ok");
    }, 500);
  }

  /**
   * 丢帧增量
   * @description 获取当前时间之前的丢帧增加的数量
   */
  function dropFrameIncrementAlz() {
    document
      .getElementsByTagName("video")[0]
      .addEventListener("timeupdate", function (e) {
        lastdropedFrame = nowDropFrame;
        nowDropFrame = player.$video.getVideoPlaybackQuality()
          .droppedVideoFrames;
        dropFrameIncrement = nowDropFrame - lastdropedFrame;
        // console.log(dropFrameIncrement)
      });
  }

  //=======Common Functions=========
  /**
   * 时间描述转换为秒数
   * @param {string} time string eg:"00:01"or "00:00:10" 时间
   * @returns int seconds
   */
  function Duration2Seconds(time) {
    let str = time;
    let arr = str.split(":");
    if (arr.length == 2) {
      let Tm = Number(arr[0]) * 60;
      let Ts = Number(arr[1]);
      let seconds = Tm + Ts;
      return seconds;
    } else if (arr.length == 3) {
      let Ts = Number(arr[2]);
      let Tm = Number(arr[1]) * 60;
      let Th = Number(arr[0]) * 60 * 60;
      let seconds = Th + Tm + Ts;
      return seconds;
    }
  }

  return {
    quickJump,
    dropFrameIncrementAlz,
  };
})();
let {
  quickJump,
  dropFrameIncrementAlz,
} = { ...videoFunction };
