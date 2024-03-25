import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs";
import * as Vue from "../../../../lib/vue.esm-browser.prod.js"

const ListTemp = await importVue("pageHandler/SettingPanel/Main/Drawer.vue")

/**@type {import("../../../declares/Vue/VueRuntimeCore").Component} */
const ListAppData = {
    template: ListTemp.template,
    data() {
        return {
            constantHandler: null,
        }
    },
    methods: {
        renderConsts: async function (e, appdata) {
            const { template } = e;
            appdata.template = template;
            /**@type {import("../../../declares/Vue/VueRuntimeCore").App} */
            this.constantHandler = Vue.createApp(appdata);
            this.constantHandler.mount("#constant");
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
            const indexTemp = await importVue("pageHandler/SettingPanel/Modules/ColorTheme.vue");
            const app = await import("../Modules/ColorTheme.mjs");
            this.renderConsts(indexTemp, app.default)
        },
    },
    mounted: function () {
        this.addThemePanel();
        chrome.notifications.getPermissionLevel && chrome.notifications?.getPermissionLevel(e => {
            if (e != "granted") {
                mdui.snackbar({
                    message: `您没有允许助手的通知权限，有些功能可能不会生效。`,
                    position: 'right-top',
                    timeout: 5000,
                });
            }
        })
    }
}

export const drawerApp = ListAppData