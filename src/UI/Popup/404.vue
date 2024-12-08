<template>
    <div>
        <img :src="NotFoundImg" width="310px" h="auto">
        <h2 v-if="props.description" style="margin: 5px 5px 5px 5px;">{{ props.description }}</h2>
        <slot />
    </div>

</template>

<script setup lang="ts">
const NotFoundImg = chrome.runtime.getURL('/Image/404img.png')
const props = defineProps<{
  description?: string
}>()

</script>

<style lang="scss" scoped>
</style>