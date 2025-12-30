import { computed, DefineComponent } from 'vue';

import abplay from './abplay.vue';
import bgTabSleep from './bgTabSleep.vue';
import pip from './pip.vue';
import flexProgressbar from './flexProgressbar.vue';
import customPlayRate from './customPlayRate.vue';
import videoMediaSession from './videoMediaSession.vue';
import frameStepForward from './frameStepForward.vue';
import playerMode from './playerMode.vue';
import qualitySelect from './qualitySelect.vue';
import timeline from './timeline.vue';

export interface ComponentMapStruct {
    ui: DefineComponent;
    name: string;
    description?: string;
}

// abplay, bgTabSleep, pip, flexProgressbar, customPlayRate, videoMediaSession, frameStepForward, playerMode, qualitySelect, timeline,
export const componentmap = {
    "abplay": {
        ui: abplay,
        name: "AB回放"
    },
    "bgTabSleep": {
        ui: bgTabSleep,
        name: "切换标签页暂停视频"
    },
    "pip": {
        ui: pip,
        name: "画中画"
    },
    "flexProgressbar": {
        ui: flexProgressbar,
        name: "常驻底栏进度条"
    },
    "customPlayRate": {
        ui: customPlayRate,
        name: "自定义倍速"
    },
    "videoMediaSession": {
        ui: videoMediaSession,
        name: "MediaSession支持"
    },
    "frameStepForward": {
        ui: frameStepForward,
        name: "逐帧步进"
    },
    "playerMode": {
        ui: playerMode,
        name: "播放器默认模式"
    },
    "qualitySelect": {
        ui: qualitySelect,
        name: "默认清晰度"
    },
    "timeline": {
        ui: timeline,
        name: "时间轴章节"
    }
} as unknown as Record<string, ComponentMapStruct>
