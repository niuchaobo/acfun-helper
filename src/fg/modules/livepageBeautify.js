/**
 * 生放送优化
 */
class LivePageButfy {
    constructor() {
        this.isWidePlayer = false;
        this.cPIP_span_cover = 'data:image/png;base64,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'
        this.toggleWideicon = '<svg t="1591199106636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3902" width="20" height="20"><path d="M381.155556 938.666667h256v-119.466667H381.155556v119.466667z m580.266666-853.333334H62.577778C28.444444 85.333333 0 113.777778 0 147.911111v546.133333c0 34.133333 28.444444 62.577778 62.577778 62.577778h893.155555c34.133333 0 62.577778-28.444444 62.577778-62.577778V147.911111c5.688889-34.133333-22.755556-62.577778-56.888889-62.577778z m-386.844444 608.711111H449.422222v-62.577777h125.155556v62.577777z m386.844444-119.466666H62.577778V147.911111h893.155555v426.666667z m-5.688889-420.977778H523.377778V568.888889h432.355555V153.6z" p-id="3903" fill="#ffffff"></path><span class="toggle-tip" style="position: absolute;display: none;bottom: 40px;text-align: center;background: rgba(21,21,21,0.8);border-radius: 4px;line-height: 32px;height: 32px;opacity: 0.9;font-size: 14px;color: #FFFFFF;letter-spacing: 0;width: 116px;left: 50%;-webkit-transform: translate(-50%); transform: translate(-50%);" >进入宽屏模式</span></svg>';
        this.noticeIcon_path = 'M502.514526 33.953684l93.884632 65.428211a40.421053 40.421053 0 0 0 37.834105 4.473263l100.837053-39.343158a118.245053 118.245053 0 0 1 157.534316 139.317895l-29.103158 114.310737a40.421053 40.421053 0 0 0 7.868631 35.570526l78.362948 95.932631a114.688 114.688 0 0 1-86.662737 187.230316l-108.274527 2.048a40.421053 40.421053 0 0 0-33.845894 19.56379l-55.888842 92.698947a114.688 114.688 0 0 1-205.500632-18.539789l-6.359579-16.707369-255.730526 255.784421a107.789474 107.789474 0 0 1-145.569684 6.305684l-6.844632-6.305684a107.789474 107.789474 0 0 1-6.305684-145.569684l6.305684-6.898526 252.658526-252.712421-22.42021-6.305685a118.245053 118.245053 0 0 1-41.930105-206.093473l84.506947-67.637895a40.421053 40.421053 0 0 0 15.036631-35.031579l-9.701052-113.933474A114.364632 114.364632 0 0 1 502.514526 33.953684zM383.838316 590.794105l1.994105 2.048-283.648 283.648a26.947368 26.947368 0 0 0 34.384842 41.229474l3.772632-3.125895 281.49221-281.6-6.144-16.168421a40.421053 40.421053 0 0 0-26.839579-24.576l-5.01221-1.455158z m50.499368-496.316631a33.522526 33.522526 0 0 0-30.558316 36.271158l9.701053 113.987368a121.263158 121.263158 0 0 1-45.056 104.879158L283.917474 417.253053a37.402947 37.402947 0 0 0 13.258105 65.212631l113.55621 31.905684a121.263158 121.263158 0 0 1 80.572632 73.83579l43.870316 115.819789a33.845895 33.845895 0 0 0 60.631579 5.443369l55.888842-92.698948a121.263158 121.263158 0 0 1 101.645474-58.745263l108.220631-1.94021a33.845895 33.845895 0 0 0 25.6-55.296l-78.416842-95.932632a121.263158 121.263158 0 0 1-23.605895-106.711579l29.103158-114.256842a37.402947 37.402947 0 0 0-49.798737-44.085895l-100.837052 39.343158a121.263158 121.263158 0 0 1-113.394527-13.473684L456.326737 100.405895a33.522526 33.522526 0 0 0-21.989053-5.928421z m566.864842 150.096842c32.013474 0 58.044632 26.462316 58.044632 59.122526S1033.162105 362.711579 1001.202526 362.711579A58.583579 58.583579 0 0 1 943.157895 303.642947c0-32.660211 25.977263-59.122526 58.044631-59.122526z m0 39.397052a19.509895 19.509895 0 0 0-19.402105 19.725474c0 10.886737 8.730947 19.671579 19.402105 19.671579a19.509895 19.509895 0 0 0 19.348211-19.671579 19.509895 19.509895 0 0 0-19.402105-19.725474z'
        this.noticeIcon = `<svg t="1591199578499" class="icon" viewBox="0 0 1077 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5536" width="128" height="128"><path d="${this.noticeIcon_path}" fill="#8a8a8a" p-id="5537"></path></svg>`;
        this.cPIP_Livediv = `<div class="control-btn pip" style="position: relative;width: 38px;height: 20px;"><div class=" control-btn btn-pip" style="opacity: 0.9;font-size: 14px;color: #ffffff;cursor: pointer;flex: none;box-sizing: border-box;-webkit-box-flex: 0;align-items: center;justify-content: center;-webkit-box-align: center;display: flex;-webkit-box-pack: center;position: relative;width: 100%;height: 100%;" >`;
        this.cPIP_span = `
                <span class="btn-span" style="display: block;width: 22px;height: 100%;background-size: contain;background-position: center;background-repeat: no-repeat;background-image: url(${this.cPIP_span_cover});" onclick="l_setPictureInPictureMode()"></span> 
                </div>
                    <span class="tip-pip" style="position: absolute;display: none;bottom: 40px;text-align: center;background: rgba(21,21,21,0.8);border-radius: 4px;line-height: 32px;height: 32px;opacity: 0.9;font-size: 14px;color: #FFFFFF;letter-spacing: 0;width: 116px;left: 50%;-webkit-transform: translate(-50%); transform: translate(-50%);" >进入画中画</span>
                </div>`
        this.hideAdType = 'hide';
        this.devMode = false;
    }

