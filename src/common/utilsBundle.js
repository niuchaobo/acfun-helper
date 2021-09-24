class UtilsBundle {
    constructor() {
        this.utilsList = [];
        this.utilsList.push(UtilsBundle);
        this.devMode = false;
    }

    removeUtils(utilName = "") {
        function removeUtil(_this, utilName = "") {
            let elemId = _this.utilsList.indexOf(utilName);
            if (elemId != -1) {
                _this.utilsList[elemId].beforeRemove.call({});
                delete _this.utilsList[elemId];
                return true;
            }
            return false;
        }
        if (typeof utilName == "string") {
            return removeUtil(this, utilName);
        } else if (typeof utilName == "object" && Array.isArray(utilName)) {
            let stateCount = 0, causeElemt = [];
            utilName.forEach(e => {
                if (removeUtil(this, e)) {
                    stateCount++;
                } else {
                    causeElemt.push(e);
                }
            });
            if (stateCount === 0) {
                return true;
            }
            return causeElemt;
        }
    }

}

/**
 * SenssionStorage & LocalStorage 操作封装
 */
class WebStorageUtil extends UtilsBundle {
    constructor(storeMode = "local", storeTimeout = 86400000, timeLimit = 2000) {
        super();
        this.utilsList.push(WebStorageUtil);

        this.storeMode = storeMode;
        this.storeTimeout = storeTimeout;
        this.timeLimit = timeLimit;
        this.unavailTypes = ["undefined", "function", "Symbol",];
        this.hander = {};
        this.init();
    }

    init() {
        if ("localStorage" in window && "storage" in navigator) {
            navigator.storage.estimate().then(status => {
                if (status.usage + 10 > status.quota) {
                    this.purgeOutdate();
                    throw "[LOG]WebStorageUtil > init: Storagespace is about out of quota,unable to init WebStorageUtil or execute inner function.";
                }
            })
            switch (this.storeMode) {
                case "local":
                    this.hander = window.localStorage;
                    break;
                case "session":
                    this.hander = window.sessionStorage;
                    break;
            }
        } else {
            throw ("[LOG]WebStorageUtil > init: browser is not support localStorage.")
        }
    }

    get unavailTypes() {
        return this._unavailTypes;
    }

    set unavailTypes(types) {
        this._unavailTypes = types;
    }

    typeCheck(elem) {
        if (typeof (elem) in this.unavailTypes) {
            return false;
        }
        return true;
    }

    getByKey(key = "") {
        if (key) {
            const result = JSON.parse(this.hander.getItem(key));
            if (!result.timeout) {
                return result;
            }
            const latestTime = new Date;
            if (result.timeout != -1) {
                if (result.timeout < latestTime.getTime()) {
                    //已经过期了，我不仅不会返回给你，我还会把这个漏网之鱼删掉！
                    this.hander.removeItem(key);
                    return false;
                }
            }
            return result["value"];
        }
        return false;
    }

    setByKv(key, value) {
        this.init()
        if (this.typeCheck(key) && this.typeCheck(value)) {
            let timeoutStamp;
            if (this.storeTimeout != -1) {
                timeoutStamp = (new Date).getTime() + this.storeTimeout;
            }
            const data = { timeout: timeoutStamp, value: value }
            this.hander.setItem(key, JSON.stringify(data))
            return true;
        }
        return false;
    }

    removeItems(keys = "") {
        function removeItem(_this, key) {
            if (_this.hander.hasOwnProperty(key)) {
                _this.hander.removeItem(key);
                return true;
            }
            return false;
        }
        if (typeof keys == "string") {
            return removeItem(this, keys);
        } else if (typeof keys == "object") {
            let stateCount = 0, causeElemt = [];
            keys.forEach(e => {
                if (removeItem(e)) {
                    stateCount++;
                } else {
                    causeElemt.push(e);
                }
            });
            if (stateCount === 0) {
                return true;
            }
            return causeElemt;
        }
    }

    watchByKey(targetKey, eventCall) {
        if (!targetKey && typeof eventCall != 'function') {
            throw "[LOG]WebStorageUtil > watchByKey:targetKey or eventCall maybe wrong type.";
        }
        if (e.key === targetKey) {
            window.addEventListener("storage", eventCall);
        }
    }

    purgeOutdate() {
        const keyList = Object.keys(this.hander);
        keyList.forEach(e => {
            const result = this.getByKey(e);
            if (result.timeout < new Date.getTime()) {
                this.removeItems(e);
            }
        })
    }

    static isSupport() {
        if ("localStorage" in window && "sessionStorage" in window) {
            return true;
        }
        return false;
    }
}

/**
 * Cookies处理封装
 * @description A complete cookies reader/writer framework with full unicode support. https://developer.mozilla.org/en-US/docs/DOM/document.cookie. This framework is released under the GNU Public License, version 3 or later. http://www.gnu.org/licenses/gpl-3.0-standalone.html
 * @tutorial setItem(name, value[, end[, path[, domain[, secure]]]])
 * getItem(name)
 * removeItem(name[, path], domain)
 * hasKey(name)
 * keys()
 * addTime({day:31})
 */
class CookiesUtils extends UtilsBundle {
    constructor() {
        super();
        this.utilsList.push(CookiesUtils);

    }

    static getItem(sKey) {
        return decodeURIComponent(
            document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
        ) || null;
    }

    /**
     * 设置Cookies
     * @param {string} sKey 
     * @param {string} sValue 
     * @param {Date|String|Number} vEnd 
     * @param {string} sPath 
     * @param {string} sDomain 
     * @param {true} bSecure 
     * @returns 
     */
    static setItem(sKey, sValue, vEnd = false, sPath = false, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    //如果是数字,单位默认是:秒
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "; path=/") + (bSecure ? "; secure" : "");
        return true;
    }

    static removeItem(sKey, sPath, sDomain) {
        if (!sKey || !CookiesUtils.hasKey(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "; path=/");
        return true;
    }

    static hasKey(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    static keys() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }

    static addTime(option) {
        var __DEF = { year: 0, month: 0, day: 0, hour: 0, minute: 0, seconds: 0 }
        var _option = Object.assign({}, __DEF, option)
        var dateObject = new Date()
        dateObject.setFullYear(dateObject.getFullYear() + _option.year)
        dateObject.setMonth(dateObject.getMonth() + _option.month)
        dateObject.setDate(dateObject.getDate() + _option.day)
        dateObject.setHours(dateObject.getHours() + _option.hour)
        dateObject.setMinutes(dateObject.getMinutes() + _option.minute)
        dateObject.setSeconds(dateObject.getSeconds() + _option.seconds)
        return dateObject
    }

    getAllArray() {
        return document.cookie == "" ? undefined : document.cookie.split(";");
    }

    getAllDic() {
        let raw = this.getAllArray() ?? [];
        let result = {};
        raw.forEach(e => {
            let temp = e.trim().split("=");
            result[temp[0]] = temp[1];
        })
        return result;
    }

    stringify() {
        let result = "";
        let raw = this.getAll();
        for (let i in raw) {
            result += i + "=" + raw[i] + "; ";
        }
        console.log(result);
        return result;
    }

    get(key) {
        return this.getAll()[key];
    }

    addChangeListener(key, callback) {
        /**
         * @param {Event} e 
         */
        cookieStore.onchange = (e) => {
            e.type == "change" && e.changed.forEach(f => {
                f.name == key && callback();
            })
        }
    }

}

/**
 * 监视DOM树
 */
class DOMObserver extends UtilsBundle {
    /**
     * @param {HTMLElement|string|HTMLElement[]} targets 选择器
     * @param {function} trigger 钩子函数
     * @param {boolean} devMode 
     * @param {boolean} complex 
     */
    constructor(targets, trigger, devMode = false, complex = false) {
        super();
        this.utilsList.push(DOMObserver);

        /**
         * 一个监控对象或者多个监控对象
         * @description 一个监控对象对应一个Observer，多个Observer的事件都汇聚到postProcessor，最后由callbackRegister字典中的callbacks.condition筛选消息，交付给callbacks.callback
         */
        this.targets = targets;
        this.trigger = trigger;
        /**
         * 监视器实例
         * @type {MutationObserver[]}
         */
        this.observerInst = [];
        this.devMode = devMode;
        this.complex = complex;
        this.config = {
            hasInit: false, childList: true, attributes: true, characterData: false,
            subtree: false, characterDataOldValue: false, attributeOldValue: false
        }
        /**
         * @type {MutationObserver}
         */
        this.MutationObserverFg = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        if (!this.complex) {
            this.init();
        } else {
            this.observerInst = {};
            this.callType = null;
            this.callbackRegister = {
                /**
                 * @type {string[]}
                 */
                names: [],
                /**
                 * @type {{[name:string]:{condition:function,callback:function}}}
                 * @example {"1":{condition:(e)=>{return e.type=="attributes"},callback:()=>{console.log("ok")}}}
                 */
                callbacks: {}
            };
            this.initx();
        }
    }

