<template>
    <mdui-card class="PushItem" :href="dougaInfo.shareUrl" target="_blank" style="width: 150px;">
        <article class="md-text">
            <mdui-tooltip open-delay="1500" close-delay="500" variant="rich" :headline="dougaInfo.title"
                :content="allDesc(dougaInfo)">
                <div class="post-cover">
                    <img style="width: 100%;max-height: 80%;" :src="dougaInfo.titleImg"></img>
                </div>
            </mdui-tooltip>
            <mdui-tooltip v-if="dougaInfo.title.length > 10" open-delay="500" close-delay="500" variant="rich"
                :content="dougaInfo.title">
                <h3 class="textContent">{{ dougaInfo.title }}</h3>
            </mdui-tooltip>
            <h3 class="textContent" v-else>{{ dougaInfo.title }}</h3>
            <mdui-tooltip v-if="dougaInfo.author.length > 16" open-delay="500" close-delay="500" variant="rich"
                :content="dougaInfo.author">
                <p class="textContent">{{ dougaInfo.author }}</p>
            </mdui-tooltip>
            <p class="textContent" v-else>{{ dougaInfo.author }}</p>
            <span class="cap" id="post-meta">
                <time>{{ unixTimeToString(dougaInfo.releaseDate) }}</time>
            </span>
        </article>
    </mdui-card>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

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
    return dayjs(unixTime).format("YYYY-MM-DD HH:mm:ss")
}

</script>
<style lang="scss" scoped>
.textContent {
    overflow: hidden;
    word-break: break-all;
    word-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 3px 0px 0px 0px;
}
</style>