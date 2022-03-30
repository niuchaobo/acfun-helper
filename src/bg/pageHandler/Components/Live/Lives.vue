<template>
  <div class="mdui-panel-item mdui-panel-item-open" v-bind:id="name">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">直播间</div>
      <div class="mdui-panel-item-summary">一号台一号台！能听见！</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>

    <div class="mdui-panel-item-body">
      <div
        class="mdui-container-fluid"
        v-for="item in configItems"
        v-bind:key="item.key"
        v-bind:class="{ devFeature: item.devFeature }"
      >
        <div class="mdui-divider" v-if="item.split"></div>
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>{{ item.title }}</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p v-html="item.desc"></p>
                </div>
                <div class="mdui-col-xs-4 mdui-col-sm-4">
                  <label class="mdui-switch">
                    <input
                      v-bind:id="item.key"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mdui-chip" v-if="item.notSupport">
          <span class="mdui-chip-title">↑ 系统可能不支持此功能</span>
        </div>

        <div class="mdui-row" v-if="item.defaultMode">
          <default-mode></default-mode>
        </div>
      </div>

      <div class="mdui-chip">
        <span class="mdui-chip-title"
          >夫人之相与，俯仰一世。或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至......</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import DefaultMode from "./DefaultMode.vue";
export default {
  components: { DefaultMode },
};
</script>

<style>
</style>