    /**
     * 配置配置
     * @param {boolean} childList 子节点的变动（指新增，删除或者更改）。
     * @param {boolean} attributes 属性的变动。
     * @param {boolean} characterData 节点内容或节点文本的变动。
     * @param {boolean} subtree 将该观察该节点的所有后代节点。
     * @param {string[]} attributeFilter 数组，表示需要观察的特定属性（比如['class','src']），设定了attributes之后，如果不需要筛选观测的attribute列表就将其从config字典中删除，否则将会筛除所有事件。
     * @param {boolean} attributeOldValue 观察attributes变动时，记录变动前属性值。
     * @param {boolean} characterDataOldValue 观察characterData变动时，记录变动前值。
     * @param {boolean} throttleEnable 节流处理。
     * @param {number} throttleInsureTime 节流超时。
     */
    configSet(childList, attributes, characterData = false, subtree = false, attributeFilter = [], attributeOldValue = false, characterDataOldValue = false, throttleEnable = false, throttleInsureTime = 500) {
        if (childList || attributes || characterData) {
            this.config.childList = childList;
            this.config.attributes = attributes;
            this.config.characterData = characterData;
            if (attributeFilter.length) {
                this.config.attributeFilter = attributeFilter;
            }
            this.config.attributeOldValue = attributeOldValue;
            this.config.characterDataOldValue = characterDataOldValue;
            this.config.subtree = subtree;
            this.config.hasInit = true;
            this.config.throttleEnable = throttleEnable;
            this.config.throttleInsureTime = throttleInsureTime;
        } else {
            fgConsole("DOMObserver", "", `minimum, one of childList, attributes, and/or characterData must be true before you call observe().`, 1);
        }
    }

    init() {
        if (this.config.throttleEnable) {
            const beforeThrottleWarp = this.trigger;
            this.trigger = throttle(beforeThrottleWarp, this.config.throttleInsureTime);
        }
        if (Array.isArray(this.trigger)) {
            const rawTriggers = this.trigger;
            this.trigger = (e, f) => {
                rawTriggers.forEach(thisTrigger => {
                    thisTrigger(e, f);
                })
            }
        }
    }

    initx() {
        let rawParType = typeof (this.trigger);
        switch (rawParType) {
            case "function":
                this.callbackRegister.names.push(0);
                this.callbackRegister.callbacks[0] = this.trigger;
                this.callType = "function";
                break;
            case "object":
                if (Array.isArray(this.trigger)) {
                    this.callbackRegister.names.push(0);
                    this.callbackRegister.callbacks[0].callback = (a, b) => {
                        this.trigger.forEach(e => {
                            e(a, b);
                        });
                    }
                    this.callType = "array";
                    return;
                }
                if (this.trigger instanceof Object) {
                    this.callbackRegister.names = Object.keys(this.trigger);
                    this.callbackRegister.forEach(e => {
                        this.callbackRegister.callbacks[e] = this.trigger[e];
                    });
                    this.callType = "object";
                }
                break;
        }
    }

    preRemove(obsvr) {
        const extraMutations = obsvr.takeRecords();
        if (extraMutations) {
            extraMutations.forEach(e => {
                this.trigger(e)
            })
        }
    }

    createObserver() {
        if (!Array.isArray(this.targets)) {
            this.observerInst.push(new this.MutationObserverFg(this.trigger));
            this.observerInst.forEach(inst => {
                inst.observe(this.targets, this.config);
            })
            return;
        }
        this.targets.forEach(() => {
            this.observerInst.push(new this.MutationObserverFg(this.trigger));
        })
        let index = 0;
        this.targets.forEach(target => {
            this.observerInst[index++].observe(target, this.config);
        });
    }

    /**
     * 增加监听对象
     * @param {HTMLElement} elem 
     */
    addElements(elem) {
        if (!Array.isArray(elem)) {
            if (this.targets instanceof HTMLElement) {
                let tempArr = this.targets;
                this.targets = [];
                this.targets.push(tempArr);
                this.targets.push(elem);
                this.observerInst.push(new this.MutationObserverFg(this.trigger));
                this.observerInst[this.observerInst.length - 1].observe(elem, this.config);
            } else {
                fgConsole("DOMObserver", "addElements", `the param elem type should be HTMLElement.`, 1);
            }
        } else {
            this.targets.concat(elem);
            elem.forEach(e => {
                this.observerInst.push(new this.MutationObserverFg(this.trigger));
                this.observerInst[this.observerInst.length].observe(e, this.config)
            });
        }
    }

    /**
     * 复杂模式下的添加对象
     * @param {*} elem 
     */
    addElementsX(elem) {

    }

    /**
     * 添加回调
     * @param {function} callbacks 
     */
    addCallbacks(callbacks) {
        if (Array.isArray(callbacks)) {
            let rawTrig = this.trigger;
            this.trigger = (e, f) => {
                rawTrig(e, f);
                callbacks.forEach(g => {
                    g(e, f);
                })
            }
        } else if (typeof (this.trigger) == "function") {
            let rawTrig = this.trigger;
            this.trigger = [];
            this.trigger.push(rawTrig);
            this.trigger.push(callbacks);
            rawTrig = this.trigger;
            this.trigger = (e, f) => {
                rawTrig.forEach(g => {
                    g(e, f);
                })
            }
        }
    }

    /**
     * 删除监视器
     * @param {HTMLElement|string} elements 
     * @param {boolean} preRemove
     * @returns 
     */
    removeObserver(elements, preRemove = false) {
        if (Array.isArray(elements)) {
            elements.forEach(e => {
                let elemIndex = this.targets.indexOf(e);
                preRemove && this.preRemove(this.observerInst[elemIndex]);
                elemIndex != -1 && this.observerInst[elemIndex].disconnect();
            })
        } else {
            preRemove && this.preRemove(this.observerInst[0]);
            if (elements) {
                this.targets === elements && this.observerInst[0].disconnect();
                return;
            }
            this.observerInst.forEach(e => e.disconnect());
        }
    }

    complexInstantProduct() {
        if (Array.isArray(this.targets)) {
            this.targets.forEach((target) => {
                this.observerInst[target] = new this.MutationObserverFg(this.preProcessor(mutations, myself));
            })
        }
        if (this.config.hasInit) {
            for (let inst in this.observerInst) {
                this.observerInst[inst].observe(document.querySelector(inst), this.config);
            }
        } else {
            throw "[LOG]DOMObserver > instantProduct:before you create MutationObserver,you should set config dict by use configSet().";
        }
    }

    preProcessor(mutations, myself) {
        if (this.callType == "function") {
            this.targets(mutations);
        } else {
            const conditionFilter = [];
            this.callbackRegister.names.forEach(e => { conditionFilter.push({ name: e, call: this.callbackRegister.callbacks[e].condition }) });
            let result = [];
            mutations.forEach(mutation => {
                conditionFilter.forEach(call => {
                    if (call.call()) {
                        result.push(call.name);
                    }
                })
                result.forEach(f => this.callbackRegister.callbacks[f].callback(mutation));
            })
        }
    }

