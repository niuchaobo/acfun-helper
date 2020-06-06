/**
 * 生放送页面优化
 */
class LivePageButfy {
    constructor(){
        this.isWidePlayer = false;
        this.toggleWideicon = '<svg t="1591199106636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3902" width="20" height="20"><path d="M381.155556 938.666667h256v-119.466667H381.155556v119.466667z m580.266666-853.333334H62.577778C28.444444 85.333333 0 113.777778 0 147.911111v546.133333c0 34.133333 28.444444 62.577778 62.577778 62.577778h893.155555c34.133333 0 62.577778-28.444444 62.577778-62.577778V147.911111c5.688889-34.133333-22.755556-62.577778-56.888889-62.577778z m-386.844444 608.711111H449.422222v-62.577777h125.155556v62.577777z m386.844444-119.466666H62.577778V147.911111h893.155555v426.666667z m-5.688889-420.977778H523.377778V568.888889h432.355555V153.6z" p-id="3903" fill="#ffffff"></path></svg>';
        this.noticeIcon = '<svg t="1591199578499" class="icon" viewBox="0 0 1077 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5536" width="128" height="128"><path d="M502.514526 33.953684l93.884632 65.428211a40.421053 40.421053 0 0 0 37.834105 4.473263l100.837053-39.343158a118.245053 118.245053 0 0 1 157.534316 139.317895l-29.103158 114.310737a40.421053 40.421053 0 0 0 7.868631 35.570526l78.362948 95.932631a114.688 114.688 0 0 1-86.662737 187.230316l-108.274527 2.048a40.421053 40.421053 0 0 0-33.845894 19.56379l-55.888842 92.698947a114.688 114.688 0 0 1-205.500632-18.539789l-6.359579-16.707369-255.730526 255.784421a107.789474 107.789474 0 0 1-145.569684 6.305684l-6.844632-6.305684a107.789474 107.789474 0 0 1-6.305684-145.569684l6.305684-6.898526 252.658526-252.712421-22.42021-6.305685a118.245053 118.245053 0 0 1-41.930105-206.093473l84.506947-67.637895a40.421053 40.421053 0 0 0 15.036631-35.031579l-9.701052-113.933474A114.364632 114.364632 0 0 1 502.514526 33.953684zM383.838316 590.794105l1.994105 2.048-283.648 283.648a26.947368 26.947368 0 0 0 34.384842 41.229474l3.772632-3.125895 281.49221-281.6-6.144-16.168421a40.421053 40.421053 0 0 0-26.839579-24.576l-5.01221-1.455158z m50.499368-496.316631a33.522526 33.522526 0 0 0-30.558316 36.271158l9.701053 113.987368a121.263158 121.263158 0 0 1-45.056 104.879158L283.917474 417.253053a37.402947 37.402947 0 0 0 13.258105 65.212631l113.55621 31.905684a121.263158 121.263158 0 0 1 80.572632 73.83579l43.870316 115.819789a33.845895 33.845895 0 0 0 60.631579 5.443369l55.888842-92.698948a121.263158 121.263158 0 0 1 101.645474-58.745263l108.220631-1.94021a33.845895 33.845895 0 0 0 25.6-55.296l-78.416842-95.932632a121.263158 121.263158 0 0 1-23.605895-106.711579l29.103158-114.256842a37.402947 37.402947 0 0 0-49.798737-44.085895l-100.837052 39.343158a121.263158 121.263158 0 0 1-113.394527-13.473684L456.326737 100.405895a33.522526 33.522526 0 0 0-21.989053-5.928421z m566.864842 150.096842c32.013474 0 58.044632 26.462316 58.044632 59.122526S1033.162105 362.711579 1001.202526 362.711579A58.583579 58.583579 0 0 1 943.157895 303.642947c0-32.660211 25.977263-59.122526 58.044631-59.122526z m0 39.397052a19.509895 19.509895 0 0 0-19.402105 19.725474c0 10.886737 8.730947 19.671579 19.402105 19.671579a19.509895 19.509895 0 0 0 19.348211-19.671579 19.509895 19.509895 0 0 0-19.402105-19.725474z" fill="#8a8a8a" p-id="5537"></path></svg>';
    }

    
    appendWidePlayer() {
        let toggleWideicon = this.toggleWideicon;
        let isWidePlayer = this.isWidePlayer;
        var timer = setInterval(function () {
            let checknode=$('div.box-right');
            if(checknode.length>0){
                //加入按钮
                $('.box-right').find('.danmaku-setting').after('<div class="control-btn" id="toggleWide">' + toggleWideicon + '</div>');
                //点击事件
                $('div.box-right').on('click','#toggleWide',function () {
                    let nod = document.createElement("style");
                    let cssStr = '.main{transiton: all 0.5s}.main_wide{width: calc(100% - 5px)!important; margin-left: 0.5%; max-width:calc(100% - 5px)!important;} .control-btn svg{width: 20px; height: auto;} .main_wide .live-info{display:none;} .wide_app #header{display: none!important};}';
                    nod.type="text/css";
                    nod.textContent = cssStr;
                    document.getElementsByClassName('main')[0].appendChild(nod);
                    if (!isWidePlayer) {
                        //样式
                        $('.main').addClass('main_wide')
                        $('#app').addClass('wide_app')
                        $(window).scrollTop(15)
                        isWidePlayer = true
                    } else {
                        $('.main').removeClass('main_wide')
                        $('#app').removeClass('wide_app')
                        isWidePlayer = false
                    }
                });
                isWidePlayer = true;
                $(window).scrollTop(0)
                clearInterval(timer);
            }
        },1000)
        this.isWidePlayer = isWidePlayer;
    }

