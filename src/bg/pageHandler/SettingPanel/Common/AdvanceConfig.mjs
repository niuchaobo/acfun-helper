import { importVue } from "../../../../../common/modulesLib/SFCUtil.mjs";
import { batchOprtSwitches } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Common/AdvanceConfig.vue")).template,
    data() {
        return {
            fgitems: [
                {
                    key: "krnl_videossEarly",
                    title: "提前加载助手前台视频播放器模块",
                    desc: "可能提升网络慢或者计算机性能低情况下的使用体验"
                },
                {
                    key: "xhrDrv",
                    title: "请求管理",
                    chromeOnly: true,
                    desc: "允许助手管理前台请求，以支持例如评论区用户过滤、文章区过滤等功能"
                },
            ],
            bgitems: [
                {
                    key: "timer4Unread_daemonsw",
                    title: "未读计数消息轮询",
                    desc: "定时拉取未读的消息计数信息"
                },
                {
                    key: "fetchPushList_daemonsw",
                    title: "稿件推送消息轮询",
                    desc: "定时拉取主站稿件动态，并且可在Popup使用拉取的消息加速"
                },
                {
                    key: "krnl_globalTimer",
                    title: "全局定时器",
                    desc: "用于控制插件版本信息、番剧等信息获取"
                },
            ],
            popitems: [
                {
                    key: "LiveWatchTimeRec_popup",
                    title: "直播观看计时",
                    desc: "记录直播页面观看时长，以显示在Popup中。"
                },
                {
                    key: "custom_css",
                    title: "自定义助手Popup弹出窗口样式",
                    desc: "记录直播页面观看时长，以显示在Popup中。"
                },
            ],
            customPopupStyle: false,
        }
    },
    methods: {
        switchHandler: async function (e) {
            /**@type {HTMLElement} */
            let target = e.target;
            let raw = await ExtOptions.getValue(target.id)
            ExtOptions.setValue(target.id, !raw);
            if (target.id == "custom_css") {
                this.customPopupStyle = !raw;
            }
        }
    },
    mounted: async function () {
        this.customPopupStyle = await ExtOptions.getValue("custom_css");

        batchOprtSwitches(this.fgitems.concat(this.bgitems, this.popitems))
    }
}

export const advConf = app