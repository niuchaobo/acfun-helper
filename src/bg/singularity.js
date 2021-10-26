class AcFunHelperBackend {
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
    }
}