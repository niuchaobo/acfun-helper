/**
 * 直播
 */
class Live {
    constructor() {
        this.devMode = false;
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
        let timeNow = Date.parse(new Date());
        chrome.runtime.sendMessage({ action: "livePageWatchTimeRec", params: { receipt: true, startTime: timeNow } }, function () { });
    }

    async liveMediaSession(href) {
        let roomId = REG.liveRoomID.exec(href)[2];
        let liveData = JSON.parse(await fetchResult(acfunApis.liveInfo + roomId));
        console.log(liveData)
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

}