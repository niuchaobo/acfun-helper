/**
 * 自动点赞、投蕉
 */
class Banana {
    constructor() {
        this.reqBananaNum = 0;
    }

    judgeIfSelectUp(options, select, dougaType = "video") {
        var up_name = '';
        var banana_num = 0;
        if (select) {
            //判断是否为已关注up主
            let followed = dougaType == "video" ? document.getElementsByClassName('follow-up followed') : document.getElementsByClassName('focus alfocus')
            if (!followed || followed.length <= 0) {
                return { state: false }
            }
            up_name = document.getElementsByClassName('up-name')[0].innerText
            banana_num = options.to_attention_num;
            return { state: true, name: up_name, num: banana_num };
        } else {
            //判断是否为指定up主
            let up_url = dougaType == "video" ? document.getElementsByClassName('up-name')[0].href : document.getElementsByClassName('upname')[0].href.replace(".aspx","")
            let flag = false;
            let special_items = options.to_special_items;
            for (let item of special_items) {
                if (item.up_url == up_url) {
                    up_name = item.name;
                    banana_num = item.bananaNum;
                    flag = true;
                }
            }
            if (flag) {
                return { state: true, name: up_name, num: banana_num }
            } else {
                return { state: false };
            }
        }
    }

    LikeHeartFront(Mode = "video") {
        let options = window.odhfront.options;
        let LikeType = options.LikeHeartClass;
        if (LikeType == "0") {
            this.clickLike(Mode);
        } else if (LikeType == "1") {
            let x = this.judgeIfSelectUp(options, true, Mode)
            if (x.state) {
                this.clickLike(Mode);
            }
        } else if (LikeType == "2") {
            let x = this.judgeIfSelectUp(options, false, Mode)
            if (x.state) {
                this.clickLike(Mode);
            }
        }
    }

    clickLike(dougaType = "video") {
        var arrLike = dougaType == "video" ? document.getElementsByClassName('like active') : document.getElementsByClassName('likecount active')
        if (arrLike.length == 0) {
            //点赞操作 因为如果用API请求方式去点赞的话需要请求acfun.midground.st信息，暂时没有研究透，就先用点击了。
            dougaType == "video" ? document.querySelector('div.like').click() : document.querySelector('.likecount').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            dougaType == "video" ? document.querySelector(".likeCount").innerText = Number(document.querySelector(".likeCount").innerText) + 1 : "";
            let action = "notice";
            let msg = '成功点了个赞';
            let p = {
                title: "自动点赞",
                msg: msg,
            }
            chrome.runtime.sendMessage({ action: action, params: p }, function (response) { });
            return true
        }
        return false
    }

    async throwBanana(params) {
        let options = window.odhfront.options;
        if (!options.auto_throw) {
            return;
        }
        var likeFlag = false;
        var res_obj = false;
        let result = this.judgeIfSelectUp(options, options.to_attention)
        if (!result.state) {
            return;
        }
        //判断是否已投蕉
        var arr = document.getElementsByClassName('banana active');
        var arrLike = document.getElementsByClassName('like active');
        if (arrLike.length == 0 && options.LikeAfterBanna) {
            //点赞操作 因为如果用API请求方式去点赞的话需要请求acfun.midground.st信息，暂时没有研究透，就先用点击了。
            document.querySelector('div.like').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            document.querySelector(".likeCount").innerText = Number(document.querySelector(".likeCount").innerText) + 1;
            likeFlag = true;
        }
        if (arr.length == 0) {
            res_obj = await bananaThrow(params, result.num);
        }

        if (res_obj && likeFlag) {
            var title = "AcFun助手 - 自动二连";
            var msg = '成功给 ' + result.name + ' 投食' + result.num + '蕉' + `${likeFlag ? "并点了个赞" : ""}`;
        } else if (res_obj == false && likeFlag) {
            var title = "AcFun助手 - 自动二连";
            var msg = '成功给 ' + result.name + ' 点了个赞'
        } else if (res_obj && likeFlag == false) {
            var title = "AcFun助手 - 自动投蕉";
            var msg = '成功给 ' + result.name + ' 投食' + result.num + '蕉';
        }
        if (options.banana_notice) {
            let action = "notice";
            let p = {
                title: title,
                msg: msg,
            }
            chrome.runtime.sendMessage({ action: action, params: p }, function (response) { });
        }
    }

    /**
     * 渐进式投蕉主函数
     * @param {*} banana 
     * @param {*} heart 
     * @param {*} allowShortVideo 
     */
    async ProgressiveBanana(banana, heart, allowShortVideo = false) {
        let targetVideo = document.getElementsByTagName("video")[0];
        let data = { bananaPercent: banana, heartPercent: heart }
        let state = { bananaThis: 0, heartThis: false }
        targetVideo.addEventListener('timeupdate', this.ProgressiveBananaMain.bind(null, data, state), false);
        targetVideo.addEventListener('ended', this.ProgressiveBananaDone.bind(null), false);
    }
    async ProgressiveBananaDone() {
        chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: 5, url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
    }
    async ProgressiveBananaMain(data, state) {
        let videoDuration = document.getElementsByTagName("video")[0].duration;
        let nowPlayTime = document.getElementsByTagName("video")[0].currentTime;
        let percent = Math.floor((nowPlayTime / videoDuration) * 1000)
        console.log(percent)
        if (percent >= data.heartPercent[0] && !state.heartThis) {
            console.log("heart this")
            chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: "Heart", url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
            state.heartThis = true;
        }
        if (percent >= data.bananaPercent[0] && state.bananaThis == 0) {
            console.log(10)
            chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: 1, url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
            state.bananaThis = 1;
        } else if (percent >= data.bananaPercent[1] && state.bananaThis == 1) {
            console.log(20)
            chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: 2, url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
            state.bananaThis++
        } else if (percent >= data.bananaPercent[2] && state.bananaThis == 2) {
            console.log(30)
            chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: 3, url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
            state.bananaThis++
        } else if (percent >= data.bananaPercent[3] && state.bananaThis == 3) {
            console.log(40)
            chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: 4, url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
            state.bananaThis++
        } else if (percent >= data.bananaPercent[4] && state.bananaThis == 4) {
            console.log(50)
            chrome.runtime.sendMessage({ action: "progressiveBananaCall", params: { action: 5, url: document.URL, responseRequire: true, asyncWarp: false } }, function (resp0) { })
            state.bananaThis++
        } else if (state.bananaThis == 5) {
            console.log("Ok")
        }
    }

}