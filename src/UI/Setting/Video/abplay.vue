<template>
    <h1>AB回放</h1>
    <div class="control">
        <h3>Xttttttt
        </h3>
        <mdui-switch :checked="enable">Test</mdui-switch>
    </div>
    <h1>AB回放</h1>
    <div class="control">
        <h3>XttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttestttttttttttttttttttttttttttttttttttttttttttttttttttttttttXtesttttttttttttttttttttttttttttttttttttttttttttttttttttttttt
        </h3>
        <mdui-switch :checked="enable" @change="change">Test</mdui-switch>
    </div>
</template>

<script setup lang="ts">
import { Conf } from "@/Modules/VideoPlayer/ABPlay/abPlayConf";
import { ExtOptions } from "@/Core/CoreUtils";
import { ref } from "vue";
let allOptions: Promise<Conf>;
let enable = ref(false);
allOptions = ExtOptions.getValue("ABPlay") as Promise<Conf>
allOptions.then(e => {
    e.enable ? enable.value = true : enable.value = false;;
})

const change = (e:any)=>{
    console.log(e)
    const target = e.target;
    const checked = target.checked as boolean;
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