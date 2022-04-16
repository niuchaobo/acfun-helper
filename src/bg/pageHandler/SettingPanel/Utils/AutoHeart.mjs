import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { panelSwitchesHandler } from "../../pagehandlerLibs.js"
import { batchOprtSwitches } from "../../pagehandlerLibs.js";
import { removeExtalElem } from "../../pagehandlerLibs.js";
import { panelSelectsHandler } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Utils/AutoHeart.vue")).template,
    data() {
        return {
            raw: {},
            memberNum: 0,
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler,

    },
    mounted: async function () {
        removeExtalElem("#LikeHeartClass", 1)
        batchOprtSwitches([
            { key: "LikeHeart" },
            { key: "LikeHeartNotif" },
        ]);
        panelSelectsHandler("LikeHeartClass", ["0", "1", "2"])
        document.querySelector("#LikeHeartClass").addEventListener("close.mdui.select", (e) => {
            ExtOptions.setValue("LikeHeartClass", e.detail.inst.value);
        });

    }
}

export const autoHeart = app