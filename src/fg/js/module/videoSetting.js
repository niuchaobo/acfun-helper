/**
 * 视频播放设置
 */
class VideoSetting{
    constructor(){
        window.addEventListener('load', e => this.onLoad(e));
        this.cPIP_div=`<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;" >`;
        this.cPIP_Livediv=`<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;" >`;
        this.cPIP_span=`<span class="btn-span" style="display: block;width: 22px;height: 100%;background-size: contain;background-position: center;background-repeat: no-repeat;background-image: url(data:image/png;base64,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);" onclick="setPictureInPictureMode()"></span>
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
                try {
                    document.getElementsByTagName("video")[0].currentTime = lastTime;
                } catch (error) {
                    console.log("[LOG]Frontend-videoSetting>jumpLastWatchTime: 没有上次观看的进度。")
                }
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
                $(".control-btn.pip").on('mouseover',()=>{$('.tip-pip').css('display','block')})
                $(".control-btn.pip").on('mouseout',()=>{$('.tip-pip').css('display','none')}) 
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
                // onmouseover="$('.tip-pip').style.display='block'" onmouseout="$('.tip-pip').style.display='none'"
                $(".control-btn.pip").on('mouseover',()=>{$('.tip-pip').css('display','block')})
                $(".control-btn.pip").on('mouseout',()=>{$('.tip-pip').css('display','none')}) 
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

    //AB回放UI
    AddABPlayUI(){
        let html = `<div class="control-btn speed"><span data-bind-key="AddABPlayUI">AB回放</span>
        <div class="speed-panel">
            <ul>
                <li data-val="A" onClick="updateAbPlayStart()">开始于</li>
                <li data-val="B" onClick="updateAbPlayEnd();">结束于</li>
                <li onclick="AbPlayHandler();">启用</li>
                <li onclick="StopAbPlay();">禁用</li>
            </ul>
            <div class="transparent-placeholder"></div>
        </div>
    </div>`;
        let _timer = setInterval(function () {
            let node = $(".box-right");
            if(node.length>0){
                node.prepend(html);
                clearInterval(_timer);
            }
        },1000);
    }

    //监听是否为全屏
    monitorFullScreen(){
        //观影模式
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        //var element = document.querySelector(".tip-film-model").childNodes[0];
        getAsyncDom(".control-btn.btn-film-model>.btn-span:first",()=>{
            var element = $(".control-btn.btn-film-model").find('.btn-span:first')[0];
            var observer = new MutationObserver((mutations)=> {
                mutations.forEach(async (mutation)=> {
                    let flag = document.getElementsByClassName("tip-film-model")[0].innerText;
                    if(flag == '退出观影模式'){ 
                        document.getElementById("acfun-popup-helper").style.display="none";
                        document.getElementById("acfun-helper-div").style.display="none";
                        let FileModeExclusionsw = await getStorage('FileModeExclusionsw');
                        if(FileModeExclusionsw.FileModeExclusionsw){
                            setTimeout(()=>{ //全屏模式切换时会重新渲染样式（页面宽度改变）？扔进异步队列等主程跑完再渲染
                                this.fullScreenStyle(true)
                            })
                        }
                    }else{
                        document.getElementById("acfun-popup-helper").style.display="";
                        document.getElementById("acfun-helper-div").style.display="";
                        let FileModeExclusionsw = await getStorage('FileModeExclusionsw');
                        if(FileModeExclusionsw.FileModeExclusionsw){this.fullScreenStyle(false);}
                    }
                });
            });
            this.serveStart(element,observer)
        },500)

        //网页全屏
        getAsyncDom(".control-btn.btn-fullscreen>.btn-span:first",()=>{
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
                    }
                });
            });
            this.serveStart(elementWeb,observerWeb)
        },500)
    }

    serveStart(elementWeb,observerWeb){
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
                "mix-blend-mode": "difference",
                "background": "white",
                "margin": "0px",
                "max-width":"100%",
                "width": "calc(100% - 20px)",
                "overflow":"hidden",
                "padding":"0px 10px",
            })
            $('#main>#main-content').find('img').css({
                'mix-blend-mode': 'exclusion'
            })
            $('.left-column').css({
                "width": "100%",
                "max-width":"100%",
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
            $('#main>#main-content').find('img').css({
                'mix-blend-mode': 'normal'
            })
            $('#main-content').css({
                "background":"",
                'mix-blend-mode': 'normal',
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
            $('.columen-left').css({
                'mix-blend-mode': '',
                'background': ''
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


    //倍速快捷键 TODO:自定义快捷键(现在默认shift + ↑/↓) 绑定位置
    PlaybackRateKeyCode(settingKeyCode){
        // const videoDom = document.getElementById('player');
        // videoDom.setAttribute("tabindex","-1")
        // v.addEventListener('keydown',(e)=>{
        //     this.changeRateKeyCode(settingKeyCode,e)
        // })
        document.onkeydown = (e)=> {
            this.changeRateKeyCode(e,settingKeyCode)
        }
    }
    changeRateKeyCode(e,settingKeyCode){
        let code = e.keyCode
        e.shiftKey && (code === settingKeyCode[0] || code === settingKeyCode[1]) && this.getRate(code, settingKeyCode)
    }
    getRate(code ,settingKeyCode){
        const v = document.getElementsByTagName("video")[0];
        let rate = this.getRateFlag(code,settingKeyCode,v)
        v.playbackRate = rate;
        event.stopPropagation();
    }
    getRateFlag(code,settingKeyCode,v){
        let videoRate = v.playbackRate;
        const [addRate,reduceRate] = settingKeyCode
        code === addRate
          ? (videoRate += 0.25)
          : code === reduceRate
          ? (videoRate -= 0.25)
          : "";
        videoRate <= 0
          ? (videoRate = 0.25)
          : videoRate >= 2
          ? (videoRate = 2)
          : "";
        return videoRate
    }
    
}