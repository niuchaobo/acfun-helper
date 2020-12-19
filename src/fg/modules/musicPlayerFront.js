/**
 * 后台音乐播放器前台
 */
class musicPlayerFront {
    constructor() {
        this.playingUrl = window.location.toString();
        this.targetVideo = {};
        this.modOption = {};
        this.loadOption();
        /**
         * 下一个需要播放的Part索引
         */
        this.partCount = 1;
        /**
         * 总分P数目
         */
        this.videoPartNum = 1;
        this.multiParts = {};
        this.devMod = false;
    }

    async loadOption() {
        this.modOption = await getStorage("MusicPlayList");
        console.log("[LOG]MusicPlayerFront>loadOption:loaded Configuration.");
    }

    main() {
        window.addEventListener("message", (e) => {
            if (e.data.to == "MpFront" && e.data.msg == "AcFunMusicPlayer") {
                this.hookListener();
            }
        }, false)
    }

    hookListener() {
        //关闭所有自动播放开关
        document.querySelector(".control-btn .btn-loop").children[0].dataset.bindAttr == "true" ? document.querySelector(".control-btn .btn-loop").children[0].click() : "";
        document.querySelector(".control-checkbox").dataset.bindAttr == "true" ? document.querySelector(".control-checkbox").click() : "";

        this.targetVideo = document.getElementsByTagName("video")[0];
        //判断多分P视频
        getAsyncDom(".over-parts", () => {
            this.multiParts = document.querySelector(".over-parts")
            this.videoPartNum = this.multiParts.childElementCount;
            this.getPlayingPart();
            this.devMod ? alert(`this.videoPartNum :${this.videoPartNum}`) : "";
        }, 500)

        //绑定执行函数
        if (this.videoPartNum > 1) {
            // if (this.modOption.multiPartContinue && this.videoPartNum > 1) {
            this.targetVideo.addEventListener('ended', this.nextOnePart.bind(this), false);
            this.devMod ? alert("multipart") : "";
        } else {
            this.targetVideo.addEventListener('ended', this.nextOne.bind(null), false);
            this.devMod ? alert("singlePart") : "";
        }

        console.log("[LOG]MusicPlayerFront>hookListener:hooked MusicPlayer.");

        //UI && autoPlayProcess
        this.addMusicPlayerUI();
        this.autoPlay();
    }

    autoPlay() {
        if (document.querySelector(".setting-panel-content").children[0].children[1].dataset.bindAttr == "false") {
            if (this.modOption.MusicPlayList["onLoadAutoPlay"] != undefined && this.modOption.MusicPlayList["onLoadAutoPlay"]) {
                this.targetVideo.play();
            }
        }
    }

    getPlayingPart() {
        for (let i = 0; i < this.videoPartNum; i++) {
            console.log(this.multiParts.children[i])
            if (this.multiParts.children[i].classList.length != 1) {
                this.partCount = i + 1;
                this.devMod ? alert("you are in " + i + " part") : ""
            }
        }
    }

    nextOnePart() {
        this.getPlayingPart();
        if (this.partCount < this.videoPartNum) {
            this.devMod ? alert("nextPart is " + this.partCount) : "";
            document.querySelector(".over-parts").children[this.partCount].click();
            this.autoPlay();
            this.partCount++;
        } else {
            chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: "next" } }, function (response) { });
        }
    }

    nextOne() {
        chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: "next" } }, function (response) { });
    }

    handler(sign) {
        chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: sign } }, function (response) { });
    }

    /**
     * 给播放器添加操作UI
     * @description
     * @todo <li class = 'addThisToList' sytle="display:none">✚ 添加</li><li class = 'jumpToNext' sytle="display:none">↰ 等下播放</li>
     */
    addMusicPlayerUI() {
        var timer = setInterval(() => {
            let nodes = $('.box-right');
            if (nodes.length > 0) {
                let html = `
                <div class="control-btn speed" type='musicPlayer'><span data-bind-key="musicPlayer">Mp</span>
                    <div class="speed-panel musicPlayer-panel">
                        <ul>
                            <li class = 'lastOne' data-val="last" >◀上一首</li>
                            <li class = 'nextOne' data-val="next" >▶下一首</li>
                        </ul>
                        <div class="transparent-placeholder"></div>
                </div>
                `;
                $(" .box-right ").prepend(html);
                $(" .box-right>div[type=musicPlayer] ").click((e) => {
                    let target = e.target.className;
                    switch (target) {
                        case "lastOne":
                            this.handler("last");
                            break;
                        case "nextOne":
                            this.nextOne();
                            break;
                        case "addThisToList":
                            // chrome.runtime.sendMessage({ action: "musicPlayerAdd", params: { linkUrl: window.location.href } }, function (response) { });
                            break;
                        case "jumpToNext":
                            // this.handler();
                            break;
                    }
                });
                clearInterval(timer);
            }
        }, 200)
    }

}