import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Utils/Ucenter.vue")).template,
    data() {
        return {
            configItems: [
                {
                    key: "userBatchManage",
                    title: "批量操作关注Up",
                    desc: `在<a href="https://www.acfun.cn/member/feeds/following"
                    target="_blank">个人中心</a>关注的Up条目空白处点击，出现紫色边框之后选定，可以点击批量取关，或者切换到目的分组之后点击批量移动分组将Up移动到所在分组`
                },
                {
                    key: "userTagRender",
                    title: "显示用户标记",
                    desc: `在用户个人界面显示你给用户打上的标记`
                },

            ]
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: function () {
        batchOprtSwitches(this.configItems);
    }
}

export const ucenter = app