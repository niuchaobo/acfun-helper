import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";
import { delmode } from "./DeleteMode.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Live/LiveIndex.vue")).template,
    components: {
        delmode
    },
    data() {
        return {
            configItems: [
                {
                    key: "liveHideAd",
                    playerdelMode: true,
                    title: "阻止自动播放 或 删除 直播页播放器",
                    desc: "吓人的大电视"
                },
                {
                    key: "liveHideAdMute",
                    title: "阻止自动播放时并自动静音",
                    desc: "不打扰（但是会影响到之后打开的页面都自动静音）"
                },
                {
                    key: "liveIndexRankNum",
                    title: "列表数量标号",
                    split: true,
                    desc: "为直播站主页的各个直播列表加入数量标记，以便于统计之类的工作"
                },
            ]
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: function () {
        batchOprtSwitches(this.configItems);
    },
    unmounted:function(){
    }
}

export const liveIndex = app