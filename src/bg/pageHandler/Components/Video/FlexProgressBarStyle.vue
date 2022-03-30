<template>
  <div>
    <div class="mdui-col-xs-9">
      <h3>全局播放器进度条 - 样式</h3>
    </div>
    <div class="mdui-row">
      <div class="mdui-col-xs-4 mdui-col-sm-4">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">播放进度条颜色</label>
          <input
            id="barColor"
            class="mdui-textfield-input"
            type="text"
            pattern="^#.*"
            maxlength="9"
          />
          <div class="mdui-textfield-error">输入十六进制颜色值：#fd4c5d</div>
          <div class="mdui-textfield-helper">
            请输入十六进制颜色值
            <a href="http://www.whx.me/color/index.html" target="_blank"
              >取色器</a
            >
          </div>
        </div>
      </div>
      <div class="mdui-col-xs-4 mdui-col-sm-4">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">播放进度条厚度</label>
          <input
            id="barHeight"
            class="mdui-textfield-input"
            type="text"
            pattern="[1-9]\d*%$|[1-9]\d*.\d*%$|0.\d*[1-9]\d*%$"
          />
          <div class="mdui-textfield-error">百分比：0.4%</div>
          <div class="mdui-textfield-helper">请输入百分比</div>
        </div>
      </div>
      <div class="mdui-col-xs-4 mdui-col-sm-4">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">加载进度条颜色</label>
          <input
            id="loadedColor"
            class="mdui-textfield-input"
            type="text"
            pattern="^#.*"
            maxlength="9"
          />
          <div class="mdui-textfield-error">输入十六进制颜色值：#ffffffb3</div>
          <div class="mdui-textfield-helper">
            请输入十六进制颜色值
            <a href="https://www.materialpalette.com/colors" target="_blank"
              >取色器</a
            >
          </div>
        </div>
      </div>
      <div class="mdui-col-xs-4 mdui-col-sm-4">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">加载进度条厚度</label>
          <input
            id="loadedHeight"
            class="mdui-textfield-input"
            type="text"
            pattern="[1-9]\d*%$|[1-9]\d*.\d*%$|0.\d*[1-9]\d*%$"
          />
          <div class="mdui-textfield-error">百分比：0.4%</div>
          <div class="mdui-textfield-helper">请输入百分比</div>
        </div>
      </div>
    </div>
    <button id="proBarConfSave" class="mdui-btn mdui-btn-block" v-on:click="saveConf">保存</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>