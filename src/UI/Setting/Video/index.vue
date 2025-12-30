<template>
    <div style="width: 95%;height: 95%">
        <component :is="currentComponent.ui"></component>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActivatePart } from '../store';
import { componentmap } from './componentMap';

const store = useActivatePart();

const currentComponent = computed(() => {
    return componentmap[store.L2Part] || null
})

</script>