    simplifyDanmu(){
        let noticeIcon = this.noticeIcon;
        var timer = setInterval(function () {
            let checknode=$('div.box-right');
            if(checknode.length>0){
                $('.face-text').append(`<i class="notice_icon" id="noticeBtn">${noticeIcon}</i>`)
                $('.main').append('<div class="hide_popup"><ul><li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="gift">屏蔽礼物</input></li><li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="user-enter">屏蔽进场</input></li><li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="like">屏蔽点赞</input></li><li style="height: 35px;display: flex; align-items: center;"><input type="checkbox" data-type="follow">屏蔽关注提醒</input></li></ul></div>')
            }
            document.getElementsByClassName('notice_icon')[0].style.cssText='position: absolute; width: 18px; heigth: auto; left: 35px; top: 0px; cursor: default;';
            document.getElementsByClassName('notice_icon')[0].children[0].style.cssText='width: 100%; height: auto';
            $('#noticeBtn').click((e) => {
                $('.hide_popup').css({ left: e.pageX + 'px', top: e.pageY + 'px' }).show()
                $('.hide_popup').bind('mouseenter', function (e) {
                    $(this).bind('mouseleave', function () {
                        $(this).unbind('mouseleave').hide()
                    })
                })
            })
            $('.hide_popup').find('input').click(function (e) {
                let _type = $(this).attr('data-type')
                let isChecked = $(this).prop('checked')
                console.log(isChecked)
                if ('live message filter state change: '+isChecked) {
                    $('.live-feed-messages').addClass('ban_' + _type)
                } else {
                    $('.live-feed-messages').removeClass('ban_' + _type)
                }
            })
            document.getElementsByClassName('hide_popup')[0].style.cssText='position: absolute; z-index: 100;display: none;position: absolute; z-index: 100;display: none;background-color: #dedede;margin: 10px;padding: 5px;box-shadow: rgb(197, 197, 197) 5px 5px 5px 1px;';
            let nod = document.createElement("style");
            let cssStr = ".hide_popup{position: absolute; z-index: 100;display: none;} .ban_gift .gift{display:none;} .ban_user-enter .user-enter{display:none;}.ban_like .like{display:none;} .ban_follow .follow{display:none;}"
            nod.type="text/css";
            nod.textContent = cssStr;
            document.getElementsByClassName('live-feed-messages')[0].appendChild(nod);
            clearInterval(timer);
        },3000)
    }

}