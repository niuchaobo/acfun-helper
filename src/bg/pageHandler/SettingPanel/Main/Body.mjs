import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { drawerApp } from "./Drawer.mjs"
import { indexApp } from "../Index/index.mjs"
import { commonApp } from "../Common/index.mjs"
import { videoApp } from "../Video/index.mjs"
import { liveApp } from "../Live/index.mjs"
import { articleApp } from "../Article/index.mjs"
import { commentApp } from "../Comment/index.mjs"
import { pagesApp } from "../Pages/index.mjs"
import { utilsApp } from "../Utils/index.mjs"

const sfcData = await importVue("pageHandler/SettingPanel/Main/Body.vue")

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    name: "bodypanel",
    template: sfcData.template,
    components: {
        drawerApp, indexApp,
        commonApp, videoApp, liveApp, articleApp, commentApp, pagesApp, utilsApp
    },
    data() {
        return {
            status: {
                "index": true, "common": false, "video": false, "live": false, "article": false, "comment": false, "pages": false, "utils": false,
            }
        }
    },
    methods: {
        changePart: function (e) {
            for (let i in this.status) {
                this.status[i] = false
            }
            this.status[e] = true;
        }
    },
    mounted: async function () {
        createElementStyle(sfcData.style, document.head, "AcFunHelperSFCstyle_Body");
        ToolBox.thisBrowser() != "Chrome" && createElementStyle(`
            .chromeOnly{
                display:none;
            }
        `.style, document.head, "AcFunHelperSFCstyle_chromeOnly");
    }
}

export const bodypanel = app