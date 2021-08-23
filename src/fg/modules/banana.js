/**
 * 自动点赞、投蕉
 */
class Banana {
    constructor() {
        this.devMode = false;
    }

    /**
     * 判断是否为关注或者自定义列表中的Up主
     * @param {object} options 插件配置对象
     * @param {boolean} select 判断是否是“已关注的Up主”或者是“指定的Up主”
     * @param {string} dougaType 判断稿件类型 video or article
     */
    judgeIfSelectUp(options, select, dougaType = "video") {
        var up_name = '';
        var banana_num = 0;
        if (select) {
            //判断是否为已关注up主
            let followed;
            if (dougaType == "video") {
                //判断联合投稿
                if (document.querySelector("#main-content > div.left-column > div.introduction > div.up-area.staff-area") == null) {
                    followed = document.getElementsByClassName('follow-up followed');
                } else {
                    followed = document.querySelector("#main-content > div.left-column > div.introduction > div.up-area.staff-area > div.up-details.staff-details > div.follow").classList.value == "follow hidden";
                }
            } else {
                followed = document.getElementsByClassName('focus alfocus');
            }
            if (!followed || followed.length <= 0) {
                return { state: false }
            }
            up_name = document.getElementsByClassName('up-name')[0].innerText;
            banana_num = options.to_attention_num;
            return { state: true, name: up_name, num: banana_num };
        } else {
            //判断是否为指定up主
            let up_url = dougaType == "video" ? document.getElementsByClassName('up-name')[0].href : document.getElementsByClassName('upname')[0].href.replace(".aspx", "")
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

    LikeHeartFront(Mode = "video", isLogined) {
        if (!isLogined && Mode == "video") {
            return;
        } else if (Mode == "article") {
            if (!isLogin("article")) {
                return;
            }
        }
        let options = window.AcFunHelperFrontend.options;
        let LikeType = options.LikeHeartClass;
        if (LikeType == "0") {
            this.clickLike(options, Mode);
        } else if (LikeType == "1") {
            let x = this.judgeIfSelectUp(options, true, Mode)
            if (x.state) {
                this.clickLike(options, Mode);
            }
        } else if (LikeType == "2") {
            let x = this.judgeIfSelectUp(options, false, Mode)
            if (x.state) {
                this.clickLike(options, Mode);
            }
        }
    }

    /**
     * 改变页面上的投蕉状态和数量
     * @param {String} banana_num 投蕉数
     * @param {String} type 投稿类型 video or article
     */
    pageBananaState(banana_num, type = "video") {
        if (type == "video") {
            $('.right-area .banana').addClass('active');
            document.querySelector(".bananaCount").innerText = Number(document.querySelector(".bananaCount").innerText) + Number(banana_num);
        } else if (type == "article") {
            document.querySelectorAll('.bananacount')[0].classList.add("active")
            document.querySelectorAll('.bananacount')[1].classList.add("active")
            document.querySelectorAll(".Jba_num")[0].innerText = Number(document.querySelectorAll(".Jba_num")[0].innerText) + Number(banana_num);
            document.querySelectorAll(".Jba_num")[2].innerText = Number(document.querySelectorAll(".Jba_num")[2].innerText) + Number(banana_num);
        }
    }

    /**
     * 点赞
     * @param {object} options
     * @param {string} dougaType 投稿类型 video or article
     */
    clickLike(options, dougaType = "video") {
        var arrLike = dougaType == "video" ? document.getElementsByClassName('like active') : document.getElementsByClassName('likecount active')
        if (arrLike.length == 0) {
            //点赞操作 因为如果用API请求方式去点赞的话需要请求acfun.midground.st信息，暂时没有研究透，就先用点击了。
            dougaType == "video" ? document.querySelector('div.like').click() : document.querySelector('.likecount').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            dougaType == "video" ? document.querySelector(".likeCount").innerText = Number(document.querySelector(".likeCount").innerText) + 1 : "";
            options.LikeHeartNotif && MessageSwitch.sendMessage('fg', {
                target: "notice", params: { title: "自动点赞", msg: "成功点了个赞", }, InvkSetting: { type: "function" }
            });
            return true
        }
        return false
    }

    /**
     * 文章投蕉
     * @param {*} params 
     */
    async articleBanana(params) {
        var isLogined = false;
        try {
            isLogined = isLogin("video");
        } catch (error) {
            console.log("[LOG]Front-Banana>articleBanana: 没找到登录判断依据。");
        }
        let options = window.AcFunHelperFrontend.options;
        if (!options.auto_throw) {
            return;
        }
        var res_obj = false;
        let result = this.judgeIfSelectUp(options, options.to_attention, "article")
        if (!result.state) {
            return;
        }
        var arr = document.getElementsByClassName('bananacount J_banana active');
        if (arr.length == 0) {
            res_obj = await bananaThrow(params, result.num, "article");
        } else {
            return;
        }

        if (res_obj) {
            var msg = '成功给 ' + result.name + ' 投食' + result.num + '蕉';
            this.pageBananaState(result.num, "article");
        } else {
            var msg = '或许早就成功给 ' + result.name + ' 投蕉了,刷新下页面试试';
        }
        if (res_obj) {
            options.banana_notice && MessageSwitch.sendMessage('fg', { target: "notice", params: { title: "AcFun助手 - 自动投蕉", msg: msg }, InvkSetting: { type: "function" } })
            options.audioAfterBanana && MessageSwitch.sendMessage('fg', { target: "bananAudio", params: {}, InvkSetting: { type: "function" } })
        }
    }

    async throwBanana(params) {
        if (!isLogin()) {
            return;
        }
        let options = window.AcFunHelperFrontend.options;
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
            document.querySelector('div.like').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            document.querySelector(".likeCount").innerText = Number(document.querySelector(".likeCount").innerText) + 1;
            likeFlag = true;
        }
        if (arr.length == 0) {
            res_obj = await bananaThrow(params, result.num);
        } else {
            return;
        }

        if (res_obj && likeFlag) {
            var title = "AcFun助手 - 自动二连";
            var msg = '成功给 ' + result.name + ' 投食' + result.num + '蕉' + `${likeFlag ? "并点了个赞" : ""}`;
            this.pageBananaState(result.num, "video");
        } else if (res_obj == false && likeFlag) {
            var title = "AcFun助手 - 自动二连";
            var msg = '成功给 ' + result.name + ' 点了个赞'
        } else if (res_obj && likeFlag == false) {
            this.pageBananaState(result.num, "video");
            var title = "AcFun助手 - 自动投蕉";
            var msg = '成功给 ' + result.name + ' 投食' + result.num + '蕉';
        }
        if (res_obj) {
            options.banana_notice && MessageSwitch.sendMessage('fg', { target: "notice", params: { title: title, msg: msg, }, InvkSetting: { type: "function" } });
            options.audioAfterBanana && MessageSwitch.sendMessage('fg', { target: "bananAudio", params: {}, InvkSetting: { type: "function" } })
        }
    }

}