<template>
  <div class="mdui-container">
    <div class="mdui-panel" mdui-panel="{accordion:false}">
      <conf-oprt id="configOprt"></conf-oprt>
      <msg-notif id="msgNotif"></msg-notif>
      <adv-conf id="advConf"></adv-conf>
      <confsync id="confsync"></confsync>
    </div>
  </div>
</template>

<script>
import AutoHeart from "../Article/AutoHeart.vue";
import AutoBanana from "./AutoBanana.vue";
import ConfigSync from "./ConfigSync.vue";
import UserTag from "./UserTag.vue";
export default {
  components: { ConfigSync, AutoHeart, AutoBanana, UserTag },
};
</script>

<style>
</style>