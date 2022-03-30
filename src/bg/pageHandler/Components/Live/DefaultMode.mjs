import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Live/DefaultMode.vue")).template,
    data() {
        return {

        }
    },
    methods: {
    },
    mounted: async function () {
        const liveplayer_mode = await ExtOptions.getValue("liveplayer_mode");
        const liveplayer_modeIndex = ["default", "webfull", "film", "wide"].indexOf(liveplayer_mode);
        document.querySelector("#liveplayer_mode").parentElement.children[1].children[1].children[liveplayer_modeIndex].click();
        document.querySelector("#liveplayer_mode").addEventListener("close.mdui.select", (e) => {
            console.log(e.detail.inst)
            ExtOptions.setValue("liveplayer_mode", e.detail.inst.value);
        });
    }
}

export const defaultMode = app