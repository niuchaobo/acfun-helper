import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Live/DeleteMode.vue")).template,
    data() {
        return {

        }
    },
    methods: {
    },
    mounted: async function () {
        const raw = await ExtOptions.getValue("liveHideAdType");
        document.querySelector("#liveHideAdType").parentElement.children[1].children[1].children[raw].click();
        document.querySelector("#liveHideAdType").addEventListener("close.mdui.select", (e) => {
            ExtOptions.setValue("liveHideAdType", e.detail.inst.value);
        });
    }
}

export const delmode = app