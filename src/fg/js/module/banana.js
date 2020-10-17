/**
 * 自动点赞、投蕉
 */
class Banana {
    constructor() {

    }

    async throwBanana(params) {
        let options = window.odhfront.options;
        var up_name = '';
        var banana_num = 0;
        if (!options.auto_throw) {
            return;
        }
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
        //判断是否已投蕉、点赞
        var arr = document.getElementsByClassName('banana active');
        var arrLike = document.getElementsByClassName('like active');
        if (arr.length && arrLike.length > 0) {
            return;
        }
        if (arrLike.length == 0 && options.LikeAfterBanna) {
            //点赞操作 因为如果用API请求方式去点赞的话需要请求acfun.midground.st信息，暂时没有研究透，就先用点击了。
            document.querySelector('div.like').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            document.querySelector(".likeCount").innerText = Number(document.querySelector(".likeCount").innerText) + 1;
        }
        //投蕉操作
        let { key, callback } = params;
        let header = new Map();
        header.set("Content-Type", "application/x-www-form-urlencoded");
        let data = "resourceId=" + key + "&count=" + banana_num + "&resourceType=2";
        let result = await ajax('POST', "https://www.acfun.cn/rest/pc-direct/banana/throwBanana", data, header);
        let res_obj = JSON.parse(result);
        if (res_obj == undefined || res_obj.extData == undefined || res_obj.extData.bananaRealCount == undefined) {
            return;
        }
        //改变页面上的投蕉状态和数量
        $('.right-area .banana').addClass('active');
        document.querySelector(".bananaCount").innerText = Number(document.querySelector(".bananaCount").innerText) + Number(banana_num);
        //如果开启投蕉通知,通知background发提醒
        if (options.banana_notice) {
            let action = "notice";
            let msg = '成功给' + up_name + '投食' + banana_num + '蕉' + `${options.LikeAfterBanna ? "并点了个赞" : ""}`;
            let p = {
                title: "自动投蕉点赞",
                msg: msg,
            }
            chrome.runtime.sendMessage({ action: action, params: p }, function (response) {});
        }
    }

}