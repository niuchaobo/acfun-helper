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

    
}