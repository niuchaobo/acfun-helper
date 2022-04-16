import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { panelSwitchesHandler } from "../../pagehandlerLibs.js";
import { removeExtalElem } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Comment/AcidFlyout.vue")).template,
    data() {
        return {
            a:1
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: async function () {
        new mdui.Select("#uddPopUptype");
        const raw = await ExtOptions.getValue("uddPopUptype");
        document.querySelector("#uddPopUptype").children[raw].click();
        document.querySelector("#uddPopUptype").addEventListener("close.mdui.select", (e) => {
            ExtOptions.setValue("uddPopUptype", e.detail.inst.value);
        });
        removeExtalElem("#uddPopUptype")
    },
}

export const acidFlyout = app