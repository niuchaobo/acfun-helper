import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";
import { fpBarstyle } from "./FlexProgressBarStyle.mjs"
import { defaultMode } from "./DefaultMode.mjs";
import { qualityStratagy } from "./QualityStratagy.mjs";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/Components/Video/Player.vue")).template,
    components: {
        fpBarstyle, defaultMode, qualityStratagy
    },
    data() {
        return {
            configItems: [
                {
                    key: "ProgressBarsw",
                    fpBarstyle: true,
                    title: "全局播放器进度条",
                    desc: "在页面和网页全屏时增加一个进度条，以提示当前播放进度"
                },
                {
                    key: "customRate",
                    title: "自定义倍速",
                    defaultMode: true,
                    qualityStratagy: true,
                    desc: "在视频倍速栏增加自定义倍速功能"
                },
                {
                    key: "autoJumpLastWatchSw",
                    title: "跳转到上次观看的时间",
                    desc: "进入页面，自动跳转到上次观看到，并且播放器记录到了的时间点"
                },
                {
                    key: "ABPlaysw",
                    title: "AB回放",
                    desc: "以在播放器中指定AB两个时间点，令播放器在这两点中循环播放"
                },
                {
                    key: "PlaybackRateKeysw",
                    title: "倍速切换快捷键",
                    desc: "在播放器具有焦点的时候可以按Shift+↑↓键调整播放速率"
                },
                {
                    key: "PictureInPictureModeUI",
                    title: "画中画模式",
                    desc: "在观影模式按钮左侧添加进入画中画模式的按钮"
                },
                {
                    key: "frameStepSetting-enabled",
                    split: true,
                    title: "帧步进",
                    desc: "在视频页面，使用Shift+A or Shift+D来一帧一帧地调整视频进度"
                },
                {
                    key: "frameStepSetting-controlUI",
                    title: "帧步进菜单",
                    desc: "在播放器中添加一个菜单，用以控制视频以一帧一帧前进后退。（首先要打开视频帧步进开关）"
                },
                {
                    key: "audioGain",
                    split: true,
                    title: "播放器倍率音量放大",
                    desc: "在视频播放器设置中增加一个开关，以便于将音量放大超过100%"
                },
                {
                    key: "videoMediaSession",
                    title: "视频播放器 MediaSession支持",
                    notSupport: true,
                    desc: "给视频投稿增加MediaSession支持，以便方便地使用媒体按键（Fn+Xzzx之类的按键，具体请看厂商的介绍）控制播放器"
                },
                {
                    key: "endedAutoJumpRecommandFirstDougasw",
                    title: "自动续播",
                    desc: "观看完当前视频投稿之后，立即跳转到“大家都在看”第二个稿件"
                },
                {
                    key: "autoOpenVideoDescsw",
                    title: "展开视频简介",
                    desc: "自动在视频投稿中展开视频简介栏目"
                },
                {
                    key: "videoAchievement",
                    title: "排行榜历史成就记录",
                    desc: "记录打开过的视频稿件排行榜（日榜排名）信息，并在以后打开的页面中提示"
                },
                {
                    key: "endedAutoExitFullscreensw",
                    title: "结束退出全屏",
                    split: true,
                    desc: "在全屏（观影模式和网页全屏）下，视频结束时退出全屏模式（并且没有开启洗脑循环）"
                },
                {
                    key: "endedAutoToCommentArea",
                    title: "结束滚动到评论区",
                    desc: "视频结束时退出全屏模式然后滚动到评论区"
                },
                {
                    key: "sleepPause-defaultMode",
                    title: "后台自动暂停",
                    split: true,
                    desc: "当标签页在后台时，将视频暂停"
                },
                {
                    key: "sleepPause-UI",
                    title: "后台自动暂停-UI",
                    desc: "RT"
                },
                {
                    key: "wheelToChangeVolume",
                    title: "鼠标滚动音量调整",
                    split: true,
                    desc: "鼠标悬停在音量图标上，滚动改变音量"
                },
                {
                    key: "FilmModeExclusionsw",
                    title: "观影模式关灯适配暗色",
                    desc: "在进入观影模式时，匹配页面暗色模式（部分元素使用反色，若不适应请关闭此选项）"
                },
                {
                    key: "PlayerTimeCommentEasyJump",
                    title: "格式化评论区时间点跳转",
                    desc: `将评论区中的时间（MM:ss或者
                    X分X秒、npX分X秒）转化为链接，点击时向播放器发送跳转指令，跳转至目的时间。<br>测试地址：<a href="https://www.acfun.cn/v/ac4919284#ncid=232956340" target="blank">[司鼓君-【2019猴山春晚/原创国风电音】燃灯挂霓虹 ft.小勒个朵]</a>`,
                },
                {
                    key: "easySearchScanForPlayerTimesw",
                    title: "选中时间使用快捷键使播放器快速跳转",
                    desc: `选中评论中的数字（此功能针对类似于：“102秒”的评论），然后按下快捷键(Shift+A)快速跳转至目的秒数。`,
                },
                {
                    key: "",
                    title: "时间轴章节",
                    desc: `选中评论中的带有时间标记和内容文本右键执行“在时间轴上添加这些章节标记”之后，将会在时间轴上添加对应的点（将鼠标指针移动其上可查看其描述），以标记其对应的内容。<br>测试地址：<a href="https://www.acfun.cn/v/ac24325439_2" target="blank">[2021年Ac春晚]</a>`
                },
            ]
        }
    },
    methods: {
        switchHandler: panelSwitchesHandler
    },
    mounted: function () {
        batchOprtSwitches(this.configItems).then(() => {
            document.querySelector("#videoMediaSession").disabled = !("mediaSession" in navigator)
        })
    }
}

export const playerenc = app