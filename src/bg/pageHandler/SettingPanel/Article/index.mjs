import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { mangaMode } from "./MangaMode.mjs";
import { banuserInpart } from "./BanUserInPart.mjs";

const sfcData = await importVue("pageHandler/SettingPanel/Article/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    components: {
        mangaMode,banuserInpart
    },
    template:sfcData.template,
    data() {
        return {

        }
    },
    methods: {

    },
    mounted: function () {
        mdui.mutation("div#mangaMode");
    }
}
export const articleApp = app