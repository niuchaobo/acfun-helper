import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { removeExtalElem } from "../../pagehandlerLibs.js";


/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Video/DefaultMode.vue")).template,
    data() {
        return {

        }
    },
    methods: {
    },
    mounted: async function () {
        const player_mode = await ExtOptions.getValue("player_mode");
        const player_modeIndex = ["default", "film", "web"].indexOf(player_mode);
        document.querySelector("#player_mode").parentElement.children[1].children[1].children[player_modeIndex].click();
        document.querySelector("#player_mode").addEventListener("close.mdui.select", (e) => {
            ExtOptions.setValue("player_mode", e.detail.inst.value);
        });
        removeExtalElem("#player_mode")
    }
}

export const defaultMode = app