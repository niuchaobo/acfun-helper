<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <manga-mode id="MangaMode"></manga-mode>
    </div>
  </div>
</template>

<script>
import MangaMode from './MangaMode.vue';
export default {
  components: { MangaMode },
};
</script>

<style>
</style>