import { features } from "@/Modules/FgModules";

// https://github.com/otiai10/chromite
const Actionkey = "__action__";
const ActionKeyAlias = ["__action__", "__act__", "action"];

export enum ErrCode {
    OK = 200,
    NotFound = 404,
    ErrorOccurred = 500,
}

//msg example:{"action":"/bg/echo",{"data":"Hi there."}}
//msg example:("/bg/echo",{"data":"Hi there."})

type HasAlias<T extends string> = { [K in T]: { [P in K]: string } }[T]
type MessageModuleType = (typeof chrome.runtime | typeof chrome.tabs)
type MsgReqType = Record<string, unknown>
type MsgRespType = any
type MsgReqWithAction<Msg> = HasAlias<typeof ActionKeyAlias[number]> & Msg

interface ClientOption {
    module?: MessageModuleType
    tabId?: number
    extId?: string
}

class MsgClient {
    private readonly __mod__: MessageModuleType
    private readonly __tabId__?: number
    private readonly __extId__?: string

    constructor(option?: ClientOption) {
        this.__mod__ = option?.module ?? chrome.runtime
        this.__tabId__ = option?.tabId
        this.__extId__ = option?.extId
    }

    async send(action: string, message?: MsgReqType): Promise<MsgRespType>
    async send(message: MsgReqWithAction<MsgReqType>): Promise<MsgRespType>
    async send(a: string | MsgReqWithAction<MsgReqType>, message = {}): Promise<MsgRespType> {
        console.log(typeof (this.__tabId__), this.__tabId__, a, message)
        if (typeof a == "string") {
            return await this.sendMessage({ [Actionkey]: a, ...message })
        }
        const action = this.findActionKeyInMsgReq(a)

        if (action == undefined || action == "") {
            throw new Error("Action not included in action or message")
        }
        return await this.sendMessage({ [Actionkey]: action, ...a })
    }

    private async sendMessage(message: MsgReqType): Promise<MsgRespType> {
        if (typeof this.__tabId__ === "number") {
            return await (this.__mod__ as unknown as typeof chrome.tabs).sendMessage(this.__tabId__, message)
        }

        if (typeof this.__extId__ === "string") {
            return await (this.__mod__ as unknown as typeof chrome.runtime).sendMessage(this.__extId__, message)
        }

        return await (this.__mod__ as unknown as typeof chrome.runtime).sendMessage(null, message)
    }

    private findActionKeyInMsgReq(msgReq: any): string | undefined {
        const key = ActionKeyAlias.find(key => msgReq[key] !== undefined)
        if (key == undefined) {
            return undefined
        }
        return msgReq[key]
    }
}

type RoutingTargetEvent = chrome.events.Event<any> | chrome.events.EventWithRequiredFilterInAddListener<any>
type Resolved<U = Record<string, unknown>> = {
    [Actionkey]: string
} & U
type Resolver<Callback extends (...args: any[]) => any, U = Record<string, unknown>> = (...args: Parameters<Callback>) => Promise<Resolved<U>>
type ExtractCallback<T> = T extends chrome.events.Event<infer U> ? U : (T extends chrome.events.EventWithRequiredFilterInAddListener<infer V> ? V : never)
export type HandleOf<Callback extends (...args: any[]) => any> = (...args: Parameters<Callback>) => (Promise<any | undefined> | undefined | void)
type RouterMatcher<H, U = any> = {
    match: (action: string) => Resolved<U> | undefined
    handler: () => H
}

const DefaultResolver = async <U = any>(...args: any[]): Promise<Resolved<U>> => {
    const alias = ActionKeyAlias.find(a => args[0][a] !== undefined)
    if (alias == undefined) {
        return {
            [Actionkey]: "'Action' not included in action or data", ...args[0]
        }
    }
    return await Promise.resolve({
        [Actionkey]: args[0][alias], ...args[0]
    })
}

class MsgRouter<T extends RoutingTargetEvent, U = Record<string, unknown>> {
    constructor(public readonly resolver: Resolver<ExtractCallback<T>, U> = DefaultResolver) {

    }

    readonly routes: {
        exact: Array<RouterMatcher<HandleOf<ExtractCallback<T>>>>
        regex: Array<RouterMatcher<HandleOf<ExtractCallback<T>>>>
    } = {
            exact: [],
            regex: []
        }

    private notfound: HandleOf<ExtractCallback<T>> = async function (this: { route: Resolved<U> }, ...args) {
        return { "status": ErrCode.NotFound, "message": `Handler for request "${this.route[Actionkey]}" not found` }
    }

    private error: HandleOf<ExtractCallback<T>> = async function (this: { route: Resolved<U> }, ...args) {
        return { "status": ErrCode.ErrorOccurred, "message": `Handler for request "${this.route[Actionkey]}" throw an error` }
    }

    public onNotFound(callback: HandleOf<ExtractCallback<T>>): void {
        this.notfound = callback
    }

    public onError(callback: HandleOf<ExtractCallback<T>>): void {
        this.error = callback
    }

    private findHandler(action: string): HandleOf<ExtractCallback<T>> {
        const exact = this.routes.exact.find(r => r.match(action))
        if (exact != null) {
            return exact.handler().bind({
                route: exact.match(action)
            })
        }

        const regex = this.routes.regex.find(r => r.match(action))
        if (regex != null) {
            return regex.handler().bind({ route: regex.match(action) })
        }
        return this.notfound.bind({ route: { [Actionkey]: action } })
    }

