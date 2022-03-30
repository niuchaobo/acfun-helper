<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <ucenter id="ucenter"></ucenter>
      <auto-heart id="autoHeart"></auto-heart>
      <auto-banana id="autoBanana"></auto-banana>
      <user-tag id="userTag"></user-tag>
    </div>
  </div>
</template>

<script>
import Ucenter from "./Ucenter.vue";
export default {
  components: { Ucenter },
};
</script>

<style>
</style>