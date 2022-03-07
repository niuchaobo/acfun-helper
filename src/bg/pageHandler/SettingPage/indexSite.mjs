export async function indexSiteConfigure() {

    //=====================文章投蕉==========================
    const bananaNotice = await ExtOptions.getValue("banana_notice");
    if (bananaNotice) {
        document.getElementById('bananaNotice').checked = true;
    } else {
        document.getElementById('bananaNotice').checked = false;
    }
    $('#bananaNotice').on('click', function () {
        if (!document.getElementById('bananaNotice').checked) {
            document.getElementById('bananaNotice').checked = false;
            chrome.storage.local.set({ 'banana_notice': false });
        } else {
            document.getElementById('bananaNotice').checked = true;
            chrome.storage.local.set({ 'banana_notice': true });
        }
    });

    //=====================文章投蕉==========================
    const articleBanana = await ExtOptions.getValue("articleBanana");
    if (articleBanana) {
        document.getElementById('articleBanana').checked = true;
    } else {
        document.getElementById('articleBanana').checked = false;
    }
    $('#articleBanana').on('click', function () {
        if (!document.getElementById('articleBanana').checked) {
            document.getElementById('articleBanana').checked = false;
            chrome.storage.local.set({ 'articleBanana': false });
        } else {
            document.getElementById('articleBanana').checked = true;
            chrome.storage.local.set({ 'articleBanana': true });
        }
    });

    //=====================在投蕉后播放投蕉音效==========================
    chrome.storage.local.get(['audioAfterBanana'], function (items) {
        var audioAfterBanana = items.audioAfterBanana;
        if (audioAfterBanana) {
            document.getElementById('audioAfterBanana').checked = true;
        } else {
            document.getElementById('audioAfterBanana').checked = false;
        }
        $('#audioAfterBanana').on('click', function () {
            if (!document.getElementById('audioAfterBanana').checked) {
                document.getElementById('audioAfterBanana').checked = false;
                chrome.storage.local.set({ 'audioAfterBanana': false });
            } else {
                document.getElementById('audioAfterBanana').checked = true;
                chrome.storage.local.set({ 'audioAfterBanana': true });
            }
        });
    });

    //=====================点赞之后弹出通知==========================
    chrome.storage.local.get(['LikeHeartNotif'], function (items) {
        var LikeHeartNotif = items.LikeHeartNotif;
        if (LikeHeartNotif) {
            document.getElementById('LikeHeartNotif').checked = true;
        } else {
            document.getElementById('LikeHeartNotif').checked = false;
        }
        $('#LikeHeartNotif').on('click', function () {
            if (!document.getElementById('LikeHeartNotif').checked) {
                document.getElementById('LikeHeartNotif').checked = false;
                chrome.storage.local.set({ 'LikeHeartNotif': false });
            } else {
                document.getElementById('LikeHeartNotif').checked = true;
                chrome.storage.local.set({ 'LikeHeartNotif': true });
            }
        });
    });

    //=====================自动给Up主的投稿点赞===================
    chrome.storage.local.get(['LikeHeart'], function (items) {
        var LikeHeart = items.LikeHeart;
        if (LikeHeart) {
            document.getElementById('LikeHeart').checked = true;
            document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'block';
        } else {
            document.getElementById('LikeHeart').checked = false;
            document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'none';
        }
        $('#LikeHeart').on('click', function () {
            if (!document.getElementById('LikeHeart').checked) {
                document.getElementById('LikeHeart').checked = false;
                chrome.storage.local.set({ 'LikeHeart': false });
                document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'none';
            } else {
                document.getElementById('LikeHeart').checked = true;
                document.getElementsByClassName('LikeHeartClasses')[0].style.display = 'block';
                chrome.storage.local.set({ 'LikeHeart': true });
            }
        });
    });
    chrome.storage.local.get(['LikeHeartClass'], function (items) {
        document.querySelector("#LikeHeartClass").parentElement.children[1].children[1].children[items.LikeHeartClass].click()
        var inst = new mdui.Select('#LikeHeartClass');
        $('#LikeHeartClass').on('close.mdui.select', function () {
            chrome.storage.local.set({ 'LikeHeartClass': inst.value });
        });
    });

    //=====================评论区Up标记==========================
    chrome.storage.local.get(['upHighlight'], function (items) {
        var UpMark = items.upHighlight;
        if (UpMark) {
            document.getElementById('UpMark').checked = true;
        } else {
            document.getElementById('UpMark').checked = false;
        }
        $('#UpMark').on('click', function () {
            if (!document.getElementById('UpMark').checked) {
                document.getElementById('UpMark').checked = false;
                chrome.storage.local.set({ 'upHighlight': false });
            } else {
                document.getElementById('UpMark').checked = true;
                chrome.storage.local.set({ 'upHighlight': true });
            }
        });
    });

    //=====================评论用户扫描==========================
    chrome.storage.local.get(['scan'], function (items) {
        var UserScan = items.scan;
        if (UserScan) {
            document.getElementById('UserScan').checked = true;
        } else {
            document.getElementById('UserScan').checked = false;
        }
        $('#UserScan').on('click', function () {
            if (!document.getElementById('UserScan').checked) {
                document.getElementById('UserScan').checked = false;
                chrome.storage.local.set({ 'scan': false });
            } else {
                document.getElementById('UserScan').checked = true;
                chrome.storage.local.set({ 'scan': true });
            }
        });
    });

    //=====================评论用户标记==========================
    chrome.storage.local.get(['mark'], function (items) {
        var UserScanUI = items.mark;
        if (UserScanUI) {
            document.getElementById('UserScanUI').checked = true;
        } else {
            document.getElementById('UserScanUI').checked = false;
        }
        $('#UserScanUI').on('click', function () {
            if (!document.getElementById('UserScanUI').checked) {
                document.getElementById('UserScanUI').checked = false;
                chrome.storage.local.set({ 'mark': false });
            } else {
                document.getElementById('UserScanUI').checked = true;
                chrome.storage.local.set({ 'mark': true });
            }
        });
    });

    //====================关注在主站关注的直播开播推送===================
    chrome.storage.local.get(['followLiveNotif'], function (items) {
        var followLiveNotif = items.followLiveNotif;
        if (followLiveNotif) {
            document.getElementById('followLiveNotif').checked = true;
        } else {
            document.getElementById('followLiveNotif').checked = false;
        }
        $('#followLiveNotif').on('click', function () {
            if (!document.getElementById('followLiveNotif').checked) {
                document.getElementById('followLiveNotif').checked = false;
                chrome.storage.local.set({ 'followLiveNotif': false });
            } else {
                document.getElementById('followLiveNotif').checked = true;
                chrome.storage.local.set({ 'followLiveNotif': true });
            }
        });
    });

    //=============================关注直播推送==========================
    chrome.storage.local.get(['liveFloowNotif'], function (items) {
        var liveFloowingsw_status = items.liveFloowNotif;
        if (liveFloowingsw_status) {
            document.getElementById('liveFollowNotifsw').checked = true;
        } else {
            document.getElementById('liveFollowNotifsw').checked = false;
        }
        $('#liveFollowNotifsw').on('click', function () {
            if (!document.getElementById('liveFollowNotifsw').checked) {
                document.getElementById('liveFollowNotifsw').checked = false;
                chrome.storage.local.set({ 'liveFloowNotif': false });
            } else {
                document.getElementById('liveFollowNotifsw').checked = true;
                chrome.storage.local.set({ 'liveFloowNotif': true });
            }
        });
    });
    chrome.storage.local.get(['liveFloowings'], function (items) {
        if (JSON.stringify(items) !== '{}') {
            for (let i in items.liveFloowings) {
                $('ul#liveFollowNotifList').append(`<li class="mdui-list-item mdui-ripple" data-key=${i} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${i} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${i}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatchOrig" data-key=${i} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${i} UserName:${items.liveFloowings[i]}</div></li>`);
            }
            $('.liveFloowingsItems').click(function () {
                let this_uid = $(this).data("key");
                $(this).parent().hide();
                mdui.snackbar({
                    message: `已移除 ${items.liveFloowings[this_uid]}`,
                });
                delete items.liveFloowings[this_uid];
                chrome.storage.local.set({ 'liveFloowings': items.liveFloowings });
            });
            // $('.liveWatchOrig').click(function () {
            //     let this_uid=$(this).data("key");
            //     window.open('https://live.acfun.cn/live/'+this_uid);
            // });
        }
    });
    chrome.storage.local.get(['liveFloowings'], function (items) {
        if (JSON.stringify(items) == '{}') {
            let a = {}
            chrome.storage.local.set({ 'liveFloowings': a });
        } else {
            $('#liveFollowAdd').on('click', function () {
                mdui.prompt('请输入你需要关注的用户UID', '添加关注',
                    async function (value) {
                        if (!value == '') {
                            var up_url = "https://www.acfun.cn/rest/pc-direct/user/userInfo?userId={uid}".replace('{uid}', value);
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
                                items.liveFloowings[value] = liveup_name;
                                chrome.storage.local.set({ 'liveFloowings': items.liveFloowings })
                                mdui.snackbar({ message: ` ${liveup_name} 已被加入关注列表` });
                                $('ul#liveFollowNotifList').append(`<li class="mdui-list-item mdui-ripple" data-key=${value} style="cursor:default"><i class="mdui-list-item-icon mdui-icon material-icons liveFloowingsItems" data-key=${value} style="cursor:pointer">delete</i><a href="https://live.acfun.cn/live/${value}" target="_blank"><i class="mdui-list-item-icon mdui-icon material-icons liveWatch" data-key=${value} style="cursor:pointer">desktop_windows</i></a><div class="mdui-list-item-content">Uid:${value} UserName:${liveup_name}</div></li>`);
                                $('.liveFloowingsItems').click(function () {
                                    let this_uid = $(this).data("key");
                                    $(this).parent().hide();
                                    mdui.snackbar({
                                        message: `已移除 ${items.liveFloowings[this_uid]}`,
                                    });
                                    delete items.liveFloowings[this_uid];
                                    chrome.storage.local.set({ 'liveFloowings': items.liveFloowings });
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

    //========================立即打开直播推送==========================//
    chrome.storage.local.get(['liveFollowOpenNow'], function (items) {
        var liveFollowOpenNow = items.liveFollowOpenNow;
        if (liveFollowOpenNow) {
            document.getElementById('liveFollowOpenNow').checked = true;
        } else {
            document.getElementById('liveFollowOpenNow').checked = false;
        }
        $('#liveFollowOpenNow').on('click', function () {
            if (!document.getElementById('liveFollowOpenNow').checked) {
                document.getElementById('liveFollowOpenNow').checked = false;
                chrome.storage.local.set({ 'liveFollowOpenNow': false });
            } else {
                document.getElementById('liveFollowOpenNow').checked = true;
                chrome.storage.local.set({ 'liveFollowOpenNow': true });
            }
        });
    });
}
