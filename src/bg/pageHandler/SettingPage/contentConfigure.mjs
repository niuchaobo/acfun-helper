export async function contentConfigure() {
    //========================稍后再看==========================//
    chrome.storage.local.get(['watchLater'], function (items) {
        var watchLater = items.watchLater;
        if (watchLater) {
            document.getElementById('watchLater').checked = true;
        } else {
            document.getElementById('watchLater').checked = false;
        }
        $('#watchLater').on('click', function () {
            if (!document.getElementById('watchLater').checked) {
                document.getElementById('watchLater').checked = false;
                chrome.storage.local.set({ 'watchLater': false });
            } else {
                document.getElementById('watchLater').checked = true;
                chrome.storage.local.set({ 'watchLater': true });
            }
        });
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
    });

    //===================直播屏蔽配置相关==========================//
    chrome.storage.local.get(['liveBansw'], function (items) {
        var liveBans_status = items.liveBansw;
        if (liveBans_status) {
            document.getElementById('liveBansw').checked = true;
        } else {
            document.getElementById('liveBansw').checked = false;
        }
        $('#liveBansw').on('click', function () {
            if (!document.getElementById('liveBansw').checked) {
                document.getElementById('liveBansw').checked = false;
                chrome.storage.local.set({ 'liveBansw': false });
            } else {
                document.getElementById('liveBansw').checked = true;
                chrome.storage.local.set({ 'liveBansw': true });
            }
        });
    });
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
    $('#filter-add').on('click', function () {
        if ($('.filter-add-tr').length <= 0 && filter) {
            if (!$('#filter-ups').hasClass('table-custom-padding')) {
                $('#filter-ups').addClass('table-custom-padding');
            }
            $('#filter-ups').before('\
            <table id="filter_table" class="add-table">\
              <tr class="filter-add-tr">\
                <td style="width: 400px" class="td-add-input">\
                  <input style="width: 400px" type="text" class="form-control site" placeholder="请输入up主uid" required>\
                </td>\
                <td class="td-add-button">\
                  <button type="button" class="switch-open filter-add-confirm" style="width:79px;float: none;margin-left:16px;">添加</button>\
                </td>\
                <td class="td-add-remove-button">\
                  <button type="button" class="switch-close filter-add-remove" style="width:79px;float: none;">取消</button>\
                </td>\
              </tr>\
              <tr><td class="filter-fail"></td></tr>\
            </table>');
            $('.filter-add-remove').on('click', async function () {
                $(this).parent().parent().parent().parent().remove();
                if ($('#filter-ups .site').length <= 0) {
                    $('#filter-ups').removeClass('table-custom-padding');
                }
            });
            $('#filter_table .filter-add-confirm').on('click', async function () {
                $('.filter-fail').hide();
                var input_valid = true;
                var uid_input = $(this).parent().prev().children('input').val();
                let user_key = "FILTER_" + uid_input;
                if (uid_input === '') {
                    $('.filter-fail').text('输入内容不能为空');
                    $('.filter-fail').show();
                    input_valid = false;
                } else if (!uid_input.match(uidReg)) {
                    $('.mark-fail').text('uid必须为数字');
                    $('.mark-fail').show();
                    input_valid = false;
                }
                if (!input_valid) {
                    return;
                }
                //判断此uid是否存在
                let ac_res = await getStorage("FILTER_" + uid_input).then(value => { return value["FILTER_" + uid_input] });
                if (ac_res != undefined && ac_res != null && ac_res.name != '') {
                    input_valid = false;
                    $('.filter-fail').text('此up已被屏蔽');
                    $('.filter-fail').show();
                }

                if (input_valid) {
                    //根据uid解析出up主姓名
                    $("body").mLoading("show");
                    let up_url = defaults.userInfo.replace('{uid}', uid_input);
                    var up_html_str;
                    try {
                        up_html_str = await ajax('GET', up_url);
                    } catch (e) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }
                    let up_name = JSON.parse(up_html_str).profile.name;

                    if (up_name == '' || up_name == undefined) {
                        $("body").mLoading("hide");
                        $('.mark-fail').text('此uid不存在');
                        $('.mark-fail').show();
                        return;
                    }

                    let user_scan = {
                        name: up_name,
                    }
                    chrome.storage.local.set({ [user_key]: user_scan }, function () {
                        $('#filter-ups #filter-blank').remove();
                        $('#filter-ups').prepend('\
                          <tr class="site-tr">\
                              <td style="width: 200px" class="site"><a href="' + up_url + '" target="_blank">' + uid_input + '</a></td>\
                              <td class="site-name"><a href="' + up_url + '" target="_blank">' + up_name + '</a></td>\
                              <td class="site-remove"><span href="#" class="filter-remove">移除</span></td>\
                            </tr>');
                    });

                    $(this).parent().parent().parent().parent().remove();
                    $('#filter-ups').on('click', '.filter-remove', function () {
                        if (filter) {
                            $(this).parent().parent().remove();
                            chrome.storage.local.remove(user_key, function () {
                                //do something
                            });
                        }
                    });
                    $("body").mLoading("hide");
                }
            });
        }
    });

}
