import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { tagswitches } from "./TagSwitches.mjs";
import { banuserIncomment } from "./BanUserInComment.mjs";

const sfcData = await importVue("pageHandler/SettingPanel/Comment/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template:sfcData.template,
    components: {
        tagswitches,banuserIncomment
    },
    data() {
        return {
        }
    },
    mounted: function () {
        mdui.mutation("div#tagswitches");
    }
}
export const commentApp = app