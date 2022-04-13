import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { ucenter } from "./UCenter.mjs";
import { autoBanana } from "./AutoBanana.mjs";
import { autoHeart } from "./AutoHeart.mjs";
import { userTag } from "./UserTag.mjs";

const sfcData = await importVue("pageHandler/SettingPanel/Utils/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: sfcData.template,
    components: {
        ucenter,autoHeart,autoBanana,userTag
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
export const utilsApp = app