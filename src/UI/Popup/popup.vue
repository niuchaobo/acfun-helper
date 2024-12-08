<template>
    <mdui-top-app-bar scroll-behavior="elevate" variant="center-aligned">
        <mdui-button-icon icon="menu"></mdui-button-icon>
        <mdui-top-app-bar-title></mdui-top-app-bar-title>
        <div style="flex-grow: 1"></div>
        <mdui-tooltip content="爱稀饭主页">
            <mdui-button-icon icon="home" href="https://www.acfun.cn" target="_blank"></mdui-button-icon>
        </mdui-tooltip>
        <mdui-button-icon icon="settings" href="options.html" target="_blank"></mdui-button-icon>
    </mdui-top-app-bar>
    <div class="content">
        <template v-if="navigationPart.push">
            <NotFound404Img v-if="pushItemList.length == 0" description="咦？世界线变动了，你好像来到了没有登陆的奇怪地方~">
            </NotFound404Img>
            <div v-else class="pushItemList">
                <!-- <mdui-fab icon="edit" size="small"
                    style="position: fixed !important;right: 15px; bottom:85px;z-index: 10;"></mdui-fab> -->
                <PushItem v-for="item in pushItemList" :douga-info="item"></PushItem>
            </div>
        </template>
        <template v-if="navigationPart.live">
            <NotFound404Img v-if="pushItemList.length == 0" description="咦？世界线变动了，你好像来到了没有登陆的奇怪地方~">
            </NotFound404Img>
            <div v-else class="pushItemList">
                <LiveRoomItem v-for="item in liveroomList" :followLiveRoom="item"></LiveRoomItem>
            </div>
        </template>
    </div>
    <mdui-navigation-bar value="push" scroll-behavior="hide">
        <mdui-navigation-bar-item icon="folder" value="push" @click="menuSel('push')">推送 </mdui-navigation-bar-item>
        <mdui-navigation-bar-item icon="live_tv" value="live" @click="menuSel('live')">直播</mdui-navigation-bar-item>
        <mdui-navigation-bar-item icon="people" value="moment" @click="menuSel('moment')">动态</mdui-navigation-bar-item>
        <mdui-navigation-bar-item icon="message" value="message"
            @click="menuSel('message')">消息</mdui-navigation-bar-item>
    </mdui-navigation-bar>
</template>

<script lang="ts" setup>
import 'mdui/components/button-icon.js';
import { reactive, computed, ref, watch } from "vue";
import PushItem from './PushItem.vue';
import LiveRoomItem from './LiveItem.vue'
import NotFound404Img from "./404.vue"
import { getMyFollowedLiveList, LiveList } from '@/Utils/Api/live/followLive';
import { FeedList, getMyDougaPushData } from '@/Utils/Api/douga/push';

const navigationPart = reactive({
    "push": true,
    "live": false,
    "moment": false,
    "part": false,
    "message": false,
})

let liveroomList = reactive<LiveList[]>([] as LiveList[])
let pushItemList = ref<FeedList[]>([])

function closeAllBeforeChange(partName: keyof typeof navigationPart) {
    Object.keys(navigationPart).forEach((key) => (key !== partName) ? (navigationPart[key as keyof typeof navigationPart] = false) : "")
}

const menuSel = (menuSelect: keyof typeof navigationPart) => {
    navigationPart[menuSelect] = true;
    closeAllBeforeChange(menuSelect);
    console.log(menuSelect, navigationPart)
}

const prepareLiveRoomData = async () => {
    const resp = await getMyFollowedLiveList()
    if ("channelListData" in resp) {
        liveroomList = resp.liveList
    }
}

const prepareDougaPushData = async () => {
    const resp = await getMyDougaPushData();
    if ("result" in resp && resp.result == 0) {
        pushItemList.value = resp.feedList
    }
}

prepareDougaPushData()
prepareLiveRoomData()
</script>

<style lang="scss" scoped>
.PushItem {
    border-radius: 5px;
    width: 49%;
    height: 165px;
    margin: 2px 0px 0px 2px;
}
</style>
