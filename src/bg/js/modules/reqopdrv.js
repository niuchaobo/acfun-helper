/**
 * 请求管理驱动
 */
class ReqOperationDrv{
    constructor(){

    }

    exp1(){
        //Listen for all req
        chrome.webRequest.onBeforeRequest.addListener (
            function(details) {
                chrome.tabs.query({active:true},function(tab){
                    var pageUrl = tab[0].url;
                    // base logic
                    console.log("current url -> " + pageUrl);
                });
                //cancel req.
                return {cancel: true};
            },
            {urls:["https://live.acfun.cn/api/channel/list?count=56&pcursor=&filters=[%7B%22filterType%22:1,+%22filterId%22:3%7D]"]},  //the req you need to listen.
            ["blocking"] 
        );
    }

    old_change_UA(){
        chrome.webRequest.onBeforeSendHeaders.addListener(
            function (req) {
                for (var i = 0; i < req.requestHeaders.length; ++i) {
                    if (req.requestHeaders[i].name === 'User-Agent') {
                        req.requestHeaders[i].value='Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36';
                        break;
                    }
                }
                return {requestHeaders: req.requestHeaders};
            },
            {
                urls: ["https://m.acfun.cn/live/detail/*"]
            },
            ["blocking", "requestHeaders"]
        );

    }
    
}