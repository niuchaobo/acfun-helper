/**
 * 直播
 */
class Live {
    constructor(){

    }

    async renderLive(params){
        let href = window.location.href;
        let {url} = params;
        let retry = 10;
        while(retry>0){
            //发送
            console.log("[LOG]Frontend-Live>renderLive: retry:"+retry);
            var obj = document.getElementById("acfun-popup-helper");
            if(obj!=null && obj!=undefined){
                var frameWindow = obj.contentWindow;
                frameWindow.postMessage({
                    action: 'updateLiveUrl',
                    params: {
                        live_url:url,
                    }
                }, href);
                break;
            }else{
                await mysleep(1000);
            }
            retry--;
        }

    }
}