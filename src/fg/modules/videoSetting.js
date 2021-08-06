/**
 * 视频播放设置
 */
class VideoSetting {
  constructor() {
    window.addEventListener("load", (e) => this.onLoad(e));
    this.underWorld = null;
    this.audioNodeGainFlag = false;
    this.audioOriginVolume = 0;
    this.mediaSessionNowPlayingIndex = 0;
    this.acNum = 0;
    this.devMode = false;
    this.progressBarOptions = {
      id: "achlp-proBar",
      css: "z-index:1002;transition: width 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;",
    };
    this.progressBackGroundOptions = {
      id: "achlp-proBar-bg",
      css: "z-index:1000;transition: width 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;box-shadow:rgb(125,125,125) -3px -1px 5px 0px;",
    };
    this.progressLoadedBarOptions = {
      id: "ac-proBar-loaded",
      css: "z-index:1001;transition: width 0.4s ease-out;position: fixed;bottom: 0px;width: 0%;",
    };
    this.iconBase64Url =
      "data:image/png;base64,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";
    this.cPIP_div = `<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;" >`;
    this.cPIP_Livediv = `<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;" >`;
    this.cPIP_span = `<span class="btn-span setPictureInPictureMode" style="display: block;width: 22px;height: 100%;background-size: contain;background-position: center;background-repeat: no-repeat;background-image: url(${this.iconBase64Url});" ></span> 
        </div><span class="tip-pip" style="position: absolute;display: none;bottom: 40px;text-align: center;background: rgba(21,21,21,0.8);border-radius: 4px;line-height: 32px;height: 32px;opacity: 0.9;font-size: 14px;color: #FFFFFF;letter-spacing: 0;width: 116px;left: 50%;-webkit-transform: translate(-50%); transform: translate(-50%);" >进入画中画</span></div>`;
    this.abPlayFirst = undefined;
    this.abPlaySecond = undefined;
    this.abPlayFlag = 0;
    this.timelineDotsResultCache = "";
    this.hideDanmakuOperatorStyleAdded = false;
    this.hideDanmakuOperatordanmakuOprFlag = false;
    this.beforeChangeTabPlayStatus = false;
    this.sleepPauseSw = false;
  }

  onLoad() {
    var hiddenDiv = document.getElementById("AcFunHelperDataDiv");
    if (!hiddenDiv) {
      hiddenDiv = document.createElement("div");
      hiddenDiv.id = "AcFunHelperDataDiv";
      hiddenDiv.style.display = "none";
      document.body.appendChild(hiddenDiv);
    }

    let root = chrome.runtime.getURL("/");
    let sc = document.createElement("script");
    sc.src = `${root}fg/modules/videoSettingInject.js`;
    document.head.appendChild(sc);
    //给inject js 传递数据
    sc.onload = function () {
      var customEvent = document.createEvent("Event");
      customEvent.initEvent("AcFunHelperDataDivEvent", true, true);
      hiddenDiv.innerText = JSON.stringify(window.odhfront.options);
      hiddenDiv.dispatchEvent(customEvent);
    };
  }

  //跳转到上次观看(只支持1p投稿的跳转)
  jumpLastWatchTime() {
    window.addEventListener("message", (e) => {
      if (e.data.to == "vs_videoInfo") {
        let videoInfo_data = JSON.parse(e.data.msg);
        let lastAcVpid = Number(videoInfo_data[judgeActivePart() - 1].id);
        try {
          if (JSON.parse(localStorage.playHistory)[lastAcVpid]) {
            document.getElementsByTagName("video")[0].currentTime = JSON.parse(localStorage.playHistory)[lastAcVpid];
          } else {
            throw TypeError;
          }
        } catch (error) {
          console.log(
            "[LOG]Frontend-videoSetting>jumpLastWatchTime: 没有上次观看的进度。"
          );
        }
      }
    });
  }

  //画中画模式
  callPicktureInPictureMode() {
    const notChrome = navigator.userAgent.indexOf("Chrome") === -1;
    if (notChrome) {
      return;
    }
    let cPIP_div = this.cPIP_div;
    let cPIP_span = this.cPIP_span;
    let html = cPIP_div + cPIP_span;
    getAsyncDom("div.control-btn.setting", () => {
      $("div.control-btn.setting").after(html);
      $(".control-btn.pip").on("mouseover", () => {
        $(".tip-pip").css("display", "block");
      });
      $(".control-btn.pip").on("mouseout", () => {
        $(".tip-pip").css("display", "none");
      });
      $(".box-right>div").click((e) => {
        if (e.target.className === "btn-span setPictureInPictureMode") {
          if (!document.pictureInPictureElement) {
            leftBottomTip("启动", "画中画模式");
            this.setPictureInPictureMode(true);
          } else {
            leftBottomTip("关闭", "画中画模式");
            this.setPictureInPictureMode(false);
          }
        } else {
          return;
        }
      });
    });
  }
  //调用画中画模式
  setPictureInPictureMode(sw) {
    if (sw) {
      document.getElementsByTagName("video")[0].requestPictureInPicture();
      console.log("[LOG]Frontend-videoSetting: Calling PictureInPicture Mode.");
    } else {
      document.exitPictureInPicture();
      console.log("[LOG]Frontend-videoSetting: Exit PictureInPicture Mode.");
    }
  }

  //画质策略
  videoQuality(isLogin) {
    var timer = setInterval(function () {
      let nodes = $(".quality-panel");
      var vqregexp = RegExp("p60");
      var vqreg2exp = RegExp("2160p");
      if (nodes.length > 0) {
        //模式标准：0=自动；1=默认最高；2=非60帧的最高画质；3=强制标清；4=偏向非4k的最高画质
        chrome.storage.local.get(["videoQualityStrategy"], function (items) {
          let mode = Number(items.videoQualityStrategy);
          let qualitys = document.querySelector(".quality-panel > ul").children;
          if (isLogin && mode != 3) {
            clearInterval(timer);
          }
          switch (mode) {
            case 0:
              return;
            case 1:
              qualitys[0].click();
              // console.log(qualitys[0].dataset.qualityType);
              break;
            case 2:
              for (let i = 0; i <= qualitys.length; i++) {
                let result = vqregexp.exec(qualitys[i].dataset.qualityType);
                let result2 = vqreg2exp.exec(qualitys[i].dataset.qualityType);
                if (result == null && result2 == null) {
                  qualitys[i].click();
                  break;
                }
              }
              break;
            case 3:
              let Lowest = qualitys.length - 2; //减去1的话就是播放器的自动模式
              qualitys[Lowest].click();
              break;
            case 4:
              for (let x = 0; x <= qualitys.length - 1;) {
                if (vqreg2exp.test(qualitys[x].dataset.qualityType)) {
                  x++;
                } else {
                  qualitys[x].click();
                  break;
                }
              }
          }
          clearInterval(timer);
        });
      }
    }, 5000);
  }

