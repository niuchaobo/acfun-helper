<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <manga-mode id="MangaMode"></manga-mode>
      <banuser-inpart id="banuserInpart"></banuser-inpart>
    </div>
  </div>
</template>

<script>
import BanUserInPart from "./BanUserInPart.vue";
import MangaMode from "./MangaMode.vue";
export default {
  components: { MangaMode, BanUserInPart },
};
</script>

<style>
</style>