    /**
     * 监控子对象
     * @param {HTMLElement} target 
     * @param {Function} fns returns {MutationRecord}
     * @param {boolean} isDev 
     * @returns class DOMObserver
     */
    static glance(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(true, false, false, false, [], false, false);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

    /**
     * 监控对象所有变动
     * @param {HTMLElement} target 
     * @param {Function} fns 
     * @param {boolean} isDev 
     * @returns class DOMObserver
     */
    static monitor(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(true, true, true, true, [], true, true);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

    /**
     * 监控对象属性变动
     * @param {HTMLElement} target 
     * @param {Function} fns 
     * @param {boolean} isDev 
     * @returns class DOMObserver
     */
    static watchAttrs(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(false, true, false, false, [], true, false);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

}

/**
 * getAsyncDom Class Version!
 * @param {string} target 监听目标
 * @param {Function} fn 成功回调
 * @param {Function} insure 失败回调
 * @param {string|Function} purpose 成功的条件
 * @param {number} time 一次检测时间间隔
 * @param {boolean} instantMode 间隔定长
 * @param {number} maxWaitTime 最长等待时间
 * @param {boolean} devMode 开发模式
 * @param {ParentNode} advancedQueryMethod 自定义检测方法
 * @param {string|Array|object} extraParam 额外参数
 * @description 监听DOM对象 模块版本!
 */
class GetAsyncDomUtil extends UtilsBundle {
    constructor(target, fn, insure, purpose = "exist", time = 2500, instantMode = true, maxWaitTime = 30000, devMode = true, advancedQueryMethod, extraParam = null) {
        super();
        this.utilsList.push(GetAsyncDomUtil);

        this.index = 0;
        this.iterLimit = 0;
        this.target = target;
        this.purpose = purpose;
        this.condition = true;
        this.fn = typeof (fn) === 'function' ? fn : this.causeError('fn');
        this.time = time;
        this.instantMode = instantMode;
        this.maxWaitTime = maxWaitTime
        this.insure = typeof (insure) === 'function' ? insure : undefined;
        this.probeTimeHandler = null;
        this.devMode = devMode;
        this.advancedQueryMethod = advancedQueryMethod;
        this.extraParam = extraParam;

        this.onLoad();
    }

    onLoad() {
        let maxTryNum = this.maxWaitTime / this.time;
        if (this.maxWaitTime % this.time != 0) {
            let extraTime = this.maxWaitTime % this.time;
            maxTryNum = (this.maxWaitTime - extraTime) / this.time;
            this.iterLimit = extraTime > (time / 2) ? maxTryNum++ : maxTryNum;
        }
        this.iterLimit = maxTryNum;
        if (typeof (this.purpose) == 'function') {
            this.condition = this.purpose;
        }
    }

    causeError(e) {
        switch (e) {
            case "fn":
                fgConsole("", "GetAsyncDomUtil", `Please check callback function is a true functin.`, 1);
                break;
            default:
                fgConsole("", "GetAsyncDomUtil", `Some error caused.`, 1);
                break;
        }
    }

    async probe() {
        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 开始探测 ${this.target}。`);
        const re = (fn, insure) => {
            return new Promise(resolve => {
                const targetDom = this.advancedQueryMethod ?? (document.getElementById(this.target) || document.getElementsByClassName(this.target).length || document.querySelector(this.target) || $(`${this.target}`).length || undefined);
                let response;
                if (targetDom && typeof (this.condition) == 'function' ? response = this.condition(targetDom, this.extraParam) : this.condition) {
                    this.index = 0;
                    this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: ${this.target}加载。`, targetDom);
                    resolve(fn(response));
                } else {
                    if (this.index > this.iterLimit) {
                        this.index = 0;
                        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 没找到符合条件的 ${this.target} 。`);
                        resolve(insure == undefined ? false : insure());
                        return;
                    };
                    this.index++;
                    this.probeTimeHandler = setTimeout(() => {
                        this.instantMode ? "" : this.time += 500;
                        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 正在探测 ${this.target} - 第${this.index}次。`);
                        resolve(re(this.fn, this.insure));
                    }, this.time);
                }
            })
        }
        return await re(this.fn, this.insure);
    }

    /**
     * 模仿莫老板写的getAsyncDom，大概原汁原味？
     * @param {string} target 
     * @param {Function} fn 
     * @param {number} time 
     * @param {boolean} isDev 
     * @example GetAsyncDomUtil.getAsyncDomClassic(".ac-comment-list",function(){ console.log("2333") })
     */
    static getAsyncDomClassic(target, fn, time = 2500, isDev = true) {
        new GetAsyncDomUtil(target, fn, null, "exist", time, true, 30000, isDev).probe();
    }

    /**
     * 判断某个对象是图片且加载好了
     * @param {string} ImgDom 
     * @param {Function} fn 
     * @param {Function} insure 
     * @param {number} time 
     * @param {boolean} isDev 
     * @example GetAsyncDomUtil.judgeImgReady("#article-up > div.article-content > div > div:nth-child(2) > img",function(e){console.log("ok了")})
     */
    static judgeImgReady(ImgDom, fn, insure, time = 2000, isDev = true) {
        new GetAsyncDomUtil(ImgDom, fn, insure, function (e) {
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
     */
    static judgeBornChilds(target, fn, insure, time = 3000, isDev = true) {
        new GetAsyncDomUtil(target, fn, insure, function (e) {
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
     */
    static getLoadingDomAttr(target, fn, attrName, insure, time = 3000, isDev = true) {
        new GetAsyncDomUtil(target, fn, insure, function (e, f) {
            return Array.isArray(f) ? f[1] == e.getAttribute(f[0]) : e.getAttribute(f);
        }, time, true, 30000, isDev, null, attrName).probe();
    }

}

/**
 * 异步观察目标元素与其祖先元素或顶级文档视窗交叉状态
 */
class InterSectionObserverUtil extends UtilsBundle {
    constructor(target, trigger, devMode) {
        super();
        this.utilsList.push(InterSectionObserverUtil);

        this.target = null;

        if (Array.isArray(target)) {
            this.target = [];
            target.forEach(e => {
                if (e) {
                    this.target.push(e);
                } else {
                    fgConsole("InterSectionObserverUtil", "constructor", `"InterSectionObserverUtil constructor param target ${target[i]} is null,omit it.`, 1);
                }
            })
        } else {
            this.target = target;
        }
        this.trigger = trigger;
        /**
         * @config
            config.root 观察的根元素，默认是浏览器的视口，也可以指定具体元素，指定元素的时候用于观察的元素必须是指定元素的子元素
            config.threshold 交叉比例，决定什么时候触发回调函数 exp:[0,0.5,0.75]触发三次，对象出现了0%、50%、75%的时候触发一次。
            config.rootMargin 扩大或者缩小视窗的的大小 exp:"10px 10px 10px 10px" 在root原本的大小上，扩大（证书）这点为新的检测触发长度。
         */
        this.config = {
            root: null, threshold: [0],
            rootMargin: "",
        };
        this.observerInst = [];

        this.devMode = devMode;
        this.interSecObsver = globalThis.IntersectionObserver;
    }

    async configSet(root = null, threshold = [0], rootMargin = "") {
        if (root == null || root instanceof HTMLElement) {
            this.config.root = root;
            this.config.threshold = Array.isArray(threshold) ? threshold : [0];
            this.config.rootMargin = rootMargin;
            await this.reloadInsts();
        }
    }

    async reloadInsts() {
        await this.closeObserver(this.target);
        this.createObserver(this.target);
    }

    createObserver() {
        if (Array.isArray(this.target)) {
            this.target.forEach(e => {
                this.observerInst.push(new this.interSecObsver(this.trigger, this.config));
            })
        } else {
            this.observerInst.push(new this.interSecObsver(this.trigger, this.config));
        }
        this._runObserverInsts();
    }

    _runObserverInsts() {
        if (Array.isArray(this.target)) {
            let i = 0;
            this.observerInst.forEach(e => {
                e.observe(this.target[i++]);
            })
        } else {
            this.observerInst[0].observe(this.target);
        }
    }

    removeObserver(elements) {
        if (Array.isArray(elements)) {
            elements.forEach(e => {
                let elemIndex = this.target.indexOf(e);
                elemIndex != -1 && this.observerInst[elemIndex].unobserve(e);

                this.target.splice(this.target.indexOf(elements), 1);
            })
        } else {
            this.target === elements && this.observerInst[0].unobserve(elements), this.observerInst.shift();
        }
        this.reloadInsts();
    }

    async closeObserver() {
        this.observerInst.forEach((e) => {
            e.disconnect()
        })
        this.observerInst = [];
    }

}

/**
 * 队列
 */
class Queue extends UtilsBundle {
    constructor() {
        super();
        this.utilsList.push(Queue);

        this.dataField = [];
    }

    /**
     * 入队，并返回状态和其值
     * @param {*} 入队对象
     * @returns bool 成功与否
     */
    enter(obj) {
        let x = this.dataField.length;
        this.dataField.push(obj);
        if (x != this.dataField.length) {
            return true
        } else {
            return false
        }
    }
    /**
     * 出队，并返回状态和其值
     * @returns {stat:bool,data}
     */
    exit() {
        if (this.isEmpty()) {
            return { stat: false, data: '' };
        } else {
            return { stat: true, data: this.dataField.shift() };
        }
    }
    /**
     * 获取对首元素
     * @returns stat->是否存在:bool,data
     */
    getHead() {
        if (this.dataField.length != 0) {
            return { stat: true, data: this.dataField[0] };
        }
        return { stat: false, data: '' };
    }
    get head() {
        return !this.isEmpty() ? this.dataField[0] : null;
    }
    /**
     * 获取队尾元素
     * @returns stat->是否存在:bool,data
     */
    getTail() {
        if (this.dataField.length != 0) {
            return { stat: true, data: this.dataField[this.dataField.length - 1] };
        }
        return { stat: false, data: '' };
    }
    get tail() {
        return !this.isEmpty() ? this.dataField[this.dataField.length - 1] : null;
    }
    /**
     * 队列是否为空
     * @returns bool
     */
    isEmpty() {
        return !!this.dataField ? !!this.dataField.length : false;
    }
    get status() {
        return this.isEmpty() ? "empty" : "not empty";
    }
    /**
     * 清除队列
     */
    clear() {
        delete this.dataField;
    }
}

class Stack extends UtilsBundle {
    constructor() {
        super();
        this.utilsList.push(Stack);

        this.dataField = [];
    }

    push(e) {
        return !!e ? this.dataField.push(e) : false;
    }

    pop() {
        return this.isEmpty() ? false : this.dataField.pop();
    }

    get peak() {
        return this.isEmpty() ? false : this.dataField[this.dataField.length - 1];
    }

    get top() {
        return this.isEmpty() ? false : this.dataField.length;
    }

    isEmpty() {
        return !!!this.dataField;
    }

    clear() {
        return delete this.dataField;
    }
}

/**
 * 工具箱
 */
class ToolBox extends UtilsBundle {
    constructor() {
        super();
        this.utilsList.push(ToolBox);

    }

    /**
    * 监控对象中值变化
    * @param {object} src 监控对象
    * @param {function} hook 执行操作
    * @param {Array} keyList 监听的键列表，默认为空(空则为全监听)
    */
    static addRefTypeValueListener(src, hook, keyList = []) {
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
        function defineItsProperty(src, key, value, hook) {
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
    static removeRefTypeValueListener(src, keyList = []) {
        if (!Array.isArray(keyList)) {
            Object.keys(src).forEach(key => {
                defineItsProperty(src, key);
            });
        } else {
            keyList.forEach(e => {
                defineItsProperty(src, e);
            })
        }
        function defineItsProperty(src, key) {
            Object.defineProperty(src, key, {
                value: src[key],
                writable: true,
            })
        }
    }

    /**
     * 将常见的数据类型转化为字符串
     * @param {*} e 
     */
    static convertEverthingToStr(e) {
        var t;
        switch (typeof (t = e)) {
            case "string":
                return t;
            case "number":
                return t.toString();
            case "array":
                return JSON.stringify({ _obj: t }).replace(/{(.*)}/, "$1").replace(/"_obj":/, "");
            case "object":
                return JSON.stringify(t);
            case "boolean":
                return t.toString();
            case "undefined":
                return "undefined";
            case "null":
                return "null";
            default:
                try {
                    return t.toString()
                } catch (e) {
                    return e, ""
                }
        }
    }

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


    static DOMCreater() {
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

}

/**
 * 通信模块
 * @param {"fg"|"bg"|"inject"|"iframe"} hostType 信源类型
 * @param {HTMLElement} hostElement 通信依托实体
 * @param {boolean} persistant 是否长连接
 * @description 打电话！
 */
class MessageSwitch extends UtilsBundle {
    constructor(hostType = "bg", hostElement, persistant = false, portName = "", devMode = false) {
        super();
        this.utilsList.push(MessageSwitch);

        this.hostType = hostType;
        this.isPersistant = persistant;
        this.devMode = devMode;
        switch (this.hostType) {
            case "fg":
                this.hostElement = hostElement ? hostElement : window;
                break;
            case "bg":
                break;
            case "inject":
                /**
                 * @type {HTMLElement} 
                 */
                this.hostElement = hostElement ?? window;
                this.eventName = "AcFunHelperFrontend";
                // this.eventElement = Boolean(document.createEvent)?document.createEvent():new CustomEvent();
                break;
            case "iframe":
                this.hostElement = hostElement ?? document.querySelector("iframe").contentWindow;
                break;
        }

        if (this.isPersistant) {
            /**
             * @description 长连接端口名
             * @type {String}
             */
            this.portName = portName ?? String((date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes());
            this.connectionHandler = null;
            switch (this.hostType) {
                case "fg":
                    break;
                case "bg":
                    this.eventId = 0;
                    this.portsDict = {};
                    this.portsNameList = [];
                    //下面是用于日志的，不用日志就不需要
                    this.connectionEvents = [];
                    this.connectionEventsDict = {};
                    break;
            }
        }

    }

    /**
     * 格式化参数对象
     * @param {object} sourceParam 
     * @returns {MessageSwitchCommonPayload}
     */
    paramParse(sourceParam) {
        if (!!!sourceParam?.target) {
            return;
        }
        return {
            target: sourceParam["target"],
            InvkSetting: {
                type: sourceParam?.InvkSetting?.type ?? "printMsg",
                receipt: !!sourceParam?.InvkSetting?.receipt,
                responseRequire: sourceParam?.InvkSetting?.responseRequire ?? true,
                asyncWarp: !!sourceParam?.InvkSetting?.asyncWarp,
                tabId: sourceParam?.tabId,
                classicalParmParse: sourceParam?.classicalParmParse ?? false,
                withCallback: sourceParam.withCallback ?? false,
                callbackId: sourceParam.withCallback == undefined ? false : sourceParam.callbackId,
            },
            params: sourceParam?.params ?? sourceParam?.param
        };
    }

    /**
     * 发送一次消息
     * @param {MessageSwitchCommonPayload} e
     * @param {Function} callback
     * @param {EventInit} injectMsgSetting
     */
    InstantMsgSender(e, callback = {}, injectMsgSetting = {}) {
        if (!e) { return false; }
        const paramSet = this.paramParse({ target: e.target, InvkSetting: e.InvkSetting, params: e.params });
        switch (this.hostType) {
            case "fg":
                //fg -> bg
                chrome.runtime.sendMessage(paramSet, callback);
                break;
            case "bg":
                //bg -> fg
                switch (typeof (e.InvkSetting?.tabId)) {
                    case undefined:
                        return false;
                    case 'number':
                        chrome.tabs.sendMessage(e.InvkSetting.tabId, paramSet, callback);
                    case 'object':
                        Array.isArray(e.InvkSetting.tabId) && e.InvkSetting.tabId.forEach(tab => {
                            chrome.tabs.sendMessage(tab, paramSet, callback);
                        })
                        break;
                    default:
                        console.warn("[Common-MessageSwitch > InstantMsgSender]when in background,you send message to frontend tabs,you need set least one tabId.");
                        return false;
                }
                break;
            case "inject":
                //fg->inject
                let newEvent = new CustomEvent(this.eventName, { "detail": e, "bubbles": injectMsgSetting.bubbles, "cancelable": injectMsgSetting.cancelable, "composed": injectMsgSetting.composed });
                this.hostElement.dispatchEvent(newEvent);
                break;
        }
        return true;
    }

    /**
     * 发送长连接的消息
     * @param {"fg"|"bg"|"inject"|"iframe"} hostType 
     * @param {MessageSwitchDedicatedLinkPayload} payload {source:string,target:string;InvkSetting: {type:"function"|"printMsg"|"subMod"|"method"|"echo";receipt:boolean;responseRequire:boolean;asyncWarp:boolean;tabId:number|Array|undefined;};params:{};}
     */
    connectMessage(hostType = 'fg', payload = {}, tabId = "") {
        switch (hostType) {
            case "bg":
                tabId === "" ? console.warn("[Common-MessageSwitch > connectMessage]when in background,you send message to frontend tabs,you need set the tabId.") : ""
                try {
                    chrome.tabs.get(tabId, (e) => {
                        if (e) {
                            this.connectionHandler === null ? this.connectionHandler = chrome.tabs.connect(tabId, { name: this.portName }) : "";
                            this.connectionHandler.postMessage({ payload: payload });
                        }
                    })
                } catch (error) {
                    console.warn("[Common-MessageSwitch > connectMessage]tabId is unvaliable")
                }
                break;
            case "fg":
                this.connectionHandler === null ? this.connectionHandler = chrome.runtime.connect({ name: this.portName }) : "";
                this.connectionHandler.postMessage({ payload: payload });
                break;
        }
    }

    /**
     * 前台消息处理机
     * @param {MessageSwitchCommonPayload} request 
     * @param {MessageSender} sender 
     * @param {Function} callback 
     * @returns 
     */
    FrontendMessageSwitch(request, sender, callback) {
        this.devMode && console.log(request, sender, callback)

        const { target, InvkSetting = {}, params = {} } = request;
        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = this["api_" + target];
                if (typeof method === "function") {
                    if (!params) { params = {} }
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        method.call(this, params).then(resp => {
                            callback(resp);
                        });
                        return true;
                    }
                    response = method.call(this, params);
                    callback(response);
                }
                break;
            case "subMod":
                const callTarget = window.AcFunHelperFrontend[target.mod];
                if (typeof callTarget === "object" && typeof callTarget["api_" + target.methodName] === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        callTarget["api_" + target.methodName].call(this, params).then(resp => {
                            callback(resp);
                        });
                        return true;
                    }
                    response = callTarget["api_" + target.methodName].call(this, params);
                    callback(response);
                }
                break;
            case "echo":
                request["InvkSetting"].sender = sender;
                callback(request);
                break;
            case "printMsg":
            default:
                let msg = "", returnString;
                switch (typeof (params)) {
                    case "object":
                        msg = ToolBox.convertEverthingToStr(params);
                        fgConsole("", "MessageSwitch", msg, 1);
                        returnString = true;
                        break;
                    case "string":
                        fgConsole("", "MessageSwitch", params, 1);
                        returnString = params;
                        break;
                    default:
                        msg = "你应该提供正确的参数，或者能打印出来的数据结构。";
                        returnString = msg;
                        break;
                }
                callback(returnString);
                break;
        }
        return true;
    }

    /**
     * 前台处理Inject和Fg双向的消息
     * @param {MessageSwitch} _this
     * @param {MessageSwitchFgToInjectPayload} request 
     * @returns 
     */
    FrontendMsgEventsHandler(_this, request) {
        this.devMode && console.log(request)

        const { target, source, InvkSetting = {}, params = {} } = request.detail;
        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = this["api_" + target];
                if (typeof method === "function") {
                    if (InvkSetting["asyncWarp"]) {
                        response = new Promise((resolve, reject) => {
                            try {
                                method.call(this, params).then(resp => {
                                    resolve(resp);
                                })
                                response.status = true;
                            } catch (error) {
                                reject(error);
                            }
                        })
                    }
                    response = method.call(this, params);
                }
                break;
            case "subMod":
                const callTarget = window.AcFunHelperFrontend[target.mod];
                if (typeof callTarget === "object" && typeof callTarget["api_" + target.methodName] === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        return Promise((resolve, reject) => {
                            try {
                                callTarget["api_" + target.methodName].call(this, params).then(resp => { resolve(resp) });
                            } catch (error) {
                                reject(error)
                            }
                        })
                    }
                    response = callTarget["api_" + target.methodName].call(this, params);
                }
                break;
            case "printMsg":
                let msg = "";
                switch (typeof (params)) {
                    case "object":
                        msg = ToolBox.convertEverthingToStr(params);
                        break;
                    case "string":
                        msg = params;
                        break;
                    default:
                        msg = "你应该提供正确的参数，或者能打印出来的数据结构。";
                        break;
                }
                fgConsole("", "MsgEventsHandler", `${source} > ${target} : ${msg}`, 1);
                break;
            default:
                fgConsole("", "MsgEventsHandler", `${source} > ${target} : ${InvkSetting.type}`, 1);
                break;
        }
        response && _this.sendEventMsgToInject(this.hostElement, { target: source, source: target, InvkSetting: {}, params: response })
        return true;
    }

    /**
     * 前台与FgPopup通信处理
     * @param {MessageSwitchWindowMsgRespnse} e 
     */
    FrontendIframeMsgHandler(e) {
        if (!e.data || e.data.to != "AcFunHelper") {
            return
        }
        const { target, source, InvkSetting, params } = e.data.msg;
        const method = this["api_" + target];
        if (InvkSetting.type == "function" && typeof method === "function") {
            if (InvkSetting.classicalParmParse) {
                method.call(this, params);
                return;
            }
            let paramList;
            Array.isArray(params) ? paramList = paramList : paramList = Object.values(params);
            method.apply(this, paramList);
        } else {
            fgConsole("", "FrontendIframeMsgHandler", `${source} > ${target} : ${InvkSetting.type}`, 1);
        }
    }


    /**
     * 前台长连接处理机
     * @returns 
     */
    FrontendDedicatedLink(_this, port) {
        port.onMessage.addListener((msg) => {
            const { target, source, InvkSetting = {}, params = {} } = msg.payload;
            let response = {};
            response.target = source;
            response.source = _this.portName;
            switch (InvkSetting?.type) {
                case "function":
                    const method = this["api_" + target];
                    if (typeof method === "function") {
                        response.status = false;
                        if (InvkSetting["asyncWarp"]) {
                            response.result = new Promise((resolve, reject) => {
                                try {
                                    method.call(this, params).then(resp => {
                                        resolve(resp);
                                    })
                                    response.status = true;
                                } catch (error) {
                                    reject(error);
                                }
                            })
                            return true;
                        }
                        response = method.call(this, params);
                        if (response) {
                            response.stat = true;
                        }
                    }
                    break;
                case "subMod":
                    break;
                case "echo":
                    response.status = true;
                    msg.payload["InvkSetting"].sender = port.sender.tab;
                    response = msg.payload;
                    break;
                default:
                    fgConsole("", "MessageSwitch", params, 1);
                    break;
            }

        })
        port.onDisconnect.addListener((signaling) => {
            delete _this.MessageDedicatedLinkFg;
        })
    }

    /**
     * 后台长连接处理机
     * @param {MessageSwitch} _this MessageSwitch实例化之后的长连接对象
     * @param {string} port 端口对象
     * @tutorial Fg:|1.this.MessageDedicatedLinkFg = new MessageSwitch('fg', null, true); 2.chrome.runtime.onConnect.addListener(this.MessageDedicatedLinkFg.FrontendDedicatedLink.bind(this, this.MessageDedicatedLinkFg)); 3.this.MessageDedicatedLinkFg.connectMessage('fg', { source: "fg", target: "bg", InvkSetting: { asyncWarp: true, responseRequire: true, type: "echo" },params:{} })
     * @tutorial Bg:|1.this.MessageDedicatedSwitch = new MessageSwitch('bg', null, true, "AcFunHelperBackendDedicatedLink");2.chrome.runtime.onConnect.addListener(this.MessageDedicatedSwitch.BackgroundDedicatedLink.bind(this, this.MessageDedicatedSwitch));3.this.MessageDedicatedSwitch.connectMessage('bg', { source: "bg", target: "fg", InvkSetting: { asyncWarp: true, responseRequire: true, type: "echo" },params:{} },280)
     */
    BackgroundDedicatedLink(_this, port) {
        this.devMode && console.log(port)
        if (_this.portsNameList.indexOf(port.sender.tab.id) == -1) {
            _this.portsNameList.push(port.sender.tab.id);
            _this.portsDict[port.sender.tab.id] = port;
        }
        port.onMessage.addListener((msg) => {
            this.devMode && console.log('收到长连接消息：', msg);

            const { source = "", target = "", InvkSetting = {}, params = {} } = msg.payload;
            /**
             * @type {MessageSwitchDedicatedLinkResponse}
             */
            let response = {};
            _this.eventId++;
            response.target = source;
            response.source = _this.portName;
            response.eventId = _this.eventId;
            switch (InvkSetting?.type) {
                case "function":
                    const method = this["api_" + target];
                    if (typeof (method) === 'function') {
                        if (InvkSetting["receipt"]) {
                            params.tabid = port.sender.tab;
                        }
                        if (InvkSetting["responseRequire"]) {
                            if (InvkSetting["asyncWarp"]) {
                                response.status = false;
                                response.result = new Promise((resolve, reject) => {
                                    try {
                                        method.call(this, params).then(resp => {
                                            resolve(resp);
                                        })
                                        response.status = true;
                                    } catch (error) {
                                        reject(error);
                                    }
                                })
                            } else {
                                response.status = false;
                                response.result = method.call(this, params);
                                if (response.result) {
                                    response.status = true;
                                }
                            }
                        } else {
                            method.call(this, params);
                        }
                    }
                    break;
                case "subMod":
                    const callTarget = window.AcFunHelperBackend[target.mod];
                    if (typeof callTarget === "object" && typeof callTarget["api_" + target.methodName] === "function") {
                        params.callback = callback;
                        if (InvkSetting["asyncWarp"]) {
                            callTarget["api_" + target.methodName].call(this, params).then(resp => {
                                callback(resp);
                            });
                            return true;
                        }
                        response = callTarget["api_" + target.methodName].call(this, params);
                        callback(response);
                    }
                    break;
                case "echo":
                    response.status = true;
                    msg.payload["InvkSetting"].sender = port.sender.tab;
                    response.result = msg;
                case "method":
                    const LocalMethod = MessageSwitch["method_" + target];
                    response.status = false;
                    if (typeof (LocalMethod) === 'function') {
                        response.result = Promise((resolve, reject) => {
                            LocalMethod.call(this, params).then(resp => {
                                try {
                                    response.status = true;
                                    resolve(resp);

                                } catch (error) {
                                    resolve(error);
                                }
                            })
                        })
                    }
                    break;
                case "printMsg":
                    console.log(`[${formatDate(new Date(), true)}]`, params);
                    break;
                default:
                    console.log(`[${formatDate(new Date(), true)}]`, msg, sender);
            }
            port.postMessage(response);
            return true;
        })
        port.onDisconnect.addListener((signaling) => {
            delete _this.portsDict[port.sender.tab.id];
            _this.portsNameList = Object.keys(_this.portsDict);
            return true;
        })
    }

    /**
     * 后台消息处理机
     * @param {MessageSwitchCommonPayload} request 
     * @param {MessageSender} sender 
     * @param {Function} callback 
     * @returns 
     */
    BackgroundMessageSwitch(request, sender, callback) {
        this.devMode && console.log(request, sender, callback)

        const { target = "", InvkSetting = {}, params = {} } = request;
        switch (InvkSetting?.type) {
            case "function":
                const method = this["api_" + target];
                if (typeof (method) === 'function') {
                    if (InvkSetting["receipt"]) {
                        //告知调用程序信源标签的tabID
                        params.tabid = sender.tab;
                    }
                    if (InvkSetting["responseRequire"]) {
                        //调用函数需要得到被调用函数的结果，可选同步异步。
                        params.callback = callback;
                        if (InvkSetting["asyncWarp"]) {
                            method.call(this, params).then(resp => {
                                callback(resp);
                            })
                            return true;
                        } else {
                            let response;
                            response = method.call(this, params);
                            callback(response);
                        }
                    } else {
                        //仅调用
                        params.callback = callback;
                        method.call(this, params);
                    }
                }
                break;
            case "subMod":
                const callTarget = window.AcFunHelperBackend[target.mod];
                if (typeof callTarget === "object" && typeof callTarget["api_" + target.methodName] === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        callTarget["api_" + target.methodName].call(this, params).then(resp => {
                            callback(resp);
                        });
                        return true;
                    }
                    response = callTarget["api_" + target.methodName].call(this, params);
                    callback(response);
                }
                break;
            case "echo":
                request["InvkSetting"].sender = sender;
                callback(request);
                return true;
            case "method":
                const LocalMethod = MessageSwitch["method_" + target];
                if (typeof (LocalMethod) === 'function') {
                    LocalMethod.call(this, params).then(response => {
                        callback(response);
                    })
                    return true;
                }
                break;
            case "printMsg":
                let msg = "", returnString;
                switch (typeof (params)) {
                    case "object":
                        msg = ToolBox.convertEverthingToStr(params);
                        fgConsole("", "MessageSwitch", msg, 1);
                        returnString = true;
                        break;
                    case "string":
                        fgConsole("", "MessageSwitch", params, 1);
                        returnString = params;
                        break;
                    default:
                        msg = "你应该提供正确的参数，或者能打印出来的数据结构。";
                        returnString = msg;
                        break;
                }
                callback(returnString);
                break;
            default:
                console.log(`[${formatDate(new Date(), true)}]`, request, sender);
        }
        return true;
    }

    /**
     * Bg处理Sandbox消息
     * @param {MessageSwitchWindowMsgRespnse} e 
     */
    SandboxMsgHandler(e) {
        if (e.data.to != "background") {
            return;
        }
        this.devMode && console.log(e);
        const { target, source, InvkSetting, params } = e.data.msg;

        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = this["api_" + target];
                if (typeof method === "function") {
                    if (InvkSetting["asyncWarp"]) {
                        response = new Promise((resolve, reject) => {
                            try {
                                method.call(this, params).then(resp => {
                                    resolve(resp);
                                })
                                response.status = true;
                            } catch (error) {
                                reject(error);
                            }
                        })
                    }
                    response = method.call(this, params);
                }
                break;
            case "subMod":
                const callTarget = window.AcFunHelperBackend[target.mod];
                if (typeof callTarget === "object" && typeof callTarget["api_" + target.methodName] === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        return Promise((resolve, reject) => {
                            try {
                                callTarget["api_" + target.methodName].call(this, params).then(resp => { resolve(resp) });
                            } catch (error) {
                                reject(error)
                            }
                        })
                    }
                    response = callTarget["api_" + target.methodName].call(this, params);
                }
                break;
            case "printMsg":
                console.log(`Sandbox:[${formatDate(new Date(), true)}]`, `${source} > ${target}`, params);
                break;
            default:
                console.log(`Sandbox:[${formatDate(new Date(), true)}]`, e.data.msg);
        }
    }

    /**
     * Sandbox消息处理
     * @param {MessageSwitchWindowMsgRespnse} e 
     */
    UnsafeCallHandler(e) {
        if (e.data.to != "sandbox") {
            return;
        }
        const { target, source, InvkSetting, params } = e.data.msg;
        this.devMode && console.log(e);

        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = this["unsafe_" + target];
                if (typeof method === "function") {
                    if (InvkSetting["asyncWarp"]) {
                        response = new Promise((resolve, reject) => {
                            try {
                                method.call(this, params).then(resp => {
                                    resolve(resp);
                                })
                            } catch (error) {
                                reject(error);
                            }
                        })
                    }
                    response = method.call(this, params);
                    this.devMode && console.log(response)
                }
                break;
            default:
                console.log(`SandboxInner:[${formatDate(new Date(), true)}]`, e.data.msg);
        }
        if (response != (undefined || null)) {
            this.sandboxAgent.taskFinished(e.data.msg, response);
        }
    }

    /**
     * SandboxAgent消息处理
     * @param {MessageSwitchWindowMsgRespnse} e 
     * @example let unsafe = new SandboxAgent(document.getElementById('sandbox').contentWindow);unsafe.createTask({ target: "console", InvkSetting: { withCallback: true, callbackId: "test", type: "function" }, params: "2333......" },function(e){console.log(e)})
     */
    SandboxComAgent(e) {
        if (e.data.to == "sandboxAgentCallback") {
            this.runCallback(e.data.msg)
        }
    }

    /**
     * 发送一次消息 - 静态
     * @param {"fg"|"bg"|"inject"|"iframe"} hostType
     * @param {MessageSwitchCommonPayload} payload { target: string; InvkSetting: { receipt: boolean; responseRequire: boolean; asyncWarp: boolean; tabId: number; }; params: {}; }
     */
    static sendMessage(hostType = 'fg', payload = {}, callback) {
        let inst = new MessageSwitch(hostType);
        return inst.InstantMsgSender(payload, callback);
    }

    /**
     * Fg发送消息给Inject
     * @param {HTMLElement} hostElem
     * @param {MessageSwitchCommonPayload} payload 
     * @example MessageSwitch.sendEventMsgToInject(window,{target:"notice",source:"console",InvkSetting:{type:"function"},params:{title:"233",msg:"莫老板今天出门儿"}})
     * @alias sendMsgFromSubmodToFg()
     */
    static sendEventMsgToInject(hostElem, payload, bubbles = false, cancelable = false, composed = false) {
        let inst = new MessageSwitch('inject', hostElem, false, "", false);
        return inst.InstantMsgSender(payload, null, { bubbles: bubbles, cancelable: cancelable, composed: composed });
    }

    /**
     * 后台向所有前台广播消息
     * @param {MessageSwitchCommonPayload} payload 
     * @param {Function} callback
     */
    static bgBroadcastToFg(payload, callback) {
        chrome.tabs.query({}, (tabs) => {
            payload.InvkSetting.tabId = [];
            for (let tab of tabs) {
                //绝佳的判断是A站前台标签的方式！(`ε´ )
                if (tab.favIconUrl == "https://cdn.aixifan.com/ico/favicon.ico") {
                    payload.InvkSetting.tabId.push(tab.id);
                }
            }
            this.sendMessage('bg', payload, callback)
        });
    }

    static parseParmNow(e) {
        return (new MessageSwitch).paramParse(e)
    }

    /**
     * 获取所在标签的Id - for 前台
     * @returns {TabsInfo}
     */
    static getTabId() {
        if (!window.AcFunHelperFrontend) {
            return;
        }
        return new Promise((resolve, reject) => {
            try {
                MessageSwitch.sendMessage('fg', { target: "echo", InvkSetting: { type: "echo" } }, e => {
                    resolve(e.InvkSetting?.sender?.tab);
                })
            } catch (error) {
                reject(error);
            }
        })
    }

}

