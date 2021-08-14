class UtilsBundle {
    constructor() {
        this.utilsList = [];
        this.utilsList.push(UtilsBundle);
    }

    removeUtils(utilName = "") {
        function removeUtil(_this, utilName = "") {
            let elemId = _this.utilsList.indexOf(utilName);
            if (elemId != -1) {
                delete _this.utilsList[elemId];
                return true;
            }
            return false;
        }
        if (typeof utilName == "string") {
            return removeUtil(this, utilName);
        } else if (typeof utilName == "object") {
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
            this.target === elements && this.observerInst[0].disconnect();
        }
    }

    static glance(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(true, false, false, false, [], false, false);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

    static monitor(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(true, true, true, true, [], true, true);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

    static watchAttrs(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(false, true, false, false, [], false, false);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

}

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
 * @todo 之前想到了一个绝好的解决标签页面在后台执行失效的问题写下了这个队列的实现，但是过了几天就忘了，我现在先放在这儿，有好点子再来写完吧。
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