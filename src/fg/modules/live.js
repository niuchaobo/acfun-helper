/**
 * 直播
 */
class Live extends AcFunHelperFgFrame{
    constructor() {
        super();
        this.devMode = false;

        this.liveDanmakuPiPObsver = null;
        this.liveDanmakuPiPObsverInited = false;
        this.liveDanmakuPIPWindow = null;
    }

    async renderLive(params) {
        let href = window.location.href;
        let { url } = params;
        let retry = 10;
        while (retry > 0) {
            //发送
            this.devMode && console.log("[LOG]Frontend-Live>renderLive: retry:" + retry);
            var obj = document.getElementById("acfun-popup-helper");
            if (obj != null && obj != undefined) {
                var frameWindow = obj.contentWindow;
                frameWindow.postMessage({
                    action: 'updateLiveUrl',
                    params: {
                        live_url: url,
                    }
                }, href);
                break;
            } else {
                await mysleep(1000);
            }
            retry--;
        }
    }

    watchTimeRecord() {
        MessageSwitch.sendMessage('fg', { target: "livePageWatchTimeRec", InvkSetting: { receipt: true, type: "function" }, params: { startTime: Date.parse(new Date()) } })
    }

    async liveMediaSession(href) {
        let roomId = REG.liveRoomID.exec(href)[2];
        let liveData = JSON.parse(await fetchResult(acfunApis.liveInfo + roomId));
        if (liveData.streamName == undefined) {
            this.devMode && console.log("offline")
            return;
        }
        navigator.mediaSession.metadata = new MediaMetadata({
            title: `${liveData.title} - ${liveData.type.categoryName} > ${liveData.type.name}`,
            artist: liveData.user.name,
            artwork: [
                { src: liveData.coverUrls[0] + "?imageView2/1/w/284/h/166", sizes: '284x166', type: 'image/jpeg' },
            ]
        });
    }

    liveDanmakuPiPUi() {
        const danmakuPIPIcon = `<svg t="1631279771118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1294" width="20" height="20"><path d="M896.17 438.37m0 50.06l0 325.33q0 50.06-50.06 50.06l-30.38 0q-50.06 0-50.06-50.06l0-325.33q0-50.06 50.06-50.06l30.38 0q50.06 0 50.06 50.06Z" fill="#8d8d8d" p-id="1295"></path><path d="M609 438.36m0 50.06l0 325.33q0 50.06-50.06 50.06l-30.38 0q-50.06 0-50.06-50.06l0-325.33q0-50.06 50.06-50.06l30.38 0q50.06 0 50.06 50.06Z" fill="#8d8d8d" p-id="1296"></path><path d="M320.06 438.36m0 50.06l0 325.33q0 50.06-50.06 50.06l-30.38 0q-50.06 0-50.06-50.06l0-325.33q0-50.06 50.06-50.06l30.38 0q50.06 0 50.06 50.06Z" fill="#8d8d8d" p-id="1297"></path><path d="M270 895.92h-91.88a82.15 82.15 0 0 1-82.06-82.06V402a82.14 82.14 0 0 1 82.06-82.05H270A82.14 82.14 0 0 1 352.06 402v411.86A82.15 82.15 0 0 1 270 895.92z m-91.89-512A18.07 18.07 0 0 0 160.06 402v411.86a18.08 18.08 0 0 0 18.06 18.06H270a18.08 18.08 0 0 0 18.05-18.06V402A18.07 18.07 0 0 0 270 383.92zM558.94 895.92h-91.89A82.15 82.15 0 0 1 385 813.86V402a82.14 82.14 0 0 1 82.05-82.05h91.89A82.14 82.14 0 0 1 641 402v411.86a82.15 82.15 0 0 1-82.06 82.06z m-91.89-512A18.07 18.07 0 0 0 449 402v411.86a18.08 18.08 0 0 0 18.05 18.06h91.89A18.08 18.08 0 0 0 577 813.86V402a18.07 18.07 0 0 0-18.06-18.05zM846.12 895.92h-91.89a82.14 82.14 0 0 1-82.05-82.06V402a82.13 82.13 0 0 1 82.05-82.05h91.89A82.14 82.14 0 0 1 928.18 402v411.86a82.15 82.15 0 0 1-82.06 82.06z m-91.89-512A18.07 18.07 0 0 0 736.18 402v411.86a18.08 18.08 0 0 0 18.05 18.06h91.89a18.08 18.08 0 0 0 18.06-18.06V402a18.07 18.07 0 0 0-18.06-18.05z" fill="#8d8d8d" p-id="1298"></path><path d="M511.33 360.36a32 32 0 0 1-32-32V191.89H274.11a18.08 18.08 0 0 0-18.06 18.05v118.42a32 32 0 0 1-64 0V209.94a82.15 82.15 0 0 1 82.06-82h237.22a32 32 0 0 1 32 32v168.42a32 32 0 0 1-32 32z" fill="#8d8d8d" p-id="1299"></path><path d="M800.15 360.37a32 32 0 0 1-32-32v-118.4a18 18 0 0 0-18.05-18.06H509.51a32 32 0 0 1 0-64h240.63A82 82 0 0 1 832.19 210v118.4a32 32 0 0 1-32.04 31.97z" fill="#8d8d8d" p-id="1300"></path></svg>`
        $('#noticeBtn').after(DOMPurify.sanitize(`<i class="danmakuPIPIcon_icon" id="danmakuPIPIcon" title="独立弹幕窗口" style="position: absolute; width: 20px; left: 70px; top: 0px; cursor: pointer;">${danmakuPIPIcon}</i>`));
        document.querySelector("#danmakuPIPIcon").addEventListener("click", () => {
            this.liveDanmakuPiP();
        })
    }