class AcFunHelper extends UtilsBundle {
    constructor(reloadMethod) {
        super();
        this.utilsList.push(AcFunHelper);

        this.reloadMethod = reloadMethod ?? 0;
    }

    static reload() {
        chrome.runtime.reload();
    }

    /**
     * 重启所有相关前台实例
     * @param {chrome.tabs.Tab[]} tabs 
     */
    static execFgReload(tabs) {
        for (let tab of tabs) {
            if (tab.favIconUrl == "https://cdn.aixifan.com/ico/favicon.ico") {
                chrome.tabs.reload(tab.id);
            }
        }
    }

    static reloadFrontendInsts() {
        chrome.tabs.query({}, (tabs) => {
            AcFunHelper.execFgReload(tabs);
        });
    }

    static reloadActiveFrontend() {
        chrome.tabs.query({ active: true, lastFocusedWindow: false }, tabs => {
            AcFunHelper.execFgReload(tabs);
        });
    }

    static getVersion() {
        return chrome.runtime.getManifest().version;
    }

    static activeTabToFront(id) {
        typeof (id) == "number" && chrome.tabs.update(id, {
            'selected': true
        });
    }

    static getThisTabId() {
        return MessageSwitch.getTabId().id;
    }

    /**
     * 开发者模式下的变动重启
     * https://github.com/xpl/crx-hotreload
     * @usage this.devReload = new AcFunHelper();this.devReload.devModeWatch();
     */
    devModeWatch() {
        /**
         * 递归查找所有文件
         * @param {DirectoryEntry} dir 
         * @returns {Array}
         */
        function filesInDirectory(dir) {
            return new Promise(resolve =>
                /**
                 * @param {FileSystemEntry} entries
                 */
                dir.createReader().readEntries(entries => {
                    Promise.all(entries.filter(e => e.name[0] !== '.').map(e =>
                        e.isDirectory
                            ? filesInDirectory(e)
                            : new Promise(resolve => e.file(resolve))
                    ))
                        .then(files => [].concat(...files))
                        .then(resolve)
                })
            )
        }

        function timestampForFilesInDirectory(dir) {
            return new Promise((resolve) => {
                filesInDirectory(dir).then(files => {
                    resolve(files.map(f => f.name + f.lastModifiedDate).join());
                })
            })
        }

        function watchChanges(dir, lastTimestamp) {
            timestampForFilesInDirectory(dir).then(timestamp => {
                if (!lastTimestamp || (lastTimestamp === timestamp)) {
                    setTimeout(() => watchChanges(dir, timestamp), 1000);
                } else {
                    AcFunHelper.reload();
                }
            })
        }

        chrome.management.getSelf(self => {
            if (self.installType === 'development') {
                chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
                this.reloadMethod == 1 && AcFunHelper.reloadActiveFrontend();
                this.reloadMethod == 2 && AcFunHelper.reloadFrontendInsts();
            };
        })
    }

}

