export async function globalConfigure() {
    //=======================配置导入导出================================//
    let config_downloadObj = document.getElementById('configExport');
    config_downloadObj.addEventListener('click', function createDownload() {
        options_data = chrome.storage.local.get(null, function (items) {
            var options_data = ExtOptions.sanitizeOptions(items);
            var blob = new Blob([JSON.stringify(options_data)], { type: 'application/octet-stream' });
            var url = window.URL.createObjectURL(blob);
            var saveas = document.createElement('a');
            saveas.href = url;
            saveas.style.display = 'none';
            document.body.appendChild(saveas);
            saveas.download = 'AcFun-Helper.conf';
            saveas.click();
            setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 0)
            document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
        });
    });

    let jsonfy_config;
    let input = document.getElementById("input_emlwX3V0aWxz_file");
    input.onchange = function () {
        var file = this.files[0];
        if (!!file) {
            var reader = new FileReader();
            reader.readAsText(file, "utf-8");
            reader.onload = function () {
                try {
                    jsonfy_config = JSON.parse(this.result);
                } catch (e) {
                    mdui.alert("文件格式不正确");
                    return;
                }
                for (let i in jsonfy_config) {
                    if (i != 'AcpushList') {
                        chrome.storage.local.set({ [i]: jsonfy_config[i] });
                    }
                }
                notice("AcFun助手", "导入配置成功~");
                afterReconfigure();
            };
        }
    };

    let config_CleanObj = document.getElementById('configClean');
    config_CleanObj.addEventListener('click', function createClean() {
        let notice_this = prompt("确认清除小助手的所有配置吗？请考虑清楚哦。Y/N", '');
        if (notice_this == 'Y') {
            chrome.storage.local.clear(function () {
                //重置设置选项
                let x = ExtOptions.sanitizeOptions({});
                optionsSave(x);
                afterReconfigure();
            });
        }
    });

    $('.Pushresult_act').on('click', function () {
        chrome.storage.local.get(['AcCookies'], function (datao) {
            let UidReg, Uid;
            $('.SyncWait1').show();
            let x = $('p.read_result')[0];
            try {
                UidReg = new RegExp('auth_key=(.*); ac_username');
                Uid = Number(UidReg.exec(datao.AcCookies)[1]);
            } catch (error) {
                Uid = null;
                mdui.alert("请先在主站登录。");
            }
            if (Uid) {
                x.innerText = DOMPurify.sanitize('[ AcFun-Uid : ' + Uid + ' ]');
                chrome.storage.local.get(null, function (items) {
                    delete items["AcpushList1"]; delete items["Mkey"]; delete items["danmakuCache"]; delete items["AcMomentCircle1"]; delete items["AcLives1"];
                    var options_data = JSON.stringify(ExtOptions.sanitizeOptions(items));
                    let uploadData = new FormData();
                    uploadData.append("options_data", `${options_data}`);
                    // fetch('http://localhost/api/v1/acfun-helper/options/upload', { method: "POST", credentials: 'include', body: uploadData })
                    fetch(acfunHelperApis.confSync.upload, { method: "POST", credentials: 'include', body: uploadData })
                        .then((res => { return res.text() }))
                        .then((res) => {
                            if (res) {
                                mdui.snackbar({
                                    message: '同步完成。',
                                    position: 'right-top',
                                    timeout: 1000,
                                });
                            }
                        })
                });
            }
            $('.SyncWait1').hide();
        });
    });

    $('.Pullresult_act').on('click', function () {
        var inst = new mdui.Dialog('#dialog');
        inst.open();
        var dialog = document.getElementById('dialog');
        dialog.addEventListener('confirm.mdui.dialog', function () {
            chrome.storage.local.get(null, function (items) {
                $('.SyncWait1').show();
                let svrCookies = {}
                svrCookies['AcCookies'] = items['AcCookies'];
                svrCookies['AcPassToken'] = items['AcPassToken'];
                svrCookies['LocalUserId'] = items['LocalUserId']
                let upCookies = new FormData();
                upCookies.set("authCookie", `${JSON.stringify(svrCookies)}`);
                // fetch('http://localhost/api/v1/acfun-helper/options/download', { method: "POST", credentials: 'include', body: upCookies })
                fetch(acfunHelperApis.confSync.download, { method: "POST", credentials: 'include', body: upCookies })
                    .then((res => { return res.text() }))
                    .then((x) => {
                        try {
                            jsonfy_config = JSON.parse(x);
                        } catch (e) {
                            mdui.alert("认证信息格式不正确，请至少在主站登录并进入主站的稿件一次，或者说请不要伪造Cookie信息。");
                            return;
                        }
                        for (let i in jsonfy_config) {
                            chrome.storage.local.set({ [i]: jsonfy_config[i] });
                        }
                        notice("AcFun助手", "配置同步成功~");
                        afterReconfigure();
                    });
            });
        });
    });

    //====================未读计数消息轮询===================
    chrome.storage.local.get(['fetchPushList_daemonsw'], function (items) {
        var fetchPushList_daemonsw = items.fetchPushList_daemonsw;
        if (fetchPushList_daemonsw) {
            document.getElementById('fetchPushList_daemonsw').checked = true;
        } else {
            document.getElementById('fetchPushList_daemonsw').checked = false;
        }
        $('#fetchPushList_daemonsw').on('click', function () {
            if (!document.getElementById('fetchPushList_daemonsw').checked) {
                document.getElementById('fetchPushList_daemonsw').checked = false;
                chrome.storage.local.set({ 'fetchPushList_daemonsw': false });
            } else {
                document.getElementById('fetchPushList_daemonsw').checked = true;
                chrome.storage.local.set({ 'fetchPushList_daemonsw': true });
            }
        });
    });

    //====================插件系统定时器===================
    chrome.storage.local.get(['krnl_globalTimer'], function (items) {
        var krnl_globalTimer = items.krnl_globalTimer;
        if (krnl_globalTimer) {
            document.getElementById('krnl_globalTimer').checked = true;
        } else {
            document.getElementById('krnl_globalTimer').checked = false;
        }
        $('#krnl_globalTimer').on('click', function () {
            if (!document.getElementById('krnl_globalTimer').checked) {
                document.getElementById('krnl_globalTimer').checked = false;
                chrome.storage.local.set({ 'krnl_globalTimer': false });
            } else {
                document.getElementById('krnl_globalTimer').checked = true;
                chrome.storage.local.set({ 'krnl_globalTimer': true });
            }
        });
    });

    //====================推送消息轮询===================
    chrome.storage.local.get(['timer4Unread_daemonsw'], function (items) {
        var timer4Unread_daemonsw = items.timer4Unread_daemonsw;
        if (timer4Unread_daemonsw) {
            document.getElementById('timer4Unread_daemonsw').checked = true;
        } else {
            document.getElementById('timer4Unread_daemonsw').checked = false;
        }
        $('#timer4Unread_daemonsw').on('click', function () {
            if (!document.getElementById('timer4Unread_daemonsw').checked) {
                document.getElementById('timer4Unread_daemonsw').checked = false;
                chrome.storage.local.set({ 'timer4Unread_daemonsw': false });
            } else {
                document.getElementById('timer4Unread_daemonsw').checked = true;
                chrome.storage.local.set({ 'timer4Unread_daemonsw': true });
            }
        });
    });

    const xhrDrv = await ExtOptions.getValue("xhrDrv");
    document.querySelector("#xhrDrv").checked = xhrDrv;
    document.querySelector("#xhrDrv").addEventListener("click", () => {
        ExtOptions.setValue("xhrDrv", document.querySelector("#xhrDrv").checked);
    })


    //====================直播观看计时板===================
    chrome.storage.local.get(['LiveWatchTimeRec_popup'], function (items) {
        var LiveWatchTimeRec_popup = items.LiveWatchTimeRec_popup;
        if (LiveWatchTimeRec_popup) {
            document.getElementById('LiveWatchTimeRec_popup').checked = true;
        } else {
            document.getElementById('LiveWatchTimeRec_popup').checked = false;
        }
        $('#LiveWatchTimeRec_popup').on('click', function () {
            if (!document.getElementById('LiveWatchTimeRec_popup').checked) {
                document.getElementById('LiveWatchTimeRec_popup').checked = false;
                chrome.storage.local.set({ 'LiveWatchTimeRec_popup': false });
            } else {
                document.getElementById('LiveWatchTimeRec_popup').checked = true;
                chrome.storage.local.set({ 'LiveWatchTimeRec_popup': true });
            }
        });
    });

    //====================直播观看计时表===================
    chrome.storage.local.get(['krnl_videossEarly'], function (items) {
        var krnl_videossEarly = items.krnl_videossEarly;
        if (krnl_videossEarly) {
            document.getElementById('krnl_videossEarly').checked = true;
        } else {
            document.getElementById('krnl_videossEarly').checked = false;
        }
        $('#krnl_videossEarly').on('click', function () {
            if (!document.getElementById('krnl_videossEarly').checked) {
                document.getElementById('krnl_videossEarly').checked = false;
                chrome.storage.local.set({ 'krnl_videossEarly': false });
            } else {
                document.getElementById('krnl_videossEarly').checked = true;
                chrome.storage.local.set({ 'krnl_videossEarly': true });
            }
        });
    });

    //====================自定义样式===================
    chrome.storage.local.get(['custom_css'], function (items) {
        var custom_css = items.custom_css;
        $('#custom-css').on('keyup', function () {
            chrome.storage.local.set({ 'custom_css_style': $('#custom-css').val() })
        })
        if (custom_css) {
            document.getElementById('custom-css-checkbox').checked = true;
        } else {
            document.getElementById('custom-css-checkbox').checked = false;
        }

        $('#custom-css-checkbox').on('click', function () {
            if (!document.getElementById('custom-css-checkbox').checked) {
                document.getElementById('custom-css-checkbox').checked = false;
                chrome.storage.local.set({ 'custom_css': false });
            } else {
                document.getElementById('custom-css-checkbox').checked = true;
                chrome.storage.local.set({ 'custom_css': true });
            }
        });
    });
    chrome.storage.local.get(['custom_css_style'], function (items) {
        var custom_css_style = items.custom_css_style;
        $('#custom-css').val(custom_css_style);
    })

    function afterReconfigure() {
        mdui.snackbar({
            message: '配置完成，正在等待刷新。',
            position: 'right-top',
            timeout: 1000,
        });
        setTimeout(() => {
            $('.SyncWait1').hide();
            if (mention['devMode'] === false) {
                location.reload();
            }
        }, 1500);
    }

}
