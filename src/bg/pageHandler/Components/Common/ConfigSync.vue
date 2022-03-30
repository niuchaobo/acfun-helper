<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">配置同步</div>
      <div class="mdui-panel-item-summary">将配置文件存放在服务器中</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>

    <div class="mdui-divider"></div>
    <div class="mdui-panel-item-body" id="fg">
      <h2>配置同步</h2>

      <div class="mdui-row">
        <div class="mdui-col-xs-12 SyncWait1" style="display: none">
          <div class="mdui-progress">
            <div class="mdui-progress-indeterminate"></div>
          </div>
        </div>
        <div class="mdui-col-xs-9">
          <h3>触发同步</h3>
          <div class="mdui-row">
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <button
                class="mdui-btn mdui-btn-raised mdui-ripple Pushresult_act"
              >
                检查配置 & 向上同步配置信息
              </button>
            </div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <p>个人信息确认：</p>
            </div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <p class="read_result">[ -正在等待连接- ]</p>
            </div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <button
                class="mdui-btn mdui-btn-raised mdui-ripple Pullresult_act"
                mdui-dialog="{target: '#configDownloadDialog'}"
              >
                检查配置 & 向下同步配置信息
              </button>
              <div class="mdui-dialog" id="configDownloadDialog">
                <div class="mdui-dialog-title">提问一</div>
                <div class="mdui-dialog-content">
                  你确定要将服务器上的配置同步到本地？它将会覆盖你本地的配置！
                </div>
                <div class="mdui-dialog-actions">
                  <button class="mdui-btn mdui-ripple" mdui-dialog-cancel>
                    算了
                  </button>
                  <button class="mdui-btn mdui-ripple" mdui-dialog-confirm v-bind:click="upload">
                    确定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>