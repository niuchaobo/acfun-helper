import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Video/FlexProgressBarStyle.vue")).template,
    data() {
        return {
            barColor: null,
            barHeight: null,
            loadedColor: null,
            loadedHeight: null,
            innerBarColor: null,
            innerBarHeight: null,
            innerBarLoadColor: null,
            innerBarLoadHeight: null,
        }
    },
    methods: {
        saveConf: async function (e) {
            const raw = await ExtOptions.getValue("ProgressBarStyle");
            [
                "barColor",
                "barHeight",
                "loadedColor",
                "loadedHeight",
                "innerBarColor",
                "innerBarHeight",
                "innerBarLoadColor",
                "innerBarLoadHeight",
            ].forEach(e => {
                raw[e] = document.querySelector("#" + e).value;
            })
            ExtOptions.setValue("ProgressBarStyle", raw);
        }
    },
    mounted: async function () {
        const raw = await ExtOptions.getValue("ProgressBarStyle");
        [
            "barColor",
            "barHeight",
            "loadedColor",
            "loadedHeight",
            "innerBarColor",
            "innerBarHeight",
            "innerBarLoadColor",
            "innerBarLoadHeight",
    ].forEach(e => {
            document.querySelector("#" + e).value = raw[e];
        })
    }
}

export const fpBarstyle = app