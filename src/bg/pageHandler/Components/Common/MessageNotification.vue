<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">消息提醒</div>
      <div class="mdui-panel-item-summary">主站评论、点赞、礼物通知</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>
    <div class="mdui-panel-item-body">
      <div class="mdui-container-fluid">
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>评论</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p></p>
                </div>
                <div class="mdui-col-xs-4 mdui-col-sm-4">
                  <label class="mdui-switch">
                    <input id="commentNotif" type="checkbox" v-on:click="switchHandler($event)"/>
                    <i class="mdui-switch-icon"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mdui-container-fluid">
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>点赞</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p></p>
                </div>
                <div class="mdui-col-xs-4 mdui-col-sm-4">
                  <label class="mdui-switch">
                    <input id="likeNotif" type="checkbox" />
                    <i class="mdui-switch-icon"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mdui-container-fluid">
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>礼物</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p></p>
                </div>
                <div class="mdui-col-xs-4 mdui-col-sm-4">
                  <label class="mdui-switch" mdui-tooltip="{content: '香蕉和桃'}">
                    <input id="giftNotif" type="checkbox" />
                    <i class="mdui-switch-icon"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mdui-chip" v-if="frontendRequire">
        <span class="mdui-chip-title"
          >这些功能，均需要开启 助手设置-通用-高级设置-后台-未读计数消息轮询
          。</span
        >
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-title"
          >此功能会自动去收取未读信息箱中的内容，会导致通知计数的改变。</span
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