    commentTimeTag() {
        let root = chrome.runtime.getURL('/');
        let sc = document.createElement("script");
        sc.src = `${root}fg/modules/liveSettingInject.js`;
        document.head.appendChild(sc);
    }

    appendWidePlayer() {
        //加入按钮
        this.addWidePlayerButton()
        //样式
        this.widePlayerStyle()
        //点击事件
        this.widePlayerEvent()
    }

    addWidePlayerButton() {
        let toggleWideicon = this.toggleWideicon;
        $('.box-right').find('.danmaku-setting').after('<div class="control-btn" id="toggleWide">' + toggleWideicon + '</div>');
        $('#toggleWide').on('mouseover', () => { $('.toggle-tip').css('display', 'block'); })
        $('#toggleWide').on('mouseout', () => { $('.toggle-tip').css('display', 'none') })
    }

    widePlayerStyle() {
        //这里是宽屏模式的样式，第一行包含了因为弹幕时间Tag功能加入导致用户名颜色变为黑色的纠正样式
        let cssStr = `.container-live-feed-messages .live-feed-messages>div.comment>div span:nth-child(2){color: #409bef;}.main{transiton: all 0.5s;padding:0 !important;} .live-player-container{padding-bottom: 54.25% !important;}.main_wide{width: 100%!important; margin:0!important;padding:0!important ; max-width:100% !important;height:100vh;} .control-btn svg{width: 20px; height: auto;} .wide_app{width:100%;}.main_wide .live-info{display:none;} .main_wide .container-gift-bar{display:none;} .wide_app #header{display: none!important;} .main_wide>.container-live-feed{margin:0 !important;position:relative;transition-duration: .15s;}.main_wide>.width_hidden{width:0!important;}#wide-player-right{  position: absolute;  top: calc(50% - 50px);  background: #ccc;  left: -15px;  z-index: 1000;  height: 100px;  width: 15px;  line-height: 100px;  border-radius: 15px 0px 0 15px;  opacity:0.2;  text-align: center;  cursor: pointer; } #wide-player-right:hover{opacity:1 }`;
        let mainDom = document.getElementsByClassName('main')[0]
        createElementStyle(cssStr, mainDom, "AcFunHelper_widePlayerStyle")
    }

