<template>
  <div class="mdui-panel-item mdui-panel-item-open" v-bind:id="name">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">用户中心小工具</div>
      <div class="mdui-panel-item-summary">单向恋爱</div>
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
      </div>

      <div class="mdui-chip">
        <span class="mdui-chip-title"
          >欢迎您来到AcFun。</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>