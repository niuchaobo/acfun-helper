import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Article/MangaMode.vue")).template,
    data() {
        return {
            configItems: [
                {
                    key: "picRotate",
                    title: "图片旋转支持",
                    desc: "使文章区的漫画模式的图片能通过右上角的旋转按钮旋转"
                },
                {
                    key: "picDrag",
                    title: "图片拖动支持",
                    desc: "使文章区的漫画模式的图片能够被拖动"
                },
            ]
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: function () {
        batchOprtSwitches(this.configItems);
    }
}

export const mangaMode = app