    judgeIsFullScreen(target) {
        let flag = null
        let textFlag = document.getElementsByClassName("tip-fullscreen");
        flag = textFlag[0].innerText === '退出网页全屏' ? textFlag[0] : false;
        flag = flag ? flag : textFlag[1].innerText === '退出桌面全屏' ? textFlag[1] : false;
        flag = target.parentElement === document.getElementsByClassName('btn-fullscreen')[1] ? false : flag
        return flag
    }

    widePlayerEvent() {
        $('div.box-right').on('click', '#toggleWide', (e) => {
            let flag = this.judgeIsFullScreen(e.target)
            flag ? $(flag.parentElement).trigger('click') : '';
            this.isWidePlayer ? this.exitWidePlayerModel() : this.enterWidePlayerModel()
            this.helperDivHide("")
        });

        $(".fullscreen.fullscreen-web,.fullscreen.fullscreen-screen").on('click', (e) => {
            this.isWidePlayer ? this.exitWidePlayerModel() : ''
            let status = this.judgeIsFullScreen(e.target)
            status ? this.helperDivHide('none') : this.helperDivHide("")
        })

        document.onkeydown = (e) => {
            if (e.keyCode === 27) {
                let status = this.judgeIsFullScreen(e.target)
                status && this.helperDivHide("")
            }
        }
    }

    helperDivHide(i) {
        getAsyncDom("#acfun-popup-helper", () => {
            document.getElementById("acfun-popup-helper").style.display = i;
            document.getElementById("acfun-helper-div").style.display = i;
        }, 1000);
    }

    enterWidePlayerModel() {
        this.isWidePlayer = true
        $('.toggle-tip').html('退出宽屏模式')
        document.getElementsByClassName('player-outer-wrapper')[0].classList.add('main_wide');
        document.getElementById('app').classList.add('wide_app');
        $('#footer').hide();
        $('.list-container').hide();
        $('.container-live').addClass('main_wide');
        $('.player-outer-wrapper').addClass('main_wide');
        document.getElementsByClassName('face-text-panel')[1].style.right = "-3px";
        document.getElementsByClassName('live-feed')[0].style.borderRadius = "0px";
        $('.main_wide>.right').append('<div id="wide-player-right">▶︎</div>');
        $(document).one('keydown', (e) => {
            e.keyCode === 27 && $('#toggleWide').click()
        })
        $("#wide-player-right").on('click', (e) => {
            if ($(".live-feed").css("display") === "none") {
                $(".live-feed").show()
                $("#wide-player-right").html("▶︎")
                $(".container-live-feed").removeClass('width_hidden')
                this.helperDivHide("")
            } else {
                $(".live-feed").hide()
                $("#wide-player-right").html("◀︎")
                $(".container-live-feed").addClass("width_hidden")
                this.helperDivHide("none")
            }
        })
    }

    exitWidePlayerModel() {
        this.isWidePlayer = false
        $('.toggle-tip').html('进入宽屏模式')
        document.getElementsByClassName('player-outer-wrapper')[0].classList.remove('main_wide');
        document.getElementById('app').classList.remove('wide_app');
        // document.getElementsByClassName('live-feed')[0].style.borderRadius = "3px";
        $('#footer').show();
        $('.list-container').show();
        $('.container-live').removeClass('main_wide');
        $('.player-outer-wrapper').removeClass('main_wide');
        $('#wide-player-right').remove()
        $(".live-feed").show()
        $(".container-live-feed").removeClass('width_hidden')
    }

