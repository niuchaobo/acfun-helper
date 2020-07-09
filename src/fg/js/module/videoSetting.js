/**
 * 视频播放设置
 */
class VideoSetting{
    constructor(){
        window.addEventListener('load', e => this.onLoad(e));
        this.cPIP_div=`<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;">`;
        this.cPIP_Livediv=`<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;" onmouseover="$('.tip-pip').style.display='block'" onmouseout="$('.tip-pip').style.display='none'">`;
        this.cPIP_span=`<span class="btn-span" style="display: block;width: 22px;height: 100%;background-size: contain;background-position: center;background-repeat: no-repeat;background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODhweCIgaGVpZ2h0PSI4MHB4IiB2aWV3Qm94PSIwIDAgODggODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjUgKDY3NDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5iZnFfd3lxcDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJiZnFfd3lxcCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC4wMDAwMDAsIDQuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS01IiB4PSIwIiB5PSIwIiB3aWR0aD0iNzIiIGhlaWdodD0iNzIiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjgiIHg9IjQiIHk9IjgiIHdpZHRoPSI2NCIgaGVpZ2h0PSI1NiIgcng9IjgiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02IiBmaWxsPSIjRkZGRkZGIiB4PSIxNiIgeT0iMjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjEyIiByeD0iNCI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYtQ29weSIgZmlsbD0iI0ZGRkZGRiIgeD0iMTYiIHk9IjQwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgcng9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02LUNvcHktNCIgZmlsbD0iI0ZGRkZGRiIgeD0iMTYiIHk9IjQ0IiB3aWR0aD0iMTYiIGhlaWdodD0iOCIgcng9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02LUNvcHktNSIgZmlsbD0iI0ZGRkZGRiIgeD0iMTYiIHk9IjIwIiB3aWR0aD0iMTYiIGhlaWdodD0iOCIgcng9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPHBhdGggZD0iTTQ0LDIwIEw1MiwyMCBDNTQuMjA5MTM5LDIwIDU2LDIxLjc5MDg2MSA1NiwyNCBMNTYsMjQgQzU2LDI2LjIwOTEzOSA1NC4yMDkxMzksMjggNTIsMjggTDQ0LDI4IEM0MS43OTA4NjEsMjggNDAsMjYuMjA5MTM5IDQwLDI0IEw0MCwyNCBDNDAsMjEuNzkwODYxIDQxLjc5MDg2MSwyMCA0NCwyMCBaIiBpZD0iUmVjdGFuZ2xlLTYtQ29weS02IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00NCw0NCBMNTIsNDQgQzU0LjIwOTEzOSw0NCA1Niw0NS43OTA4NjEgNTYsNDggTDU2LDQ4IEM1Niw1MC4yMDkxMzkgNTQuMjA5MTM5LDUyIDUyLDUyIEw0NCw1MiBDNDEuNzkwODYxLDUyIDQwLDUwLjIwOTEzOSA0MCw0OCBMNDAsNDggQzQwLDQ1Ljc5MDg2MSA0MS43OTA4NjEsNDQgNDQsNDQgWiIgaWQ9IlJlY3RhbmdsZS02LUNvcHktNyIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYtQ29weS0yIiBmaWxsPSIjRkZGRkZGIiB4PSI0OCIgeT0iMjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjEyIiByeD0iNCI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYtQ29weS0zIiBmaWxsPSIjRkZGRkZGIiB4PSI0OCIgeT0iNDAiIHdpZHRoPSI4IiBoZWlnaHQ9IjEyIiByeD0iNCI+PC9yZWN0PgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);" onclick="setPictureInPictureMode()"></span>
            </div>
        <span class="tip-pip" style="position: absolute;display: none;bottom: 40px;text-align: center;background: rgba(21,21,21,0.8);border-radius: 4px;line-height: 32px;height: 32px;opacity: 0.9;font-size: 14px;color: #FFFFFF;letter-spacing: 0;width: 116px;left: 50%;-webkit-transform: translate(-50%); transform: translate(-50%);" >进入画中画</span></div>`
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

    //跳转到上次观看(只支持1p投稿的跳转)
    jumpLastWatchTime(){
        window.addEventListener('message',function(e){
            if(e.data.to=='vs_videoInfo'){
                let videoInfo_data = JSON.parse(e.data.msg);
                let lastTime = videoInfo_data[0].userPlayedSeconds;
                document.getElementsByTagName("video")[0].currentTime = lastTime;
            }
        })
    }

    //增加画中画模式
    callPicktureInPictureMode(){
        let cPIP_div = this.cPIP_div;
        let cPIP_span = this.cPIP_span;
        let html = cPIP_div + cPIP_span;
        let _timer = setInterval(function () {
            let node = $("div.control-btn.setting");
            if(node.length>0){
                node.after(html);
                clearInterval(_timer);
            }
        },1000);
    }

    //初始画质策略
    videoQuality(){
        var timer = setInterval(function () {
            let nodes = $('.quality-panel');
            var vqregexp = RegExp('p60');
            if(nodes.length>0){
                //模式标准：0=自动；1=默认最高；2=平衡（非60帧的最高画质）；3=强制标清
                chrome.storage.local.get(['videoQualityStrategy'],function(items){
                let mode = Number(items.videoQualityStrategy);
                // console.log(mode);
                let qualitys = document.querySelector(".quality-panel > ul").children;
                switch (mode) {
                    case 0:
                        return;
                    case 1:
                        qualitys[0].click();
                        // console.log(qualitys[0].dataset.qualityType);
                        // console.log('ok');
                        break;
                    case 2:
                        for(let i=0;i<=qualitys.length;i++){
                            let result = vqregexp.exec(qualitys[i].dataset.qualityType);
                            if(result==null){
                                qualitys[i].click();
                                // console.log(qualitys[i].dataset.qualityType);
                                // console.log('ok');
                                break;
                            }
                        }
                        break;
                    case 3:
                        let Lowest = qualitys.length - 2; //减去1的话就是播放器的自动模式
                        qualitys[Lowest].click();
                        // console.log(qualitys[Lowest].dataset.qualityType);
                        // console.log('ok');
                        break;
                    default:
                        break;
                }
                clearInterval(timer);
            });
            }
        },5000);
    }

    //直播站增加画中画模式
    callPicktureInPictureModeForLive(){
        let cPIP_Livediv = this.cPIP_div;
        let cPIP_span = this.cPIP_span;
        let html = cPIP_Livediv + cPIP_span;
        let _timer = setInterval(function () {
            let node = $("div.control-btn.setting");
            if(node.length>0){
                node.after(html);
                clearInterval(_timer);
            }
        },1000);
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
        var observer = new MutationObserver((mutations)=> {
            mutations.forEach((mutation)=> {
                let flag = document.getElementsByClassName("tip-film-model")[0].innerText;//TODO:已知bug 全屏模式下进入观影模式 
                if(flag == '退出观影模式'){ 
                    document.getElementById("acfun-popup-helper").style.display="none";
                    document.getElementById("acfun-helper-div").style.display="none";
                    setTimeout(()=>{ //全屏模式切换时会重新渲染样式（页面宽度改变）？扔进异步队列等主程跑完再渲染
                        this.fullScreenStyle(true)
                    })
                }else{
                    document.getElementById("acfun-popup-helper").style.display="";
                    document.getElementById("acfun-helper-div").style.display="";
                    this.fullScreenStyle(false)
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
        var observerWeb = new MutationObserver((mutations)=> {
            mutations.forEach((mutation)=> {
                let flag = document.getElementsByClassName("tip-fullscreen")[0].innerText;
                if(flag == '退出网页全屏'){
                    document.getElementById("acfun-popup-helper").style.display="none";
                    document.getElementById("acfun-helper-div").style.display="none";
                }else{
                    if(document.getElementsByClassName("tip-film-model")[0].innerText == '退出观影模式')return
                    document.getElementById("acfun-popup-helper").style.display="";
                    document.getElementById("acfun-helper-div").style.display="";
                    this.fullScreenStyle(false)
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

    fullScreenStyle(on){
        if(on){
            $('#main>#main-content').css({
                "background": "black",
                "margin": "0px",
                "max-width":"100%",
                "width": "100%",
                "overflow":"hidden",
            })
            $('.left-column').css({
                "width": "100%",
                "max-width":"100%",
                "padding-left":"10px"
            })
            $('.right-column').css({
                "position": "absolute",
                "right": "-342px",
                "top": "160px",
                "padding-left": "1px",
                "transition-duration":".2s",
                "border-left": "6px  solid rgba(62, 62, 62, 0.4)",
            }).bind('mouseenter',()=>{
                $('.right-column').css({'right':'0px', "background": "white","border-left-width":"0px"})
            }).bind('mouseleave',()=>{
                $('.right-column').css({'right':'-342px', "background": "","border-left-width":"6px"}) 
            })
            $('.ac-pc-comment').css({
                'padding-right':'15px'
            })
            $('#toolbar').css({
                'transform': 'scale(0.8)',
                'transform-origin': 'bottom right',
            })
            $('.player-box').css({
                "border-bottom-color": "black"
            })
            $('.nav-parent').css({
                "border-bottom-color": "black" 
            })
            $('.video-description').css({
                "border-bottom-color": "black"  
            })
        }else{
            $('.left-column').css({
                "width": "calc(100% - 370px)",
                "max-width": "calc(100% - 370px)",
                "padding-left":'',
            })
            $('#main-content').css({
                "background":"",
                "width": "calc(100% - 100px)",
                "margin": "auto 50px"
            })
            $('.right-column').css({
                "position": "static",
                "border":"",
                "background": "",
                "padding-left": "",
                "transition-duration":"",
            }).unbind('mouseenter').unbind('mouseleave')
            $('#toolbar').css({
                'transform': '',
                'transform-origin': '',
            })
            $('.ac-pc-comment').css({
                'padding-right':''
            })
            $('.player-box').css({
                "border-bottom-color": "#f5f5f5"
            })
            $('.nav-parent').css({
                "border-bottom-color": "#f5f5f5" 
            })
            $('.video-description').css({
                "border-bottom-color": "#f5f5f5"  
            })
        }

    }



}