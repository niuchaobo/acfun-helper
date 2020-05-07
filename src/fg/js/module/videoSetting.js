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
        let _timer = setInterval(function () {
            let node = $(".speed-panel").find('li:last');
            //如果不判断直接调用会报错，toolbar节点可能还没加载
            if(node.length>0){
                node.after(html);
                clearInterval(_timer);
            }

        },1000);
    }

    //监听是否为全屏
    monitorFullScreen(){
        //观影模式
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        //var element = document.querySelector(".tip-film-model").childNodes[0];
        var element = $(".control-btn.btn-film-model").find('.btn-span:first')[0];
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                let flag = document.getElementsByClassName("tip-film-model")[0].innerText;
                if(flag == '退出观影模式'){
                    document.getElementById("acfun-popup-helper").style.display="none";
                    document.getElementById("acfun-helper-div").style.display="none";
                }else{
                    document.getElementById("acfun-popup-helper").style.display="";
                    document.getElementById("acfun-helper-div").style.display="";
                }
            });
        });

        observer.observe(element, {
            //characterData: true,
            //characterDataOldValue: true
            attributes: true, //configure it to listen to attribute changes
            attributeOldValue: true,
            attributeFilter :['data-bind-attr']
        });


        //网页全屏
        var elementWeb = $(".control-btn.btn-fullscreen").find('.btn-span:first')[0];
        var observerWeb = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                let flag = document.getElementsByClassName("tip-fullscreen")[0].innerText;
                if(flag == '退出网页全屏'){
                    document.getElementById("acfun-popup-helper").style.display="none";
                    document.getElementById("acfun-helper-div").style.display="none";
                }else{
                    document.getElementById("acfun-popup-helper").style.display="";
                    document.getElementById("acfun-helper-div").style.display="";
                }
            });
        });

        observerWeb.observe(elementWeb, {
            //characterData: true,
            //characterDataOldValue: true
            attributes: true, //configure it to listen to attribute changes
            attributeOldValue: true,
            attributeFilter :['data-bind-attr']
        });
    }





}