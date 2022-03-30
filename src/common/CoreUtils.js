/**
 * 监视DOM树
 */
class DOMObserver {
    /**
     * @param {HTMLElement|string|HTMLElement[]} targets 选择器
     * @param {(e:MutationRecord[])=>{}} trigger 钩子函数
     * @param {boolean} devMode 
     * @param {boolean} complex 
     * @example ````最简单的写法：
        ```js
        DOMObserver.attrs(document.querySelector("video"), e => { console.log(e) })
        ```
     * @example ````常规使用方式：
        ```js
        const ObsrvStaticInst = new DOMObserver(document.querySelector("video"), e=>{
            console.log(e);
        }, true); //首先实例化一个DOMObserver，并传入参数：需要观察的DOM对象，观察到Mutation事件之后的钩子函数，打开开发者模式。
        ObsrvStaticInst.configSet(false, true, false, false, [], true, false);  //配置观察属性，只观察值变化，并要求报告旧值
        ObsrvStaticInst.createObserver(); //启动观察器
        ```
     */
    constructor(targets, trigger, devMode = false, complex = false) {
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
     * @param {(e:MutationRecord[])=>{}} fns 
     * @param {boolean} isDev 
     * @returns {DOMObserver}
     */
    static childs(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(true, false, false, false, [], false, false);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

    /**
     * 监控对象所有变动
     * @param {HTMLElement} target 
     * @param {(e:MutationRecord[])=>{}} fns 
     * @param {boolean} isDev 
     * @returns {DOMObserver}
     */
    static all(target, fns, isDev) {
        const ObsrvStaticInst = new DOMObserver(target, fns, isDev);
        ObsrvStaticInst.configSet(true, true, true, true, [], true, true);
        ObsrvStaticInst.createObserver();
        return ObsrvStaticInst;
    }

    /**
     * 监控对象属性变动
     * @param {HTMLElement} target 
     * @param {(e:MutationRecord[])=>{}} fns 
     * @param {boolean} isDev 
     * @returns {DOMObserver}
     */
    static attrs(target, fns, isDev) {
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
class GetAsyncDomUtil {
    constructor(target, fn, insure, purpose = "exist", time = 2500, instantMode = true, maxWaitTime = 30000, devMode = true, advancedQueryMethod, extraParam = null) {
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
            this.iterLimit = extraTime > (this.time / 2) ? maxTryNum++ : maxTryNum;
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
                let hasJqueryLib = false;
                //检测JQuery的支持，解决没有引入JQuery下出现的问题
                try {
                    hasJqueryLib = ($ != undefined);
                } catch (error) {
                    hasJqueryLib = false;
                }
                //DOM探测
                const targetDom = this.advancedQueryMethod ?? (document.querySelector(this.target) || document.getElementById(this.target) || document.getElementsByClassName(this.target).length || (hasJqueryLib && $(`${this.target}`).length) || undefined);
                this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 第${this.index}次探测时的targetDom: ${targetDom}`)
                let response;
                let isGotDom = Boolean(targetDom);
                //DOM状态要求
                let domMeetCondition = typeof (this.condition) == 'function' ? response = this.condition(targetDom, this.extraParam) : this.condition;
                this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 第${this.index}次探测时的targetDom: ${domMeetCondition}`)
                if (isGotDom && domMeetCondition) {
                    this.index = 0;
                    this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: ${this.target}完成。`, targetDom);
                    resolve(fn(response));
                } else {
                    if (this.index > this.iterLimit) {
                        this.index = 0;
                        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 没符合条件 ${this.target} 。`);
                        resolve(insure == undefined ? false : insure());
                        return;
                    };
                    this.index++;
                    this.probeTimeHandler = setTimeout(() => {
                        this.instantMode ? "" : this.time += 500;
                        this.devMode && console.log(`[LOG]UtilsBundle > getAsyncDom: 准备${this.target}的 - 第${this.index}次。`);
                        resolve(re(this.fn, this.insure));
                    }, this.time);
                }
            })
        }
        return await re(this.fn, this.insure);
    }

    async judgeJqueryExist() {
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

    /**
     * 模仿莫老板写的getAsyncDom，大概原汁原味？
     * @param {string} target 
     * @param {Function} fn 
     * @param {number} time 
     * @param {boolean} isDev 
     * @example GetAsyncDomUtil.getAsyncDomClassic(".ac-comment-list",function(){ console.log("2333") })
     * @returns {GetAsyncDomUtil}
     */
    static getAsyncDomClassic(target, fn, time = 2500, isDev = false) {
        return new GetAsyncDomUtil(target, fn, null, "exist", time, true, 30000, isDev).probe();
    }

    /**
     * 等待评论区加载后运行callback
     * @param {function|function[]} callbacks 
     * @returns {GetAsyncDomUtil}
     */
    static commentAreaLoading(callbacks) {
        return GetAsyncDomUtil.getAsyncDomClassic(".ac-comment-list", () => {
            if (Array.isArray(callbacks)) {
                let results = [];
                callbacks.forEach(e => {
                    result.push(e());
                });
                return results;
            }
            return callbacks();
        }, 2000, false)
    }

}