    //屏蔽按钮以及样式
    simplifyDanmu() {
        let noticeIcon = this.noticeIcon;
        $('.live-feed .face-text').append(`<i class="notice_icon" id="noticeBtn">${noticeIcon}</i>`)
        $('#app').append(`<div class="hide_popup"><ul style="width:120px">
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="container-live-anim">屏蔽礼物气泡</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="gift">屏蔽礼物</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="user-enter">屏蔽进场</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="like">屏蔽点赞</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="rich-text">屏蔽红包</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="follow">屏蔽关注提醒</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="join-club">屏蔽守护团消息</input></li>
        <li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="medal-wrapper">屏蔽牌子</input></li>
        </ul></div>`)
        document.getElementsByClassName('hide_popup')[0].style.cssText = 'position: absolute; z-index: 100;display: none;position: absolute; z-index: 100;display: none;background-color: rgba(255, 255, 255, 0.92);margin: 10px;padding: 5px;box-shadow: rgb(0 0 0 / 30%) 0px 0px 5px 0px;';
        document.getElementsByClassName('notice_icon')[0].style.cssText = 'position: absolute; width: 18px; heigth: auto; left: 35px; top: 0px; cursor: pointer;';
        document.getElementsByClassName('notice_icon')[0].children[0].style.cssText = 'width: 100%; height: auto';
        $(".left").on('mouseenter', () => {
            $('.hide_popup').hide()
        })
        $('#noticeBtn').click((e) => {
            e.preventDefault();
            e.stopPropagation();
            $('.hide_popup').css('display') === "none" ?
                $('.hide_popup').css({ left: e.pageX - 50 + 'px', top: e.pageY - 325 + 'px' }).show() :
                $('.hide_popup').hide()
        })
        this.addBanStyle()
        this.loopToBan()
    }

    //评论屏蔽
    loopToBan() {
        $('.hide_popup').find('input').click(function (e) {
            let _type = $(this).attr('data-type')
            let isChecked = $(this).prop('checked')
            if (_type == "container-live-anim" && isChecked) {
                $(".live-feed-gift-slot").addClass('ban_' + _type)
            } else {
                $(".live-feed-gift-slot").removeClass('ban_' + _type)
            }
            if (isChecked) {
                $('.live-feed-messages').addClass('ban_' + _type)
            } else {
                $('.live-feed-messages').removeClass('ban_' + _type)
            }
        })
    }

    addBanStyle() {
        let cssStr = `.hide_popup{position: absolute; z-index: 100;display: none;} 
        .ban_gift .gift,
        .ban_user-enter .user-enter,
        .ban_like .like,
        .ban_follow .follow,
        .container-live-slot .ban_container-live-anim,
        .ban_rich-text .rich-text,
        .ban_join-club .join-club,
        .ban_medal-wrapper .medal-wrapper{display:none !important;}`
        createElementStyle(cssStr, document.head, "AcFunHelper_danmakuBanStyle")
    }

    /**
     * 遍历直播站列表修改标号
     */
    listCountTag() {
        this.devMode && console.log("NumberThis");
        let listCount = 0;
        document.querySelectorAll("div.live-status > div.live-status-desc").forEach((e) => {
            listCount++;
            e.innerHTML = `第${listCount}`;
        })
    }

    /**
     * 使用Observe来监测直播站列表页面变化更新列表标号
     */
    listCountFront() {
        this.listCountTag();
        var config = { attributes: true, childList: true, subtree: true };
        var pageChangeObserver = document.querySelectorAll(".pager-wrapper.pager-container")[0];
        var cateChangeObserver = document.querySelectorAll(".category-wrapper")[0];
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var obsrvcall = (mutations) => {
            this.listCountTag();
            mysleep(5000).then(() => {
                this.listCountTag();
            })
            this.devMode && console.log("PageChanged");
        }
        var observer = new MutationObserver(obsrvcall);
        var catobserver = new MutationObserver(obsrvcall);
        observer.observe(pageChangeObserver, config);
        catobserver.observe(cateChangeObserver, config);
    }

