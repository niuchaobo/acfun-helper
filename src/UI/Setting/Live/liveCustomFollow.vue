<template>
    <h1>直播通知</h1>
    <div class="control">
        <h3>启用
        </h3>
        <mdui-switch :checked="allOptions.enable" data-optName="enable" @change="change">Test</mdui-switch>
    </div>
    <h1>自定义关注主播</h1>
    <div class="control">
        <h3>启用
        </h3>
        <mdui-switch :checked="allOptions.customLiveNotifEnable" data-optName="customLiveNotifEnable" @change="change">Test</mdui-switch>
    </div>
    <h1>自动打开自定义关注主播的直播间</h1>
    <div class="control">
        <h3>启用
        </h3>
        <mdui-switch :checked="allOptions.customCreateBrowserTab" data-optName="customCreateBrowserTab" @change="change">Test</mdui-switch>
    </div>
    <h1>自定义关注的主播们 ({{ allOptions.customObserveUsers?.length || "" }})</h1>
    <mdui-button @click="showDialog_customAdd">添加</mdui-button>
    <mdui-button @click="removeFromList">删除</mdui-button>
    <mdui-button @click="showDialog_clearAllConfirm">清空</mdui-button>
    <mdui-button>刷新</mdui-button>

    <mdui-dialog headline="添加关注直播用户" close-on-esc description="请输入你需要关注的用户UID 或者 用户中心链接 或者 直播间链接"
        class="addCustomFollow_dialog">
        <mdui-text-field label="UID 或 链接"></mdui-text-field>
        <mdui-button slot="action" variant="tonal" @click="confirmDialog_customAdd">确定</mdui-button>
        <mdui-button slot="action" variant="cancel" @click="closeDialog_customAdd">取消</mdui-button>
    </mdui-dialog>

    <mdui-dialog headline="清除关注直播用户" close-on-esc description="确定全部清除吗" class="clearAllConfirm_dialog">
        <mdui-button slot="action" variant="cancel" @click="closeDialog_clearAllConfirm">取消</mdui-button>
        <mdui-button slot="action" variant="tonal" @click="confirmDialog_clearAllConfirm">确定</mdui-button>
    </mdui-dialog>
    <mdui-snackbar class="msg" auto-close-delay="3050"></mdui-snackbar>

    <mdui-list>
        <div style="margin-left: 2.5rem" v-for="value in allOptions.customObserveUsers" :key="value">
            <!-- <mdui-list-item>{{ userInfoDb[value].name || "UID: " + value }}</mdui-list-item> -->
            <mdui-list-item :href="`https://www.acfun.cn/u/${value}`" target="_blank">
                {{ userInfoDb[value].name || "UID: " + value }}
                <mdui-avatar slot="icon"
                    :src="userInfoDb[value]?.userHeadImgInfo.thumbnailImageCdnUrl || DEFAULT_AVATAR"></mdui-avatar>
                <mdui-checkbox slot="end-icon" @change="toggleRemove(value)"></mdui-checkbox>
            </mdui-list-item>
        </div>
    </mdui-list>
</template>

<script async setup lang="ts">
import { Conf, module } from "@/Modules/Global/Messages/liveNotif";
import { ExtOptions } from "@/Core/CoreUtils";
import { ref, Ref } from "vue";
import type { Switch } from 'mdui/components/switch.js';
import { onMounted, onBeforeMount } from "vue";
import { Dialog } from "mdui";
import { getLiveDataByUid } from "@/Utils/Api/live/liveBaseInfo";
import { DEFAULT_AVATAR } from "@/Utils/Api/common";

let allOptions: Ref<Conf> = ref({}) as Ref<Conf>;
let userInfoDb: Ref<Record<string, any>> = ref({});
let preRemoveList: Ref<string[]> = ref([]);

onBeforeMount(async () => {
    userInfoDb.value = await ExtOptions.getValue("userInfo") as Record<string, any>;
    allOptions.value = await ExtOptions.getValue(module.name) as Conf;
})

const change = async (e: CustomEvent) => {
    const target = e.target as Switch;
    const checked = target.checked as boolean;
    const optName = target.dataset.optname;
    if(!optName){
        return;
    }
    let tempAllOptions = await ExtOptions.getValue(module.name) as Conf;
    (tempAllOptions as any)[optName] = checked;
    ExtOptions.setValue(module.name, tempAllOptions);
    allOptions.value = tempAllOptions;
}

