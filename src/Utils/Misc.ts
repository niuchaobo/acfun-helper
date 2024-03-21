
/**
* 监控对象中值变化
*/
export function addRefTypeValueListener(src: Record<any, any>, hook: () => any, keyList: Array<any> = []) {
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
    function defineItsProperty(src: any, key: any, value: any, hook: (e?: any, ...args: any) => any) {
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
export function removeRefTypeValueListener(src: object, keyList: Array<any> = []) {
    if (!Array.isArray(keyList)) {
        Object.keys(src).forEach(key => {
            defineItsProperty(src, key);
        });
    } else {
        keyList.forEach(e => {
            defineItsProperty(src, e);
        })
    }
    function defineItsProperty(src: any, key: any) {
        Object.defineProperty(src, key, {
            value: src[key],
            writable: true,
        })
    }
}

export function thisBrowser() {
    //取得浏览器的userAgent字符串
    var userAgent = navigator.userAgent;
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera";
    }
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    }
    if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera
    ) {
        return "IE";
    }
}

export function curry(func: any) {
    return function curried(this: any, ...args: any) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return (...args2: any) => {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}

export const throttle = (func: Function, time: number, immediate = false) => {
    if (immediate) {
        let prevTime = 0;
        return (...args: any) => {
            let nowTime = Date.now();
            if (nowTime - prevTime >= time) {
                func.apply(this, args)
                prevTime = nowTime
            }
        }
    } else {
        let timer: number | null = null;
        return (...args: any) => {
            if (!timer) {
                func.apply(this, args)
                timer = window.setTimeout(() => {
                    if (timer) clearInterval(timer)
                    timer = null
                }, time);
            }
        }
    }
}

export const debounce = (fn: Function, delay: number) => {
    let timer: number | null = null;
    return (...args: any) => {
        let _this = this;
        let _args = args;
        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.call(_this, _args);
            }, delay);
        } else {
            timer = setTimeout(function () {
                fn.call(_this, _args);
            }, delay);
        }
    };
};