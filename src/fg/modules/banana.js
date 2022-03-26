/**
 * 自动点赞、投蕉
 */
class Banana extends AcFunHelperFgFrame {
    constructor() {
        super()
        this.devMode = false;
    }

    async LikeHeartFront(Mode = "video", isLogined) {
        if (Mode == "article") {
            isLogined = ToolBox.isLogin("article", "cookies");
        }
        if (isLogined == false) {
            return;
        }
        let LikeType = this.runtime.options.LikeHeartClass;

        switch (LikeType) {
            case "0":
                this.clickLike(Mode);
                break;
            case "1":
                this.followLike(Mode);
                break;
            case "2":
                this.specialLike(Mode);
                break;
        }
    }

    judgeFollowedArticle() {
        return new Promise((resolv, reject) => {
            GetAsyncDomUtil.getAsyncDomClassic('div.focus.alfocus', () => {
                let info;
                info = document.querySelector('div.focus.alfocus');
                resolv(!!info)
            })
        })
    }

    judgeFollowedVideo() {
        return new Promise((resolv, reject) => {
            GetAsyncDomUtil.getAsyncDomClassic('#main-content > div.left-column > div.introduction', () => {
                let result;
                if (document.querySelector("#main-content > div.left-column > div.introduction > div.up-area.staff-area") == null) {
                    //单投稿
                    result = document.querySelector('div.follow-up.followed') != null;
                } else {
                    //合作投稿
                    result = document.querySelector("#main-content > div.left-column > div.introduction > div.up-area.staff-area > div.up-details.staff-details > div.follow").classList.value == "follow hidden";
                }
                resolv(result)
            })
        })
    }

    getUpFromVideo() {
        return new Promise((resolv, reject) => {
            GetAsyncDomUtil.getAsyncDomClassic('a.up-name', () => {
                const info = document.querySelector("a.up-name");
                resolv({
                    uid: REG.userHome.exec(info.href)[2],
                    userName: info.innerText
                })
            })
        })
    }

    getUpFromArticle() {
        return new Promise((resolv, reject) => {
            GetAsyncDomUtil.getAsyncDomClassic('div.upname', () => {
                const info = document.querySelector('div.upname').querySelector("a.name");
                resolv({
                    uid: REG.userHome.exec(info.href)[2],
                    userName: info.innerText
                })
            })
        })
    }

    clickLike(dougaType) {
        var arrLike = dougaType == "video" ? document.getElementsByClassName('like active') : document.getElementsByClassName('likecount active')
        if (arrLike.length == 0) {
            //点赞操作
            dougaType == "video" ? document.querySelector('div.like').click() : document.querySelector('.likecount').click();
            //改变页面上的点赞状态和数量
            $('.right-area .like').addClass('active');
            dougaType == "video" ? document.querySelector(".likeCount").innerText = DOMPurify.sanitize(Number(document.querySelector(".likeCount").innerText) + 1) : "";
            return true
        }
        return false
    }

    async followLike(Mode) {
        let info;
        switch (Mode) {
            case "video":
                info = await this.judgeFollowedVideo()
                break;
            case "article":
                info = await this.judgeFollowedArticle()
                break;
        }
        info && this.clickLike(Mode)
    }

    async specialLike(Mode) {
        let info;
        let optionInfo = this.runtime.options.to_special_items;
        let userList = [];
        optionInfo.forEach(e => {
            userList.push(e.uid);
        })
        switch (Mode) {
            case "video":
                info = await this.getUpFromVideo()
                break;
            case "article":
                info = await this.getUpFromArticle()
                break;
        }
        if (userList.includes(info.uid)) {
            this.clickLike(Mode)
        }
    }

    /**
     * 改变页面上的投蕉状态和数量
     * @param {String} banana_num 投蕉数
     * @param {String} type 投稿类型 video or article
    */
    pageBananaState(banana_num, type = "video") {
        if (!banana_num) {
            return;
        }
        if (type == "video") {
            $('.right-area .banana').addClass('active');
            document.querySelector(".bananaCount").innerText = DOMPurify.sanitize(Number(document.querySelector(".bananaCount").innerText) + Number(banana_num));
        } else if (type == "article") {
            GetAsyncDomUtil.getAsyncDomClassic("div.census-right", () => {
                document.querySelectorAll('.bananacount')[0].classList.add("active")
                document.querySelectorAll('.bananacount')[1].classList.add("active")
                document.querySelectorAll(".Jba_num")[0].innerText = DOMPurify.sanitize(Number(document.querySelectorAll(".Jba_num")[0].innerText) + Number(banana_num));
                document.querySelectorAll(".Jba_num")[2].innerText = DOMPurify.sanitize(Number(document.querySelectorAll(".Jba_num")[2].innerText) + Number(banana_num));
            })
        }
    }

