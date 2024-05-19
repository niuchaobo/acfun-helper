<template>
    <div id="header">
        <img style="text-align: center" @click="$emit('toggleDevMode')" src="/icon/icon128.png" />
        <h1 style="text-align: center" class="mdui-center">AcFun助手</h1>
        <p style="text-align: center">
            🎁🎁AcFun-Helper 是一个适用于 AcFun（ acfun.cn ） 的浏览器插件。
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['toggleDevMode']);
</script>