class ExtOptions extends UtilsBundle {
    constructor(storageArea = "local") {
        super();
        this.utilsList.push(ExtOptions);

        this.listenerHandlerName = null;
        this.listenerHandler = null;
        this.storageArea = storageArea;
        this.listenerStatus = {};

        this.callbackList = [];
        this.callbacks = {};
        this.interestList = [];
        this.interestCallMap = {};
    }

    /**
     * 向 配置监听器 加入钩子规则
     * @param {string} callbackName 
     * @param {function} callback 
     * @param {string} interstOptionName 配置键名
     * @param {function} condition 
     * @returns {boolean}
     */
    addChangeEventSwitchRule(callbackName, callback, interstOptionName, condition) {
        if (this.callbackList.includes(callbackName)) {
            console.warn("[WARN]ExtOptions > addChangeEventSwitchRule: there are same callbackName in switch");
            return false;
        }
        //回调列表 ->表示其存在
        this.callbackList.push(callbackName);
        //回调字典 详细信息
        this.callbacks[callbackName] = {};
        this.callbacks[callbackName].callback = callback;
        this.callbacks[callbackName].interstOptionName = interstOptionName;
        this.callbacks[callbackName].condition = condition;
        //兴趣键列表 和 兴趣键-回调名映射
        this.interestList.push(interstOptionName);
        if (this.interestCallMap[interstOptionName] == undefined) {
            console.log(this.interestCallMap, this.interestCallMap[interstOptionName] == undefined);
            this.interestCallMap[interstOptionName] = new Array();
            this.interestCallMap[interstOptionName].push(callbackName);
        } else {
            this.interestCallMap[interstOptionName];
        }
        return true;
    }