  //自定义倍速
  customPlaybackRate() {
    getAsyncDom(".speed[type!=abplay]", () => {
      let html = `<li class="setCustomPlaybackRate" data-val='1'>自定义</li>`;
      $(".speed[type!=abplay]").find("li:last").after(html);
      $(".speed[type!=abplay]").click((e) => {
        if (e.target.className === "setCustomPlaybackRate") {
          this.setCustomPlaybackRate();
        } else {
          return;
        }
      });
    });
  }
  //调用自定义倍速
  setCustomPlaybackRate() {
    let v = document.getElementsByTagName("video")[0];
    let title = "请输入播放倍速【0-5之间（不包含5），最多2位小数】，例如：0.1";
    let reg = /^[0-4](\.[0-9]{1,2})?$/;
    let rate = prompt(title, "");
    if (rate != null && rate != "") {
      if (reg.test(rate)) {
        v.playbackRate = rate;
      } else {
        window.parent.postMessage(
          {
            action: "notice",
            params: {
              title: "AcFun助手",
              msg: "请输入正确的播放速度",
            },
          },
          "*"
        );
      }
    }
  }

  //==============AB回放================
  addABPlayUI() {
    getAsyncDom(" .box-right ", () => {
      let html = `
        <div class="control-btn speed" type='abplay'><span data-bind-key="AddABPlayUI">AB</span>
            <div class="speed-panel abplay-panel">
                <ul>
                    <li class = 'updateAbPlayFirst' data-val="A" >标记点A</li>
                    <li class = 'updateAbPlaySecond' data-val="B" >标记点B</li>
                    <li class = 'abPlayHandler' >开始</li>
                    <li class = 'stopAbPlay' >清除</li>
                </ul>
                <div class="transparent-placeholder"></div>
        </div>
        `;
      $(" .box-right ").prepend(html);
      $(" .box-right>div[type=abplay] ").click((e) => {
        let target = e.target.className;
        switch (target) {
          case "updateAbPlayFirst":
            this.updateAbPlayFirst();
            break;
          case "updateAbPlaySecond":
            this.updateAbPlaySecond();
            break;
          case "abPlayHandler":
            this.abPlayHandler();
            break;
          case "stopAbPlay":
            this.stopAbPlay();
            break;
        }
      });
    });
  }
  updateAbPlayFirst() {
    if (this.abPlayFlag === 1) {
      leftBottomTip("请先", "停止");
      return;
    }
    let firstTime = document.getElementsByTagName("video")[0].currentTime;
    if (this.abPlaySecond && firstTime >= this.abPlaySecond) {
      leftBottomTip("A要在B之前", "---鲁迅");
      return;
    }
    this.abPlayFirst = firstTime;
    leftBottomTip(`标记点A :`, `${timeToMinute(this.abPlayFirst)}`);
    $(".abplay-panel>ul>.updateAbPlayFirst").text(
      `A : ${timeToMinute(this.abPlayFirst)}`
    );
    this.abPlaySecond &&
      leftBottomTip(
        `区间为`,
        `${timeToMinute(this.abPlayFirst)}至${timeToMinute(this.abPlaySecond)}`
      );
  }
  updateAbPlaySecond() {
    if (this.abPlayFlag === 1) {
      leftBottomTip("请先", "停止");
      return;
    }
    let secondTime = document.getElementsByTagName("video")[0].currentTime;
    if (this.abPlayFirst && secondTime <= this.abPlayFirst) {
      leftBottomTip("B要在A之后", "---鲁迅");
      return;
    }
    this.abPlaySecond = secondTime;
    leftBottomTip(`标记点B :`, `${timeToMinute(this.abPlaySecond)}`);
    $(".abplay-panel>ul>.updateAbPlaySecond").text(
      `B : ${timeToMinute(this.abPlaySecond)}`
    );
    this.abPlayFirst &&
      leftBottomTip(
        `区间为`,
        `${timeToMinute(this.abPlayFirst)}至${timeToMinute(this.abPlaySecond)}`
      );
  }
  stopAbPlay() {
    this.abPlayFirst = this.abPlaySecond = undefined;
    $(".abplay-panel>ul>.updateAbPlayFirst").text("标记点A");
    $(".abplay-panel>ul>.updateAbPlaySecond").text("标记点B");
    $(".abplay-panel>ul>.stopAbPlay").text("清除");
    if (this.abPlayFlag === 0) {
      leftBottomTip("标记", "已清除");
      return;
    }
    if (this.abPlayFlag === 1) {
      this.abPlayFlag = 0;
      document
        .getElementsByTagName("video")[0]
        .removeEventListener("timeupdate", this.abPlayMain.bind(this), false);
      $(".abplay-panel>ul>.abPlayHandler").text("开始");
      leftBottomTip("标记已清除,AB回放已", "退出");
      return;
    }
  }
  abPlayMain() {
    if (this.abPlayFlag == 0) {
      return;
    }
    if (
      Math.floor(document.getElementsByTagName("video")[0].currentTime) >=
      this.abPlaySecond
    ) {
      document.getElementsByTagName("video")[0].currentTime = this.abPlayFirst;
    }
  }
  abPlayHandler() {
    let targetVideo = document.getElementsByTagName("video")[0];
    if (this.abPlayFirst === undefined || this.abPlaySecond === undefined) {
      leftBottomTip("请先设置", "标记点");
      return;
    }
    if (this.abPlayFlag === 0) {
      leftBottomTip("AB回放", "开启");
      $(".abplay-panel>ul>.abPlayHandler").text("停止");
      $(".abplay-panel>ul>.stopAbPlay").text("清除&停止");
      targetVideo.paused && targetVideo.play();
      targetVideo.removeEventListener(
        "timeupdate",
        this.abPlayMain.bind(this),
        false
      );
      targetVideo.currentTime = this.abPlayFirst;
      targetVideo.addEventListener(
        "timeupdate",
        this.abPlayMain.bind(this),
        false
      );
      this.abPlayFlag = 1;
      return;
    }
    if (this.abPlayFlag === 1) {
      targetVideo.removeEventListener(
        "timeupdate",
        this.abPlayMain.bind(this),
        false
      );
      targetVideo.pause();
      $(".abplay-panel>ul>.abPlayHandler").text("开始");
      this.abPlayFlag = 0;
      leftBottomTip("AB回放", "停止");
      return;
    }
  }