    liveDanmakuPiP() {
        if (!!this.liveDanmakuPIPWindow) {
            this.liveDanmakuPIPWindow.close();
            this.liveDanmakuPIPWindow = null;
            return;
        }
        let scrollBarControl = true, _timeout;
        this.liveDanmakuPIPWindow = window.open("", "AcFunHelperLiveDanmakuPIP", 'height=450,width=350,location=false,menubar=false,status=false,titlebar=false,toolbar=false,');
        const styleElem = document.createElement("style");
        styleElem.id = "AcFunHelper_liveDanmakuPiP";
        styleElem.innerHTML = `
            body>div {
                margin: 4px 4px 4px 4px;
                border: 2px solid grey;
                box-shadow: 0 0 10px 0 #91c7ff78;
            }
            div.comment {
                border: 2px solid #fb7d7d;
            }
            .medal-wrapper {
                border: 2px solid black;
                border-radius: 20px;
            }
        `
        this.liveDanmakuPIPWindow.document.addEventListener("scroll", () => {
            if (_timeout) {
                window.clearTimeout(_timeout);
            }
            scrollBarControl = false;
            _timeout = window.setTimeout(() => {
                scrollBarControl = true;
            }, 2000);
        });
        this.liveDanmakuPIPWindow.document.head.append(styleElem);
        if (!this.liveDanmakuPiPObsverInited) {
            this.liveDanmakuPiPObsver = new DOMObserver(document.querySelector(".live-feed-messages"), (e) => {
                e.forEach(f => {
                    if (!!this.liveDanmakuPIPWindow && f.type == "childList" && f.addedNodes[0]?.nodeName == "DIV") {
                        this.liveDanmakuPIPWindow && this.liveDanmakuPIPWindow.document.body.append(f.addedNodes[0].cloneNode(true));
                        scrollBarControl ? this.liveDanmakuPIPWindow.document.body.scrollTop = this.liveDanmakuPIPWindow.document.body.scrollHeight : "";
                    }
                })
            }, true);
            this.liveDanmakuPiPObsver.configSet(true, false, false, true);
            this.liveDanmakuPiPObsver.createObserver();
            this.liveDanmakuPiPObsverInited = true;
        }
    }

}