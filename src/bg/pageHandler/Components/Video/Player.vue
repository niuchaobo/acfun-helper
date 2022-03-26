<template>
  <div class="mdui-panel-item mdui-panel-item-open" v-bind:id="name">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">播放器</div>
      <div class="mdui-panel-item-summary">专注于播放器上的点点小功能</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>

    <div class="mdui-panel-item-body">
      <div
        class="mdui-container-fluid"
        v-for="item in configItems"
        v-bind:key="item.key"
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
          <div class="mdui-chip" v-if="item.notSupport">
            <span class="mdui-chip-title">↑ 系统可能不支持此功能</span>
          </div>

          <div class="mdui-row" v-if="item.fpBarstyle">
            <fp-barstyle></fp-barstyle>
          </div>
          <div class="mdui-row" v-if="item.defaultMode">
            <default-mode></default-mode>
          </div>
          <div class="mdui-row" v-if="item.qualityStratagy">
            <quality-stratagy></quality-stratagy>
          </div>
        </div>
      </div>

      <div class="mdui-chip">
        <span class="mdui-chip-title"
          >功能，是有代价的，比如Bug？比如性能？或者说内存，无论用什么功能，都请先确认它值得。</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import QualityStratagy from "./QualityStratagy.vue";
export default {
  components: { QualityStratagy },
};
</script>

<style>
</style>