    LivehideAds(type, mute) {
        var hideType = "";
        type == '0' ? hideType = 0 : hideType = 1;
        //大约可以节约接近20%的CPU资源(以接近四代i3低压CPU的水平测试)，主要消耗来源是gif的动图和播放器。
        // document.querySelectorAll(".living-icon").forEach((e) => { e.remove() });
        var timer = setInterval(() => {
            try {
                const controlDom = document.querySelector(".btn-span")
                const audioDom = document.querySelector(".volume")
                let flag = String(controlDom.dataset.bindAttr)
                let muteFlag = String(audioDom.dataset.bindAttr)
                muteFlag != 'muted' && mute ? document.querySelector(".volume-icon").click() : ""
                flag == 'play' ? controlDom.click() : ""
                // flag == 'play' ? document.getElementsByClassName("container-video")[0].children[0].pause() : ""
                if (flag == 'pause') {
                    if (hideType == 0) {
                        createElementStyle('.tv-wrapper{display:none};', document.head, "AcFunHelper_LivehideAds")
                        document.querySelector(".tv-wrapper").remove()
                    }
                    // clearInterval(timer)
                }
            } catch (error) {
            }
        }, 500);
    }

    //直播站增加画中画模式
    callPicktureInPictureModeForLive() {
        const isChrome = navigator.userAgent.indexOf("Chrome") === -1;
        if (isChrome) {
            return
        }
        let cPIP_Livediv = this.cPIP_Livediv;
        let cPIP_span = this.cPIP_span;
        let html = cPIP_Livediv + cPIP_span;
        let _timer = setInterval(function () {
            let node = $("div.control-btn.setting");
            if (node.length > 0) {
                node.after(html);
                // onmouseover="$('.tip-pip').style.display='block'" onmouseout="$('.tip-pip').style.display='none'"
                $(".control-btn.pip").on('mouseover', () => { $('.tip-pip').css('display', 'block') })
                $(".control-btn.pip").on('mouseout', () => { $('.tip-pip').css('display', 'none') })
                clearInterval(_timer);
            }
        }, 1000);
    }

    followMe() {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        let element = document.querySelectorAll(".container-live-feed-messages>div.user-card")[0];
        var observer = new MutationObserver((mutations) => {
            mutations.forEach(async (mutation) => {
                // let evidence = document.querySelectorAll(".container-live-feed-messages>div.user-card")[0];
                if (element.className != "user-card hide") {
                    document.querySelectorAll("div.comment").forEach((e) => {
                        let objSubItem = e.children[0].childElementCount;
                        var oprNum = 3;
                        if (objSubItem == 3) {
                            oprNum = 1;
                        } else if (objSubItem == 4) {
                            oprNum = 2
                        } else if (objSubItem == 4) {
                            oprNum = 3;
                        }
                        if (e.children[0].children[oprNum].className == "nickname" && e.children[0].children[oprNum].innerText == element.children[0].children[0].children[1].children[0].children[0].innerText) {
                            e.children[0].children[oprNum].style.border = "1px solid black";
                        }
                    })
                } else {
                    document.querySelectorAll("div.comment").forEach((e) => {
                        var oprNum = 3;
                        let objSubItem = e.children[0].childElementCount;
                        if (objSubItem == 3) {
                            oprNum = 1;
                        } else if (objSubItem == 4) {
                            oprNum = 2
                        } else if (objSubItem == 4) {
                            oprNum = 3;
                        }
                        if (e.children[0].children[oprNum].className == "nickname" && e.children[0].children[oprNum].innerText == element.children[0].children[0].children[1].children[0].children[0].innerText) {
                            e.children[0].children[oprNum].style.border = "";
                        }
                    })
                }
            });
        });
        observer.observe(element, {
            attributes: true,
            attributeOldValue: true,
        });
    }

}