<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <tagswitches id="tagswitches"></tagswitches>
      <banuser-incomment id="banuserIncomment"></banuser-incomment>
    </div>
  </div>
</template>

<script>
import BanUserInComment from "./BanUserInComment.vue";
import TagSwitches from "./TagSwitches.vue";
export default {
  components: { TagSwitches, BanUserInComment },
};
</script>

<style>
</style>