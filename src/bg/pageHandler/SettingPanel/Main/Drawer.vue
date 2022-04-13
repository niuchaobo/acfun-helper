<template>
  <ul class="mdui-list">
    <li class="mdui-list-item mdui-ripple" id="index" v-on:click="showIndex">
      <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
      <div class="mdui-list-item-content">Index</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="common" v-on:click="showCommon">
      <i class="mdui-list-item-icon mdui-icon material-icons">memory</i>
      <div class="mdui-list-item-content">通用</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="video" v-on:click="showVideo">
      <i class="mdui-list-item-icon mdui-icon material-icons">video_library</i>
      <div class="mdui-list-item-content">视频</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="live" v-on:click="showLive">
      <i class="mdui-list-item-icon mdui-icon material-icons">live_tv</i>
      <div class="mdui-list-item-content">直播</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="article" v-on:click="showArticle">
      <i class="mdui-list-item-icon mdui-icon material-icons">line_style</i>
      <div class="mdui-list-item-content">文章区</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="comment" v-on:click="showComment">
      <i class="mdui-list-item-icon mdui-icon material-icons">comment</i>
      <div class="mdui-list-item-content">评论区</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="pages" v-on:click="showPages">
      <i class="mdui-list-item-icon mdui-icon material-icons">web</i>
      <div class="mdui-list-item-content">页面</div>
    </li>
    <li class="mdui-list-item mdui-ripple" id="utils" v-on:click="showUtils">
      <i class="mdui-list-item-icon mdui-icon material-icons">build</i>
      <div class="mdui-list-item-content">工具</div>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style>
</style>