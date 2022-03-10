export async function contentConfigure() {
    //========================稍后再看==========================//
    const watchLater = await ExtOptions.getValue("watchLater");
    if (watchLater != undefined) {
        document.querySelector("#watchLater").checked = watchLater;
    }
    document.querySelector("#watchLater").addEventListener("click", async () => {
        ExtOptions.setValue("watchLater", document.querySelector("#watchLater").checked)
    })

    $('#watchLaterStart').click(() => {
        if (document.getElementById('watchLater').checked) {
            mdui.snackbar({
                message: `已经启动 稍后再看 排程。`,
            });
            MessageSwitch.sendMessage('fg', { target: "watchLater", params: {}, InvkSetting: { type: "function" } })
        } else {
            mdui.snackbar({
                message: `稍后再看列表没有项目或者没有打开开关，助手不知道从何而起，巧妇难为无米之炊；请先添加或打开开关。`,
            });
        }
    });
    let eventObj = document.getElementById('watchLaterList');
    eventObj.onclick = async (ev) => {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'i') {
            let x = await getStorage("WatchPlanList");
            let Url = "https://www.acfun.cn/" + target.dataset.type + "/ac" + target.dataset.key;
            mdui.snackbar({
                message: `已移除 ${target.parentNode.children[3].innerText}`,
            });
            x.WatchPlanList.splice(x.WatchPlanList.indexOf(Url), 1)
            target.parentNode.remove();
            chrome.storage.local.set({ 'WatchPlanList': x.WatchPlanList });
        }
    }
    $('#firstwatchLaterList').click(async () => {
        $("#watchLaterList").empty();
        let x = await getStorage("WatchPlanList");
        for (let i in x.WatchPlanList) {
            let y = new RegExp("/v/ac([0-9].*)");
            let z = new RegExp("/a/ac([0-9].*)");
            try {
                var acId = y.exec(x.WatchPlanList[i])[1]
            } catch (error) {
                var acId = null;
            }
            if (acId != null) {
                fetch(acfunApis.video.videoInfo + acId).then((res => { return res.text() }))
                    .then((res) => {
                        let x = JSON.parse(res);
                        if (x.status != 0) {
                            x = { result: { dougaId: 0, shareUrl: "about:blank", user: { name: "用户" }, title: "稿件不存在" } }
                        }
                        x = x.result;
                        $("#watchLaterList").append(`
                            <li class="mdui-list-item mdui-ripple" style="cursor:default">
                            <i class="mdui-list-item-icon mdui-icon material-icons watchLaterListdelItem" data-key=${x.dougaId} data-type="v" style="cursor:pointer">delete</i>
                            <a href=${x.shareUrl} target="_blank">
                              <i class="mdui-list-item-icon mdui-icon material-icons" data-key=${x.dougaId} style="cursor:pointer">desktop_windows</i></a>
                              <div class="mdui-list-item-content">[视频] ${x.user.name}： ${x.title}{</div>
                            </li>
                            `)
                    })
            } else if (z.exec(x.WatchPlanList[i])[1]) {
                let acAid = z.exec(x.WatchPlanList[i])[1];
                fetch("https://api-new.app.acfun.cn/rest/app/article/info?articleId=" + acAid).then((res => { return res.text() }))
                    .then((res) => {
                        let x = JSON.parse(res);
                        $("#watchLaterList").append(`
                            <li class="mdui-list-item mdui-ripple" style="cursor:default">
                            <i class="mdui-list-item-icon mdui-icon material-icons watchLaterListdelItem" data-key=${x.articleId} data-type="a" style="cursor:pointer">delete</i>
                            <a href=${x.shareUrl} target="_blank">
                              <i class="mdui-list-item-icon mdui-icon material-icons" data-key=${x.articleId} style="cursor:pointer">desktop_windows</i></a>
                              <div class="mdui-list-item-content">[文章] ${x.user.name}： ${x.title}</div>
                            </li>
                            `)
                    })
            }
        }
    })

    //===================直播屏蔽配置相关==========================//
    const liveBansw = await ExtOptions.getValue("liveBansw");
    if (liveBansw != undefined) {
        document.querySelector("#liveBansw").checked = liveBansw;
    }
    document.querySelector("#liveBansw").addEventListener("click", async () => {
        ExtOptions.setValue("liveBansw", document.querySelector("#liveBansw").checked)
    })

    chrome.storage.local.get(['liveBans'], function (items) {
        if (JSON.stringify(items) !== '{}') {
            for (let i in items.liveBans) {
                $('ul#liveBanList').append(`<li class="mdui-list-item mdui-ripple" data-key=${i} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveBansItems" data-key=${i} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${i}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons BanWatchOrig" data-key=${i} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${i} UserName:${items.liveBans[i]}</div></li>`);
            }
            $('.liveBansItems').click(function () {
                let this_uid = $(this).data("key");
                $(this).parent().hide();
                mdui.snackbar({
                    message: `已移除 ${items.liveBans[this_uid]}`,
                });
                delete items.liveBans[this_uid];
                chrome.storage.local.set({ 'liveBans': items.liveBans });
            });
        }
    });
    chrome.storage.local.get(['liveBans'], function (items) {
        if (JSON.stringify(items) == '{}') {
            let a = {}
            chrome.storage.local.set({ 'liveBans': a });
        } else {
            $('#liveBanAdd').on('click', function () {
                mdui.prompt('请输入你需要屏蔽的用户UID', '添加用户',
                    async function (value) {
                        if (!value == '') {
                            var up_url = defaults.userInfo.replace('{uid}', value);
                            for (let i in items.liveFloowings) {
                                if (i == value) {
                                    var errN = 1;
                                    break
                                } else {
                                    var errN = 0;
                                }
                            }
                            if (errN != 1) {
                                var up_html_str;
                                try {
                                    up_html_str = await ajax('GET', up_url);
                                } catch (e) {
                                    var errN = 2
                                    return;
                                }
                                let status = JSON.parse(up_html_str).result;
                                if (status == 0) {
                                    var liveup_name = JSON.parse(up_html_str).profile.name;
                                    var errN = 0;
                                } else { var errN = 2 };
                            }
                            if (errN == 0) {
                                items.liveBans[value] = liveup_name;
                                chrome.storage.local.set({ 'liveBans': items.liveBans })
                                mdui.snackbar({ message: ` ${liveup_name} 已被加入关注列表` });
                                $('ul#liveBanList').append(`<li class="mdui-list-item mdui-ripple" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveBansItems" data-key=${value} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons BanWatchOrig" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${liveup_name}</div></li>`);
                                $('.liveBansItems').click(function () {
                                    let this_uid = $(this).data("key");
                                    $(this).parent().hide();
                                    mdui.snackbar({
                                        message: `已移除 ${items.liveBans[this_uid]}`,
                                    });
                                    delete items.liveBans[this_uid];
                                    chrome.storage.local.set({ 'liveBans': items.liveBans });
                                });
                            } else if (errN == 1) {
                                mdui.alert('你添加的用户已关注');
                            } else if (errN == 2) {
                                mdui.alert('用户不存在');
                            }
                        } else {
                            mdui.alert('UID未输入');
                        }
                    },
                    function () {
                    }
                );
            })
        }
    });

    //====================通知===============
    chrome.storage.local.get(['notificationContent'], function (items) {
        var commentNotif = items.notificationContent.commentNotif;
        var likeNotif = items.notificationContent.likeNotif;
        var giftNotif = items.notificationContent.giftNotif;
        if (commentNotif) {
            document.getElementById('commentNotif').checked = true;
        } else {
            document.getElementById('commentNotif').checked = false;
        }
        if (likeNotif) {
            document.getElementById('likeNotif').checked = true;
        } else {
            document.getElementById('likeNotif').checked = false;
        }
        if (giftNotif) {
            document.getElementById('giftNotif').checked = true;
        } else {
            document.getElementById('giftNotif').checked = false;
        }
        $('#commentNotif').on('click', function () {
            if (!document.getElementById('commentNotif').checked) {
                document.getElementById('commentNotif').checked = false;
                items.notificationContent.commentNotif = false;
            } else {
                document.getElementById('commentNotif').checked = true;
                items.notificationContent.commentNotif = true;
            }
            chrome.storage.local.set({ 'notificationContent': items.notificationContent });
        });
        $('#likeNotif').on('click', function () {
            if (!document.getElementById('likeNotif').checked) {
                document.getElementById('likeNotif').checked = false;
                items.notificationContent.likeNotif = false;
            } else {
                document.getElementById('likeNotif').checked = true;
                items.notificationContent.likeNotif = true;
            }
            chrome.storage.local.set({ 'notificationContent': items.notificationContent });
        });
        $('#giftNotif').on('click', function () {
            if (!document.getElementById('giftNotif').checked) {
                document.getElementById('giftNotif').checked = false;
                items.notificationContent.giftNotif = false;
            } else {
                document.getElementById('giftNotif').checked = true;
                items.notificationContent.giftNotif = true;
            }
            chrome.storage.local.set({ 'notificationContent': items.notificationContent });
        });
    });

    //===================Up主文章屏蔽=======================
    const articleFilterSw = await ExtOptions.getValue("filter");
    if (articleFilterSw != undefined) {
        document.querySelector("#articleBan").checked = articleFilterSw;
    }
    const articleFilterList = await ExtOptions.getValue("UserFilter");
    for(let i in articleFilterList){
        const value = i;
        const name = articleFilterList[i];
        $('ul#articleBanList').append(`<li class="mdui-list-item mdui-ripple articleBanItems" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons rmArticleBanItem" data-key=${value} style="cursor:pointer">delete</i><a href="https://www.acfun.cn/u/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${name}</div></li>`);
    }
    $("i.rmArticleBanItem").on("click",async e=>{
        let raw = (await ExtOptions.getValue("UserFilter")) ?? {}
        delete(raw[e.target.dataset.key])
        ExtOptions.setValue("UserFilter", raw);
        e.target.offsetParent.remove()
    })
    document.querySelector("#articleBan").addEventListener("click", async () => {
        ExtOptions.setValue("filter", document.querySelector("#articleBan").checked)
    })
    document.querySelector("#articleBanAdd").addEventListener("click", async () => {
        mdui.prompt('请输入你需要屏蔽的用户UID', '添加用户', async function (value) {
            let raw = (await ExtOptions.getValue("UserFilter")) ?? {}
            const info = await acfunApis.users.getUserInfo(value);
            raw[value] = info.profile.name;
            ExtOptions.setValue("UserFilter", raw);
            $('ul#articleBanList').append(`<li class="mdui-list-item mdui-ripple articleBanItems" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons rmArticleBanItem" data-key=${value} style="cursor:pointer">delete</i><a href="https://www.acfun.cn/u/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${raw[value]}</div></li>`);
        })
    })

    //===================评论屏蔽==========================
    const commentFilterSw = await ExtOptions.getValue("commentFilterSw");
    if (commentFilterSw != undefined) {
        document.querySelector("#commentBan").checked = commentFilterSw;
    }
    const commentBanList = await ExtOptions.getValue("CommentFilter");
    for(let i in commentBanList){
        const value = i;
        const name = commentBanList[i];
        $('ul#commentBanList').append(`<li class="mdui-list-item mdui-ripple commentBanItems" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons rmCommentBanItem" data-key=${value} style="cursor:pointer">delete</i><a href="https://www.acfun.cn/u/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${name}</div></li>`);
    }
    $("i.rmCommentBanItem").on("click",async e=>{
        let raw = (await ExtOptions.getValue("CommentFilter")) ?? {}
        delete(raw[e.target.dataset.key])
        ExtOptions.setValue("CommentFilter", raw);
        e.target.offsetParent.remove()
    })
    document.querySelector("#commentBan").addEventListener("click", async () => {
        ExtOptions.setValue("commentFilterSw", document.querySelector("#commentBan").checked)
    })
    document.querySelector("#commentBanAdd").addEventListener("click", async () => {
        mdui.prompt('请输入你需要屏蔽的用户UID', '添加用户', async function (value) {
            let raw = (await ExtOptions.getValue("CommentFilter")) ?? {}
            const info = await acfunApis.users.getUserInfo(value);
            raw[value] = info.profile.name;
            ExtOptions.setValue("CommentFilter", raw);
            $('ul#commentBanList').append(`<li class="mdui-list-item mdui-ripple commentBanItems" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons rmCommentBanItem" data-key=${value} style="cursor:pointer">delete</i><a href="https://www.acfun.cn/u/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${raw[value]}</div></li>`);
        })
    })



}