  //底部进度条
  flexProgressBar(options) {
    let { barColor, barHeight, loadedOpen, loadedColor, loadedHeight } = {
      ...options,
    };

    this.progressBarOptions.css += `background-color: ${barColor};height: ${barHeight};`;
    addElement(this.progressBarOptions);
    getAsyncDom("control-bar-top", this.setProgressBarLength.bind(this));

    this.progressBackGroundOptions.css += `background-color: ${barColor};height: ${barHeight};`;
    addElement(this.progressBackGroundOptions);
    getAsyncDom("pro-current", this.setProgressBackGroundBarLength.bind(this));

    if (loadedOpen === "open") {
      this.progressLoadedBarOptions.css += `background-color: ${loadedColor};height: ${loadedHeight};`;
      addElement(this.progressLoadedBarOptions);
      getAsyncDom("loaded", this.setLoadedBarLength.bind(this));
    }
  }

  setProgressBarLength() {
    const sohObserver = document.getElementsByClassName("control-bar-top")[0];
    const sohObserveFn = () => {
      let setSOHtarget = $("#achlp-proBar,#achlp-proBar-bg,#ac-proBar-loaded");
      let flag = sohObserver.getAttribute("data-bind-attr") === "true";
      flag ? setSOHtarget.hide() : setSOHtarget.show(100);
    };
    this.setObserverWeb(sohObserver, throttle(sohObserveFn, 110), {
      attributefilter: ["data-bind-attr"],
    });
  }

  setProgressBackGroundBarLength() {
    const barObserver = document.getElementsByClassName("pro-current")[0];
    const barObserverFn = () => {
      let barLength = barObserver.style.width;
      $("#achlp-proBar,#achlp-proBar-bg").css({ width: barLength });
    };
    this.setObserverWeb(barObserver, barObserverFn);
  }

  setLoadedBarLength() {
    const loadedObserver = document.getElementsByClassName("loaded")[0];
    const loadedObserverFn = () => {
      let loadedLength = loadedObserver.style.width;
      $("#ac-proBar-loaded").css({ width: loadedLength });
    };
    this.setObserverWeb(loadedObserver, loadedObserverFn);
  }

