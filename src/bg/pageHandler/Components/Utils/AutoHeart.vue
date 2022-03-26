<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">自动点赞</div>
      <div class="mdui-panel-item-summary">就像心跳</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>
    <div class="mdui-panel-item-body">
      <div class="mdui-container-fluid">
        <div class="mdui-col-xs-9">
          <h3>启用</h3>
          <div class="mdui-row">
            <div class="mdui-col-xs-8 mdui-col-sm-8">
              <p>自动点赞</p>
            </div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <label class="mdui-switch">
                <input
                  id="LikeHeart"
                  type="checkbox"
                  v-on:click="switchHandler($event)"
                />
                <i class="mdui-switch-icon"></i>
              </label>
            </div>
          </div>
        </div>

        <div class="mdui-col-xs-9">
          <h3>点赞模式</h3>
          <div class="mdui-row">
            <div class="mdui-col-xs-8 mdui-col-sm-8">怎样点</div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <select id="LikeHeartClass" class="mdui-select" mdui-select>
                <option value="0">所有Up</option>
                <option value="1">关注的Up</option>
                <option value="2">特别重要人物列表中的Up</option>
              </select>
            </div>
          </div>
        </div>

        <div class="mdui-col-xs-9">
          <h3>通知</h3>
          <div class="mdui-row">
            <div class="mdui-col-xs-8 mdui-col-sm-8">
              <p>点赞提醒</p>
            </div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <label class="mdui-switch">
                <input
                  id="LikeHeartNotif"
                  type="checkbox"
                  v-on:click="switchHandler($event)"
                />
                <i class="mdui-switch-icon"></i>
              </label>
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