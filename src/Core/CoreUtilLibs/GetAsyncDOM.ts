export class GetAsyncDOM {
    index: number;
    iterLimit: number;
    /** 目标DOM对象 */
    target: string;
    /** 目标DOM对象需要达成的某种目标，此处可以执行函数来判断 */
    purpose: string | ((e: boolean | HTMLElement | HTMLCollection, f: any) => boolean);
    /** 实例化之后this.purpose的容器 */
    condition: boolean | ((e: boolean | HTMLElement | HTMLCollection, f: any) => boolean);
    /** 钩子 */
    fn: (e?: any) => any;
    /** 单次探测的时间 */
    time: number;
    instantMode: boolean;
    /** 探测超时时间 */
    maxWaitTime: number;
    /** 未探测到之后执行的钩子 */
    insure: (e?: any) => any | undefined;
    probeTimeHandler: number;
    devMode: boolean;
    /** 自定义的对象获取方式 */
    advancedQueryMethod: boolean | (() => any);
    /** 交给this.purpose函数的额外参数 */
    extraParam: string | object | any[];

    /**
     * GetAsyncDOM Class Version!
     * @description 监听DOM对象 模块版本!
     */
    constructor(target: string, fn: (e?: any) => {}, time: number = 2500, devMode: boolean = false, insure: (e?: any) => any, purpose: string | ((e: boolean | HTMLElement | HTMLCollection, f: any) => boolean) = "exist", instantMode: boolean = true, maxWaitTime: number = 30000, advancedQueryMethod: boolean | (() => any) = false, extraParam: string | Array<any> | object = "") {
        this.index = 0;
        this.iterLimit = 0;

        this.target = target;
        this.purpose = purpose;
        this.condition = true;
        this.fn = typeof (fn) === 'function' ? fn : this.causeError('fn');
        this.time = time;
        this.instantMode = instantMode;
        this.maxWaitTime = maxWaitTime
        this.insure = insure;
        this.probeTimeHandler = 0;
        this.devMode = devMode;
        this.advancedQueryMethod = advancedQueryMethod;
        this.extraParam = extraParam;

        this.onLoad();
    }

    onLoad() {
        /** 计算尝试次数 */
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

    causeError(e: any) {
        switch (e) {
            case "fn":
                console.log("", "GetAsyncDOMUtil", `Please check callback function is a true functin.`, 1);
                break;
            default:
                console.log("", "GetAsyncDOMUtil", `Some error caused.`, 1);
                break;
        }
        return function () { }
    }

    async probe() {
        this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: 开始探测 ${this.target}。`);
        const re = (fn: ((e: any) => {}), insure: (e?: any) => any | undefined) => {
            return new Promise(resolve => {
                let hasJqueryLib = false;
                //检测JQuery的支持，解决没有引入JQuery下出现的问题
                try {
                    hasJqueryLib = ($ != undefined);
                } catch (error) {
                    hasJqueryLib = false;
                }
                this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: ${hasJqueryLib ? "" : "不"}存在JqueryLib.`);
                //DOM探测
                const targetDom = typeof (this.advancedQueryMethod) == "function" ? this.advancedQueryMethod() : ((hasJqueryLib && $(`${this.target}`).length) || document.querySelector(this.target));
                this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: 第${this.index}次探测时targetDom: `, targetDom);
                let response;
                let isGotDom = Boolean(targetDom);
                //DOM要求 - domMeetCondition是执行函数，所以更加灵活
                let domMeetCondition = typeof (this.condition) == 'function' ? response = this.condition(targetDom, this.extraParam) : this.condition;
                this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: 第${this.index}次探测时domMeetCondition: ${domMeetCondition}`);
                if (isGotDom && domMeetCondition) {
                    this.index = 0;
                    this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: ${this.target}完成。`, targetDom);
                    resolve(fn(response));
                } else {
                    if (this.index > this.iterLimit) {
                        this.index = 0;
                        this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: 没符合条件 ${this.target} 。`);
                        resolve(insure == undefined ? false : insure());
                        return;
                    };
                    this.index++;
                    this.probeTimeHandler = setTimeout(() => {
                        this.instantMode ? "" : this.time += 500;
                        this.devMode && console.log(`[LOG]UtilsBundle > GetAsyncDOM: 准备${this.target}的 - 第${this.index}次。`);
                        resolve(re(this.fn, this.insure));
                    }, this.time);
                }
            })
        }
        return await re(this.fn, this.insure);
    }

    /**
     * 模仿莫老板写的GetAsyncDOM，大概原汁原味？
     * @example GetAsyncDOM.Get(".ac-comment-list",function(){ console.log("2333") })
     */
    static Get(target: string, fn: (e?: any) => any, time: number = 2500, isDev: boolean = false): GetAsyncDOM {
        const inst = new GetAsyncDOM(target, fn, time, isDev, () => { });
        inst.probe();
        return inst;
    }
}
