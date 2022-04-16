const uploadConfig = {
    accept: '*',
    multiple: false,
}

/**
 * 找到数组中所有相同的元素索引
 * @param {Array} arr 
 * @param {any} item 
 * @returns {Array}
 */
export function findSameArrayItem(arr, item) {
    if (!Array.isArray(arr)) {
        throw ("[WARN]ToolBox > findSameItem: param arr should be an Array.")
    }
    let index = 0, result = [];
    arr.forEach(e => {
        if (e === item) {
            result.push(index);
        }
        index++;
    })
    return result;
}

/**
* 函数列表中全部返回都需要T/F
* @param {[{name?:"",callback:function,params:Array}]} functions 
* @param {boolean} requestResult
* @returns {boolean}
*/
export function everyFunction(functions, requestResult = true) {
    if (Array.isArray(functions)) {
        let result = requestResult;
        functions.forEach(e => {
            let para = null;
            if (e.params) {
                para = e.params
            }
            requestResult ? result &&= e.callback(para) : result ||= e.callback(para);
        })
        return requestResult == result;
    }
    throw ("second param should implement type like [{name?:\"\",callback:function,params:Array}]");
}

/**
 * 函数列表中有任意一个返回满足要求
 * @param {[{name?:"",callback:function,params:Array}]} functions 
 * @param {boolean} requestResult 
 * @returns {boolean}
 */
export function someFunction(functions, requestResult = true) {
    if (Array.isArray(functions)) {
        functions.forEach(e => {
            let para = null;
            if (e.params) {
                para = e.params
            }
            if (requestResult == e.callback(para)) {
                return true;
            }
        })
        return false;
    }
}

/**
 * 仅运行一次的包装
 * @param {function} fn 
 * @param {*} args 
 * @param {*} _this 
 * @returns {function}
 */
export function onceFunction(fn, args = null, _this = {}) {
    let hadDone = false;
    return function () {
        return hadDone ? undefined : (hadDone = true, fn.apply(_this, args));
    }
}

export function modLoadTrace(modLoadCall) {
    const startTime = performance.now();
    const result = modLoadCall();
    const endTime = performance.now();
    return { result: result, loadTime: endTime - startTime }
}


export function localizeHtmlPage() {
    for (const el of document.querySelectorAll("[data-i18n]")) {
        if ("INPUT" == el.nodeName) {
            if (el.getAttribute("type") == "text") {
                el.setAttribute(
                    "placeholder",
                    chrome.i18n.getMessage(el.getAttribute("data-i18n"))
                );
            } else if (el.getAttribute("type") == "button") {
                el.setAttribute(
                    "value",
                    chrome.i18n.getMessage(el.getAttribute("data-i18n"))
                );
            }
        }
        el.innerHTML = DOMPurify.sanitize(chrome.i18n.getMessage(el.getAttribute("data-i18n")));
        //火狐警告使用innerHTML添加标签 ⬇
        // HTMLElement.prototype.htmlContent = function(html){
        //     var dom = new DOMParser().parseFromString('<template>'+html+'</template>', 'text/html').head;
        //     this.appendChild(dom.firstElementChild.content);
        // }
        // el.htmlContent( DOMPurify.sanitize(chrome.i18n.getMessage(el.getAttribute("data-i18n"))));

    }
}

/**
 * 检测JQuery支持
 * @returns {Promise<boolean>}
 */
export async function judgeJqueryExist() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve($ != undefined)
            } catch (error) {
                this.devMode && console.log("[WARN]UtilsBundle > getAsyncDom: No Jquery Lib.")
                resolve(false);
            }
        }, 0)
    })
}

export function DOMCreater() {
    return new Proxy(
        {},
        {
            get: function (target, elementType, receiver) {
                return function (attrs, ...children) {
                    const ele = document.createElement(elementType);
                    for (let attr of Object.keys(attrs)) {
                        ele.setAttribute(attr, attrs[attr]);
                    }
                    for (let child of children) {
                        if (typeof child === "string") {
                            child = document.createTextNode(child);
                        }
                        ele.append(child);
                    }
                    return ele;
                };
            },
        }
    );
}

export function utilAsync(func) {
    return function (...args) {
        func.apply(this, args);
    };
}


/**
 * 兽音译者
 * @source https://www.52pojie.cn/thread-1571575-1-1.html
 */
export class HowlingTranslator {
    constructor(codeTxt) {
        this.__codeTxt = "嗷呜啊~";
        if (codeTxt != null) {
            codeTxt = codeTxt.trim();
            if (codeTxt.length == 4) {
                this.__codeTxt = codeTxt;
            }
        }
    }

    convert(txt) {
        txt = txt.trim();
        if (txt.length < 1) {
            return "";
        }
        let result = this.__codeTxt[3] + this.__codeTxt[1] + this.__codeTxt[0];
        let offset = 0;
        for (let i = 0; i < txt.length; i++) {
            //逐个字符转为二进制
            let c = txt.charCodeAt(i);
            for (let b = 12; b >= 0; b -= 4) {
                //映射
                let hex = (c >> b) + offset++ & 15;
                result += this.__codeTxt[(hex >> 2)];
                result += this.__codeTxt[(hex & 3)];
            }
        }
        result += this.__codeTxt[2];
        return result;
    }

    deConvert(txt) {
        txt = txt.trim();
        if (txt.length < 4) {
            return "";
        }
        let result = "";
        let offset = 0;
        for (let i = 3; i < txt.length - 1;) {
            let c = 0;
            for (let b = i + 8; i < b; i++) {
                c = c << 4 | ((this.__codeTxt.indexOf(txt[i++]) << 2 | this.__codeTxt.indexOf(txt[i])) + offset) & 0xf;
                offset = (offset == 0 ? 0x10000 * 0x10000 - 1 : offset - 1);
            }
            result += String.fromCharCode(c);
        }
        return result;
    }

    identify(txt) {
        txt = txt.trim()
        if (txt.length > 11) {
            if (txt[0] == this.__codeTxt[3] && txt[1] == this.__codeTxt[1] && txt[2] == this.__codeTxt[0] && txt.charAt(txt.length - 1) == this.__codeTxt[2] && ((txt.length - 4) % 8) == 0) {
                for (let i = 0; i < txt.length; i++) {
                    if (this.__codeTxt.indexOf(txt[i]) < 0) return false;
                }
                return true;
            }
        }
        return false;
    }
}
