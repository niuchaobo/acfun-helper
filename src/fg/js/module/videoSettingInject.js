var abPlayFirst = undefined;
var abPlaySecond = undefined;
var abPlayFlag = 0;
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
                //自动观看“大家都在看”栏目第一个稿件
                if(options.endedAutoJumpRecommandFirstDougasw){document.getElementsByClassName("recommendation")[0].children[0].children[0].click();}
                //自动退出宽屏、网页全屏
                console.log(document.querySelector("div.btn-film-model").children[0].dataset.bindAttr == "true" || document.querySelector("div.btn-fullscreen").children[0].dataset.bindAttr == "web");
                let x = (document.querySelector("div.btn-film-model").children[0].dataset.bindAttr == "true" || document.querySelector("div.btn-fullscreen").children[0].dataset.bindAttr == "web");
                if(!window.player._loop && x){
                    console.log("退出特殊播放模式")
                    window.player.emit('filmModeChanged', false);
                    window.player.emit('fullScreenChange', false);
                }
            });
        } catch (error) {
            console.log("[LOG]Frontend-videoSettingInject: May not in douga Page.")
        }
    }

    if(options.ProgressBarsw){
        // console.log("[LOG]Frontend-videoSettingInject: ProgressBarsw Status:"+options.ProgressBarsw)
        try {
            document.getElementsByTagName("video")[0].addEventListener("timeupdate",function(e){
                document.getElementById("achlp-proBar").style.width = document.getElementsByClassName("pro-current")[0].style.width;
                try {
                    document.getElementById("achlp-proBar-player").style.width = document.getElementsByClassName("pro-current")[0].style.width;
                } catch (error) {
                }
            })
        } catch (error) {
        }
    }
});
//AB回放
function updateAbPlayFirst(){
    if(abPlayFlag === 1){
        leftBottomTip('请先','停止')
        return;
    }
    let fistTime = Math.floor(document.getElementsByTagName("video")[0].currentTime);
    if(abPlaySecond && fistTime > abPlaySecond){
        leftBottomTip('A要在B之前','---鲁迅')
        return;
    }
    abPlayFirst = fistTime;
    leftBottomTip(`标记点A :`,`${timeToMinute(abPlayFirst)}`);
    $('.speed-panel>ul>.point-a').text(`A : ${timeToMinute(abPlayFirst)}`);
    abPlaySecond && leftBottomTip(`区间为`,`${timeToMinute(abPlayFirst)}至${timeToMinute(abPlaySecond)}`);
}
function updateAbPlaySecond(){
    if(abPlayFlag === 1){
        leftBottomTip('请先','停止');
        return;
    }
    let secondTime = Math.floor(document.getElementsByTagName("video")[0].currentTime);
    if(abPlayFirst && secondTime < abPlayFirst){
        leftBottomTip('B要在A之后','---鲁迅');
        return;
    } 
    abPlaySecond = secondTime;
    leftBottomTip(`标记点B :`,`${timeToMinute(abPlaySecond)}`);
    $('.speed-panel>ul>.point-b').text(`B : ${timeToMinute(abPlaySecond)}`)
    if(abPlayFirst > abPlaySecond){
        [abPlayFirst,abPlaySecond] = [abPlaySecond,abPlayFirst]
    }
    abPlayFirst && leftBottomTip(`区间为`,`${timeToMinute(abPlayFirst)}至${timeToMinute(abPlaySecond)}`);
}
function stopAbPlay(){
    if(abPlayFlag === 1){
        abPlayFirst=abPlaySecond=undefined;
        abPlayFlag = 0;
        document.getElementsByTagName("video")[0].removeEventListener("timeupdate",abPlayMain,false);
        $('.speed-panel>ul>.switch-button').text('开始');
        leftBottomTip('标记已清除,退出AB回放。');
        $('.speed-panel>ul>.point-a').text('标记点A');
        $('.speed-panel>ul>.point-b').text('标记点B');
        return;
    }
    if(abPlayFirst === undefined && abPlaySecond === undefined){
        leftBottomTip('AB回放未启用，请先设置','标记点');
        return;
    }
}
function abPlayMain(){
    if(abPlayFlag==0){return};
    if(Math.floor(window.player.currentTime) >= abPlaySecond){
        document.getElementsByTagName("video")[0].currentTime = abPlayFirst;
    }
}
function abPlayHandler(){
    let targetVideo = document.getElementsByTagName("video")[0];
    if(abPlayFirst === undefined || abPlaySecond === undefined){
        leftBottomTip('请先设置','标记点');
        return;
    }
    if(abPlayFlag === 0){
        leftBottomTip('AB回放','开启');
        $('.speed-panel>ul>.switch-button').text('停止');
        targetVideo.paused && targetVideo.play();
        targetVideo.removeEventListener("timeupdate",abPlayMain,false);
        targetVideo.currentTime = abPlayFirst;
        targetVideo.addEventListener("timeupdate",abPlayMain,false);
        abPlayFlag = 1;
        return;
    }
    if(abPlayFlag === 1){
        targetVideo.removeEventListener("timeupdate",abPlayMain,false);
        targetVideo.pause();
        $('.speed-panel>ul>.switch-button').text('开始');
        abPlayFlag = 0;
        leftBottomTip('AB回放','停止，如需清除标记请按“清除”按钮。');
        return;
    }
}
function leftBottomTip(text,importantText=''){
    $('.left-bottom-tip').eq(0).append(`<div class="tip-item muted" ><div class="left-bottom-tip-text"><span>${text}</span>&nbsp;&nbsp;<span style='color:red;'>${importantText}</span></div></div>`)
    let _timer = setTimeout(() => {
        $('.left-bottom-tip').eq(0).children().eq(0).remove()//这样写 并不能自定义持续时间
        clearInterval(_timer);
    }, 2500);
}
function timeToMinute(second){
    var minute;
    minute = Math.floor(second/60)
    second = second%60;
    minute += '';
    second += '';
    minute = (minute.length==1)?'0'+minute:minute;
    second = (second.length==1)?'0'+second:second;
    return minute+':'+second;
}
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