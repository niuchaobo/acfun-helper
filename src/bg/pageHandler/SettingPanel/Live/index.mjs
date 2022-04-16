import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import { removeExtalElem } from "../../pagehandlerLibs.js";
import { liveIndex } from "./LiveIndex.mjs"
import { lives } from "./Lives.mjs";
import { noticeUser } from "./NoticeUser.mjs";

const sfcData = await importVue("pageHandler/SettingPanel/Live/index.vue");

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template:sfcData.template,
    components: {
        liveIndex,
        lives,noticeUser
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted: function () {
        mdui.mutation("div#liveIndex");
        removeExtalElem("#liveplayer_mode")
        removeExtalElem("#liveHideAdType")
    },
}
export const liveApp = app;