  setObserverWeb(target, fn, options = {}) {
    const observerLoaded = new MutationObserver((mutations) => {
      mutations.forEach(fn);
    });
    observerLoaded.observe(target, {
      attributes: true,
      attributeoldvalue: false,
      attributefilter: ["style"],
      ...options,
    });
  }
  //监听是否为全屏
  monitorFullScreen() {
    //观影模式
    var MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    //var element = document.querySelector(".tip-film-model").childNodes[0];
    getAsyncDom(
      ".control-btn.btn-film-model>.btn-span:first",
      () => {
        var element = $(".control-btn.btn-film-model").find(
          ".btn-span:first"
        )[0];
        var observer = new MutationObserver((mutations) => {
          mutations.forEach(async (mutation) => {
            let flag =
              document.getElementsByClassName("tip-film-model")[0].innerText;
            if (flag == "退出观影模式") {
              document.getElementById("acfun-popup-helper").style.display =
                "none";
              document.getElementById("acfun-helper-div").style.display =
                "none";
              //观影模式下的暗色 FilmModeExclusion
              let FilmModeExclusionsw = await getStorage("FilmModeExclusionsw");
              if (FilmModeExclusionsw.FilmModeExclusionsw) {
                setTimeout(() => {
                  //全屏模式切换时会重新渲染样式（页面宽度改变）？扔进异步队列等主程跑完再渲染
                  this.fullScreenStyle(true);
                });
              }
              this.timelineDotsRender(this.timelineDotsResultCache);
            } else {
              document.getElementById("acfun-popup-helper").style.display = "";
              document.getElementById("acfun-helper-div").style.display = "";
              let FilmModeExclusionsw = await getStorage("FilmModeExclusionsw");
              if (FilmModeExclusionsw.FilmModeExclusionsw) {
                this.fullScreenStyle(false);
              }
              this.timelineDotsRender(this.timelineDotsResultCache);
            }
          });
        });
        this.serveStart(element, observer);
      },
      500
    );

    //网页全屏
    getAsyncDom(
      ".control-btn.btn-fullscreen>.btn-span:first",
      () => {
        var elementWeb = $(".control-btn.btn-fullscreen").find(
          ".btn-span:first"
        )[0];
        var observerWeb = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            let fullscreenFlag =
              document.getElementsByClassName("tip-fullscreen")[0].innerText ==
              "退出网页全屏";
            let fileModelFlag =
              document.getElementsByClassName("tip-film-model")[0].innerText ==
              "退出观影模式";
            let popupHelper = document.getElementById("acfun-popup-helper");
            let helperDiv = document.getElementById("acfun-helper-div");
            if (fullscreenFlag) {
              popupHelper ? (popupHelper.style.display = "none") : "";
              helperDiv ? (helperDiv.style.display = "none") : "";
              this.timelineDotsRender(this.timelineDotsResultCache);
            } else {
              if (fileModelFlag) return;
              popupHelper ? (popupHelper.style.display = "") : "";
              helperDiv ? (helperDiv.style.display = "") : "";
              this.timelineDotsRender(this.timelineDotsResultCache);
            }
          });
        });
        this.serveStart(elementWeb, observerWeb);
      },
      500
    );
  }

  serveStart(elementWeb, observerWeb) {
    observerWeb.observe(elementWeb, {
      //characterData: true,
      //characterDataOldValue: true
      attributes: true, //observe element attributes
      attributeOldValue: true,
      attributeFilter: ["data-bind-attr"],
    });
  }

  fullScreenStyle(on) {
    //underWorld => 阴间
    if (on) {
      this.underWorld && this.underWorld();
      let cssText =
        "#main>#main-content{ mix-blend-mode: difference;background: white; margin: 0px !important; max-width:100% !important; width: calc(100% - 20px) !important; overflow:hidden; padding:0px 10px}" +
        "#main .video-description .reco-tag,.action-area{mix-blend-mode:exclusion}" +
        "#pagelet_bottomrecommend,.area-editor-avatar,#main .introduction .up-area{mix-blend-mode:exclusion}" +
        ".right-column img{mix-blend-mode:exclusion}" +
        ".player-box{mix-blend-mode:exclusion}" +
        "#pagelet_newcomment .thumb,.acfunAdmin.verified-ico-5,a.name,a.pager__btn__selected,a.pager__btn__selected,.area-comment-des img{mix-blend-mode:exclusion}" +
        "body #main #main-content .left-column{width:100% !important;max-width:100%}" +
        ".ac-comment-usercard .area-comm-usercard-bottom{mix-blend-mode:exclusion}" +
        "body #main #main-content .right-column{position:absolute;right:-342px;top:160px;padding-left:1px;transition-duration:.2s;border-left:'6px  solid rgba(62, 62, 62, 0.4)'}" +
        "body #main #main-content .right-column:hover{right: 0px; background:white; border-left-width:0px }" +
        ".ac-pc-comment{padding-right:15px}" +
        "#toolbar{transform:scale(0.8);transform-origin:bottom right}" +
        ".player-box,.nav-parent,.video-description{border-bottom-color:white}" +
        ".ac-comment-list .area-comment-title .name,{color: #bbbbbb;}" +
        ".share,.mobile,#pagelet_bottomrecommend,#footer{display:none !important}";
      this.underWorld = createElementStyle(cssText, undefined, "underWorld");
    } else {
      this.underWorld && this.underWorld();
      this.underWorld = null;
    }
  }

  //倍速快捷键 TODO:自定义快捷键(现在默认shift + ↑/↓) FIXME:绑定位置
  PlaybackRateKeyCode(settingKeyCode) {
    // const videoDom = document.getElementById('player');
    // videoDom.setAttribute("tabindex","-1")
    // v.addEventListener('keydown',(e)=>{
    //     this.changeRateKeyCode(settingKeyCode,e)
    // })
    document.onkeydown = (e) => {
      this.changeRateKeyCode(e, settingKeyCode);
    };
  }

  changeRateKeyCode(e, settingKeyCode) {
    let code = e.keyCode;
    e.shiftKey &&
      (code === settingKeyCode[0] || code === settingKeyCode[1]) &&
      this.getRate(code, settingKeyCode);
  }

  getRate(code, settingKeyCode) {
    const v = document.getElementsByTagName("video")[0];
    let rate = this.getRateFlag(code, settingKeyCode, v);
    v.playbackRate = rate;
    event.stopPropagation();
  }

  getRateFlag(code, settingKeyCode, v) {
    let videoRate = v.playbackRate;
    const [addRate, reduceRate] = settingKeyCode;
    code === addRate
      ? (videoRate += 0.25)
      : code === reduceRate
        ? (videoRate -= 0.25)
        : "";
    videoRate <= 0 ? (videoRate = 0.25) : videoRate >= 2 ? (videoRate = 2) : "";
    return videoRate;
  }

  danmuSearchListToUser() {
    this.danmuSearchListToUserExec();

    $(".danmaku-items").bind(
      "DOMNodeInserted",
      debounce((e) => {
        if (e.target.className === "searchListUser") {
          return;
        }

        this.danmuSearchListToUserExec();
      }, 500)
    );
  }

  danmuSearchListToUserExec() {
    $(".danmaku-items>li>.danmaku-content").after(
      `<div class = 'searchListUser' style = "display:none;margin-right:6px;font-size:20px;">⌂</div>`
    );
    $(".danmaku-items>li").bind("mouseenter", (e) => {
      let userId = $(e.target).attr("data-user");
      $(e.target)
        .children(".searchListUser")
        .eq(0)
        .css("display", "inline-block")
        .siblings()
        .children(".searchListUser")
        .eq(0)
        .css("display", "none");
      $(e.target).children(".searchListUser").eq(0).unbind("click");
      $(e.target)
        .children(".searchListUser")
        .attr('title', `ID:${userId}`)
        .eq(0)
        .bind("click", () => {
          e.stopPropagation();
          window.open(`https://www.acfun.cn/u/${userId}`);
          $(e.target)
            .children(".searchListUser")
            .eq(0)
            .css("display", "none");
        });
    });
    $(".danmaku-items>li").bind("mouseleave", (e) => {
      $(e.target).children(".searchListUser").eq(0).unbind("click");
      $(e.target).children(".searchListUser").eq(0).css("display", "none");
    });

  }

  /**
   * 倍率扩大音量 & UI
   * @description 使用Web Audio API放大视频音量(超过100%之类的需求)
   * @notice 这个功能会重新挂接音频处理上下文的图，所以会导致主站播放器的高级音效失效，望周知
   * @refer http://www.voidcn.com/article/p-pqutjsey-bnu.html https://developer.mozilla.org/zh-CN/docs/Web/API/MediaElementAudioSourceNode
   */
  audioNodeGain() {
    // source(音频源)-->gainNode(音频处理模块)-->audioContext.destination(音频上下文的输出)
    let audioCtx = new window.AudioContext();
    let audioTrack = document.querySelector("video");
    // 创建一个音源
    let source = audioCtx.createMediaElementSource(audioTrack);
    // 创建增益节点
    let gainNode = audioCtx.createGain();
    // 设置初始增益值
    gainNode.gain.value = 1;
    // 首先要将他们挂接起来，否则视频会一直因为没有输出导致无法播放
    // 将音频源与音频处理模块连接
    source.connect(gainNode);
    // 将音频处理模块的输出连接到音频上下文图的输出
    gainNode.connect(audioCtx.destination);
    let htmlUi = `
    <div>
      <label>倍数音量</label>
      <div class="control-checkbox audioVolumeGain" data-bind-key="audioVolumeGain" data-bind-attr="false"></div>
    </div>
    `;
    $(".setting-panel>.setting-panel-content").append(htmlUi);
    $(".setting-panel-content").click((e) => {
      if (
        e.target.dataset.bindKey == "audioVolumeGain" &&
        e.target.dataset.bindAttr == "false"
      ) {
        this.audioOriginVolume = Number(
          document.querySelector(".volume-panel-content").children[0].innerText
        );
        let title = "音量扩大倍数【0-3之间】，数值过大会导致爆音。";
        let reg = /^[0-3](\.[0-9]{1,2})?$/;
        let rate = prompt(title, "");
        if (rate != null && rate != "") {
          if (reg.test(rate)) {
            gainNode.gain.value = rate;
            leftBottomTip(`已经将音量改为原来的`, `${rate}倍。`);
            document.querySelector(
              ".volume-panel-content"
            ).children[0].innerText = Number(this.audioOriginVolume) * rate;
            document.querySelector(".audioVolumeGain").dataset.bindAttr =
              "true";
            this.audioNodeGainFlag = true;
          } else {
            window.parent.postMessage(
              {
                action: "notice",
                params: {
                  title: "AcFun助手",
                  msg: "请输入正确的音量扩大倍数",
                },
              },
              "*"
            );
          }
        }
      } else if (
        e.target.dataset.bindKey == "audioVolumeGain" &&
        e.target.dataset.bindAttr == "true"
      ) {
        gainNode.gain.value = 1;
        leftBottomTip(`已经将音量还原为1倍。`);
        document.querySelector(".audioVolumeGain").dataset.bindAttr = "false";
        document.querySelector(".volume-panel-content").children[0].innerText =
          this.audioOriginVolume;
      }
    });
  }

  /**
   * Windows MediaSession 支持
   * @refer https://www.cnblogs.com/ajanuw/p/8422176.html https://w3c.github.io/mediasession/#the-mediasession-interface https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSession#%E4%BE%8B%E5%AD%90
   * @ideaRefer https://github.com/Yzi/AcFun-TheaterMode
   */
  videoMediaSession(dougaInfo) {
    fgConsole(this, this.videoMediaSession, "Init MediaSessionModule.", 1, false);
    if (!isBoughtBangumi()) { return }
    let videoInfo = {};
    try {
      if (dougaInfo) {
        videoInfo = dougaInfo;
      } else {
        throw TypeError;
      }
      try {
        this.acNum = REG.acVid.exec(location.href)[2];
      } catch (error) {
        this.acNum = REG.acBangumid.exec(location.href)[2];
      }
      if (videoInfo.bangumiId) {
        videoInfo = {
          title: videoInfo.showTitle,
          channel: {
            parentName: "番剧",
            name: videoInfo.acfunOnly ? "独家" : "普通"
          },
          user: {
            name: "AcFun"
          },
          coverUrl: videoInfo.image,
          videoList: [],
        };
      }
      throw TypeError;
    } catch (error) {
      videoInfo = {
        title:
          document.querySelectorAll("meta")[5].content.split(",")[0] ||
          document.querySelector(".video-description.clearfix>.title").innerText,
        channel: {
          parentName:
            document.querySelectorAll("meta")[5].content.split(",")[1] ||
            document.querySelector("#nav > div.clearfix.wp.nav-parent > div.nav-left > div.channel-bread > a.channel-second").innerText,
          name:
            document.querySelectorAll("meta")[5].content.split(",")[2] ||
            document.querySelector("#nav > div.clearfix.wp.nav-parent > div.nav-left > div.channel-bread > a.channel-third").innerText,
        },
        user: {
          name: document.querySelectorAll("meta")[5].content.split(",")[3],
        },
        coverUrl: "",
        videoList: [],
      };
      //封面
      try {
        //Up主头像
        videoInfo.coverUrl = document.querySelector("#main-content > div.left-column > div.introduction > div.up-area > div.up-details > a > img").src;
      } catch (error) {
        try {
          //直接拿番剧推荐视频封面
          videoInfo.coverUrl = document.querySelector("#main-content > div.right-column > div.highlights > div.clearfix.area.highlights-list > figure:nth-child(1) > a > img").src;
        } catch (error) {
          //没有番剧推荐视频那就拿大家都在看的封面得了
          videoInfo.coverUrl = document.querySelector("#pagelet_newrecommend > div > div > figure:nth-child(1) > a > img").src;
        }
      }
      //分P
      this.mediaSessionGatherMultiPartInfo(videoInfo);
    }
    fgConsole(this, this.videoMediaSession, "Attach MediaSession ActionHandler.", 1, false);
    // fgConsole(this, this.videoMediaSession, `向MediaSession报告的信息${videoInfo.title}${videoInfo.coverUrl}${videoInfo.user.name}${videoInfo.videoList.length != 0}`, 1, false);
    this.mediaSessionCore(videoInfo);
  }

  mediaSessionCore(videoInfo) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `${videoInfo.title} - ${videoInfo.channel.parentName} > ${videoInfo.channel.name}`,
      artist: "AcFun: " + videoInfo.user.name,
      artwork: [
        { src: videoInfo.coverUrl, sizes: "284x166", type: "image/jpeg" },
      ],
    });

    //MediaSession进度条处理 绝了，现在Windows还不支持
    // let videoElem = document.getElementsByTagName("video")[0];
    // videoElem.addEventListener('timeupdate', (e) => {
    //   navigator.mediaSession.setPositionState({
    //     duration: videoElem.duration,
    //     playbackRate: videoElem.playbackRate,
    //     position: videoElem.currentTime
    //   });
    // }, false);

    navigator.mediaSession.setActionHandler("seekbackward", function () {
      document.querySelector("video").currentTime -= 5;
    });
    navigator.mediaSession.setActionHandler("seekforward", function () {
      document.querySelector("video").currentTime += 5;
    });
    //鸡肋的时间设定
    navigator.mediaSession.setActionHandler("seekto", function (details) {
      document.querySelector("video").currentTime = Number(details.seekTime);
    });

    fgConsole(
      this,
      this.videoMediaSession,
      "Video MediaSession Attach Success.",
      1,
      false
    );

    if (videoInfo.videoList.length > 1) {
      try {
        this.mediaSessionNowPlayingIndex =
          REG.videoPartNumByURL.exec(location.href)[1] || 0;
      } catch (error) {
        this.mediaSessionNowPlayingIndex = 0;
      }
      this.partNum = videoInfo.videoList.length;

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        this.mediaSessionPlayer("previous", videoInfo);
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        this.mediaSessionPlayer("next", videoInfo);
      });
      fgConsole(
        this,
        this.videoMediaSession,
        "Video MediaSession MultiPart Attach Success.",
        1,
        false
      );
    }
  }

  mediaSessionPlayer(action, videoInfo) {
    switch (action) {
      case "previous":
        this.mediaSessionNowPlayingIndex = (this.mediaSessionNowPlayingIndex - 1) % (videoInfo.videoList.length - 1);
        break;
      case "next":
        this.mediaSessionNowPlayingIndex = (this.mediaSessionNowPlayingIndex + 1) % (videoInfo.videoList.length - 1);
        break;
      default:
        break;
    }
    document.querySelector(".scroll-div.over-parts").children[this.mediaSessionNowPlayingIndex].click();
    document.querySelector("video").play();
  }

  /**
   * 重载MediaSession
   */
  mediaSessionReset() {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "",
      artist: "AcFun",
      artwork: [],
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => { });
    navigator.mediaSession.setActionHandler("nexttrack", () => { });
  }
  mediaSessionReAttach() {
    let videoInfo = {};
    setTimeout(() => {
      videoInfo = {
        title: document.querySelector(".video-description.clearfix>.title").innerText,
        channel: {
          parentName: document.querySelector("#nav > div.clearfix.wp.nav-parent > div.nav-left > div.channel-bread > a.channel-second").innerText,
          name: document.querySelector("#nav > div.clearfix.wp.nav-parent > div.nav-left > div.channel-bread > a.channel-third").innerText,
        },
        user: {
          name: document.querySelector("a.up-name").innerText,
        },
        coverUrl: document.querySelector("#main-content > div.left-column > div.introduction > div.up-area > div.up-details > a > img").src,
        videoList: [],
      };
      this.mediaSessionGatherMultiPartInfo(videoInfo);
      if (this.mediaSessionJudgeChangeVideo()) {
        this.mediaSessionNowPlayingIndex = 0;
        this.mediaSessionReset();
        this.mediaSessionCore(videoInfo);
      }
    }, 312);
  }

  mediaSessionGatherMultiPartInfo(videoInfo) {
    try {
      videoInfo["videoList"] = document.querySelector(".scroll-div.over-parts").children;
    } catch (error) {
      try {
        videoInfo["videoList"] = document.querySelector(".scroll-div").children;
      } catch (error) {
        fgConsole(this, this.videoMediaSession, "Normal Video.", 1, false);
      }
    }
  }

  mediaSessionJudgeChangeVideo() {
    try {
      return this.acNum != REG.acVid.exec(location.href)[2];
    } catch (error) {
      return this.acNum != REG.acBangumid.exec(location.href)[2];
    }
  }

  /**
   * 时间轴章节标记主函数
   * @param {string} massText
   */
  timelineDotsMain(massText) {
    if (massText) {
      //清除原来的章节标记
      document.querySelectorAll(".pro-chapterDots").forEach((e) => {
        e.remove();
      });
      this.timelineDotsTextCache = massText;
      let reg_for_time = new RegExp("[0-9]{1,3}[:分][0-9]{1,2}秒?");
      let if_matchTime = reg_for_time.exec(massText);
      //文本内存在时间标记
      if (if_matchTime) {
        var chapterDic = this.timelineDotsTextProcess(massText);
        // console.log(chapterDic)
        this.timelineDotsResultCache = chapterDic;
        this.timelineDotsRender(chapterDic);
      } else {
        alert(
          "选取的文段可能不符时间轴章节标记格式，请确认它类似“01:12 01:12 2021-2-11 正片”。"
        );
      }
    } else {
      fgConsole(this, this.timelineMain, "No content.", 3, false);
    }
  }

  timelineDotsRender(chapterDic) {
    document.querySelectorAll(".pro-chapterDots").forEach((e) => {
      e.remove();
    });
    Object.keys(chapterDic).forEach((timeTag) => {
      this.timelineDotsAdd(timeTag, chapterDic[timeTag]);
    });
  }

  /**
   * 时间标记和描述提取
   * @param {string} massText 输入文本
   * @returns {object} {"00:00":"新年这一刻",....}
   */
  timelineDotsTextProcess(massText) {
    let resultArr = [];
    let resultDic = {};
    let reg_for_time = new RegExp("[0-9]{1,3}[:][0-9]{1,2}");
    let srcArr = massText.split(" ");
    let lastDicKey = "";
    srcArr.forEach((e) => {
      if (resultArr.indexOf(e) == -1) {
        resultArr.push(e);
      }
    });
    resultArr.forEach((e) => {
      if (reg_for_time.test(e)) {
        resultDic[e] = "";
        lastDicKey = e;
      } else {
        resultDic[lastDicKey] += " " + e;
      }
    });
    return resultDic;
  }

  /**
   * 处理单个章节标记点
   * @param {string} time 时间 "01:02"
   * @param {string} desc 描述 "《【年在一起】年年黏黏年》"
   * @method 算出时间百分比 -> 获取时间轴长度 -> 计算出章节标记点所在位置 -> 填入DOM对象的css属性中 -> 增加DOM元素
   */
  timelineDotsAdd(time, desc = "") {
    var _timer = setInterval(() => {
      var processBarLen = document.querySelector(".wrap-progress").offsetWidth;
      if (processBarLen != 0) {
        //获取视频的时间长度在1%的单位时间 (秒)
        let single = Number(document.querySelector("video").duration) / 1e2;
        //此时间Tag的百分比 100%=1.0
        let percent = Number(
          (Duration2Seconds(time) / single).toFixed(2) / 1e2
        );
        //此时间标记在时间轴上的位置
        let progressLen = Number((processBarLen * percent).toFixed(1));
        // console.log("processBarLen: ", processBarLen)
        // console.log("length: ", processBarLen * percent.toFixed(1))
        // console.log(percent, progressLen)
        addElement({
          tag: "div",
          css: `left: ${progressLen}px;position: absolute;-moz-box-sizing: border-box;box-sizing: border-box;top: 50%;background-color: #F44C5D;border: 2px solid white;width: 14px;height: 14px;margin-left: -14px;top: 50%;margin-top: -7px;opacity: 0.5;-webkit-transition: opacity 0.3s, height 0.3s, width 0.3s, margin-top 0.3s, margin-left 0.3s;transition: opacity 0.3s, height 0.3s, width 0.3s, margin-top 0.3s, margin-left 0.3s;z-index: 98;`,
          target: document.querySelector(".container-pro-handle"),
          classes: "pro-chapterDots",
          createMode: "append",
          title: desc,
        });
        clearInterval(_timer);
      }
    }, 1000);
  }

  /**
   * 调整视频时间以平均标准帧步进
   * @param {int} frameRate 每一千秒所播放的帧数
   * @param {string} mode 前进或者后退 f or b
   * @QA 为什么不能去获取实时的帧率：different time means different frame. In the example, Chrome is trying to match the 24Hz of the movie on my 60Hz computer by trying to get 45 Hz ( = 60 / 2 + 60 / 4), the nearest from 48 = 2*24. For the 21 created frames i don't know if it interpolates or merely duplicates the frames. It surely changes depending on browser/device (Gpu especially).Anyway given the high cost of checking with the imageData。<=插件去实时获取的开销很大。
   * @refer https://stackoverflow.com/questions/28420724/how-to-determine-the-intended-frame-rate-on-an-html-video-element
   * @origin github@RadND
   */
  frameStepFwd(mode = "f", frameRate) {
    // console.log(mode, frameRate, document.getElementsByTagName("video")[0].currentTime)
    if (frameRate) {
      document.getElementsByTagName("video")[0].pause();
      switch (mode) {
        case "f":
          document.getElementsByTagName("video")[0].currentTime += 1000 / frameRate;
          break;
        case "b":
          document.getElementsByTagName("video")[0].currentTime -= 1000 / frameRate;
          break;
      }
    }
  }

  getVideoFrameRate() {
    let vQuality = document.querySelector("div.control-btn.quality").children[0]
      .innerText;
    let frameRateExp = new RegExp("[0-9].*p([0-9].*)");
    let vFrameRate = "";
    //假如是自动画质选项，那么稳定之后的画质应该是当前稿件可选画质的最高选项，我们获取到最高选项之后在画质参考选项中获取名称，然后获取标准帧率。
    if (vQuality == "自动") {
      vFrameRate = frameRateExp.exec(
        videoQualitiesRefer[
          document.querySelector("div.control-btn.quality").children[1]
            .children[0].children[0].dataset.qualityType
        ].qualityType
      );
    }
    //如果选定了画质，那么直接在画质参考中获取标准帧率。
    if (vFrameRate) {
      return standardFrameRate[vFrameRate[1]];
    } else {
      //如果是不固定的帧率，那么就以24帧为标准。
      return standardFrameRate["24"];
    }
  }

  /**
   * 帧步进-入口
   * @description 包括了帧步进快捷键和UI入口
   */
  frameStepFwdMain(UIneed) {
    if (UIneed) {
      let fwdUIIcon = `<svg t="1628246559047" style="transform: scale(0.3);" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3172" width="200" height="200"><path d="M475.542857 961.142857c-9.371429 0-18.742857-3.542857-25.942857-10.742857-14.285714-14.285714-14.285714-37.485714 0-51.885714L836.228571 512 449.6 125.485714c-14.285714-14.285714-14.285714-37.485714 0-51.885714 14.285714-14.285714 37.485714-14.285714 51.885714 0l412.457143 412.457143c14.285714 14.285714 14.285714 37.485714 0 51.885714L501.485714 950.4c-7.2 7.2-16.571429 10.742857-25.942857 10.742857z" fill="#ffffff" p-id="3173"></path><path d="M169.257143 961.142857c-9.371429 0-18.742857-3.542857-25.942857-10.742857-14.285714-14.285714-14.285714-37.485714 0-51.885714L529.942857 512 143.314286 125.485714c-14.285714-14.285714-14.285714-37.485714 0-51.885714 14.285714-14.285714 37.485714-14.285714 51.885714 0l412.457143 412.457143c14.285714 14.285714 14.285714 37.485714 0 51.885714L195.2 950.4c-7.2 7.2-16.571429 10.742857-25.942857 10.742857z" fill="#ffffff" p-id="3174"></path></svg>`
      let contentElem = `<div class="control-btn speed" type='frameStep'>
      <div class="speed-panel frameStep-panel">
        <ul>
          <li data-mode="f" onclick="MessagePush('frameStep', 'f')">下一帧</li>
          <li data-mode="b" onclick="MessagePush('frameStep', 'b')">上一帧</li>
        </ul>
            <div class="transparent-placeholder"></div>
      </div>${fwdUIIcon}
    `;
      $(" .box-right ").prepend(contentElem);
    }

    window.addEventListener("message", (e) => {
      if (e.data.to == "AcFunHelperFrontend") {
        if (e.data.msg.modName === "frameStep" && judgeEditorActiveState() === false) {
          this.frameStepFwd(e.data.msg.msg, this.getVideoFrameRate());
        }
      }
    })

  }

  /**
   * 播放器弹幕操作菜单显-显示状态
   * @param {bool} sw 
   */
  hideDanmakuOperator(sw, maskSw) {
    this.hideDanmakuOperatordanmakuOprFlag = sw;
    switch (sw) {
      case true:
        if (this.hideDanmakuOperatorStyleAdded) {
          document.querySelector("#hideDanmakuOperatorBarStyle").disabled = false;
          document.querySelector("#danmakuLayerMask") ? document.querySelector("#danmakuLayerMask").style.display = 'block' : "";
          document.querySelector(".danmakuOpr").dataset.bindAttr = false;
        } else {
          createElementStyle(".context-menu.danmaku{display:none !important;}", document.head, "hideDanmakuOperatorBarStyle");
          if (maskSw) {
            MaskElement(".danmaku-screen", "position: absolute; width: 100%; height: 80%; left: 0px; top: 0px; background: #fff; opacity: 0; filter: alpha(opacity=0);z-index:0", "danmakuLayerMask");
          }
          document.querySelector(".danmakuOpr").dataset.bindAttr = false;
          this.hideDanmakuOperatorStyleAdded = true;
        }
        break;
      case false:
        const mainProcElem = document.querySelector("#hideDanmakuOperatorBarStyle");
        if (mainProcElem) {
          mainProcElem.disabled = true;
          document.querySelector("#danmakuLayerMask") ? document.querySelector("#danmakuLayerMask").style.display = 'none' : "";
        }
        document.querySelector(".danmakuOpr").dataset.bindAttr = true;
        break;
    }
  }

  hideDanmakuOperatorUI() {
    let htmlUi = `
    <div>
      <label>弹幕操作</label>
      <div class="control-checkbox danmakuOpr" data-bind-key="danmakuOpr" data-bind-attr="${!this.hideDanmakuOperatordanmakuOprFlag}"></div>
    </div>
    `;
    $(".setting-panel>.setting-panel-content").append(htmlUi);
    $(".setting-panel-content").click((e) => {
      if (e.target.dataset.bindKey == "danmakuOpr" && e.target.dataset.bindAttr == "false") {
        this.hideDanmakuOperator(false);
      } else if (e.target.dataset.bindKey == "danmakuOpr" && e.target.dataset.bindAttr == "true") {
        this.hideDanmakuOperator(true);
      }
    })
  }

  /**
   * 历史成就
  */
  historocalAchieve() {
    chrome.runtime.sendMessage({ action: "achievementEvent", params: { responseRequire: true, asyncWarp: true, data: { action: "get", url: window.location.href } } }, function (response) {
      var tag;
      try {
        tag = document.querySelector(".reco-tag").innerText;
      } catch (error) {
        tag = null;
      }
      if (response.data.length != 0) {
        //数据库有数据
        if (tag) {
          return
        } else {
          //要加上Tag
          addElement({ tag: 'a', target: document.querySelector(".video-description .title"), classes: 'reco-tag', createMode: "headAppnd", thisHTML: `${new Date(response.data[0].date).getFullYear()}-${new Date(response.data[0].date).getMonth() + 1}-${new Date(response.data[0].date).getDate()} ${response.data[0].tag}` })
        }
      } else {
        if (tag) {
          //数据库没数据，并且存在榜单数据，那就写数据进数据库
          chrome.runtime.sendMessage({ action: "achievementEvent", params: { responseRequire: true, asyncWarp: true, data: { action: "put", url: window.location.href, tagData: tag } } }, function (response) { })
        }
      }
    })
  }

  /**
   * 后台自动暂停视频
   */
  getSomeSleep() {
    let originVolumeNumber = 0;
    document.addEventListener("visibilitychange", () => {
      if (this.sleepPauseSw) {
        originVolumeNumber = Number(document.querySelector(".volume-panel-content").children[0].innerText) / 1e2;
        let videoElemt = document.querySelector("video");
        switch (document.visibilityState) {
          case "hidden":
            this.beforeChangeTabPlayStatus = !videoElemt.paused;
            //开启画中画则不暂停
            if (!document.pictureInPictureElement) {
              videoElemt.pause();
            }
            break;
          case "visible":
            if (this.beforeChangeTabPlayStatus) {
              if (!document.pictureInPictureElement) { videoElemt.volume = 0 };
              videoElemt.play();
              if (!document.pictureInPictureElement) {
                var _voluemUpper = setInterval(() => {
                  //慢慢提大音量
                  let lastVolume = 0;
                  if (Number(videoElemt.volume) != Number(originVolumeNumber) && Number(videoElemt.volume) <= 1) {
                    lastVolume = Number((videoElemt.volume).toFixed(2));
                    videoElemt.volume = Number(lastVolume) + 0.01;
                    if (Number(videoElemt.volume) == 1) {
                      clearTimeout(_voluemUpper);
                    }
                    lastVolume = Number((videoElemt.volume).toFixed(2));
                  } else {
                    clearTimeout(_voluemUpper);
                  }
                }, 10);
              }
            }
            break;
        }
      }
    })
  }
  sleepPauseSwSetter(sw) {
    this.sleepPauseSw = sw;
  }
  getSomeSleepUI(sw = false) {
    this.sleepPauseSwSetter(sw);
    let htmlUi = `
    <div>
      <label>后台暂停</label>
      <div class="control-checkbox getSomeSleep" data-bind-key="getSomeSleep" data-bind-attr="${sw}"></div>
    </div>
    `;
    $(".setting-panel>.setting-panel-content").append(htmlUi);
    $(".setting-panel-content").click((e) => {
      if (e.target.dataset.bindKey == "getSomeSleep" && e.target.dataset.bindAttr == "false") {
        this.sleepPauseSwSetter(true);
        document.querySelector(".getSomeSleep").dataset.bindAttr = true;
      } else if (e.target.dataset.bindKey == "getSomeSleep" && e.target.dataset.bindAttr == "true") {
        this.sleepPauseSwSetter(false);
        document.querySelector(".getSomeSleep").dataset.bindAttr = false;
      }
    })
  }
  getSomeSleepFront(defaultMode, ui) {
    if (ui) {
      this.getSomeSleepUI(defaultMode);
    }
    if (defaultMode) {
      this.sleepPauseSwSetter(defaultMode);
    }
    this.getSomeSleep();
  }

}
