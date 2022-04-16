<template>
  <div class="mdui-col-xs-9">
    <h3>播放画质策略</h3>
    <div class="mdui-row">
      <div class="mdui-col-xs-8 mdui-col-sm-8">
        选择播放器画质策略（除了默认最低，720p以上画质可能需要登录）
      </div>
      <div class="mdui-col-xs-4 mdui-col-sm-4">
        <select
          id="videoQualityStrategy"
          class="mdui-select"
          mdui-select="{position: 'top'}"
        >
          <option value="0">0 - 自动</option>
          <option value="1">1 - 默认最高画质</option>
          <option value="2">2 - 偏向非60帧的最高画质</option>
          <option value="3">3 - 默认最低</option>
          <option value="4">4 - 偏向非4k的最高画质</option>
          <option value="5">5 - 支持HDR的最低画质</option>
          <option value="6">6 - 仅偏好1080下的60帧画质</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>