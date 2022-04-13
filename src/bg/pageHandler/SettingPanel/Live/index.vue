<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <live-index id="liveIndex"></live-index>
      <lives id="lives"></lives>
      <notice-user id="noticeUser"></notice-user>
    </div>
  </div>
</template>

<script>
import NoticeUser from "./NoticeUser.vue";
export default {
  components: { NoticeUser },
};
</script>

<style>
</style>