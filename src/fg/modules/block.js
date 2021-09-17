/**
 * up主屏蔽
 */

class Block {
    constructor() {
        this.devMode = false;
    }

    //在DOM加载完成之后通过注入自定义xhr的方式过滤文章
    injectScript() {
        let bannedUpsArr = Object.keys(window.AcFunHelperFrontend.options.UserFilter);
        MessageSwitch.sendEventMsgToInject(window, {
            "target": "AcFunHelperFrontendXHRDriver", "InvkSetting": { "type": "addRule" }, "params": {
                params: {
                    type: "injectedApi", urlExp: "https://www.acfun.cn/rest/pc-direct/article/feed", rule: { "name": "example2", "bound": "post", "action": "injectedApi", "condition": { "target": "articleListFilter" } }
                }, target: "datasetWriteIn"
            }
        });
        MessageSwitch.sendEventMsgToInject(window, { "target": "AcFunHelperFrontendXHRReactor", "InvkSetting": { "type": "function" }, "params": { params: { k: "articleFilterEnable", v: true }, target: "datasetWriteIn" } });
        MessageSwitch.sendEventMsgToInject(window, { "target": "AcFunHelperFrontendXHRReactor", "InvkSetting": { "type": "function" }, "params": { params: { k: "articleFilterUsersUid", v: bannedUpsArr }, target: "datasetWriteIn" } });
    }

    //页面所有元素加载完成之后通过修改页面元素的方式过滤文章
    async block() {
        let href = window.location.href;
        let upMap = ExtOptions.upFilterMap(window.AcFunHelperFrontend.options, true);
        this.homePageFilter(upMap);
        this.articlePageFilter(upMap);
        //如果是文章区详情页，添加屏蔽按钮
        if (REG.article.test(href)) {
            this.renderFilter();
        }
    }

    homePageFilter(map) {
        $(".rank-right").find('li a').each(function () {
            let title = $(this).attr("title");
            if (title == '' || title == undefined) {
                return;
            }
            let href = $(this).attr("href");
            let hrefReg = new RegExp("/u/\\d+");
            //针对首页文章区第一条信息做处理(带图的那一条)
            if (hrefReg.test(href)) {
                let up_name = $(this).attr('title');
                let uid = map.get(up_name);
                if (uid != null && uid != '' && uid != undefined) {
                    $(this).parent().parent().parent().parent().parent().remove();
                    return;
                }
            }

            title = title.replace(/[\r\n]/g, "");
            title = title.replace(/[\n]/g, "");
            let reg = new RegExp("UP\\:(.*)发布于");
            let res = reg.exec(title);
            if (res != null && res != undefined && res.length > 1) {
                let up_name = res[1];
                if (up_name != null && up_name != '') {
                    let uid = map.get(up_name);
                    if (uid != null && uid != '' && uid != undefined) {
                        $(this).parent().remove();
                    }
                }
            }
        });
    }

    articlePageFilter(map) {
        $(".atc-info.clearfix>a.atc-up").each(function () {
            let up_name = $(this).attr('title');
            if (up_name != '' && up_name != null && up_name != undefined) {
                let uid = map.get(up_name);
                if (uid != '' && uid != null && uid != undefined) {
                    $(this).parent().parent().parent().next().remove();
                    $(this).parent().parent().parent().remove();
                }
            }
        })

    }

    renderFilter() {
        $('.action-up').append('<a class="ext-filter-up">屏蔽</a>');
        $('.up-abstract').css("width", "600px");
        $('.action-up').css("width", "100px");
        $('.action-up').on('click', '.ext-filter-up', function () {
            let up_name = $('.up-name').find('a:first').text();
            let msg = '确定屏蔽『' + up_name + '』吗？';
            if (confirm(msg)) {
                let hrefReg = new RegExp("/u/(\\d+)\\.aspx");
                let href = $('.up-name').find('a:first').attr("href");
                let regRes = hrefReg.exec(href);
                if (regRes != undefined && regRes != null) {
                    let key = "FILTER_" + regRes[1];
                    let v = { name: up_name };
                    chrome.storage.local.set({ [key]: v }, function () {
                        let params = {
                            title: 'AcFun助手',
                            msg: '『' + up_name + '』已被屏蔽'
                        }
                        chrome.runtime.sendMessage({ action: 'notice', params: params }, function (response) {

                        });
                    });
                }
            } else {
                return;
            }
        });

    }

    liveUserBlock() {
        chrome.storage.local.get(['liveBans'], function (items) {
            let LiveUsers = document.querySelectorAll('div.live-list-item');
            LiveUsers.forEach(function (e) {
                let this_obj = e.children[1].children[1].children[1];
                if (this_obj.getAttribute('data-uid') in items.liveBans) {
                    var timer = setInterval(function () {
                        console.log('[LOG]Frontend-Block>liveUserBlock: Remove ' + this_obj.getAttribute('data-uid'))
                        e.remove();
                        clearInterval(timer);
                    }, 1000);
                }
            })
        })
        // document.querySelectorAll('a.pager__btn').forEach(function(e){
        //     e.addEventListener("click",function(){})
        // })
        $('.category-item').click(function () {
            let opr = 0;
            var timer = setInterval(function () {
                chrome.storage.local.get(['liveBans'], function (items) {
                    opr = opr + 1;
                    let LiveUsers = document.querySelectorAll('div.live-list-item');
                    for (let i = 0; i < LiveUsers.length; i++) {
                        let this_obj = LiveUsers[i];
                        if (this_obj.children[1].children[1].children[1].getAttribute('data-uid') in items.liveBans) {
                            this_obj.remove();
                            console.log('[LOG]Frontend-Block>liveUserBlock: Remove ' + this_obj.children[1].children[1].children[1].getAttribute('data-uid'))
                        }
                    }
                })
                if (opr >= 5) { clearInterval(timer); }
            }, 2000);
        })
        var timer = setInterval(function () {
            var config = { attributes: true, childList: true, subtree: true };
            var elementWeb2 = document.querySelectorAll("a.pager__btn");
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            var obsrvcall = function (mutations) {
                chrome.storage.local.get(['liveBans'], function (items) {
                    let LiveUsers = document.querySelectorAll('div.live-list-item');
                    for (let i = 0; i < LiveUsers.length; i++) {
                        let this_obj = LiveUsers[i];
                        if (this_obj.children[1].children[1].children[1].getAttribute('data-uid') in items.liveBans) {
                            this_obj.remove();
                            console.log('[LOG]Frontend-Block>liveUserBlock: Remove ' + this_obj.children[1].children[1].children[1].getAttribute('data-uid'))
                        }
                    }
                })
            }
            var observer = new MutationObserver(obsrvcall);
            try {
                observer.observe(elementWeb2[0], config);
                observer.observe(elementWeb2[1], config);
                observer.observe(elementWeb2[2], config);
                observer.observe(elementWeb2[3], config);
            } catch (error) {
                clearInterval(timer);
            }
            if (document.querySelectorAll("a.pager__btn").length > 0) {
                clearInterval(timer);
            }
        }, 1000)
    }

}