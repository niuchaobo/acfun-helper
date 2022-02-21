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
