/**
 * 弹幕处理
 */

class Danmaku {
    constructor() {

    }

    /**
     * 将弹幕信息转存到sessionStorage
     */
    cacheStore(){
        window.addEventListener('message',function(e){
            if(e.data.to=='frame_danmaku'){
                sessionStorage.setItem("danmakuCache",`${JSON.stringify(e.data)}`);
            }
        })
    }
    
}