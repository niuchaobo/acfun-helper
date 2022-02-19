/**
 * 异步观察目标元素与其祖先元素或顶级文档视窗交叉状态
 */
class InterSectionObserverUtil {
    constructor(target, trigger, devMode) {
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