/**
 * 通信模块
 * @param {"fg"|"bg"|"inject"|"iframe"} hostType 信源类型
 * @param {HTMLElement} hostElement 通信依托实体
 * @description 打电话！
 */
class MessageSwitch {
    constructor(hostType = "bg", hostElement, devMode = false) {
        this.hostType = hostType;
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
    }

    /**
     * 格式化参数对象
     * @param {object} sourceParam 
     * @returns {MessageSwitchStructs.CommonPayload}
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
                withCallback: sourceParam.withCallback ?? false,
                callbackId: sourceParam.withCallback == undefined ? false : sourceParam.callbackId,
                unsafe: sourceParam.unsafe ?? false
            },
            params: sourceParam?.params ?? {}
        };
    }

    /**
     * 发送一次消息
     * @param {MessageSwitchStructs.CommonPayload} e
     * @param {Function} callback
     * @param {EventInit} injectMsgSetting
     */
    InstantMsgSender(e, callback = {}) {
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
                globalThis.postMessage({
                    to: "AcFunHelperInject",
                    data: e,
                }, "*");
                // let newEvent = new CustomEvent(this.eventName, { "detail": e, "bubbles": injectMsgSetting.bubbles, "cancelable": injectMsgSetting.cancelable, "composed": injectMsgSetting.composed });
                // this.hostElement.dispatchEvent(newEvent);
                break;
        }
        return true;
    }

    /**
     * 前台消息处理
     * @param {MessageSwitchStructs.CommonPayload} request 
     * @param {MessageSender} sender 
     * @param {Function} callback 
     * @returns 
     */
    FrontendMessageSwitch(request, sender, callback) {
        this.devMode && console.log(request, sender, callback)

        const { target, InvkSetting, params } = request;
        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = InvkSetting.unsafe ? this[target] : this["Apis"][target];
                this.devMode && console.log(method);
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
                const callTarget = InvkSetting.unsafe ? this[target.mod][target.methodName] : this[target.mod]["Apis"][target.methodName];
                if (typeof callTarget === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        callTarget.call(this, params).then(resp => {
                            callback(resp);
                        });
                        return true;
                    }
                    response = callTarget.call(this, params);
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
     * 前台与FgPopup通信处理
     * @param {MessageSwitchStructs.WindowMsgRespnse} e 
     */
    FrontendMsgHandler(e) {
        if (!e.data || e.data.to != "AcFunHelperFrontend") {
            return
        }
        this.devMode && console.log(e)
        const { target, source, InvkSetting, params } = e.data.data;
        switch (InvkSetting.type) {
            case "function":
                const method = InvkSetting.unsafe ? this[target] : this["Apis"][target];
                if (typeof method === "function") {
                    method.call(this, params);
                    return;
                }
                break;
            case "subMod":
                const callTarget = InvkSetting.unsafe ? this[target.mod][target.methodName] : this[target.mod]["Apis"][target.methodName];
                if (typeof callTarget === "function") {
                    callTarget.call(this, params);
                    return;
                }
            default:
                fgConsole("", "FrontendMsgHandler", `${source} > ${target} : ${InvkSetting.type}`, 1);
                break;
        }
    }

    /**
     * 后台消息处理机
     * @param {MessageSwitchStructs.CommonPayload} request 
     * @param {MessageSender} sender 
     * @param {Function} callback 
     * @returns 
     */
    BackgroundMessageSwitch(request, sender, callback) {
        this.devMode && console.log(request, sender, callback)

        const { target = "", InvkSetting, params } = request;
        switch (InvkSetting?.type) {
            case "function":
                const method = InvkSetting.unsafe ? this[target] : this["Apis"][target];
                this.devMode && console.log(method);
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
                const callTarget = InvkSetting.unsafe ? this[target.mod][target.methodName] : this[target.mod]["Apis"][target.methodName];
                if (typeof callTarget === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        callTarget.call(this, params).then(resp => {
                            callback(resp);
                        });
                        return true;
                    }
                    response = callTarget.call(this, params);
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
     * @param {MessageSwitchStructs.WindowMsgRespnse} e 
     */
    SandboxMsgHandler(e) {
        if (e.data.to != "background") {
            return;
        }
        this.devMode && console.log(e);
        const { target, source, InvkSetting, params } = e.data.data;

        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = InvkSetting.unsafe ? this[target] : this["Apis"][target];
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
                const callTarget = InvkSetting.unsafe ? this[target.mod][target.methodName] : this[target.mod]["Apis"][target.methodName];
                if (typeof callTarget === "function") {
                    params.callback = callback;
                    if (InvkSetting["asyncWarp"]) {
                        return Promise((resolve, reject) => {
                            try {
                                callTarget.call(this, params).then(resp => { resolve(resp) });
                            } catch (error) {
                                reject(error)
                            }
                        })
                    }
                    response = callTarget.call(this, params);
                }
                break;
            case "printMsg":
                console.log(`Sandbox:[${formatDate(new Date(), true)}]`, `${source} > ${target}`, params);
                break;
            default:
                console.log(`Sandbox:[${formatDate(new Date(), true)}]`, e.data.data);
        }
    }

    /**
     * Sandbox消息处理
     * @param {MessageSwitchStructs.WindowMsgRespnse} e 
     */
    UnsafeCallHandler(e) {
        if (e.data.to != "sandbox") {
            return;
        }
        const { target, source, InvkSetting, params } = e.data.data;
        this.devMode && console.log(e);

        let response;
        switch (InvkSetting?.type) {
            case "function":
                const method = InvkSetting.unsafe ? this[target] : this["unsafe_" + target];
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
                console.log(`SandboxInner:[${formatDate(new Date(), true)}]`, e.data.data);
        }
        if (response != (undefined || null)) {
            this.sandboxAgent.taskFinished(e.data.data, response);
        }
    }

    /**
     * SandboxAgent消息处理
     * @param {MessageSwitchStructs.WindowMsgRespnse} e 
     * @example let unsafe = new SandboxAgent(document.getElementById('sandbox').contentWindow);unsafe.createTask({ target: "console", InvkSetting: { withCallback: true, callbackId: "test", type: "function" }, params: "2333......" },function(e){console.log(e)})
     */
    SandboxComAgent(e) {
        if (e.data.to == "sandboxAgentCallback") {
            this.runCallback(e.data.data)
        }
    }

    /**
     * 发送一次消息 - 静态
     * @param {"fg"|"bg"|"inject"|"iframe"} hostType
     * @param {MessageSwitchStructs.CommonPayload} payload { target: string; InvkSetting: { receipt: boolean; responseRequire: boolean; asyncWarp: boolean; tabId: number; }; params: {}; }
     */
    static sendMessage(hostType = 'fg', payload = {}, callback) {
        let inst = new MessageSwitch(hostType);
        return inst.InstantMsgSender(payload, callback);
    }

    /**
     * Fg发送消息给Inject
     * @param {HTMLElement} hostElem
     * @param {MessageSwitchStructs.CommonPayload} payload 
     * @example MessageSwitch.sendEventMsgToInject(window,{target:"notice",source:"console",InvkSetting:{type:"function"},params:{title:"233",data:"莫老板今天出门儿"}})
     * @alias sendMsgFromSubmodToFg()
     */
    static sendEventMsgToInject(hostElem, payload) {
        let inst = new MessageSwitch('inject', hostElem, false);
        return inst.InstantMsgSender(payload, null);
    }

    /**
     * 后台向所有前台广播消息
     * @param {MessageSwitchStructs.CommonPayload} payload 
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
class CookiesUtils {
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
 * 工具箱
 */
class ToolBox {
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

    /**
     * 添加一层遮罩
     * @param {HTMLElement} obj 
     * @param {string} styleText 
     * @param {string} divName 
     * @elementID divMask
     */
    static DOMElementMask(obj, styleText = "", divName = "") {
        if (!styleText) {
            styleText = `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: #fff; opacity: 0; filter: alpha(opacity=0);z-index:0;`
        }
        var hoverdiv = `<div id="${divName}" class="divMask" style="${styleText}"></div>`;
        $(obj).wrap('<div class="position:relative;"></div>');
        $(obj).before(hoverdiv);
        $(obj).data("mask", true);
    }

    /**
     * 判断用户是否登录
     * @param {"video"|"article"} dept 
     * @param {"ui"|"cookies"} evidence 
     * @returns {boolean}
     */
    static isLogin(dept = "video", evidence = "cookies") {
        if (evidence == "cookies") {
            return Boolean(CookiesUtils.getItem("ac_username"));
        } else if (evidence == "ui") {
            switch (dept) {
                case "video":
                    if ($("#ACPlayer > div > div.container-video > div > div.container-controls > div.control-bar-bottom > div.input-area > span.wrap-go2login").is(":hidden")) {
                        return true;
                    } else {
                        return false;
                    }
                case "article":
                    let isLogined = false;
                    try {
                        isLogined = document.querySelector("#header-guide > li.guide-item.guide-user > a").childElementCount == 0;
                    } catch (error) {
                        isLogined = Boolean(CookiesUtils.getItem("ac_username")) ? true : false;
                    }
                    return isLogined;
            }
        }
    }

    static utilAsync(func) {
        return function (...args) {
            func.apply(this, args);
        };
    }

    static curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return function (...args2) {
                    return curried.apply(this, args.concat(args2));
                }
            }
        };
    }

}