    /**
     * 从 配置监听器 删除某条规则
     * @param {function} callbackName 
     * @param {string} interstOptionName 配置键名
     * @returns {boolean}
     */
    removeChangeEventSwitchRule(callbackName, interstOptionName) {
        const callbackListIndex = this.callbackList.indexOf(callbackName);
        if (callbackListIndex == -1) {
            //回调本来就没有注册
            return false;
        }
        const targetInterestOption = interstOptionName ?? this.callbacks[callbackName].interstOptionName;
        this.callbackList.splice(callbackListIndex, 1);
        if (this.interestCallMap[targetInterestOption].length <= 1) {
            //配置兴趣键-回调映射中只有此回调函数，则删除此兴趣键及其在列表中的位置
            delete this.interestCallMap[targetInterestOption];
            this.interestList.splice(targetInterestOption, 1);
        } else {
            //从 配置兴趣键-回调映射 中删除回调
            this.interestCallMap[targetInterestOption].splice(this.interestCallMap[targetInterestOption].indexOf(callbackName), 1)
        }
        //从回调字典中删除
        delete this.callbacks[callbackName];
        return true;
    }

    /**
     * 清空 配置监听器 的规则
     */
    purgeChangeEventSwitchRules() {
        this.callbackList.forEach(e => {
            this.removeChangeEventSwitchRule(e);
        });
    }

