<template>
    <div style="width: 95%;height: 95%">
        <liveIndexPause v-if="store.L2Part == 'liveIndexPause'"></liveIndexPause>
    </div>
</template>

<script setup lang="ts">
import liveIndexPause from './liveIndexPause.vue';
import { useActivatePart } from '../store';

const store = useActivatePart();

</script>