const uploadConfig = {
    accept: '*',
    multiple: false,
}

export class Tools {
    /**
     * 找到数组中所有相同的元素索引
     * @param {Array} arr 
     * @param {any} item 
     * @returns {Array}
     */
    static findSameArrayItem(arr, item) {
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
    static everyFunction(functions, requestResult = true) {
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
    static someFunction(functions, requestResult = true) {
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
    static onceFunction(fn, args = null, _this = {}) {
        let hadDone = false;
        return function () {
            return hadDone ? undefined : (hadDone = true, fn.apply(_this, args));
        }
    }

    static modLoadTrace(modLoadCall) {
        const startTime = performance.now();
        const result = modLoadCall();
        const endTime = performance.now();
        return { result: result, loadTime: endTime - startTime }
    }


    static localizeHtmlPage() {
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
    
}