    /**
     * 配置监听器
     * @param {*} e 
     */
    optionChangeSwitch(e) {
        let sourceKeyName = Object.keys(e)[0];
        if (this.interestList.includes(sourceKeyName)) {
            this.interestCallMap[sourceKeyName].forEach(callbackName => {
                const conditionCall = this.callbacks[callbackName]?.condition;
                (typeof (conditionCall) == 'function' ? conditionCall(e) : true) && this.callbacks[callbackName].callback(e);
            })
        }
    }

    /**
     * 单个配置监听器
     * @param {string|Array} keyList 
     * @param {string} callbackName 
     * @param {function} callback 
     * @returns {boolean}
     */
    addChangeEventListener(keyList, callbackName, callback) {
        this.listenerHandlerName = callbackName;
        this.listenerHandler = typeof (callback) == 'function' ? callback : this.causeError();
        this.listenTarget = keyList;
        this.massReactorNeed = null;

        switch (typeof (this.listenTarget)) {
            case "string":
                this.massReactorNeed = false;
                break;
            case "object":
                if (Array.isArray(this.listenTarget)) {
                    this.massReactorNeed = true;
                }
                break;
            default:
                console.warn("[WARN]ExtOptions > addChangeEventListener: param key should be assigned.");
                return false;
        }
        chrome.storage.onChanged.addListener(this.optionChangeReactor.bind(this));
        this.listenerStatus[callbackName] = { status: true, callback: callback };
        return true;
    }

    /**
     * 单配置监听器响应器
     * @param {*} e 
     * @param {*} storageArea 
     * @param {ThisType} ctx 
     */
    optionChangeReactor(e, storageArea, ctx = {}) {
        if (!this.massReactorNeed) {
            if (e[this.listenTarget]) {
                this.listenerHandler == undefined ? "" : this.listenerHandler(e, ctx);
            }
        } else {
            if (this.listenTarget.indexOf(Object.keys(e)[0]) != -1) {
                this.listenerHandler == undefined ? "" : this.listenerHandler(e, ctx);
            }
        }
    }

    /**
     * 单配置监听器 是否已存在监听
     * @returns 
     */
    hasListener() {
        return this.listenerStatus[this.listenerHandlerName].status;
    }

    /**
     * 删除此个单配置监听器
     */
    removeChangeEventListener() {
        delete this.listenerStatus[this.listenerHandlerName];
        this.listenerHandlerName = null
        this.listenerHandler = undefined;
    }

    causeError() {
        throw ("[WARN]ExtOptions > addChangeEventListener: param callback should be a function.");
    }

