/**
 * 获取认证信息
 */
class AuthInfo extends AcFunHelperBgFrame {
    constructor() {
        super();
        this.devMode = false;
    }

    fetchPasstoken() {
        chrome.storage.local.get(['LocalUserId'], async (Uid) => {
            if (Uid.LocalUserId == "0") { return }
            chrome.cookies.get({ url: 'https://www.acfun.cn/', name: 'acPasstoken' }, function (a) {
                chrome.storage.local.set({ AcPassToken: `${a.value}` });
            })
        })
    }

}