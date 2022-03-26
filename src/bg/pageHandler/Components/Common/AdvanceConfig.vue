<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">高级配置</div>
      <div class="mdui-panel-item-summary">只是高级一点点的配置</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>

    <div class="mdui-panel-item-body" id="fg">
      <h2>前台设置</h2>
      <div
        class="mdui-container-fluid"
        v-for="item in fgitems"
        v-bind:key="item.key"
      >
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>{{ item.title }}</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p>{{ item.desc }}</p>
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
    </div>

    <div class="mdui-panel-item-body" id="bg">
      <h2>后台设置</h2>
      <div
        class="mdui-container-fluid"
        v-for="item in bgitems"
        v-bind:key="item.key"
      >
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>{{ item.title }}</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p>{{ item.desc }}</p>
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
    </div>

    <div class="mdui-panel-item-body" id="popup">
      <h2>弹出窗（后台Popup）设置</h2>
      <div
        class="mdui-container-fluid"
        v-for="item in popitems"
        v-bind:key="item.key"
      >
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>{{ item.title }}</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">
                  <p>{{ item.desc }}</p>
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

      <div
        class="mdui-textfield mdui-textfield-floating-label"
        v-if="customPopupStyle"
      >
        <label class="mdui-textfield-label"
          >在此处输入样式（错误样式可能会导致问题，请谨慎编辑）</label
        >
        <textarea id="custom-css" class="mdui-textfield-input"></textarea>
      </div>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style>
</style>