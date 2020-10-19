/**
 * 自动点赞、投蕉
 */
class Banana {
    constructor() {

    }

    /**
     * 渐进式投蕉
     * @param {*} banana 
     * @param {*} heart 
     */
    async ProgressiveBanana(banana, heart) {
        console.log("hello from banana!");
        window.odhfront.videoSetting.ProgressiveBananaExec(banana, heart);
    }

    clickLike() {
        var arrLike = document.getElementsByClassName('like active');
        if (arrLike.length == 0) {
            //点赞操作 因为如果用API请求方式去点赞的话需要请求acfun.midground.st信息，暂时没有研究透，就先用点击了。
            document.querySelector('div.like').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            document.querySelector(".likeCount").innerText = Number(document.querySelector(".likeCount").innerText) + 1;
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
        var up_name = '';
        var banana_num = 0;
        var likeFlag = false;
        var res_obj = false;
        if (options.to_attention) {
            //判断是否为已关注up主
            let followed = document.getElementsByClassName('follow-up followed');
            if (!followed || followed.length <= 0) {
                return;
            }
            up_name = document.getElementsByClassName('up-name')[0].innerText;
            banana_num = options.to_attention_num;
        } else {
            //判断是否为指定up主
            let up_url = document.getElementsByClassName('up-name')[0].href;
            let flag = false;
            let special_items = options.to_special_items;
            for (let item of special_items) {
                if (item.up_url == up_url) {
                    up_name = item.name;
                    banana_num = item.bananaNum;
                    flag = true;
                }
            }
            if (!flag) {
                return;
            }
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
            res_obj = await bananaThrow(params, banana_num);
        }

        if (res_obj && likeFlag) {
            var title = "AcFun助手 - 自动二连";
            var msg = '成功给 ' + up_name + ' 投食' + banana_num + '蕉' + `${likeFlag ? "并点了个赞" : ""}`;
        } else if (res_obj == false && likeFlag) {
            var title = "AcFun助手 - 自动二连";
            var msg = '成功给 ' + up_name + ' 点了个赞'
        } else if (res_obj && likeFlag == false) {
            var title = "AcFun助手 - 自动投蕉";
            var msg = '成功给 ' + up_name + ' 投食' + banana_num + '蕉';
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

}