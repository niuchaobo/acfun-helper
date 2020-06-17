/**
 * 弹幕处理
 */

class Danmaku {
    constructor() {

    }
    cacheStore(){
        window.addEventListener('message',function(e){
            if(e.data.to=='frame_danmaku'){
                chrome.storage.local.set({danmakuCache:`${JSON.stringify(e.data)}`});
            }
        })
    }
}