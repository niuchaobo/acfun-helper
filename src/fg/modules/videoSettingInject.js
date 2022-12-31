class VideoInject {
    constructor() {
        this.devMode = false;
        this.matchPage = new RegExp("((http(s)?:\\/\\/www.acfun.cn\\/v\\/ac\\d+)|(http(s)?:\\/\\/www.acfun.cn\\/bangumi\\/.*))").test(window.location.href);
        if (this.matchPage == false) {
            return;
        }
        globalThis.addEventListener("message", (e) => {
            if (e.data.to == "AcFunHelperInject") {
                this.MessageSwitch(e);
            }
        })
        /**@type {OptionStruct.DefaultStruct} */
        this.options = null;
    }

    /**@param {MessageSwitchStructs.WindowMsgRespnse} e */
    MessageSwitch(e) {
        const payload = e.data.data;
        if (payload.target != "VideoInject") {
            return;
        }
        switch (payload.InvkSetting.type) {
            case "function":
                if (typeof (this[payload.params.target]) == "function") {
                    this[payload.params.target](payload.params.params);
                }
                break;
            case "method":
                if (typeof (VideoInject[payload.params.target]) == "function") {
                    VideoInject[payload.params.target](payload.params.params);
                }
                break;
            default:
                VideoInject.MessagePush({
                    target: "",
                    InvkSetting: { type: "function" },
                    params: payload.params
                })
                break;
        }
    }

    /**@param {MessageSwitchStructs.WindowMsgPayload} e*/
    static MessagePush(e) {
        globalThis.postMessage({
            to: "AcFunHelperFrontend",
            data: e
        }, "*")
    }

    loadOptionData(e) {
        this.options = e;
    }

    playerMode() {
        let retryNum = 0;
        switch (this.options.player_mode) {
            case "default":
                break;
            case "film":
                let _timer = setInterval(function () {
                    retryNum++;
                    let _header = document.getElementById("header");
                    let _main = document.getElementById("main");
                    let _vd = document.querySelector(".video-description");
                    let _toolbar = document.getElementById("toolbar");
                    let _rc = document.querySelector(".right-column");
                    //如果不判断直接调用会报错，toolbar节点可能还没加载
                    if (retryNum > 11 || _header && _main && _vd && _toolbar && _rc) {
                        window.player.emit("filmModeChanged", true);
                        clearInterval(_timer);
                    }
                }, 1000);
                break;
            case "web":
                let _timer3 = setInterval(function () {
                    retryNum++;
                    let _header2 = document.getElementById("header");
                    let _main2 = document.getElementById("main");
                    let _vd2 = document.querySelector(".video-description");
                    let _toolbar2 = document.getElementById("toolbar");
                    let _rc2 = document.querySelector(".right-column");
                    if (retryNum > 11 || _header2 && _main2 && _vd2 && _toolbar2 && _rc2) {
                        window.player.emit("fullScreenChange", "web");
                        clearInterval(_timer3);
                    }
                }, 1000);
                break;
            case "desktop":
                //Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
                //此功能只能由用户触发
                //window.player.emit('fullScreenChange','screen');
                //document.getElementsByClassName('container-player')[0].requestFullscreen();
                //window.player.requestFullscreen();
                //break;

                //换另外一种方法
                let _timer2 = setInterval(function () {
                    const fullscreenBtn = document.querySelector(".fullscreen-screen>.btn-fullscreen");
                    if (fullscreenBtn) {
                        fullscreenBtn.click();
                        clearTimeout(_timer2);
                    }
                }, 300)
                break;
        }
    }

    exitAtEnd() {
        const exitModes = () => {
            window.player.emit("filmModeChanged", false);
            window.player.emit("fullScreenChange", false);

            if (this.options.endedAutoToCommentArea) {
                let _thisTimer = setTimeout(() => {
                    document.querySelector("#to-comm").click();
                    clearTimeout(_thisTimer);
                }, 435);
            }
        }
        //自动退出观影模式、网页全屏
        const autoExitMode = () => {
            let nowMode =
                document.querySelector("div.btn-film-model").children[0].dataset.bindAttr == "true" ||
                document.querySelector("div.btn-fullscreen").children[0].dataset.bindAttr == "web";
            let isMultiPart = document.querySelector("#main-content > div.right-column > div.part") != null;
            if (!window.player._loop && nowMode) {
                if (isMultiPart) {
                    //没有开启播放器的分P自动播放，就直接退出
                    if(document.querySelector(".control-checkbox").dataset.bindAttr == "false"){
                        exitModes()
                    }else{
                        //播放到了最后一个分P：播放器右侧分P列表的最后一个列表中元素具有active类
                        if(document.querySelector("ul.scroll-div").children[document.querySelector("ul.scroll-div").childElementCount-1].classList.contains("active")){
                            exitModes()
                        }
                    }
                } else {
                    exitModes()
                }
            }
        }
        try {
            document
                .getElementsByTagName("video")[0]
                .addEventListener("ended", () => {
                    this.options.endedAutoExitFullscreensw && autoExitMode();
                    this.options.endedCloseFg && window.close();
                });
        } catch (error) {
            console.log("[LOG]AcFunHelperFrontend-videoSettingInject: May not in douga Page.");
        }

    }

    watchNextRecommend() {
        if (this.options.endedAutoJumpRecommandFirstDougasw) {
            //自动观看“大家都在看”栏目第一个稿件
            document.getElementsByTagName("video")[0].addEventListener("ended", function () {
                const _timer = setTimeout(() => {
                    $(".left-bottom-tip").eq(0).children().eq(0).remove();
                    //因为跳转之后的第一个推荐稿件可能就是上一个稿件，所以这里是跳转到第二个稿件去。
                    document.getElementsByClassName("recommendation")[0].children[1].children[0].click();
                }, 5000);
                const text = document.querySelector(".area.recommendation").children[1].children[1];
                $(".left-bottom-tip").eq(0).append(`<div class="tip-item muted" id="cancelRecommand" ><div class="left-bottom-tip-text"><span>5秒后播放：《${text.children[0].innerText}》 ${text.children[1].innerText.replace("UP：", "")}</span>&nbsp;&nbsp;<span><a style='color:red;cursor: pointer;' id="cancelRecommand">取消</span></div></div>`);

                document.querySelector("#cancelRecommand").addEventListener("click", () => {
                    $(".left-bottom-tip").eq(0).children().eq(0).remove();
                    clearTimeout(_timer);
                })
            });
        }
    }

    frameStep() {
        if (this.options.frameStepSetting.enabled) {
            //快捷键绑定
            document.body.addEventListener('keydown', (e) => {
                if (e.shiftKey && e.key === "A") {
                    VideoInject.MessagePush({ target: { mod: "videoSetting", methodName: "frameStepFwd" }, InvkSetting: { type: "subMod", unsafe: true }, params: "b" });
                } else if (e.shiftKey && e.key === "D") {
                    VideoInject.MessagePush({ target: { mod: "videoSetting", methodName: "frameStepFwd" }, InvkSetting: { type: "subMod", unsafe: true }, params: "f" });
                }
            })
        }
    }

    playerFuncAutomate() {
        this.playerMode()
        this.exitAtEnd()
        this.watchNextRecommend()
        this.frameStep()
    }

    /**
     * 评论时间播放器快速跳转 - 处理函数
     * @param {string} time string eg:"00:01"or "00:00:10" 时间
     * @param {number} part int 视频的第几p
     */
    static quickJump(time, part) {
        const v_obj = document.getElementsByTagName("video")[0];
        const url = window.location.href;
        if ($(".part .part-wrap .scroll-div .single-p").length && part) {
            if (!(url.split("_")[1] == part || (url.search("_") == -1 && part == 1))) {
                //判断是否为当前part，符合要求直接操作进度条
                url = url.split("_")[0] + "_" + part;
                $(".part .part-wrap .scroll-div .single-p").eq(part - 1).trigger("click");
            }
        }
        setTimeout(() => {
            v_obj.currentTime = VideoInject.Duration2Seconds(time);
        }, 500);
    }

    /**
     * 时间描述转换为秒数
     * @param {string} time string eg:"00:01"or "00:00:10" 时间
     * @returns int seconds
     */
    static Duration2Seconds(time) {
        let arr = time.split(":");
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

    /**
     * 丢帧增量
     * @description 获取当前时间之前的丢帧增加的数量
     */
    dropFrameIncrementAlz() {
        document.getElementsByTagName("video")[0].addEventListener("timeupdate", function (e) {
            lastdropedFrame = nowDropFrame;
            nowDropFrame = window.player.$video.getVideoPlaybackQuality().droppedVideoFrames;
            dropFrameIncrement = nowDropFrame - lastdropedFrame;
            console.log(dropFrameIncrement)
        });
    }

}

const AcFunHelperVideoFunction = new VideoInject();
AcFunHelperVideoFunction.devMode && (window.AcFunHelperVideoFunction = AcFunHelperVideoFunction);