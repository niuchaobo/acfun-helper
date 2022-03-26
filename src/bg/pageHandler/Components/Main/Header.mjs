import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Main/Header.vue")).template,
    data() {
        return {

        }
    },
    methods: {
    },
    mounted: async function () {
    }
}

export const headerpanel = app