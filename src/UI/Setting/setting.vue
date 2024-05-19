<template>
    <mdui-layout style="height: 90vh;">
        <header>
            <mdui-top-app-bar>
                <mdui-button-icon icon="menu" @click="drawerChange" v-bind:loading="menuLoading"></mdui-button-icon>
                <mdui-top-app-bar-title>设置</mdui-top-app-bar-title>

                <mdui-tooltip content="主页">
                    <mdui-button-icon icon="account_balance" href="https://sokwva.gitlab.io/acfun-helper/"
                        target="_blank"></mdui-button-icon>
                </mdui-tooltip>
                <mdui-tooltip content="主题">
                    <mdui-button-icon icon="palette"></mdui-button-icon>
                </mdui-tooltip>
                <mdui-dropdown trigger="click" stay-open-on-click placement="bottom">
                    <mdui-button-icon slot="trigger" icon="brightness_4"></mdui-button-icon>
                    <mdui-menu selects="single" value="autoLightMode">
                        <mdui-menu-item value="darkMode" @click="toggleDarkMode">夜间模式</mdui-menu-item>
                        <mdui-menu-item value="dayMode" @click="toggleDarkMode">白天模式</mdui-menu-item>
                        <mdui-menu-item value="autoLightMode" @click="toggleDarkMode">跟随系统</mdui-menu-item>
                    </mdui-menu>
                </mdui-dropdown>
                <mdui-tooltip content="Github">
                    <mdui-button-icon icon="receipt" href="https://github.com/niuchaobo/acfun-helper"
                        target="_blank"></mdui-button-icon>
                </mdui-tooltip>
                <mdui-tooltip content="Gitlab">
                    <mdui-button-icon icon="receipt" href="https://gitlab.com/Sokwva/acfun-helper"
                        target="_blank"></mdui-button-icon>
                </mdui-tooltip>
                <mdui-tooltip content="其他">
                    <mdui-button-icon icon="more_vert"></mdui-button-icon>
                </mdui-tooltip>
            </mdui-top-app-bar>
        </header>

        <div class="drawerContainer">
            <mdui-navigation-drawer open>
                <mdui-list>
                    <mdui-collapse accordion @click="setPart">

                        <mdui-collapse-item>
                            <mdui-list-item slot="header" icon="near_me">Main</mdui-list-item>
                        </mdui-collapse-item>
                        <mdui-collapse-item>
                            <mdui-list-item slot="header" icon="home" data-type="L1" data-id="Home">主页</mdui-list-item>
                            <div style="margin-left: 1.5rem">
                                <mdui-list-item data-type="L2" data-id="Info">其他消息</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item id="generalEntry">
                            <mdui-list-item slot="header" icon="memory" data-type="L1"
                                data-id="General">一般</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item>Item 2 - subitem</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item id="videoEntry">
                            <mdui-list-item slot="header" icon="video_library" data-type="L1"
                                data-id="Video">视频</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item data-type="L2" data-id="ABPlay">AB回放</mdui-list-item>
                                <mdui-list-item data-type="L2" data-id="BgTabSleep">后台标签页暂停播放</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item id="articleEntry">
                            <mdui-list-item slot="header" icon="dvr" data-type="L1"
                                data-id="Article">文章</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item>Item 2 - subitem</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item id="liveEntry">
                            <mdui-list-item slot="header" icon="live_tv" data-type="L1"
                                data-id="Live">直播</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item>Item 2 - subitem</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item id="pageEntry">
                            <mdui-list-item slot="header" icon="developer_board" data-type="L1"
                                data-id="Page">页面</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item>Item 2 - subitem</mdui-list-item>
                            </div>
                        </mdui-collapse-item>
                        <mdui-collapse-item id="toolEntry">
                            <mdui-list-item slot="header" icon="extension" data-type="L1"
                                data-id="Tool">工具</mdui-list-item>
                            <div style="margin-left: 2.5rem">
                                <mdui-list-item>Item 2 - subitem</mdui-list-item>
                            </div>
                        </mdui-collapse-item>

                    </mdui-collapse>
                </mdui-list>
            </mdui-navigation-drawer>
        </div>
        <mdui-layout-main id="MainContent">
            <Index @toggle-devMode="toggleDevMode" v-if="store.L1Part == 'Home'"></Index>
            <Video v-if="store.L1Part == 'Video'"></Video>
            <Article v-if="store.L1Part == 'Article'"></Article>
            <Live v-if="store.L1Part == 'Live'"></Live>
            <Page v-if="store.L1Part == 'Page'"></Page>
            <Tool v-if="store.L1Part == 'Tool'"></Tool>
        </mdui-layout-main>
    </mdui-layout>

    <footer>
        <mdui-linear-progress style="bottom: 0px;left: 0px;position: fixed;" v-if="loading"></mdui-linear-progress>
        <mdui-snackbar id="SnackBar">{{ snackBarMsg }}</mdui-snackbar>
    </footer>

