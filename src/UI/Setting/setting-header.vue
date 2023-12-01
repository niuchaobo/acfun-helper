<script setup lang="ts">

</script>

<template>
    <mdui-bottom-app-bar style="position: relative;">
        <mdui-button-icon icon="search"></mdui-button-icon>
        <!-- <mdui-button-icon icon="edit--outlined"></mdui-button-icon>
        <mdui-button-icon icon="mic_none--outlined"></mdui-button-icon>
        <mdui-button-icon icon="image--outlined"></mdui-button-icon> -->
        <mdui-button icon="search" end-icon="arrow_forward">Icon</mdui-button>
        <mdui-button>
            Slot
            <mdui-icon slot="icon" name="downloading"></mdui-icon>
            <mdui-icon slot="end-icon" name="attach_file"></mdui-icon>
        </mdui-button>
        <div style="flex-grow: 1"></div>
        <mdui-fab icon="add"></mdui-fab>
    </mdui-bottom-app-bar>
</template>