import { importVue } from "../../../../common/modulesLib/SFCUtil.mjs"
import { batchOprtSwitches, panelSwitchesHandler } from "../../pagehandlerLibs.js";

/**@type {import("../../../../../declares/Vue/VueRuntimeCore").Component} */
const app = {
    template: (await importVue("pageHandler/SettingPanel/Video/Danmaku.vue")).template,
    data() {
        return {
            configItems: [
                {
                    key: "PlayerDamakuSearchSw",
                    title: "弹幕搜索 & 自动跳转",
                    desc: "在弹幕列表中搜索相应弹幕内容并跳转到弹幕所在时间"
                },
                {
                    key: "danmuSearchListToUsersw",
                    title: "弹幕列表发送用户跳转",
                    desc: "可以在弹幕列表中的弹幕条目的操作菜单按钮旁加入一个(⌂ 像房子一样)按钮快速跳转至发送用户页面"
                },
                {
                    key: "danmakuSmartFilter-enabled",
                    title: "弹幕智能过滤",
                    split: true,
                    desc: "自动屏蔽低俗、重复、刷屏、无效弹幕"
                },
                {
                    key: "danmakuSmartFilter-filterVulgar",
                    title: "低俗弹幕过滤",
                    desc: "自动屏蔽包含低俗词汇的弹幕"
                },
                {
                    key: "danmakuSmartFilter-filterRepeat",
                    title: "重复弹幕过滤",
                    desc: "自动屏蔽重复发送的相同内容弹幕"
                },
                {
                    key: "danmakuSmartFilter-filterSpam",
                    title: "刷屏弹幕过滤",
                    desc: "自动屏蔽短时间内同一用户发送的大量弹幕"
                },
                {
                    key: "danmakuSmartFilter-filterInvalid",
                    title: "无效弹幕过滤",
                    desc: "自动屏蔽无意义的符号、重复字符等无效弹幕"
                },
                {
                    key: "danmakuBeautify-enabled",
                    title: "弹幕美化",
                    split: true,
                    desc: "自定义弹幕字体、透明度、显示样式"
                },
                {
                    key: "danmakuBeautify-shadowEnabled",
                    title: "弹幕阴影效果",
                    desc: "为弹幕添加阴影效果，提升可读性"
                },
                {
                    key: "danmakuBeautify-strokeEnabled",
                    title: "弹幕描边效果",
                    desc: "为弹幕添加描边效果"
                },
                {
                    key: "danmakuCustomBlock-enabled",
                    title: "自定义弹幕屏蔽",
                    split: true,
                    desc: "手动添加屏蔽关键词，屏蔽包含这些关键词的弹幕"
                },
                {
                    key: "hideDanmakuOperator-defaultMode",
                    title: "隐藏弹幕操作菜单",
                    split: true,
                    desc: "隐藏鼠标放在弹幕上出现的快捷操作菜单"
                },
                {
                    key: "hideDanmakuOperator-UI",
                    title: "隐藏弹幕操作菜单-UI",
                    desc: "在播放器的设置开关页面增加此功能的快捷设置开关"
                },
                {
                    key: "hideDanmakuOperator-maskSw",
                    title: "隐藏弹幕操作菜单-遮罩隔离弹幕",
                    desc: "在播放器上增加一层遮罩，防止鼠标接触到弹幕使其暂停滚动（这样会使得点击画面暂停失效）"
                },
                {
                    key: "videoRememberLastSend",
                    split: true,
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
    }
}

export const danmakuenc = app