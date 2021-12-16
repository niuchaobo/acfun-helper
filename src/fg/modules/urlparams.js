class FunctionalUrlParam extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.params = new URL(this.runtime.href);
        this.reactors = {
            jump: e => {
                getAsyncDom(".ac-pc-comment", () => {
                    typeof (e) == 'string' && MessageSwitch.sendEventMsgToInject(window, { target: "quickJump", source: "FunctionalUrlParam", InvkSetting: { type: "function" }, params: e });
                })
            }
        }
    }

    onLoad() {
        fgConsole("FunctionalUrlParam", "onLoad", "Init FunctionalUrlParam.", 1, false);
        const hashData = decodeURI(globalThis.location.hash);
        let extFunctionalParams = null;
        if (hashData && /acfunhelper=/.test(hashData)) {
            extFunctionalParams = JSON.parse(/#acfunhelper=(.*)|#/.exec(hashData)[1]);
            console.log(extFunctionalParams)
            for (let e of Object.keys(extFunctionalParams)) {
                this.reactors[e](extFunctionalParams[e]);
            }
        }

    }

    static hashFunctionDicGen() {
        return JSON.parse(/#acfunhelper=(.*)|#/.exec(globalThis.location.hash)[1]);
    }

    static playerTimeJumpUrlGen(e) {
        return encodeURI(location + "#acfunhelper=" + JSON.stringify({ "jump": e }));
    }
}