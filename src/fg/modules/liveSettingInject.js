class LiveFunction {
    constructor() {
        this.devMode = false;
        /**@type {OptionStruct.DefaultStruct} */
        this.options = null
        this.isRightPage = new RegExp("https://live.acfun.cn/live/*").test(
            window.location.href
        );
        if (this.isRightPage == false) {
            return;
        }
        globalThis.addEventListener("message", (e) => {
            if (e.data.to == "AcFunHelperInject") {
                this.MessageSwitch(e);
            }
        })
    }

    /**@param {MessageSwitchStructs.WindowMsgRespnse} e */
    MessageSwitch(e) {
        if (e.data.data.target != "AcFunHelperLiveFunction") {
            return
        }
        const payload = e.data.data;
        switch (payload.InvkSetting.type) {
            case "function":
                if (typeof (this[payload.params.target]) == "function") {
                    this[payload.params.target](payload.params.params);
                }
                break;
            default:
                InjectXHRDriver.MessagePush({
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

    onLoad(e) {
        this.load(e);

        let tryNum = 0
        let _timer = setInterval(function () {
            let node = document.getElementsByClassName("live-feed-messages");
            tryNum++;
            if (node.length > 0 || tryNum > 6) {
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
    }

    setPictureInPictureMode() {
        let v = document.getElementsByTagName("video")[0];
        document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture();
    }

    load(e) {
        this.options = e;

        let retryNum = 0;
        switch (this.options.liveplayer_mode ?? "default") {
            case "default":
                break;
            case "wide":
                let _timer = setInterval(function () {
                    let _rc = document.querySelector("#toggleWide");
                    retryNum++
                    if (_rc || retryNum > 6) {
                        document.querySelector("#toggleWide").click();
                        clearInterval(_timer);
                    }
                }, 1000);
                break;
            case "film":
                let _timer2 = setInterval(function () {
                    retryNum++
                    let _rc1 = document.querySelector(".control-btn.film-model");
                    if (_rc1 || retryNum > 6) {
                        document.querySelector(".control-btn.film-model").children[0].click();
                        clearInterval(_timer2);
                    }
                }, 1000);
                break;
            case "webfull":
                let _timer3 = setInterval(function () {
                    retryNum++
                    let _rc2 = document.querySelector(".fullscreen.fullscreen-web");
                    if (_rc2 || retryNum > 6) {
                        document.querySelector(".fullscreen.fullscreen-web").children[0].click();
                        clearInterval(_timer3);
                    }
                }, 1000);
                break;
        }
    }

}

const AcFunHelperLiveFunction = new LiveFunction();
AcFunHelperLiveFunction.devMode && (window.AcFunHelperLiveFunction = AcFunHelperLiveFunction)