const removeFromList = async () => {
    let tempAllOptions = await ExtOptions.getValue(module.name) as Conf;
    preRemoveList.value.forEach(uid => {
        const index = tempAllOptions.customObserveUsers.indexOf(uid);
        const index2= allOptions.value.customObserveUsers.indexOf(uid);
        if (index > -1) {
            tempAllOptions.customObserveUsers.splice(index, 1);
        }
        if (index2 > -1) {
            allOptions.value.customObserveUsers.splice(index2, 1);
        }
    });
    ExtOptions.setValue(module.name, tempAllOptions);
}

const toggleRemove = (uid: string) => {
    const index = preRemoveList.value.indexOf(uid);
    if (index > -1) {
        preRemoveList.value.splice(index, 1);
    } else {
        preRemoveList.value.push(uid);
    }
}

const showDialog_clearAllConfirm = async (e: CustomEvent) => {
    const dialogElem = document.querySelector(".clearAllConfirm_dialog") as Dialog;
    if (!dialogElem) {
        return
    }
    dialogElem.open = true;
}

const closeDialog_clearAllConfirm = async (e: CustomEvent) => {
    const dialogElem = document.querySelector(".clearAllConfirm_dialog") as Dialog;
    if (!dialogElem) {
        return
    }
    dialogElem.open = false;
}

const confirmDialog_clearAllConfirm = async (e: CustomEvent) => {
    const dialogElem = document.querySelector(".clearAllConfirm_dialog") as Dialog;
    if (!dialogElem) {
        return
    }
    dialogElem.open = false;
}

const showDialog_customAdd = async (e: CustomEvent) => {
    const dialogElem = document.querySelector(".addCustomFollow_dialog") as Dialog;
    if (!dialogElem) {
        return
    }
    dialogElem.open = true;
}

const closeDialog_customAdd = async (e: CustomEvent) => {
    const dialogElem = document.querySelector(".addCustomFollow_dialog") as Dialog;
    if (!dialogElem) {
        return
    }
    dialogElem.open = false;
}

const confirmDialog_customAdd = async (e: CustomEvent) => {
    const dialogElem = document.querySelector(".addCustomFollow_dialog") as Dialog;
    if (!dialogElem) {
        return
    }
    const inputElem = dialogElem.querySelector("mdui-text-field") as unknown as HTMLInputElement;
    if (!inputElem) {
        return
    }
    if (inputElem.value.trim() === "") {
        MsgUser("输入有问题");
        return;
    }
    addCustomFollow(inputElem.value.trim());
    dialogElem.open = false;
}

const MsgUser = (msg: string) => {
    if (msg.trim() === "") {
        return;
    }
    const msgElem = document.querySelector(".msg") as unknown as HTMLDivElement;
    msgElem.innerText = msg;
    (msgElem as any).open = true;
}

const addCustomFollow = async (e: string) => {
    let uid;
    const allCustomFollow = allOptions.value.customObserveUsers;
    let tempAllOptions = await ExtOptions.getValue(module.name) as Conf;
    let tempUserInfoDb = await ExtOptions.getValue("userInfo") as Record<string, any>;
    if (/http.*/.test(e)) {
        uid = new RegExp("[0-9]+").exec(e)?.[0];
    } else if (/^[0-9]+$/.test(e)) {
        if (e in allCustomFollow) {
            MsgUser("用户已在列表");
            return;
        }
        uid = e;
    } else {
        MsgUser("输入有问题");
        return;
    }
    const userInfo = await getLiveDataByUid(uid as string);
    tempUserInfoDb[uid as string] = userInfo.user;
    if (userInfo.result != 0) {
        MsgUser("获取用户信息失败");
        return;
    }
    if (userInfo.user.id == "0") {
        MsgUser("用户不存在");
        return;
    }

    tempAllOptions.customObserveUsers.push(uid as string);
    ExtOptions.setValue(module.name, tempAllOptions);
    ExtOptions.setValue("userInfo", tempUserInfoDb);

    allOptions.value = tempAllOptions;
    userInfoDb.value = tempUserInfoDb;
    MsgUser(`${userInfo.user.name} 添加成功`);
}

</script>
<style lang="scss">
div.control {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;

    &>h3 {
        overflow: visible;
        word-break: break-word;
        max-width: 80%;
        text-overflow: ellipsis;
    }
}
</style>