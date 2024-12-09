<template>
    <mdui-card class="PushItem" :href="dougaInfo.shareUrl" target="_blank" style="width: 150px;"
        @mouseenter="handleMouse(true)" @mouseleave="handleMouse(false)">
        <article>
            <mdui-tooltip open-delay="1500" close-delay="500" variant="rich" :headline="dougaInfo.title"
                :content="allDesc(dougaInfo)">
                <div>
                    <img style="width: 100%;max-height: 80%;" :src="dougaInfo.titleImg"></img>
                </div>
            </mdui-tooltip>
            <mdui-tooltip v-if="dougaInfo.title.length > 22" open-delay="500" close-delay="500" variant="rich"
                :content="dougaInfo.title">
                <h3 class="textContent">{{ dougaInfo.title }}</h3>
            </mdui-tooltip>
            <h3 class="textContent" v-else>{{ dougaInfo.title }}</h3>
            <mdui-tooltip v-if="dougaInfo.author.length > 16" open-delay="500" close-delay="500" variant="rich"
                :content="dougaInfo.author">
                <p class="textContent">{{ dougaInfo.author }}</p>
            </mdui-tooltip>
            <p class="textContent" v-else>{{ dougaInfo.author }}</p>
            <Transition>
                <span v-if="!dougaInfo.isArticle" v-show="infoShow" class="extendInfo dougaType">
                    视频
                </span>
                <span v-else v-show="infoShow" class="extendInfo dougaType">
                    文章
                </span>
            </Transition>
            <Transition>
                <span v-if="dougaInfo.time" v-show="infoShow" class="extendInfo videoDuration">
                    <time>{{ dayjs.duration(dougaInfo.time).format("mm:ss") }}</time>
                </span>
            </Transition>
            <Transition>
                <span v-show="infoShow" class="extendInfo uploadTime">
                    <time>{{ unixTimeToString(dougaInfo.releaseDate) }}</time>
                </span>
            </Transition>
        </article>
    </mdui-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration"
dayjs.extend(duration);

const infoShow = ref(false);

const handleMouse = (state: boolean) => {
    infoShow.value = state;
}

interface dougaInfo {
    isArticle: boolean
    views: number
    aid: number
    shareUrl: string
    releaseDate: number
    titleImg: string
    channelId: number
    title: string
    author: string
    userId: number
    url: string
    comments: number
    time: number
    description?: string | null
}

interface Props {
    dougaInfo: dougaInfo
}

const props = withDefaults(defineProps<Props>(), {})

const allDesc = (info: dougaInfo) => {
    return (info.description?.length ? info.description : '') + '\n' + info.author + '\n' + info.views + '播放\n' + info.comments + '评论\n'
}

const unixTimeToString = (unixTime: number) => {
    return dayjs(unixTime).format("YYYY-MM-DD HH:mm")
}

</script>
<style lang="scss" scoped>
.textContent {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 2;
    margin: 3px 0px 0px 0px;
}

.extendInfo {
    left: 3px;
    padding: 2px 8px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 10px;
    height: 20px;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
}

.uploadTime {
    bottom: 75px;
}

.videoDuration {
    bottom: 95px;
}

.dougaType {
    bottom: 115px;
}

.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>