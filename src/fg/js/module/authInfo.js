/**
 * 用户信息获取
 */

class AuthInfo {
    constructor() {

    }

    cookInfo() {
        try {
            var AcCookies = document.cookie;
        } catch (TypeError) {
            var AcCookies = 0;
        }
        chrome.storage.local.set({ AcCookies: `${AcCookies}` });
        // chrome.storage.local.get(['AcCookies'],function(a){console.log(a)});
    }

    historyView() {
        let params = {
            title: 'HistoryViews',
            msg: `${localStorage.cache}`,
        }
        chrome.runtime.sendMessage({ action: 'historyView', params: params }, function (response) {
        });
    }

}