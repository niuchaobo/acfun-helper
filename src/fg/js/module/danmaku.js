/**
 * 弹幕处理
 */

class Danmaku {
    constructor() {

    }

    cacheStore(){
        window.addEventListener('message',function(e){
            if(e.data.to=='frame_danmaku'){
                sessionStorage.setItem("danmakuCache",`${JSON.stringify(e.data)}`);
            }
        })
    }
    
}