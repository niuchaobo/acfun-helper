import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { tagswitches } from "./TagSwitches.mjs";

const sfcData = await importVue("pageHandler/Components/Comment/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template:sfcData.template,
    components: {
        tagswitches
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