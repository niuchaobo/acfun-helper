import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";
import { defaultMode } from "./DefaultMode.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Live/Lives.vue")).template,
    components: {
        defaultMode
    },
    data() {
        return {
            noMediaSessionSupport: false,
            configItems: [
                {
                    key: "livePlayerEnhc",
                    title: "宽屏模式和弹幕屏蔽、独立弹幕窗",
                    desc: "为直播页播放器和弹幕列表增加宽屏模式，并允许按类型屏蔽弹幕信息，并添加独立弹幕窗口按钮"
                },
                {
                    key: "liveCommentTimeTag",
                    title: "弹幕时间信息",
                    defaultMode: true,
                    desc: "为直播页弹幕列表内容增加显示时间"
                },
                {
                    key: "LiveUserFocus",
                    title: "评论弹幕标记",
                    desc: "点击用户（评论弹幕）弹出用户框时，标记此条弹幕之前的所有此用户的评论弹幕（打开完记得关）"
                },
                {
                    key: "liveMediaSession",
                    title: "Windows MediaSession支持",
                    notSupport: true,
                    desc: "对于支持MediaSession的浏览器，通过此API提供给操作系统更多的信息"
                },
                {
                    key: "liveVolumeMild",
                    title: "后台将直播音量降低",
                    desc: "将在后台的直播标签页的播放器音量降低至四分之一"
                },
                {
                    key: "wheelToChangeVolume",
                    title: "鼠标滚动音量调整",
                    desc: "鼠标悬停在音量图标上，滚动改变音量"
                },
                {
                    key: "liveRememberLastSend",
                    title: "记住上次发送弹幕内容",
                    desc: "在弹幕发送栏输入过内容并发送之后，会记住你上次输入过的内容，在空白的发送栏按 ↑ 键即可粘贴上次发送的弹幕内容。"
                },
            ]
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: function () {
        batchOprtSwitches(this.configItems);
        document.querySelector("#liveMediaSession").disabled = !("mediaSession" in navigator)
    }
}

export const lives = app