</template>

<script setup lang="ts">
import { GetAsyncDOM } from '@/Core/CoreUtils';
import { NavigationDrawer } from "mdui";
import type { Snackbar } from 'mdui/components/snackbar.js';
import type { Menu } from 'mdui/components/menu.js';
import type { MenuItem } from 'mdui/components/menu-item.js';
import { ref } from 'vue';
import { useActivatePart } from './store';
import Index from './Index/index.vue';
import Video from './Video/index.vue';
import Article from './Article/index.vue';
import Live from './Live/index.vue';
import Page from './Page/index.vue';
import Tool from './Tool/index.vue';

let navigationDrawer: NavigationDrawer;
const store = useActivatePart();
//抽屉的下一个状态，false=>关，true=>开
const drawerState = ref(false);
const menuLoading = ref(true);
const loading = ref(false);
const darkModeState = ref(true);
const devMode = ref(false);
let devModeClickCount = 0;
let snackBarMsg = ref("");

const Parts = {
    Home: {},
    General: {

    },
    Video: {
        Player: {

        },
        Danmaku: {},
        WatchLater: {},
    },
    Article: {
        MangaMode: {},
        Ban: {},
    },
    Live: {
        LiveIndex: {},
        Room: {},
        PrivateFollow: {},
    },
    Page: {
        Common: {},
        Style: {},
    },
    Tool: {
        UserTag: {},
        StaffTag: {},
        AutoBanana: {},
    },
}

export type L1Part = keyof typeof Parts;

//TODO 现在的思路就是通过点击触发store里面的L1 L2的变动，当L1变动之后，切换子组件变动，L2变动之后，切换孙组件变动，通过Record<string,bool>和v-if去转换状态。
const setPart = (e: any) => {
    console.log(e)
    const target = e.target as HTMLElement;
    const partType = target.dataset.type;
    const id = target.dataset.id;
    partType == "L1" ? !!id && (store.L1Part = id) : (!!id && store.L1Part != null) && (store.L2Part = id)
    console.log(store.$state)
}

const snackIt = () => {
    const target = document.querySelector("#SnackBar") as Snackbar;
    if (target) {
        target.open = true;
    }
}

const toggleDevMode = () => {
    if (devModeClickCount == 6) {
        devMode.value = !devMode.value;
        snackBarMsg.value = "开发者模式 (`ε´ )：" + (devMode.value ? "开！" : "关！")
        snackIt()
        devModeClickCount = 0
    }
    devModeClickCount += 1
}

const toggleGlobalProgress = (e: boolean) => {
    if (e != null) {
        loading.value = !loading.value;
        return
    }
    loading.value = e;
}

const toggleDarkMode = (e: any) => {
    const target = e.target as MenuItem;
    // const lastActiveEle = e.target.lastActiveItems as MenuItem[];
    // if(lastActiveEle.length!=0){
    //     const 
    // }
    if (target.value == "darkMode") {
        document.querySelector("html")?.classList.toggle("mdui-theme-dark", true);
        darkModeState.value = true;
    }
    if (target.value == "dayMode") {
        document.querySelector("html")?.classList.toggle("mdui-theme-dark", false);
        darkModeState.value = false;
    }
    if (target.value == "autoLightMode") {
        document.querySelector("html")?.classList.toggle("mdui-theme-dark", false);
        document.querySelector("html")?.classList.toggle("mdui-theme-auto", true);
        darkModeState.value = false;

    }
}

const drawerChange = () => {
    if (navigationDrawer) {
        navigationDrawer.open = drawerState.value;
    }
    drawerState.value = !drawerState.value;
}


GetAsyncDOM.Get(".drawerContainer", () => {
    const drawerContainer = document.querySelector(".drawerContainer");
    if (drawerContainer) {
        const navigationDrawerItem = drawerContainer.querySelector("mdui-navigation-drawer");
        if (navigationDrawerItem) {
            navigationDrawer = navigationDrawerItem;
            menuLoading.value = false;
        }
    }
})
</script>

<style>
#drawerContainer>div.conatiner {
    cursor: default;
}

#header {
    display: flex;
    align-items: center;
    flex-direction: column;
}

:root {
    --mdui-elevation-levels1: 0 1.85px 6.25px 0 rgba(var(--mdui-color-shadow), 19%), 0 0.5px 1.75px 0 rgba(var(--mdui-color-shadow), 3.9%);
}

header>mdui-top-app-bar {
    box-shadow: var(--mdui-elevation-levels1);
}
</style>