    /**
     * 文章投蕉
     * @param {*} params 
     */
    async articleBanana(params) {
        let isLogined = ToolBox.isLogin("article");
        if (isLogined == false) {
            return;
        }
        //看看已经投了没有
        const arr = document.getElementsByClassName('bananacount J_banana active');
        if (arr.length != 0) {
            return;
        }

        let msg, status;

        if (this.runtime.options.LikeHeartClass) {
            const isFollowed = await this.judgeFollowedArticle();
            const result = await this.getUpFromArticle();
            isFollowed && bananaThrow(params, this.runtime.options.to_attention_num, "article");
            isFollowed ? (msg = '成功给 ' + result.userName + ' 投食' + this.runtime.options.to_attention_num + '蕉', status = true,this.pageBananaState(this.runtime.options.to_attention_num,"article")) : msg = '给 ' + result.userName + ' 投食失败';
        } else {
            const userInfo = await this.getUpFromArticle();
            this.runtime.options.to_special_items.forEach(async e => {
                if (e.uid == userInfo.uid) {
                    const result = await bananaThrow(params, e.bananaNum, "article");
                    if (result) {
                        //投蕉成功
                        msg = '成功给 ' + e.name + ' 投食' + e.num + '蕉';
                        //改变页面状态
                        this.pageBananaState(result.num, "article");
                        status = true;
                    } else {
                        msg = '或许早就成功给 ' + e.name + ' 投蕉了，刷新下页面试试';
                    }
                }
            });
        }
        if (status) {
            //发出通知
            this.runtime.options.banana_notice && MessageSwitch.sendMessage('fg', { target: "notice", params: { title: "AcFun助手 - 自动投蕉", msg: msg }, InvkSetting: { type: "function" } });
            this.runtime.options.audioAfterBanana && MessageSwitch.sendMessage('fg', { target: "bananAudio", params: {}, InvkSetting: { type: "function" } })
        }
    }

    async throwBanana(params) {
        if (!ToolBox.isLogin()) {
            return;
        }
        //判断是否已投蕉
        const arr = document.getElementsByClassName('banana active');
        if (arr.length != 0) {
            //已经投了
            return;
        }

        let msg, status;

        if (this.runtime.options.to_attention) {
            const isFollowed = await this.judgeFollowedVideo();
            const result = await this.getUpFromVideo();
            isFollowed && bananaThrow(params, this.runtime.options.to_attention_num, "video");
            isFollowed ? (msg = '成功给 ' + result.userName + ' 投食' + this.runtime.options.to_attention_num + '蕉', status = true, this.pageBananaState(this.runtime.options.to_attention_num, "video")) : msg = '给 ' + result.userName + ' 投食失败';
        } else {
            const userInfo = await this.getUpFromVideo();
            this.runtime.options.to_special_items.forEach(async e => {
                if (e.uid == userInfo.uid) {
                    const result = await bananaThrow(params, e.bananaNum, "video");
                    if (result) {
                        //投蕉成功
                        msg = '成功给 ' + e.name + ' 投食' + e.bananaNum + '蕉';
                        //改变页面状态
                        this.pageBananaState(e.bananaNum, "video");
                        status = true;
                    } else {
                        msg = '或许早就成功给 ' + e.name + ' 投蕉了，刷新下页面试试';
                    }
                }
            })
        }

        if (status) {
            this.runtime.options.banana_notice && MessageSwitch.sendMessage('fg', { target: "notice", params: { title: "AcFun助手 - 自动投蕉", msg: msg, }, InvkSetting: { type: "function" } });
            this.runtime.options.audioAfterBanana && MessageSwitch.sendMessage('fg', { target: "bananAudio", params: {}, InvkSetting: { type: "function" } })
        }
    }

}