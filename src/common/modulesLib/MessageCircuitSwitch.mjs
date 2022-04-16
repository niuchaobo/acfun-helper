/**
 * 长连接通信模块
 * @param {"fg"|"bg"|"inject"|"iframe"} hostType 信源类型
 * @param {HTMLElement} hostElement 通信依托实体
 * @param {boolean} persistant 是否长连接
 * @description 打电话！
 */
export class MessageCircuitSwitch {
    constructor(hostType = "bg", hostElement, portName = "", devMode = false) {
        this.hostType = hostType;
        this.devMode = devMode;
        if (this.hostType == "fg") {
            this.hostElement = hostElement ? hostElement : window;
        }

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
                classicalParmParse: sourceParam?.classicalParmParse ?? false,
                withCallback: sourceParam.withCallback ?? false,
                callbackId: sourceParam.withCallback == undefined ? false : sourceParam.callbackId,
            },
            params: sourceParam?.params ?? sourceParam?.param
        };
    }

    /**
     * 发送长连接的消息
     * @param {"fg"|"bg"|"inject"|"iframe"} hostType 
     * @param {MessageSwitchStructs.DedicatedLinkPayload} payload {source:string,target:string;InvkSetting: {type:"function"|"printMsg"|"subMod"|"method"|"echo";receipt:boolean;responseRequire:boolean;asyncWarp:boolean;tabId:number|Array|undefined;};params:{};}
     */
    connectMessage(hostType = 'fg', payload = {}, tabId = "") {
        switch (hostType) {
            case "bg":
                tabId === "" ? console.warn("[Common-MessageSwitch > connectMessage] when in background,you send message to frontend tabs,you need set the tabId.") : ""
                try {
                    chrome.tabs.get(tabId, (e) => {
                        if (e) {
                            this.connectionHandler === null ? this.connectionHandler = chrome.tabs.connect(tabId, { name: this.portName }) : "";
                            this.connectionHandler.postMessage({ payload: payload });
                        }
                    })
                } catch (error) {
                    console.warn("[Common-MessageSwitch > connectMessage] tabId is unvaliable")
                }
                break;
            case "fg":
                this.connectionHandler === null ? this.connectionHandler = chrome.runtime.connect({ name: this.portName }) : "";
                this.connectionHandler.postMessage({ payload: payload });
                break;
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
                    const method = InvkSetting.unsafe ? this[target] : this["Apis"][target];
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
             * @type {MessageSwitchStructs.DedicatedLinkResponse}
             */
            let response = {};
            _this.eventId++;
            response.target = source;
            response.source = _this.portName;
            response.eventId = _this.eventId;
            switch (InvkSetting?.type) {
                case "function":
                    const method = InvkSetting.unsafe ? this[target] : this["Apis"][target];
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

    static parseParmNow(e) {
        return (new MessageSwitch).paramParse(e)
    }

}
