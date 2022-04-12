export function headReady(fn) {
    return new Promise((resolve, reject) => {
        if (document.head) {
            fn(true);
        } else {
            GetAsyncDomUtil.getAsyncDomClassic(document.head, resolve(fn(true)))
        }
    })
}

export function helperDivLoaded(fn) {
    return new Promise((resolve, reject) => {
        GetAsyncDomUtil.getAsyncDomClassic("acfun-popup-helper", resolve(fn(true)))
    })
}

/**
* 判断某个对象是图片且加载好了
* @param {string} ImgDom 
* @param {Function} fn 
* @param {Function} insure 
* @param {number} time 
* @param {boolean} isDev 
* @example GetAsyncDomUtil.judgeImgReady("#article-up > div.article-content > div > div:nth-child(2) > img",function(e){console.log("ok了")})
* @returns {GetAsyncDomUtil}
*/
export function judgeImgReady(ImgDom, fn, insure, time = 2000, isDev = false) {
    if (typeof (GetAsyncDomUtil) == "undefined") {
        console.error("该类依赖于核心类 GetAsyncDomUtil");
    }
    return new GetAsyncDomUtil(ImgDom, fn, insure, function (e) {
        if (e instanceof HTMLImageElement && e.complete) {
            return true
        }
        return false
    }, time, true, 30000, isDev).probe();
}

/**
 * 判断是否有子节点诞生
 * @param {string} target 
 * @param {Function} fn 
 * @param {Function} insure 
 * @param {number} time 
 * @param {boolean} isDev 
 * @returns {GetAsyncDomUtil}
 */
export function judgeBornChilds(target, fn, insure, time = 3000, isDev = false) {
    return new GetAsyncDomUtil(target, fn, insure, function (e) {
        if (e.hasChildNodes()) {
            return true
        }
        return false
    }, time, true, 30000, isDev).probe();
}

/**
 * 判断加载中的对象稳定后是否存在某个属性或者属性为某个值
 * @param {string} target 
 * @param {function} fn 
 * @param {string|Array} attrName 属性，或者[属性，值]的列表
 * @param {function} insure 
 * @param {number} time 
 * @param {boolean} isDev 
 * @returns {GetAsyncDomUtil}
 */
export function getLoadingDomAttr(target, fn, attrName, insure, time = 3000, isDev = false) {
    return new GetAsyncDomUtil(target, fn, insure, function (e, f) {
        return Array.isArray(f) ? f[1] == e.getAttribute(f[0]) : e.getAttribute(f);
    }, time, true, 30000, isDev, null, attrName).probe();
}

/**
 * 评论区加载完成
 * @returns {Promise<boolean>}
 */
export const commentAreaReady = async () => {
    return new Promise((resolve) => {
        new GetAsyncDomUtil("commentArea", () => {
            resolve(true);
        }, () => {
            resolve(false);
        }, (e, f) => {
            if (
                !!document.querySelector('.area-comment-title a.name') && document.querySelector('.ac-comment-loading').innerHTML == ""
            ) {
                return true
            } else {
                return document.querySelector("div.ac-comment-root-list").childElementCount
            }
        }, 3000, false, 30000, true, true
        ).probe()
    })
}

/**
 * 
 * @param {{ target: string | HTMLElement | HTMLCollection, fn: () => { }, insure: () => { }, purpose: string | (e:boolean|HTMLElement|HTMLCollection,f:any)=> boolean , time: number, instantMode: boolean, maxWaitTime: boolean, devMode: boolean, advancedQueryMethod: boolean | ()=> boolean, extraParam: any }} e 
 * @returns 
 */
export function getAsyncDom(e) {
    const { target, fn, insure, purpose, time, instantMode, maxWaitTime, devMode, advancedQueryMethod, extraParam } = e
    return GetAsyncDomUtil(target, fn, insure, purpose, time, instantMode, maxWaitTime, devMode, advancedQueryMethod, extraParam).probe();
}

export function pageLoadTimeAnalysis() {
    const perf = window.performance;
    if (perf) {
        const perfEntries = perf.getEntriesByType("navigation")[0], perfTiming = 0;
        perfEntries || (perfTiming = (perfEntries = perf.timing).navigationStart);
        const result = [{
            key: "Redirect",
            desc: "\u7f51\u9875\u91cd\u5b9a\u5411\u7684\u8017\u65f6",
            value: perfEntries.redirectEnd - perfEntries.redirectStart
        }, {
            key: "AppCache",
            desc: "\u68c0\u67e5\u672c\u5730\u7f13\u5b58\u7684\u8017\u65f6",
            value: perfEntries.domainLookupStart - perfEntries.fetchStart
        }, {
            key: "DNS",
            desc: "DNS\u67e5\u8be2\u7684\u8017\u65f6",
            value: perfEntries.domainLookupEnd - perfEntries.domainLookupStart
        }, {
            key: "TCP",
            desc: "TCP\u8fde\u63a5\u7684\u8017\u65f6",
            value: perfEntries.connectEnd - perfEntries.connectStart
        }, {
            key: "Waiting(TTFB)",
            desc: "\u4ece\u5ba2\u6237\u7aef\u53d1\u8d77\u8bf7\u6c42\u5230\u63a5\u6536\u5230\u54cd\u5e94\u7684\u65f6\u95f4 / Time To First Byte",
            value: perfEntries.responseStart - perfEntries.requestStart
        }, {
            key: "Content Download",
            desc: "\u4e0b\u8f7d\u670d\u52a1\u7aef\u8fd4\u56de\u6570\u636e\u7684\u65f6\u95f4",
            value: perfEntries.responseEnd - perfEntries.responseStart
        }, {
            key: "HTTP Total Time",
            desc: "http\u8bf7\u6c42\u603b\u8017\u65f6",
            value: perfEntries.responseEnd - perfEntries.requestStart
        }, {
            key: "DOMContentLoaded",
            desc: "dom\u52a0\u8f7d\u5b8c\u6210\u7684\u65f6\u95f4",
            value: perfEntries.domContentLoadedEventEnd - perfTiming
        }, {
            key: "Loaded",
            desc: "\u9875\u9762load\u7684\u603b\u8017\u65f6",
            value: perfEntries.loadEventEnd - perfTiming
        }];
        return result
    }
}