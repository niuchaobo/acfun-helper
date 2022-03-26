<template>
  <div class="mdui-panel-item mdui-panel-item-open" v-bind:id="name">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">直播站首页</div>
      <div class="mdui-panel-item-summary">电视机的入口！</div>
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
        </div>
        <div class="mdui-row" v-if="item.playerdelMode">
          <delmode></delmode>
        </div>
      </div>

      <div class="mdui-chip">
        <span class="mdui-chip-title"
          >我们之间有的不只是时间的距离，还有空间的距离。交往交往，也应该是君子之交。</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import DeleteMode from "./DeleteMode.vue";
export default {
  components: { DeleteMode },
};
</script>

<style>
</style>