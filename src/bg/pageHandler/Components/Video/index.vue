<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <playerenc id="playerenc"></playerenc>
      <danmakuenc id="danmakuenc"></danmakuenc>
    </div>
  </div>
</template>

<script>
import Player from "./Player.vue";
export default {
  components: { Player },
};
</script>

<style>
</style>