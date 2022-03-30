<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">配置导入导出</div>
      <div class="mdui-panel-item-summary">
        将插件的配置作为配置文件导入导出，或者清除配置
      </div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>
    <div class="mdui-panel-item-body">
      <div class="div-export-settings" style="margin-top: 0px">
        <h3>导入导出配置</h3>
        <button
          class="mdui-btn mdui-color-green-400 mdui-ripple"
          id="configExport"
          v-on:click="configExport"
        >
          导出配置文件
        </button>
        <input
          type="file"
          name="upload"
          id="importConfig"
          style="display: none"
        />
        <button
          class="mdui-btn mdui-color-blue-400 mdui-ripple"
          id="configExport"
          v-on:click="configImport"
        >
          导入配置文件
        </button>
        <button
          class="mdui-btn mdui-color-red-900 mdui-ripple"
          id="configClean"
          v-on:click="configClean"
        >
          重置助手配置
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>