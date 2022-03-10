/**@description AcFunHelperRequestFilterPlatform */
class InjectXHRDriver {
    constructor() {
        this.devMode = false;
        this.isRightPage = new RegExp("https://*.*.acfun.cn/*").test(window.location.href);
        if (!this.isRightPage) {
            return;
        }
        this.AcFunHelperFrontendXHRReactor = new XHRReactor();
        this.AcFunHelperFrontendXHRReactor.loadModules(["CommentListFilter", "ArticleUidFilter"]);
        globalThis.addEventListener("message", (e) => {
            if (e.data.to == "AcFunHelperInject") {
                this.MessageSwitch(e);
            }
        })
        /**@type {OptionStruct.DefaultStruct} */
        this.options = null;
        /**
         * @type {XHRDriverRegistry}
         * @description 首先在这里注册下过滤器的描述信息，首先自增操作类型typescount，然后将对应的URL写入对应类型的registeredEvent中，最后写入具体条目到registry中
         * @tips 不建议动态使用addRule
         */
        this.registry = {
            _sys: {
                globalSw: false,
                typesCount: {
                    "deny": 0, "requestRPC": 0, "injectedApi": 2, "modify": 0,
                },
                boundCount: {
                    pre: 0, post: 1
                },
                registerdEvents: {
                    "deny": [], "requestRPC": [], "injectedApi": ["https://www.acfun.cn/rest/pc-direct/article/feed", "https://www.acfun.cn/rest/pc-direct/comment/list"], "modify": [],
                },
            },
            "https://www.acfun.cn/rest/pc-direct/article/feed": {
                "name": "articleListFilter", "bound": "post", "action": "injectedApi", "condition": { "target": "articleListUidFilter" }
            },
            "https://www.acfun.cn/rest/pc-direct/comment/list": {
                "name": "commentFilter", "bound": "post", "action": "injectedApi", "condition": { "target": "commentFilter" }
            },
        }
    }

    /**@param {MessageSwitchStructs.WindowMsgRespnse} e */
    MessageSwitch(e) {
        if (e.data.data.target != "AcFunHelperFrontendXHRDriver") {
            return
        }
        const payload = e.data.data;
        switch (payload.InvkSetting.type) {
            case "function":
                if (typeof (this[payload.params.target]) == "function") {
                    this[payload.params.target](payload.params.params);
                }
                break;
            default:
                InjectXHRDriver.MessagePush({
                    target: "",
                    InvkSetting: { type: "function" },
                    params: payload.params
                })
                break;
        }
    }

    /**@param {MessageSwitchStructs.WindowMsgPayload} e*/
    static MessagePush(e) {
        globalThis.postMessage({
            to: "AcFunHelperFrontend",
            data: e
        }, "*")
    }

    addRule(p) {
        const { rule, ruleName, action, bound, condition } = p;
        if (this.registry._sys.registerdEvents[action].includes(rule)) {
            return;
        }
        this.registry._sys.typesCount[action]++;
        this.registry._sys.boundCount[bound]++;
        this.registry._sys.registerdEvents[action].push(rule);
        this.registry[rule] = {
            name: ruleName,
            bound: bound,
            action: action,
            condition: condition
        }
    }

    delRule(rule, action) {
        if (this.registry._sys.registerdEvents[action].includes(rule)) {
            const index = this.registry._sys.registerdEvents[action].indexOf(rule);
            this.registry._sys.registerdEvents[action].splice(index);
            this.registry._sys.typesCount[action]--;
            this.registry._sys.boundCount[this.registry[rule].bound]--;
            delete (this.registry[rule]);
        }
    }

    /**@param {{k:string,v:[number]|object}} d*/
    addData(d) {
        const { k: k, v: v } = d;
        if (this.AcFunHelperFrontendXHRReactor.dataset[k] == undefined) {
            Object.defineProperty(this.AcFunHelperFrontendXHRReactor.dataset, k, { value: [], writable: true });
            this.AcFunHelperFrontendXHRReactor.dataset[k] = v;
            return;
        }
        switch (typeof (this.AcFunHelperFrontendXHRReactor.dataset[k])) {
            case "object":
                this.AcFunHelperFrontendXHRReactor.dataset[k] = v;
                break;
            case Array.isArray(this.AcFunHelperFrontendXHRReactor.dataset[k]):
                this.AcFunHelperFrontendXHRReactor.dataset[k].concat(v);
                break;
        }
    }

