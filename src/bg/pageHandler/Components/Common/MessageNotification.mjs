import { importVue } from "../../../../../common/modulesLib/SFCUtil.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Common/MessageNotification.vue")).template,
    data() {
        return {
            frontendRequire: true,
        }
    },
    methods: {
        switchHandler: async function (e) {
            /**@type {HTMLElement} */
            let target = e.target;
            let raw = await ExtOptions.getValue("notificationContent")
            raw[target.id] = !raw[target.id]
            ExtOptions.setValue("notificationContent", raw)
        }
    },
    mounted: async function () {
        this.frontendRequire = !(await ExtOptions.getValue("timer4Unread_daemonsw"));
        start()
    }
}

async function start() {
    let raw = await ExtOptions.getValue("notificationContent")
    for (let i in raw) {
        document.querySelector("#" + i).checked = raw[i];
    }
}

export const msgNotif = app