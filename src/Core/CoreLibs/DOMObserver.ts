interface triggerEventStruct {
    /**条件过滤函数 */
    condition: (e: MutationRecord) => boolean;
    /**钩子函数 */
    trigger: (e: MutationRecord) => any;
}

interface observeConfig extends MutationObserverInit {
    hasInit?: boolean;
    /** 子节点的变动（指新增，删除或者更改）*/
    childList: boolean;
    /** 属性的变动 */
    attributes: boolean;
    /** 节点内容或节点文本的变动 */
    characterData?: boolean;
    /** 观察该节点的所有后代节点 */
    subtree?: boolean;
    /* *数组，表示需要观察的特定属性（比如['class','src']），设定了attributes之后，如果不需要筛选观测的attribute列表就将其从config字典中删除，否则将会筛除所有事件 */
    attributeFilter?: Array<string>;
    /** 观察attributes变动时，记录变动前属性值 */
    characterDataOldValue?: boolean;
    /** 观察characterData变动时，记录变动前值 */
    attributeOldValue?: boolean;
    /** 节流 */
    throttleEnable?: boolean;
    /** 节流超时 */
    throttleInsureTime?: number;

};

interface observeTarget {
    name: string;
    targetNode: Element;
    config: observeConfig;
}

/**监视DOM树
 * @example 最简单的写法：
        ```js
        DOMObserver.attr(document.querySelector("video"), e => { console.log(e) })
        ```
 * @description 一个监控对象对应一个Observer，多个Observer的事件都汇聚到eventProcessor,各个事件通过各个triggersEvent中的condition条件过滤函数之后执行其中的钩子函数
 */
export class DOMObserver {
    targets: Record<string, observeTarget>;
    triggersEvent: Record<string, triggerEventStruct> = {};

    //Inner
    observerInstance: Record<string, MutationObserver> = {};
    devMode: boolean = false;
    MutationObserverFg: { new(callback: MutationCallback): MutationObserver; prototype: MutationObserver; };
    disabledTriggerEvent: Record<string, triggerEventStruct> = {};

    constructor(targets: Record<string, observeTarget>, triggerEvent: Record<string, triggerEventStruct>, devMode: boolean) {
        this.targets = targets;
        this.triggersEvent = triggerEvent;

        this.MutationObserverFg = window.MutationObserver;
        this.observerInstance = {} as Record<string, MutationObserver>;
        this.devMode = devMode;
        this.disabledTriggerEvent = {};
        this.devMode && console.log("Init Class.")
    }

    init() {
        for (let t in this.targets) {
            this.devMode && console.log("Init target: " + t)
            const target = this.targets[t];
            this.createObserver(target);
        }
    }

    createObserver(target: observeTarget) {
        const obsv = new this.MutationObserverFg(this.eventProcessor.bind(this));
        this.devMode && console.log("createObserver for " + target.name);

        obsv.observe(target.targetNode, target.config);
        this.devMode && console.log("startObserver for " + target.name);

        this.observerInstance[target.name] = obsv;
    }

    eventProcessor(mutations: MutationRecord[], mySelf?: MutationObserver) {
        mutations.forEach(e => {
            for (let triggerName in this.triggersEvent) {
                const triggerEvent = this.triggersEvent[triggerName];
                const trigger = triggerEvent.trigger;
                const codition = triggerEvent.condition;

                if (codition(e)) {
                    //通过条件测试函数之后便执行钩子函数
                    trigger(e);
                }
            }
        })
    }

    removeObserver(name: string) {
        if (this.triggersEvent?.[name] != undefined) {
            const preRemove = this.observerInstance[name];
            preRemove.disconnect()
            delete this.observerInstance[name];
            return true;
        }
        return false;
    }

    disableTrigger(name: string): boolean {
        if (this.triggersEvent?.[name] != undefined) {
            const preDisable = this.triggersEvent[name];
            delete this.triggersEvent[name];
            this.disabledTriggerEvent[name] = preDisable;
            return true;
        }
        return false;
    }

    enableTrigger(name: string): boolean {
        if (this.disabledTriggerEvent?.[name] != undefined) {
            const preEnable = this.triggersEvent[name];
            delete this.disabledTriggerEvent[name];
            this.triggersEvent[name] = preEnable;
            return true;
        }
        return false;
    }

    static watch(target: Record<string, observeTarget>, trigger: Record<string, triggerEventStruct>, devMode: boolean = false) {
        const inst = new DOMObserver(target, trigger, devMode);
        inst.init();
        return inst;
    }

    static attr(target: Element, triggerfn: (e: MutationRecord) => any, devMode: boolean = false) {
        const inst = new DOMObserver({
            "Main": {
                name: "Main",
                targetNode: target,
                config: {
                    childList: false, attributes: true, attributeOldValue: true
                }
            }
        }, {
            "Mainfn": {
                condition: (e) => {
                    return true
                },
                trigger: triggerfn
            }
        }, devMode);
        inst.init();
        return inst;
    }

}


export class DOMObserverSlim {
    target: observeTarget;
    trigger: MutationCallback;

    observerInstance: MutationObserver;
    devMode: boolean = false;
    MutationObserverFg: { new(callback: MutationCallback): MutationObserver; prototype: MutationObserver; };

    constructor(target: observeTarget, trigger: MutationCallback, devMode: boolean) {
        this.target = target;
        this.trigger = trigger;

        this.MutationObserverFg = window.MutationObserver;
        this.observerInstance = {} as MutationObserver;
        this.devMode = devMode;
        this.devMode && console.log("Init Class.")
    }

    init() {
        this.devMode && console.log("Init target: " + this.target.name)
        this.createObserver();
    }

    createObserver() {
        let obsv: MutationObserver;
        obsv = new this.MutationObserverFg(this.trigger);
        this.devMode && console.log("createObserver for " + this.target.name);

        obsv.observe(this.target.targetNode, this.target.config);
        this.devMode && console.log("startObserver for " + this.target.name);

        this.observerInstance = obsv;
    }

    static L1Cilds(target: Element, trigger: MutationCallback, devMode: boolean = false) {
        const inst = new DOMObserverSlim({
            name: "Main",
            targetNode: target,
            config: {
                childList: true, attributes: false
            }
        }, trigger, devMode)
        inst.init();
        return inst;
    }

    static allChilds(target: Element, trigger: MutationCallback, devMode: boolean = false) {
        const inst = new DOMObserverSlim({
            name: "Main",
            targetNode: target,
            config: {
                childList: true, attributes: false, subtree: true
            }
        }, trigger, devMode)
        inst.init();
        return inst;
    }

}