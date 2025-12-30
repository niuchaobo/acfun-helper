<template>
    <h1>播放器默认模式</h1>
    <div class="control">
        <h3>启用
        </h3>
        <mdui-switch :checked="allOptions.enable" @change="change"></mdui-switch>
    </div>
</template>

<script async setup lang="ts">
import { Conf, module } from "@/Modules/VideoPlayer/PlayerScreenMode/playerMode";
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