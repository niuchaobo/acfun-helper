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

    /**
     * 判断url中包含的FunctionalUrlParam的相应hash
     * @param {string} e url
     * @returns {boolean}
     */
    static hashFunctionDicGen(e) {
        return JSON.parse(/#acfunhelper=(.*)|#/.exec(decodeURI(e??globalThis.location.hash))[1]);
    }

    /**
     * 生成包含播放器跳转时间hashUrl
     * @param {undefined|string} e 时间字符串 exp:01:23
     * @returns {string}
     */
    static playerTimeJumpUrlGen(e) {
        return encodeURI(location + "#acfunhelper=" + JSON.stringify({ "jump": e }));
    }
}