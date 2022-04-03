/**
 * up主屏蔽 AcFunHelperRequestFilterPlatform
 */
class Block extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.devMode = false;
    }

    //在DOM加载完成之后通过注入自定义xhr的方式过滤文章
    injectScriptData() {
        let bannedUpsArr = Object.keys(this.runtime.options.UserFilter);
        let bannedCommentUiArr = Object.keys(this.runtime.options.CommentFilter);
        this.runtime.options.commentFilterSw && MessageSwitch.sendEventMsgToInject(window, { target: "AcFunHelperFrontendXHRDriver", InvkSetting: { "type": "function" }, params: { params: { k: "commentAreaBanUsersId", v: bannedCommentUiArr }, target: "addData" }, source: "ARFP" });
        this.runtime.options.filter && MessageSwitch.sendEventMsgToInject(window, { target: "AcFunHelperFrontendXHRDriver", InvkSetting: { "type": "function" }, params: { params: { k: "articleFilterUsersUid", v: bannedUpsArr }, target: "addData" }, source: "ARFP" });
    }

    //页面所有元素加载完成之后通过修改页面元素的方式过滤文章
    async block() {
        let href = window.location.href;
        let upMap = ExtOptions.upFilterMap(this.runtime.options, true);
        href == "https://www.acfun.cn/v/list63/index.htm" && this.homePageFilter(upMap);
        //如果是文章区详情页，添加屏蔽按钮
        if (REG.article.test(href)) {
            this.renderFilter();
        }
    }

    async homePageFilter(map) {
        const filterList = await ExtOptions.getValue("UserFilter");
        //综合推荐
        document.querySelector(".article-left-wrap").querySelectorAll("div.article-item").forEach(e => {
            const infoEle = e.querySelector("span.up > a");
            let uid = /[0-9]+/.exec(infoEle.href)[0];
            const inList = uid in filterList;
            if (infoEle && uid && inList) {
                e.remove();
            }
        });
        //热门文章
        DOMObserver.all(document.querySelector("div.article-hot-article"), () => {
            document.querySelector("div.rank-list").querySelectorAll("li.rank-item").forEach(e => {
                const infoEle = e.querySelector("span.up > a");
                let uid = /[0-9]+/.exec(infoEle.href)[0];
                const inList = uid in filterList;
                if (infoEle && uid && inList) {
                    e.remove();
                }
            })
        });
    }

    renderFilter() {
        $('.action-up').append('<a class="ext-filter-up">屏蔽</a>');
        $('.up-abstract').css("width", "600px");
        $('.action-up').css("width", "100px");
        $('.action-up').on('click', '.ext-filter-up', async function () {
            let up_name = $('.up-name').find('a:first').text();
            let msg = '确定屏蔽『' + up_name + '』吗？';
            if (confirm(msg)) {
                let hrefReg = new RegExp("/u/(\\d+)\\.aspx");
                let href = $('.up-name').find('a:first').attr("href");
                let regRes = hrefReg.exec(href);
                if (regRes && up_name) {
                    let uid = regRes[1];
                    let raw = await ExtOptions.getValue("UserFilter");
                    raw[uid] = up_name;
                    ExtOptions.setValue("UserFilter", raw);
                    confirm("Ok，写进小本本了。所以，现在需要关闭这个页面吗？") && window.close();
                } else {
                    alert("或许Up主名字或者他的UID有点问题。");
                }
            }
        });

    }
}