    /**
     * 获取相关存储区域的全部配置
     * @returns {Object}
     */
    _getAll() {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].get(null, (options) => {
                resolve(sanitizeOptions(options));
            });
        });
    }

    /**
     * 获取所有本地配置
     * @returns {object}
     */
    static getAll() {
        return new ExtOptions('local')._getAll();
    }

    /**
     * 保存所有配置到相关区域
     * @param {object} options 
     * @returns 
     */
    _saveAll(options) {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].set(transOptions(options), resolve());
        });
    }

    /**
     * 将此配置保存为全部配置
     * @param {*} options 
     * @returns 
     */
    static saveAll(options) {
        return new ExtOptions('local')._saveAll(options);
    }

    /**
     * 获取相关区域键为key的配置
     * @param {string|Array} key 
     * @returns 
     */
    _get(key) {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].get(key, (res) => {
                resolve(res);
            });
        });
    }

    /**
     * 获取本地键为key的配置
     * @param {string|Array} key 
     * @returns 
     */
    static get(key) {
        return new ExtOptions('local')._get(key);
    }

    /**
     * 获取相关区域键为key的配置内容
     * @param {string|Array} key 
     * @returns 
     */
    _getValue(key) {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].get(key, (res) => {
                resolve(res[key]);
            });
        });
    }

    /**
     * 获取本地键为key的配置内容
     * @param {string|Array} key 
     * @returns 
     */
    static getValue(key) {
        return new ExtOptions('local')._getValue(key);
    }

    /**
     * 设置相关区域键key为value的配置
     * @param {*} key 
     * @param {*} value 
     * @returns error | true
     */
    _setValue(key, value) {
        return new Promise((resolve, reject) => {
            try {
                if (readOnlyKey.includes(key)) {
                    resolve(false);
                } else {
                    chrome.storage[this.storageArea].set({ [key]: value });
                }
            } catch (error) {
                reject(error);
            }
            resolve(true);
        })
    }

    /**
     * 设置本地键key为value的配置
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */
    static async setValue(key, value) {
        return new ExtOptions('local')._setValue(key, value);
    }

    /**
     * 删除相关区域键key的配置
     * @param {*} key 
     * @returns 
     */
    _delete(key) {
        return new Promise((resolve, reject) => {
            if (readOnlyKey.includes(key)) {
                resolve(false);
            } else {
                chrome.storage[this.storageArea].remove(key, (res) => {
                    resolve(res);
                });
            }
        });
    }

    /**
     * 删除本地键key的配置
     * @param {*} key 
     * @returns 
     */
    static delete(key) {
        return new ExtOptions('local')._delete(key);
    }

    /**
     * 清空相关区域的键key的配置
     * @param {*} key 
     * @returns 
     */
    _purgeValue(key) {
        this._setValue(key, null);
    }

    /**
     * 清空本地键key的配置
     * @param {*} key 
     * @returns 
     */
    static purgeValue(key) {
        return new ExtOptions('local')._purgeValue(key);
    }

    /**
     * 清空相关区域所有配置
     * @param {*} key 
     * @returns 
     */
    _purgeAll() {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].clear(resolve());
        })
    }

    /**
     * 清空本地的所有配置
     * @param {*} key 
     * @returns 
     */
    static purgeAll() {
        return new ExtOptions('local')._purgeAll();
    }

    /**
     * 重置相关区域所有配置（恢复默认配置）
     * @param {*} key 
     * @returns 
     */
    _resetAll() {
        return new Promise((resolve, reject) => {
            this.purgeAll();
            this.saveAll(this.sanitizeOptions({}));
            resolve(true);
        })
    }

    /**
     * 重置本地所有配置
     * @param {*} key 
     * @returns 
     */
    static resetAll() {
        return new ExtOptions('local')._resetAll();
    }

    _quotaSpace() {
        return chrome.storage[this.storageArea].QUOTA_BYTES;
    }

    /**
     * 查询存储余量
     * @returns 
     */
    static quotaSpace() {
        return new ExtOptions('local')._quotaSpace();
    }

    _usedSpace(key = null) {
        //if key == null,count total space usage.
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].getBytesInUse(key, resolve());
        })
    }

    /**
     * 计算使用空间
     * @param {*} key 
     * @returns 
     */
    static usedSpace(key = null) {
        return new ExtOptions('local')._usedSpace(key);
    }

    /**
     * 以传过来的options为主体做配置填充，如果其中没有就取默认值
     * @param {*} options 
     * @returns 
     */
    static sanitizeOptions(options) {
        for (const key in defaults) {
            if (!options.hasOwnProperty(key)) {
                options[key] = defaults[key];
            }
        }
        return options;
    }

    /**
     * 以default为主体做配置填充，如果传过来的options有对应的key,就用传过来的
     * @param {*} options 
     * @returns 
     */
    static transOptions(options) {
        for (const key in defaults) {
            if (options.hasOwnProperty(key)) {
                if (readOnlyKey.indexOf(key) > -1) {
                    continue;
                }
                defaults[key] = options[key];
            }
        }
        return defaults;
    }

    /**
     * 将UserFilter Object转化为Map
     * @param {object} options 
     * @param {boolean} reverseKv 
     * @returns {Map}
     */
    static upFilterMap(options, reverseKv = false) {
        let map = new Map();
        let raw = Object.keys(options.UserFilter);
        if (reverseKv) {
            for (let i = 0; i < raw.length; i++) {
                map.set(raw[i], options.UserFilter[raw[i]])
            }
            return map;
        } else {
            for (let i = 0; i < raw.length; i++) {
                map.set(options.UserFilter[raw[i]].name, raw[i])
            }
            return map;
        }
    }

    /**
     * UserMark Object转化为Map
     * @param {object} options 
     * @returns {Map}
     */
    static userMarkMap(options) {
        let map = new Map();
        let raw = Object.keys(options.UserMarks);
        for (let i = 0; i < raw.length; i++) {
            map.set(raw[i], options.UserMarks[raw[i]])
        }
        return map;
    }

    /**
     * 切换某个功能模块的开关状态
     * @param {string} featureOptionName 
     * @param {boolean} swStatus 
     * @returns true|error
     */
    static async changeFeatureSwitch(featureOptionName, swStatus) {
        if (featureOptionName == undefined || swStatus == undefined || typeof (swStatus) != "boolean") {
            throw ("[WARN]ExtOptions > changeFeatureSwitch: two param both should not empty or second param should be boolean type.");
        }
        let raw = await ExtOptions.getValue(featureOptionName);
        return raw == swStatus ? true : await ExtOptions.setValue(featureOptionName, swStatus);
    }

}

class NotificationUtils extends UtilsBundle {
    constructor() {
        super();
        this.utilsList.push(NotificationUtils);

        this.BrowserType = myBrowser();
        this.browserApi = this.BrowserType == "Chrome" ? chrome.notifications : browser.notifications;
    }

    static simple(title, message) {
        if (typeof (title) != "string") {
            return;
        }
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'images/notice.png',
            title: 'AcFun助手 ' + title,
            message: message
        });
    }

}

class PlayerAction extends UtilsBundle {
    constructor(devMode) {
        super();
        this.utilsList.push(PlayerAction);

        this.devMode = devMode;
    }

    static addDanmakuFilterRule(data, type) {
        if (type == "uid") {
            $(".options-control-select>div[data-value='user']").trigger("click");
        } else {
            // keywords
            $(`div.danmaku-filter-type > div>div>div[data-value="key"]`).trigger("click");
        }
        $(".filter-input-wrap>input.filter-input").val(data);
        $(".btn-danmaku-filter-add").trigger("click");
        $(".filter-input-wrap>input.filter-input").val("");
    }

    /**
     * 添加按UID屏蔽弹幕规则
     * @param {number} userId
     */
    static addUserToDanmakuFilter(userId) {
        if (userId) {
            PlayerAction.addDanmakuFilterRule(userId, "uid");
        }
    }

    /**
     * 添加按内容屏蔽弹幕规则
     * @param {number} userId
     */
    static addDanmakuFilterWord(keywords) {
        if (keywords) {
            PlayerAction.addDanmakuFilterRule(keywords, "keywords");
        }
    }

    static closeAllLoop() {
        if (document.querySelector(".control-btn.btn-loop>span").dataset.bindAttr == "true") {
            document.querySelector(".control-btn.btn-loop>span").click();
        }
        $(`div.control-checkbox[data-bind-key="playContinue"]`).data()['bindAttr'] && (console.log("playContinue true"),$('div.control-checkbox[data-bind-key="playContinue"]').trigger("click"));
        $(`#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-top > div.box-right > div.control-btn.setting > div.setting-panel > div.setting-panel-content > div:nth-child(2) > div`).data()['bindAttr'] && (console.log("autoplay true"),$('#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-top > div.box-right > div.control-btn.setting > div.setting-panel > div.setting-panel-content > div:nth-child(2) > div').trigger("click"));
    }
}

// let x = new WebStorageUtil("session", 3600000)
// x.setByKv("1", 1)
// x.getByKey("1")
// x.removeItems("1")

// let x = new DOMObserver(document.querySelector(".Topstory-container"), function (e) { console.log(e) }, true)
// x.configSet(true, true, true, true, [], true, true)
// x.createObserver()
// x.disconnect(document.querySelector(".Topstory-container"))

// let x = new InterSectionObserverUtil([document.querySelector(".GlobalSideBar-navList"), document.querySelector(".Banner-link")], function (e) { console.log(e) }, true)
// let x = new InterSectionObserverUtil(document.querySelector(".GlobalSideBar-navList"), function (e) { console.log(e) }, true)
// x.createObserver();

// MessageSwitch.parseParmNow({ target: "test", InvkSetting: { async: true }, params: { x: 1 } })
// MessageSwitch.sendMessage('fg', { target: "test", InvkSetting: { async: true ,tabId:[688]}, params: { x: 1 } })