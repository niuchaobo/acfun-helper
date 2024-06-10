<template>
    <h1>画中画</h1>
    <div class="control">
        <h3>Xttttttt
        </h3>
        <mdui-switch :checked="allOptions.enable" @change="change" data-id="enable">Test</mdui-switch>
    </div>
</template>

<script async setup lang="ts">
import { Conf } from "@/Modules/VideoPlayer/PicInPic/conf"
import { ExtOptions } from "@/Core/CoreUtils";
import { ref, Ref } from "vue";
import type { Switch } from 'mdui/components/switch.js';
import { onMounted, onBeforeMount } from "vue";

let allOptions: Ref<Conf> = ref({}) as Ref<Conf>;

onBeforeMount(async () => {
    allOptions.value = await ExtOptions.getValue("PictureInPicture") as Conf;
})

const change = async (e: any) => {
    const target = e.target as Switch;
    const checked = target.checked as boolean;
    const id = target.dataset.id as keyof Conf;
    if (id == undefined) {
        return
    }
    allOptions.value[id] = checked;
    ExtOptions.setValue("PictureInPicture", allOptions.value);
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