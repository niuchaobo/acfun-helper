/**
 * 视频播放设置
 */
class VideoSetting{
    constructor(){

    }

    //增加自定义播放速度
    customPlaybackRate(){
        let v = document.getElementsByTagName("video")[0];
        console.log(v);
        //console.log(v.defaultPlaybackRate);
        //v.playbackRate  = 0.1;

        $(".speed-panel").find('li:last').after('<li id="test123">自定义</li>')
        $('.speed-panel').on('click','#test123',function () {
            alert(1);
        })
    }

}