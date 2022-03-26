import { importVue } from "../../../../../common/modulesLib/SFCUtil.mjs";

import { afterReconfigure } from "../Modules/Utils.mjs";
const sfcData = await importVue("pageHandler/Components/Common/configSync.vue")

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: sfcData.template,
    data() {
        return {

        }
    },
    methods: {
        upload: function () {
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
                    x.innerText = '[ AcFun-Uid : ' + Uid + ' ]';
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
                                        position: 'right-bottom',
                                        timeout: 1000,
                                    });
                                }
                            })
                    });
                }
                $('.SyncWait1').hide();
            });

        }
    },
    mounted: function () {
        document.getElementById('configDownloadDialog').addEventListener('confirm.mdui.dialog', function () {
            chrome.storage.local.get(null, function (items) {
                $('.SyncWait1').show();
                let svrCookies = {}
                svrCookies['AcCookies'] = items['AcCookies'];
                svrCookies['AcPassToken'] = items['AcPassToken'];
                svrCookies['LocalUserId'] = items['LocalUserId']
                let upCookies = new FormData();
                upCookies.set("authCookie", `${JSON.stringify(svrCookies)}`);
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
                        mdui.alert("AcFun助手", "配置同步成功~");
                        afterReconfigure();
                    });
            });
        })

    }
}
export const confsync = app