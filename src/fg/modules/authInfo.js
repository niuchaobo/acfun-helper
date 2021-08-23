/**
 * 用户信息获取
 */

class AuthInfo {
    constructor() {
        this.devMode = false;
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

}