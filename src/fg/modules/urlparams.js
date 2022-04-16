class FunctionalUrlParam extends AcFunHelperFgFrame {
    constructor() {
        super();
        this.params = new URL(this.runtime.href);
        this.reactors = {
            jump: e => {
                GetAsyncDomUtil.getAsyncDomClassic(".ac-pc-comment", () => {
                    typeof (e) == 'string' && MessageSwitch.sendEventMsgToInject(window, { target: "VideoInject", source: "FunctionalUrlParam", InvkSetting: { type: "method" }, params: { target: "quickJump", params: e } });
                })
            }
        }
    }

    onLoad() {
        fgConsole("FunctionalUrlParam", "onLoad", "Init FunctionalUrlParam.", 1, false);
        const hashData = decodeURI(globalThis.location.hash);
        let extFunctionalParams = null;
        if (hashData && /acfunhelper=/.test(hashData)) {
            extFunctionalParams = FunctionalUrlParam.parse(hashData)
            for (let e of Object.keys(extFunctionalParams)) {
                this.reactors[e](extFunctionalParams[e]);
            }
        }

    }

    static parse(e) {
        const testResult = /acfunhelper=(.*)\#|acfunhelper=(.*)/.exec(e);
        return JSON.parse(testResult[1] ?? testResult[2]);
    }

    /**
     * 解析url中包含的FunctionalUrlParam的相应hash
     * @param {string} e url
     * @returns {boolean}
     */
    static hashFunctionDicGen(e) {
        return FunctionalUrlParam.parse(e ?? globalThis.location.href);
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