    listener(): ExtractCallback<T> {
        return ((...args: Parameters<ExtractCallback<T>>) => {
            const sendResponse = this.sendResponse(...args)
            this.resolver(...args).then(route => {
                const fn = this.findHandler(route[Actionkey])
                const res = fn(...args)
                if (res instanceof Promise) {
                    res.then(sendResponse).catch(err => this.error.bind({ route, error: err })(...args)?.then(sendResponse))
                } else {
                    sendResponse(res)
                }
            }).catch(err => {
                const fn = this.error.bind({ route: { [Actionkey]: '__router_error__', error: err } })
                void fn(...args)?.then(sendResponse)
            })
            return true
        }) as ExtractCallback<T>
    }

    private sendResponse(...args: any[]): (arg: any) => void {
        if (args.length === 0) {
            return () => { }
        }
        return typeof args[args.length - 1] === "function" ? args[args.length - 1] : () => { }
    }

    on(action: string, callback: HandleOf<ExtractCallback<T>>): unknown {
        let includesRegex = false;
        const segments = action.split('/').filter(c => c != '').map(c => {
            if (c.startsWith("{") && c.endsWith("}")) {
                includesRegex = true
                const name = c.slice(1, c.length - 1)
                return `(?<${name}>[^\\/]+)`
            }
            return c
        })
        if (!includesRegex) {
            return this.routes.exact.push({
                match: (a) => a === action ? { [Actionkey]: action } : undefined,
                handler: () => callback
            })
        }
        const str = '^' + '\\/' + segments.join('\\/') + "$"
        const regexp = new RegExp(str)

        return this.routes.regex.push({
            match: (act) => {
                const m = act.match(regexp)
                if (m != null) {
                    return {
                        [Actionkey]: action, ...m.groups
                    }
                }
                return undefined
            },
            handler: () => callback
        })
    }
}

class MsgSwitch<T extends RoutingTargetEvent, U = Record<string, unknown>> extends MsgRouter<T, U> {
    constructor(public readonly resolver: Resolver<ExtractCallback<T>, U> = DefaultResolver) {
        super(resolver);
    }

    findSwHandler(action: string): HandleOf<ExtractCallback<T>> {
        const exact = this.routes.exact.find(r => r.match(action))
        if (exact != null) {
            return exact.handler().bind({
                route: exact.match(action)
            })
        }

        const regex = this.routes.regex.find(r => r.match(action))
        if (regex != null) {
            return regex.handler().bind({ route: regex.match(action) })
        }
        return () => { }
    }

    listener(): ExtractCallback<T> {
        return ((args: MessageEvent) => {
            console.log(args)
            const argList = [] as unknown as Parameters<ExtractCallback<T>>
            for (let i in args.data) {
                argList.push({
                    [i]: args.data[i],
                })
            }
            this.resolver(...argList).then(route => {
                const fn = this.findSwHandler(route[Actionkey])
                fn(...argList)
            })
        }) as ExtractCallback<T>
    }
}

class MsgSwitchWithEventTrigger<T extends RoutingTargetEvent, U = Record<string, unknown>> extends MsgSwitch<T, U> {
    EventTrigger: Record<"Fg" | "Bg", { "Events": Array<string>, "EventTriggers": Record<string, Array<(e: any) => any>> }>;
    constructor(public readonly resolver: Resolver<ExtractCallback<T>, U> = DefaultResolver) {
        super(resolver);
        this.EventTrigger = {
            "Fg": {
                Events: [],
                EventTriggers: {},
            },
            "Bg": {
                Events: [],
                EventTriggers: {},
            }
        }
    }

    findSwHandler(action: string): HandleOf<ExtractCallback<T>> {
        const exact = this.routes.exact.find(r => r.match(action))
        if (exact != null) {
            return exact.handler().bind(this)
        }

        const regex = this.routes.regex.find(r => r.match(action))
        if (regex != null) {
            return regex.handler().bind(this)
        }
        return () => { }
    }

    EventBaseMsgTrigger(action: any, data: any) {
        console.log(action, data)
        const actionName: Record<"action", string> = action;
        // /{fg,bg}/event/{on,trigger,off}/[eventName]
        if (!actionName.action.includes("/event/")) {
            return
        }
        const actionCtx = actionName.action.split('/').filter(c => c != '')
        if (actionCtx.length < 4) {
            return
        }
        const ground = actionCtx[0] == "fg" ? "Fg" : "Bg";
        const eventType = actionCtx[2];
        const eventName = actionCtx[3];
        const srcModName = data?.["data"]?.["srcModName"];
        const groundE = this.EventTrigger[ground];
        switch (eventType) {
            case "on":
                groundE.Events.push(eventName);
                groundE.EventTriggers?.[eventName] && groundE.EventTriggers[eventName].forEach(e => e(eventName));
                break;
            case "trigger":
                !(groundE.EventTriggers?.[eventName]) && (groundE.EventTriggers[eventName] = [])
                if (srcModName && eventName in groundE.EventTriggers && srcModName in features && features[srcModName]?.eventTrigger) {
                    groundE.EventTriggers[eventName].push(features[srcModName].eventTrigger);
                }
                break;
            case "off":
                (eventName in groundE.Events) && groundE.Events.splice(groundE.Events.indexOf(eventName));
                break;
        }
    }

}

export const MessageRouter = {
    MsgClient, MsgRouter, MsgSwitch, MsgSwitchWithEventTrigger,
    ErrCode
}