import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";
import { acidFlyout } from "./AcidFlyout.mjs";
/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Comment/TagSwitches.vue")).template,
    components: {
        acidFlyout
    },
    data() {
        return {
            acidFlyout: false,
            configItems: [
                {
                    key: "commentPageEasyTrans",
                    title: "评论区快捷翻页",
                    desc: "在页面右下角工具栏添加快捷按钮进行翻页"
                },
                {
                    key: "uddPopUp",
                    title: "ac号信息弹框",
                    acidFlyout: true,
                    desc: "指针悬停在评论区的ac号上时，获取视频投稿信息"
                },
                {
                    key: "upHighlight",
                    title: "Up主标记",
                    desc: "在评论区标记Up主"
                },
                {
                    key: "StaffMark",
                    title: "Staff标记",
                    desc: "合作稿件中，在评论区标记Staff"
                },
                {
                    key: "mark",
                    title: "用户标记按钮",
                    desc: "在评论的菜单里面增加标记按钮"
                },
                {
                    key: "scan",
                    title: "用户扫描",
                    desc: "扫描评论并标记用户"
                },
                {
                    key: "quickCommentSubmit",
                    split: true,
                    title: "快捷键发送评论",
                    desc: "使用Ctrl+Enter来发送评论"
                },
            ]
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: function () {
        batchOprtSwitches(this.configItems).then(async () => {
            this.acidFlyout = await ExtOptions.getValue("uddPopUp");
        })
        document.querySelector("#uddPopUp")?.addEventListener("click", async () => {
            this.acidFlyout = document.querySelector("#uddPopUp").checked;
        })
    },
}

export const tagswitches = app