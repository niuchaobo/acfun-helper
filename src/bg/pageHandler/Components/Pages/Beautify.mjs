import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Pages/Beautify.vue")).template,
    data() {
        return {
            configItems: [
                {
                    key: "Dev_indexBlurSW",
                    title: "主页顶栏模糊",
                    desc: `在主页顶栏增加模糊特效`
                },
                {
                    key: "Dev_thinScrollbar",
                    title: "小型滚动条",
                    desc: `在主站的界面中，使用类似于此设置页面的‘瘦’版滚动条`
                },
                {
                    key: "beautify_personal",
                    title: "首页顶栏个人中心信息扩展",
                    desc: `开启之后，在页面顶栏个人中心的入口处显示你的听众、香蕉、金香蕉、UID等信息（需要登录)`
                },
                {
                    key: "beautify_nav",
                    title: "首页右侧导航",
                    desc: `开启之后，在A站首页的右侧会出现分区导航条`
                },
                {
                    key: "hideAd",
                    title: "取消显示推广弹出窗",
                    desc: `取消播放器弹出的站内活动推广窗口`
                },
                {
                    key: "playerRecommendHide",
                    title: "隐藏播放器推荐宫格",
                    desc: `隐藏播放器播放完成之后的推荐宫格 （播放结束之后不能点击画面重新播放的原因就是因为原来有个推荐宫格挡住了，请点击播放按钮，而不是画面）`
                },
                {
                    key: "userCenterBeautify",
                    title: "个人中心修改样式",
                    desc: `RT`
                },
                {
                    key: "widenUCVideoList",
                    title: "个人中心宽式视频列表",
                    desc: `RTRT`
                },
                {
                    key: "userPageTimeline",
                    devFeature:true,
                    title: "个人页面稿件时间卷",
                    desc: `在个人页面的视频稿件，记录每页的时间`
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

export const beautify = app