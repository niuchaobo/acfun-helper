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
        chrome.notifications.getPermissionLevel(e => {
            if (e != "granted") {
                mdui.snackbar({
                    message: `您没有允许助手的通知权限，有些功能可能不会生效。`,
                    position: 'right-top',
                    timeout: 5000,
                });
            }
        })
        mdui.snackbar({
            message: '🍭🥳欢迎使用我们新的控制面板',
            position: 'left-bottom',
            timeout: 0,
            buttonText: "不习惯？",
            onButtonClick: function () {
                setTimeout(() => {
                    mdui.alert("哈哈哈，其实旧的控制面板已经删了，但人总会是要新的人生阶段的，现在能让我们一起携手去看新的星星吗？(〃∀〃)", () => {
                        mdui.snackbar({
                            message: "欢迎来到新的世界！🥳🥳"
                        })
                    }, {
                        confirmText: "可不许拒绝",
                        modal: true,
                        closeOnEsc: false
                    })
                }, 1210);
            }
        });
    }
}

export const drawerApp = ListAppData