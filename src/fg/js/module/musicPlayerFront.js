/**
 * 后台音乐播放器前台
 */
class musicPlayerFront {
    constructor() {
        this.playingUrl = window.location.toString();
    }

    hookListener() {
        let targetVideo = document.getElementsByTagName("video")[0];
        targetVideo.addEventListener('ended', this.nextOne.bind(null), false);
        // targetVideo.addEventListener("timeupdate", function () {
        //     console.log(targetVideo.currentTime)
        //     if (targetVideo.currentTime == targetVideo.duration) {
        //         console.log("ended")
        //         chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: "next" } }, function (response) { });
        //     }
        // }, false);
        console.log("hooked");
        this.addMusicPlayerUI();
    }

    nextOne() {
        alert("next ready");
        chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: "next" } }, function (response) { });
    }

    handler(sign) {
        chrome.runtime.sendMessage({ action: "musicPlayerSign", params: { sign: sign } }, function (response) { });
    }

    addMusicPlayerUI() {
        var timer = setInterval(() => {
            let nodes = $('.box-right');
            if (nodes.length>0) {
                console.log("this")
                let html = `
                <div class="control-btn speed" type='musicPlayer'><span data-bind-key="musicPlayer">Mp</span>
                    <div class="speed-panel musicPlayer-panel">
                        <ul>
                            <li class = 'lastOne' data-val="last" >◀ 上一首</li>
                            <li class = 'nextOne' data-val="next" >▶ 下一首</li>
                            <li class = 'addThisToList' >✚ 添加</li>
                            <li class = 'jumpToNext' >↰ 等下播放</li>
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
                            this.handler();
                            break;
                        case "jumpToNext":
                            this.handler();
                            break;
                    }
                });
                clearInterval(timer);
            }
        }, 200)


    }

}