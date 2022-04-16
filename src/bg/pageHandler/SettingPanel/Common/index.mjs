import { confOprt } from "./ConfigOprt.mjs";
import { msgNotif } from "./MessageNotification.mjs";
import { advConf } from "./AdvanceConfig.mjs"
import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { confsync } from "./ConfigSync.mjs";

const sfcData = await importVue("pageHandler/SettingPanel/Common/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template:sfcData.template,
    components: {
        confOprt,
        msgNotif,
        advConf,confsync,
    },
    data() {
        return {

        }
    },
    methods: {
        
    },
    mounted: async function () {

    }
}
export const commonApp = app