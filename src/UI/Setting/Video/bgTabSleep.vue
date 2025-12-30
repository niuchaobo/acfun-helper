<template>
    <h1>切换标签页暂停视频播放</h1>
    <div class="control">
        <h3>Xttttttt
        </h3>
        <mdui-switch :checked="allOptions.enable" @change="change" data-id="enable">Test</mdui-switch>
    </div>
    <h1>切换标签页调小声音</h1>
    <div class="control">
        <h3>XttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtesttt
        </h3>
        <mdui-switch :checked="allOptions.withVolume" :disabled="!allOptions.enable" @change="change"
            data-id="withVolume">Test</mdui-switch>
    </div>
</template>

<script async setup lang="ts">
import { Conf, module } from "@/Modules/VideoPlayer/BgTabSleep/bgTabSleep"
import { ExtOptions } from "@/Core/CoreUtils";
import { ref, Ref } from "vue";
import type { Switch } from 'mdui/components/switch.js';
import { onMounted, onBeforeMount } from "vue";

let allOptions: Ref<Conf> = ref({}) as Ref<Conf>;

onBeforeMount(async () => {
    allOptions.value = await ExtOptions.getValue(module.name) as Conf;
})

const change = async (e: CustomEvent) => {
    const target = e.target as Switch;
    const checked = target.checked as boolean;
    let tempAllOptions = await ExtOptions.getValue(module.name) as Conf;
    tempAllOptions.enable = checked;
    ExtOptions.setValue(module.name, tempAllOptions);
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