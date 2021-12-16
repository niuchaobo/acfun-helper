/**
 * 用户信息获取
 */
class AuthInfoFg extends AcFunHelperFgFrame {
    constructor() {
        super();
    }

    cookInfo() {
        try {
            var AcCookies = document.cookie;
        } catch (TypeError) {
            var AcCookies = 0;
        }
        chrome.storage.local.set({ AcCookies: `${AcCookies}` });

        window.addEventListener("message", (e) => {
            if (e.data.to == "authinfo_mkey") {
                chrome.storage.local.set({ Mkey: `${e.data.msg}` });
            }
        }, false)

    }

    uidInfo() {
        //Uid获取
        try {
            var UidInCookies = document.cookie.match("auth_key=(.*); ac_username")[1];
        } catch (TypeError) {
            var UidInCookies = 0;
        }
        chrome.storage.local.set({ LocalUserId: `${UidInCookies}` });
    }

}