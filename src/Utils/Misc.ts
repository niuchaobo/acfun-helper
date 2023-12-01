/**
 * 工具箱
 */
class ToolBox {
    /**
    * 监控对象中值变化
    */
    static addRefTypeValueListener(src: Record<any,any>, hook: ()=>any, keyList: Array<any> = []) {
        if (!Array.isArray(keyList)) {
            Object.keys(src).forEach(key => {
                if (typeof (Object.getOwnPropertyDescriptors(src)[key].set) == 'function') {
                    console.log("[LOG]ToolBox > addRefTypeValueListener: key", key, "is already hook setter.")
                    return;
                }
                defineItsProperty(src, key, src[key], hook);
            });
        } else {
            keyList.forEach(e => {
                if (typeof (Object.getOwnPropertyDescriptors(src)[e].set) == 'function') {
                    console.log("[LOG]ToolBox > addRefTypeValueListener: key", e, "is already hook setter.")
                    return;
                }
                defineItsProperty(src, e, src[e], hook);
            })
        }
        function defineItsProperty(src:any, key:any, value:any, hook:(e?:any,...args:any)=>any) {
            Object.defineProperty(src, key, {
                get() {
                    return value;
                },
                set(newVal) {
                    hook(newVal, value);
                    value = newVal;
                }
            })
        }
    }

    /**
     * 删除对象值变动监听
     * @param {object} src 
     * @param {Array} keyList 
     */
    static removeRefTypeValueListener(src: object, keyList: Array<any> = []) {
        if (!Array.isArray(keyList)) {
            Object.keys(src).forEach(key => {
                defineItsProperty(src, key);
            });
        } else {
            keyList.forEach(e => {
                defineItsProperty(src, e);
            })
        }
        function defineItsProperty(src:any, key:any) {
            Object.defineProperty(src, key, {
                value: src[key],
                writable: true,
            })
        }
    }

    static thisBrowser() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera";
        } //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (
            userAgent.indexOf("compatible") > -1 &&
            userAgent.indexOf("MSIE") > -1 &&
            !isOpera
        ) {
            return "IE";
        } //判断是否IE浏览器      
    }

    static curry(func:any) {
        return function curried(this: any, ...args:any) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return  (...args2:any) => {
                    return curried.apply(this, args.concat(args2));
                }
            }
        };
    }

}