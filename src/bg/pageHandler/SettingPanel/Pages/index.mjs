import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { beautify } from "./Beautify.mjs";
const sfcData = await importVue("pageHandler/SettingPanel/Pages/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template:sfcData.template,
    components:{
        beautify
    },
    data() {
        return {
            clickNum: 0
        }
    },
    methods: {
        devMode: function () {
            this.clickNum >= 6 ? (globalThis.devMode = true) : ""
            return this.clickNum++;
        }
    },
    mounted:function(){
        mdui.mutation("div.mdui-panel");
    }
}
export const pagesApp = app