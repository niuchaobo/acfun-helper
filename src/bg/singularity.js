class AcFunHelperBgFrame {
    constructor() {
        /**@type {runtimeData} */
        this.runtimeData = {
            modules: [],
            /**@type {boolean} */
            devMode: false,
            options: null,
            dataset: {
                core: {
                    browserType: "",
                    status: {
                        core: false,
                        sandbox: false,
                        messageSwitch: false,
                        scheduler: false,
                        notificationButtunTrigger: false,
                    },
                    scheduler: {

                    }
                },
                /**@type {string[]} */
                notificationBtnTriggerList: [],
                /**@type {{[regString:string]:Function}} */
                notificationBtnTriggerData: {

                },
                contextMenuRegistry: {
                    menuItem: {},
                    event: {},
                },
                modulesData: {

                },
            }
        }
        /**@type {runtimeData} */
        this.runtime = globalThis.runtimeData;
        this.devMode = false;
    }
}

class AcFunHelperFgFrame {
    constructor() {
        this.runtimeData = {
            modules: [],
            /**@type {boolean} */
            devMode: false,
            options: null,
            href: null,
            dataset: {
                core: {
                    browserType: "",
                    status: {
                        core: false,
                        messageSwitch: false,
                        videoInjects: false,
                        liveInject: false,
                        xhrProxy: false,
                        authInfo: false,
                        videoSetting: false,
                        danmaku: false,
                        banana: false,
                        comments: false,
                        danmakuSearch: false,
                        download: false,
                        live: false,
                        livePageBeautify: false,
                        luckyTurntab: false,
                        pageBeautify: false,
                        readMore: false,
                        urlparams: false,
                        videoPageBeautify: false,
                        helperFgPop: false,
                        block: false,
                    }
                },
                notes: {
                    vid: -1,
                    dougaId: -1
                },
                dougaInfo: {},
                articleInfo: {},
                sessionUUID: null,
            },
            deferQueue: {}
        }
        /**@type {runtimeDataFg} */
        this.runtime = globalThis.runtimeData;
        this.devMode = false;
    }
}