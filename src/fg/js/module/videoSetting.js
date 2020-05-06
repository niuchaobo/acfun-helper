/**
 * 视频播放设置
 */
class VideoSetting{
    constructor(){
        window.addEventListener('load', e => this.onLoad(e));
    }

    onLoad(){
        var hiddenDiv = document.getElementById('myCustomEventDiv');
        if(!hiddenDiv) {
            hiddenDiv = document.createElement('div');
            hiddenDiv.id="myCustomEventDiv";
            hiddenDiv.style.display = 'none';
            document.body.appendChild(hiddenDiv);
        }

        let root = chrome.runtime.getURL('/');
        let sc = document.createElement("script");
        sc.src=`${root}fg/js/module/videoSettingInject.js`;
        document.head.appendChild(sc);
        //给inject js 传递数据
        sc.onload=function () {
            var customEvent = document.createEvent('Event');
            customEvent.initEvent('myCustomEvent', true, true);
            hiddenDiv.innerText = JSON.stringify(window.odhfront.options);
            hiddenDiv.dispatchEvent(customEvent);
        }




    }


    //增加自定义播放速度
    customPlaybackRate(){
        let html = `
                    <li onclick="setCustomPlaybackRate(event);">自定义</li>`;
        console.log("node:",$(".speed-panel").find('li:last'));
        $(".speed-panel").find('li:last').after(html);
    }

}