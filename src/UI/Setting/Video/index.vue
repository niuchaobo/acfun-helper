<template>
    <div style="width: 95%;height: 95%">
        <abplay v-if="store.L2Part == 'ABPlay'"></abplay>
        <bgTabSleep v-if="store.L2Part == 'BgTabSleep'"></bgTabSleep>
        <pip v-if="store.L2Part == 'PictureInPicture'"></pip>
    </div>
</template>

<script setup lang="ts">
import abplay from './abplay.vue';
import bgTabSleep from './bgTabSleep.vue';
import pip from './pip.vue';
import { useActivatePart } from '../store';

const store = useActivatePart();

</script>