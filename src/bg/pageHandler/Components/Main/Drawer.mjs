import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import * as Vue from "../../../../lib/vue.esm-browser.prod.js"

const ListTemp = await importVue("pageHandler/Components/Main/Drawer.vue")

/**@type {import("../../../declares/Vue/VueRuntimeCore").Component} */
const ListAppData = {
    template: ListTemp.template,
    data() {
        return {
            renderHandler: null,
            constantHandler: null,
        }
    },
    methods: {
        renderComp: async function (e, appdata) {
            const { template } = e;
            appdata.template = template;
            /**@type {import("../../../declares/Vue/VueRuntimeCore").App} */
            this.renderHandler = Vue.createApp(appdata);
            this.renderHandler.mount("#main");
        },
        renderConsts: async function (e, appdata) {
            const { template } = e;
            appdata.template = template;
            /**@type {import("../../../declares/Vue/VueRuntimeCore").App} */
            this.constantHandler = Vue.createApp(appdata);
            this.constantHandler.mount("#constant");
        },
        unRender: async function () {
            this.renderHandler?.unmount();
        },
        showIndex: async function () {
            this.$emit("changePart", "index")
        },
        showCommon: async function () {
            this.$emit("changePart", "common")
        },
        showVideo: async function () {
            this.$emit("changePart", "video")
        },
        showLive: async function () {
            this.$emit("changePart", "live")
        },
        showArticle: async function () {
            this.$emit("changePart", "article")
        },
        showComment: async function () {
            this.$emit("changePart", "comment")
        },
        showPages: async function () {
            this.$emit("changePart", "pages")
        },
        showUtils: async function () {
            this.$emit("changePart", "utils")
        },
        addThemePanel: async function () {
            const indexTemp = await importVue("pageHandler/Components/Modules/ColorTheme.vue");
            const app = await import("../Modules/ColorTheme.mjs");
            this.renderConsts(indexTemp, app.default)
        },
    },
    mounted: function () {
        this.addThemePanel();
    }
}

export const drawerApp = ListAppData