class AcFunHelperHelper {
    constructor(reloadMethod) {
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
            AcFunHelperHelper.execFgReload(tabs);
        });
    }

    static reloadActiveFrontend() {
        chrome.tabs.query({ active: true, lastFocusedWindow: false }, tabs => {
            AcFunHelperHelper.execFgReload(tabs);
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

    static async getThisTabId() {
        return (await MessageSwitch.getTabId()).id;
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
                    AcFunHelperHelper.reload();
                }
            })
        }

        chrome.management.getSelf(self => {
            if (self.installType === 'development') {
                chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
                this.reloadMethod == 1 && AcFunHelperHelper.reloadActiveFrontend();
                this.reloadMethod == 2 && AcFunHelperHelper.reloadFrontendInsts();
            };
        })
    }

    static getBackendInst() {
        return chrome.extension.getBackgroundPage().AcFunHelperBackend;
    }

}

class ExtOptions {
    constructor(storageArea = "local") {
        this.storageArea = storageArea;
    }

    /**
     * 获取相关存储区域的全部配置
     * @returns {Object}
     */
    _getAll() {
        return new Promise((resolve, reject) => {
            chrome.storage[this.storageArea].get(null, (options) => {
                resolve(ExtOptions.sanitizeOptions(options));
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
            chrome.storage[this.storageArea].set(ExtOptions.transOptions(options), resolve());
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
            ExtOptions.purgeAll();
            ExtOptions.saveAll(ExtOptions.sanitizeOptions({}));
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

    async _usedSpace(key = null) {
        //if key == null,count total space usage.
        return new Promise((resolve, reject) => {
            chrome.storage['local'].getBytesInUse(null, (e) => {
                resolve(e)
            });
        })
    }

    /**
     * 计算使用空间
     * @param {*} key 
     * @returns 
     */
    static async usedSpace(key = null) {
        return await new ExtOptions('local')._usedSpace(key);
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