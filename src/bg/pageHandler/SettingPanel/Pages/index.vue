<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <beautify id="beautify"></beautify>
    </div>
  </div>
</template>

<script>
import Beautify from "./Beautify.vue";
export default {
  components: { Beautify },
};
</script>

<style>
</style>