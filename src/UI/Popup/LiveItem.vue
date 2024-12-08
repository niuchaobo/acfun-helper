<template>
    <mdui-card class="LiveItem" :href="'https://live.acfun.cn/live/' + followLiveRoom.authorId" target="_blank"
        style="width: 150px;">
        <article class="md-text">
            <mdui-tooltip open-delay="1500" close-delay="500" variant="rich" :headline="followLiveRoom.title"
                :content="allDesc(followLiveRoom)">
                <div class="post-cover">
                    <img style="width: 100%;max-height: 80%;" :src="followLiveRoom.coverUrls[0]"></img>
                </div>
            </mdui-tooltip>
            <mdui-tooltip v-if="followLiveRoom.title.length > 10" open-delay="500" close-delay="500" variant="rich"
                :content="followLiveRoom.title">
                <h3 class="textContent">{{ followLiveRoom.title }}</h3>
            </mdui-tooltip>
            <h3 class="textContent" v-else>{{ followLiveRoom.title }}</h3>
            <mdui-tooltip v-if="followLiveRoom.user.name.length > 16" open-delay="500" close-delay="500" variant="rich"
                :content="followLiveRoom.user.name">
                <p class="textContent">{{ followLiveRoom.user.name }}</p>
            </mdui-tooltip>
            <p class="textContent" v-else>{{ followLiveRoom.user.name }}</p>
            <span class="cap" id="post-meta">
                <time>开播于{{ unixTimeToString(followLiveRoom.createTime) }}</time>
            </span>
        </article>
    </mdui-card>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';

interface liveRoomInfo {
    formatLikeCount: string
    formatOnlineCount: string
    title: string
    user: {
        name: string
    }
    coverUrls: Array<string>
    createTime: number
    authorId: number
}

interface Props {
    followLiveRoom: liveRoomInfo
}

const props = withDefaults(defineProps<Props>(), {})

const allDesc = (info: liveRoomInfo) => {
    return info.user.name + '\n' + info.formatOnlineCount + '个观众\n' + info.formatLikeCount + '个喜欢\n'
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