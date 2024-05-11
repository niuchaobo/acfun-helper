<template>
    <label>后台暂停</label>
    <div class="control-checkbox acArbs-getSomeSleep" :data-bind-attr="getState()" @click="statusChange"></div>
</template>

<script setup lang="ts">
import { state } from './bgTabSleepState';

const getState = () => {
    return state.tempSw;
}

const statusChange = () => state.setMessage(!getState());
</script>

<style lang="scss"></style>