/**
 * 用户信息获取
 */

class AuthInfo {
    constructor() {

    }

    cookInfo(){
        try {
            var AcCookies = document.cookie;
        } catch (TypeError) {
            var AcCookies = 0;
        }
        chrome.storage.local.set({AcCookies : `${AcCookies}`});
        // chrome.storage.local.get(['AcCookies'],function(a){console.log(a)});
    }
}