/**
 * 后台音乐播放器前台
 */
class musicPlayerFront {
    constructor() {
        this.playingUrl = window.location.toString();
        this.targetVideo = {};
        this.modOption = {};
        this.loadOption();
        this.autoNextP = false;
    }

    async loadOption() {
        this.modOption = await getStorage("MusicPlayList");
    }

    hookListener() {
        this.targetVideo = document.getElementsByTagName("video")[0];
        this.targetVideo.addEventListener('ended', this.nextOne.bind(null), false);
        // targetVideo.addEventListener("timeupdate", function () {
        //     console.log(targetVideo.currentTime)
        //     if (targetVideo.currentTime == targetVideo.duration) {
        //         console.log("ended")
        //         chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: "next" } }, function (response) { });
        //     }
        // }, false);
        console.log("hooked");
        this.addMusicPlayerUI();
        if (this.modOption.MusicPlayList["onLoadAutoPlay"] != undefined && this.modOption.MusicPlayList["onLoadAutoPlay"]) {
            this.targetVideo.play();
        }
        if (document.querySelector(".setting-panel-content").children[0].children[1].dataset.bindAttr == "false") {
            this.autoNextP = true;
        }
    }

    nextOne() {
        // alert("next ready");
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
                console.log("this")
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