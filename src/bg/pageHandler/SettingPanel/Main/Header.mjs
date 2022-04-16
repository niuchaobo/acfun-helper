import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

const sfcData = await importVue("pageHandler/SettingPanel/Main/Header.vue")

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: sfcData.template,
    data() {
        return {

        }
    },
    methods: {
    },
    mounted: async function () {
        createElementStyle(sfcData.style, document.head, "AcFunHelperSFCstyle_devFeature");
    }
}

export const headerpanel = app