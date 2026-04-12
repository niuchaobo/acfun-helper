<template>
    <div style="width: 95%;height: 95%">
        <liveIndexPause v-if="store.L2Part == 'liveIndexPause'"></liveIndexPause>
        <liveCustomFollow v-if="store.L2Part == 'liveCustomFollow'"></liveCustomFollow>
    </div>
</template>

<script setup lang="ts">
import liveIndexPause from './liveIndexPause.vue';
import { useActivatePart } from '../store';
import liveCustomFollow from './liveCustomFollow.vue';

const store = useActivatePart();

</script>