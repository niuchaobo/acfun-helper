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
                _this.utilsList[elemId]?.beforeRemove?.call({});
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
                    causeElemt.append(e);
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
                    throw "Storagespace is about out of quota,unable to init WebStorageUtil or execute inner function.";
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
                    causeElemt.append(e);
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
            throw "targetKey or eventCall maybe wrong type.";
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

    test() {
        console.log(this.storeMode)
    }

    static isSupport() {
        if ("localStorage" in window && "sessionStorage" in window) {
            return true;
        }
        return false;
    }
}

/**
 * 监视DOM树
 */
class DOMObserver extends UtilsBundle {
    constructor(target, trigger, devMode = false) {
        super();
        this.utilsList.push(DOMObserver);

        this.target = target;
        this.trigger = trigger;
        this.triggers = null;

        if (Array.isArray(trigger)) {
            this.triggers = trigger;
            this.trigger = function () {
                this.triggers.forEach((e) => {
                    typeof (e) === "function" && e();
                })
            }
        }

        this.observerInst = [];
        this.devMode = devMode;
        /**
         *@config   childList：子节点的变动（指新增，删除或者更改）。
                    attributes：属性的变动。
                    characterData：节点内容或节点文本的变动。

                    subtree：将该观察该节点的所有后代节点。
                    attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）。
                    attributeOldValue ：观察attributes变动时，记录变动前属性值。
                    characterDataOldValue：观察characterData变动时，记录变动前值。
         */
        this.config = {
            childList: true, attributes: true, characterData: false,
            subtree: false, attributeFilter: [], characterDataOldValue: false, attributeOldValue: false
        }
        this.MutationObserverFg = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    }

    createObserver() {
        console.log(this.trigger)
        if (Array.isArray(this.target)) {
            this.target.forEach(e => {
                this.observerInst.push(new this.MutationObserverFg(this.trigger));
            })
        } else {
            this.observerInst.push(new this.MutationObserverFg(this.trigger));
        }
        this._runObserverInsts();
    }

    _runObserverInsts() {
        if (Array.isArray(this.target)) {
            this.observerInst.forEach(e => {
                e.observe(e, this.config);
            })
        } else {
            this.observerInst[0].observe(this.target, this.config);
        }
    }

    configSet(childList, attributes, characterData = false, subtree = false, attributeFilter = [], attributeOldValue = false, characterDataOldValue = false) {
        if (childList || attributes || characterData) {
            this.config.childList = childList;
            this.config.attributes = attributes;
            this.config.characterData = characterData;
            this.config.attributeFilter = attributeFilter;
            this.config.attributeOldValue = attributeOldValue;
            this.config.characterDataOldValue = characterDataOldValue;
            this.config.subtree = subtree;
        } else {
            throw "At a minimum, one of childList, attributes, and/or characterData must be true before you call observe()."
        }
    }

    _preRemove(obsvr) {
        const extraMutations = obsvr.takeRecords();
        if (extraMutations) {
            extraMutations.forEach(e => {
                this.trigger(e)
            })
        }
    }

    removeObserver(elements) {
        if (Array.isArray(elements)) {
            elements.forEach(e => {
                let elemIndex = this.target.indexOf(e);
                elemIndex != -1 && this.observerInst[elemIndex].disconnect();
            })
        } else {
            if (elements) {
                this.target === elements && this.observerInst[0].disconnect();
                return;
            }
            this.observerInst[0].disconnect();
        }
    }

    /**
     * 监控子对象
     * @param {HTMLElement} target 
     * @param {Function} fns 
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
        ObsrvStaticInst.configSet(false, true, false, false, [], false, false);
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
 * @description 监听DOM对象 模块版本!
 */
class GetAsyncDomUtil extends UtilsBundle {
    constructor(target, fn, insure, purpose = "exist", time = 2500, instantMode = true, maxWaitTime = 30000, devMode = true, advancedQueryMethod) {
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
        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 开始监听 ${this.target}。`);
        const re = (fn, insure) => {
            return new Promise(resolve => {
                const targetDom = this.advancedQueryMethod ?? (document.getElementById(this.target) || document.getElementsByClassName(this.target).length || document.querySelector(this.target) || $(`${this.target}`).length || undefined);
                if (targetDom && typeof (this.condition) == 'function' ? this.condition(targetDom) : this.condition) {
                    this.index = 0;
                    this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: ${this.target}加载。`, targetDom);
                    resolve(fn());
                } else {
                    if (this.index > this.iterLimit) {
                        this.index = 0;
                        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: ${this.target} 没找到或者它不满足条件。`);
                        resolve(insure == undefined ? false : insure());
                        return;
                    };
                    this.index++;
                    this.probeTimeHandler = setTimeout(() => {
                        this.instantMode ? "" : this.time += 500;
                        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 正在监听 ${this.target} - 第${this.index}次。`);
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
     * @param {Function} purpose 
     * @param {Function} insure 
     * @param {number} time 
     * @param {boolean} isDev 
     * @example GetAsyncDomUtil.judgeImgReady("#article-up > div.article-content > div > div:nth-child(2) > img",function(e){console.log("ok了")})
     */
    static judgeImgReady(ImgDom, fn, purpose = function (e) {
        if (e instanceof HTMLImageElement && e.complete) {
            return true
        }
        return false
    }, insure, time = 2000, isDev = true) {
        new GetAsyncDomUtil(ImgDom, fn, insure, purpose, time, true, 30000, isDev).probe();
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
                    console.warn("InterSectionObserverUtil constructor param target ", target[i], "is null,omit it.");
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
                console.log(e, this.target)
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
        this.enter = this.enter;
        this.exit = this.exit;
        this.getFirst = this.getFirst;
        this.getTail = this.getTail;
        this.clearQueue = this.clear;
        this.isEmpty = this.isEmpty;
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
    /**
     * 获取队尾元素
     * @returns stat->是否存在:bool,data
     */
    getTail() {
        if (this.dataField.length != 0) {
            return { stat: true, data: this.dataField[length - 1] };
        }
        return { stat: false, data: '' };
    }
    /**
     * 队列是否为空
     * @returns bool
     */
    isEmpty() {
        if (this.dataField.length == 0) {
            return true
        }
        return false
    }
    /**
     * 清除队列
     */
    clear() {
        delete this.dataField
    }
}

/**
 * 工具箱
 */
class DsUtils extends UtilsBundle {

    constructor() {
        super();
        this.utilsList.push(DsUtils);

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
                let msg = "";
                for (let x in params) { msg += `${x}:${params[x]} ;` }
                fgConsole("", "MessageSwitch", msg, 1);
                callback();
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
                for (let x in params) { msg += `${x}:${params[x]} ;` }
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
     * 
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
                console.log("here")
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
                    console.log(`[${formatDate(new Date(), true)}]`, target);
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
                console.log(`[${formatDate(new Date(), true)}]`, target);
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
                payload.InvkSetting.tabId.push(tab.id);
            }
            this.sendMessage('bg', payload, callback())
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