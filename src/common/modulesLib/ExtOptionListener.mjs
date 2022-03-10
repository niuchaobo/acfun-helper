export class ExtOptionListener {
    constructor(storageArea = "local") {
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

}