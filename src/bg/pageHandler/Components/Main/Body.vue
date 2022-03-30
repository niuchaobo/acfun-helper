<template>
  <div id="bodypanel">
    <div class="mdui-drawer" id="drawer">
      <drawer-app v-on:change-part="changePart($event, param)"></drawer-app>
    </div>

    <div class="mdui-container" id="main" style="margin-top: 10px">
      <index-app v-if="status.index"></index-app>
      <common-app v-if="status.common"></common-app>
      <video-app v-if="status.video"></video-app>
      <live-app v-if="status.live"></live-app>
      <article-app v-if="status.article"></article-app>
      <comment-app v-if="status.comment"></comment-app>
      <pages-app v-if="status.pages"></pages-app>
      <utils-app v-if="status.utils"></utils-app>
    </div>

    <div class="mdui-container" id="constant"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
::-webkit-scrollbar {
  width: 8px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 5px;
}

#drawer > ul.mdui-list > li {
  cursor: default;
}

body {
  overflow-y: overlay;
}
</style>