import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { removeExtalElem } from "../Modules/Utils.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Video/QualityStratagy.vue")).template,
    data() {
        return {

        }
    },
    methods: {
    },
    mounted: async function () {
        const conf = await ExtOptions.getValue("videoQualityStrategy");
        document.querySelector("#videoQualityStrategy").parentElement.children[1].children[1].children[Number(conf)].click();
        document.querySelector("#videoQualityStrategy").addEventListener("close.mdui.select", (e) => {
            ExtOptions.setValue("videoQualityStrategy", e.detail.inst.value);
        });
        removeExtalElem("#videoQualityStrategy")
    }
}

export const qualityStratagy = app