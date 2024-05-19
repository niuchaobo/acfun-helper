<template>
    <h1>切换标签页暂停视频播放</h1>
    <div class="control">
        <h3>Xttttttt
        </h3>
        <mdui-switch :checked="e1" @change="change" data-id="enable">Test</mdui-switch>
    </div>
    <h1>切换标签页调小声音</h1>
    <div class="control">
        <h3>XttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtesttt
        </h3>
        <mdui-switch :checked="e2" @change="change" data-id="withVolume">Test</mdui-switch>
    </div>
</template>

<script setup lang="ts">
import { Conf } from "@/Modules/VideoPlayer/BgTabSleep/bgTabSleepConf"
import { ExtOptions } from "@/Core/CoreUtils";
import { ref } from "vue";
import type { Switch } from 'mdui/components/switch.js';
import { onMounted } from "vue";


let allOptions: Conf;
let e1 = ref(false);
let e2 = ref(false);
// allOptions = ExtOptions.getValue("BgTabSleep") as Promise<Conf>
// allOptions.then(e => {
//     e.enable ? e1.value = true : e1.value = false;
//     e.withVolume ? e2.value = true : e2.value = false;
// })

onMounted(async () => {
    allOptions = await ExtOptions.getValue("BgTabSleep") as Conf;
    allOptions.enable ? e1.value = true : e1.value = false;
    allOptions.withVolume ? e2.value = true : e2.value = false;
})

const change = async (e: any) => {
    const target = e.target as Switch;
    const checked = target.checked as boolean;
    const id = target.dataset.id as keyof Conf;
    if (id == undefined) {
        return
    }
    const allOptions = await ExtOptions.getValue("BgTabSleep") as Conf;
    console.log(target.dataset.id, checked)
    allOptions[id] = checked
    ExtOptions.setValue("BgTabSleep", allOptions)
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