    delData(d) {
        const { k, v } = d;
        /**@type {[]|{}} */
        const target = this.AcFunHelperFrontendXHRReactor.dataset[k];
        if (v) {
            switch (typeof (target)) {
                case "object":
                    delete (target[k][v])
                    break;
                case Array.isArray(target):
                    target.splice(target.indexOf(v));
                    break;
            }
        } else {
            delete (target[k])
        }
    }

    /**
     * 判断url是否匹配注册字典中的规则URL
     * @param {string} rouType 请求管理阶段 Pre or Post
     * @param {string} url 输入的URL
     * @param {Array<string>} urlsList 操作的目标URL列表
     * @returns {Array<string>} 
     */
    urlMatch(rouType, url, urlsList) {
        let resultExp = []
        urlsList.forEach(e => {
            if (new RegExp(e).test(window.location.origin + url)) {
                if (this.registry[e].bound == rouType) {
                    resultExp.push(e);
                }
            }
        })
        return resultExp;
    }

    /**
     * 主函数
     * @description 定义回调，并从规则注册字典中获取所有注册的目标操作URL，如果请求满足注册字典中的规则，则执行注册字典中的写在AcFunHelperFrontendXHRReactor 的回调(所以要求所有回调都传入ctx并执行handler.next(ctx);)
     */
    start() {
        var urls = [];
        for (let types in this.registry._sys.registerdEvents) {
            this.registry._sys.registerdEvents[types].forEach(rulesUrl => {
                urls.push(rulesUrl);
            })
        }
        /**
         * 请求就绪
         * @param {import("../../declares/XHRProxy").XhrRequestConfig} ctx 
         * @param {import("../../declares/XHRProxy").XhrRequestHandler} handler 
         */
        const preRouting = (ctx, handler) => {
            if (ctx.method == "GET") {
                if (this.registry._sys.boundCount.pre == 0) {
                    return false;
                }
                const shouldRun = this.urlMatch("pre", ctx.url, urls);
                if (shouldRun.length) {
                    shouldRun.forEach(e => {
                        this.AcFunHelperFrontendXHRReactor[this.registry[e].condition.target](ctx, handler);
                    })
                    return true;
                }
            }
            return false;
        }
        /**
         * 请求已回复
         * @param {import("../../declares/XHRProxy").XhrResponse} ctx 
         * @param {import("../../declares/XHRProxy").XhrResponseHandler} handler 
         */
        const postRouting = (ctx, handler) => {
            if (this.registry._sys.boundCount.post == 0) {
                return false;
            }
            const postShouldRun = this.urlMatch("post", ctx.config.url, urls);
            if (postShouldRun.length) {
                postShouldRun.forEach(e => {
                    this.AcFunHelperFrontendXHRReactor[this.registry[e].condition.target](ctx, handler);
                })
                return true;
            }
            return false;
        }
        /**
         * @description 注册钩子，如果没有匹配到的规则，则直接执行请求，如果匹配到了规则，则先执行AcFunHelperFrontendXHRReactor 中的回调，然后再执行请求
         */
        XHRProxy.proxy({
            onRequest: (xhr, handler) => {
                !preRouting(xhr, handler) && handler.next(xhr);
            },
            onResponse: (response, handler) => {
                !postRouting(response, handler) && handler.next(response);
            }
        })
    }

    stop() {
        XHRProxy.unProxy();
    }

}

class XHRReactor {
    constructor() {
        this.dataset = {};
        this.modules = {};
    }

    /**@param {Array<string>} mods*/
    loadModules(mods) {
        mods.forEach(async e => {
            /**@type {{arfpmod:{name:string,trigger:(ctx:import("../../declares/XHRProxy").XhrResponse,handler:import("../../declares/XHRProxy").XhrResponseHandler)=>{},datas:Map()}}} */
            const mod = await import(`./littleMods/ARFP/${e}.mjs`);
            const { name, trigger, datas } = mod.arfpmod;

            this[name] = trigger;

            const dataName = Object.keys(datas);
            dataName.forEach(f => {
                if (this.dataset[f]) {
                    return;
                }
                this.dataset[f] = datas[f];
            })
        })
    }

}

const AcFunHelperFrontendXHRDriver = new InjectXHRDriver();
AcFunHelperFrontendXHRDriver.devMode && (window.arfp = AcFunHelperFrontendXHRDriver);