<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <playerenc id="playerenc"></playerenc>
      <danmakuenc id="danmakuenc"></danmakuenc>
      <watch-later id="WatchLater"></watch-later>
    </div>
  </div>
</template>

<script>
import Player from "./Player.vue";
import WatchLater from "./WatchLater.vue";
export default {
  components: { Player, WatchLater },
};
</script>

<style>
</style>