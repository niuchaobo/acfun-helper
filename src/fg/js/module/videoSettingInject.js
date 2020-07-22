//----------------播放器模式（观影、网页全屏、桌面全屏）--------------------
//通过这种方式和content_script（videoSetting.js）通信，接收videoSetting.js传过来的数据
var hiddenDiv = document.getElementById('myCustomEventDiv');
if(!hiddenDiv) {
    hiddenDiv = document.createElement('div');
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);
}
hiddenDiv.addEventListener('myCustomEvent', function() {
    // console.log(window.player);
    var eventData = document.getElementById('myCustomEventDiv').innerText;
    let options = JSON.parse(eventData);
    switch(options.player_mode) {
        case 'default':
            break;
        case 'film':
            let _timer = setInterval(function () {
                let _header = document.getElementById("header");
                let _main = document.getElementById("main");
                let _vd = document.querySelector(".video-description");
                let _toolbar = document.getElementById("toolbar");
                let _rc = document.querySelector(".right-column");
                let _retry = 10;
                //如果不判断直接调用会报错，toolbar节点可能还没加载
                if(_header && _main && _vd && _toolbar && _rc){
                    window.player.emit('filmModeChanged', true);
                    let w2 = document.getElementsByTagName("video")[0].offsetWidth;
                    clearInterval(_timer);
                }
            },1000);
            break;
        case 'web':
            window.player.emit('fullScreenChange', "web");
            break;
        case 'screen':
            //Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
            //此功能只能由用户触发

            /*console.log("screen--------------------------------")
            //window.player.emit('fullScreenChange','screen');
            document.getElementsByClassName('container-player')[0].requestFullscreen();

            //window.player.requestFullscreen();
            break;*/
    }

    if(options.endedAutoExitFullscreensw){
        try {
            document.getElementsByTagName("video")[0].addEventListener('ended', function () {
                console.log("播放结束");
                let x = (!document.querySelector("div.btn-film-model").children[0].dataset.bindAttr == "false" || !document.querySelector("div.btn-film-model").children[0].dataset.bindAttr == "false");
                if(!window.player._loop && !x){
                    window.player.emit('filmModeChanged', false);
                    window.player.emit('fullScreenChange', false);
                }
            });
        } catch (error) {
            console.log("[LOG]Frontend-videoSettingInject: May not in douga Page.")
        }
    }

});

//----------------------自定义倍速------------------------
function setCustomPlaybackRate(event) {
    event.stopPropagation();
    event.preventDefault();
    let v = document.getElementsByTagName("video")[0];
    let title = "请输入播放倍速【0-5之间（不包含5），最多2位小数】，例如：0.1";
    let reg = /^[0-4](\.[0-9]{1,2})?$/;
    let rate = prompt(title,"");
    if(rate!=null && rate!=''){
        console.log(rate);
        if(reg.test(rate)){
            v.playbackRate  = rate;
        }else{
            window.parent.postMessage({
                action: 'notice',
                params: {
                    title: 'AcFun助手',
                    msg:'请输入正确的播放速度',
                }
            }, '*');
        }
    }
}

//从Player获取douga danmaku 信息，传递给父级
try {
    window.parent.postMessage({
        to:'pageBtfy' ,
        msg:`${JSON.stringify(window.player.videoInfo)}`
    },'*');
    
    window.parent.postMessage({
        to:'frame_danmaku',
        acId:`${window.player.acId}`,
        msg:`${JSON.stringify(window.player._danmaku.list)}`
    },'*');

    window.parent.postMessage({
        to:'vs_videoInfo',
        msg:`${JSON.stringify(window.player.videoInfo.videoList)}`
    },'*');
} catch (error) {
    console.log("[LOG]Frontend-videoSettingInject: Douga Info Sent Fail,May Influent videoSetting.")
}

//调用画中画模式
function setPictureInPictureMode() {
    let v = document.getElementsByTagName("video")[0];
    v.requestPictureInPicture();
    console.log('[LOG]Frontend-videoSettingInject: Calling PictureInPicture Mode.');
}

quickJump = (time, part)=> {
    let v_obj = document.getElementsByTagName("video")[0];
    let url = window.location.href
    if($('.part .part-wrap .scroll-div .single-p').length && part){
        if (!(url.split('_')[1] == part || (url.search('_') == -1 && part == 1))){ //判断是否为当前part，符合要求直接操作进度条
            url = url.split('_')[0] + '_' + part
            $('.part .part-wrap .scroll-div .single-p')?.eq(part - 1).trigger("click")
        }
    }
    setTimeout(() => {
        v_obj.currentTime = Duration2Seconds(time);
        console.log('[LOG]Frontend-videoSettingInject: Jump_ok');
    }, 500);
    
}

function Duration2Seconds(time){
    let str = time;
    let arr = str.split(':');
    let Tm=Number(arr[0]*60);
    let Ts=Number(arr[1]);
    let seconds=Tm+Ts;
    return seconds;
}