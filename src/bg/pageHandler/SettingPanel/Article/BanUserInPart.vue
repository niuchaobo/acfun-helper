<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">文章区子分区列表用户屏蔽</div>
      <div class="mdui-panel-item-summary">
        文章区首页、文章区子分区（综合、情感...）
      </div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>
    <div class="mdui-panel-item-body">
      <div class="mdui-container-fluid">
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-12">
              <h3>列表</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-3 mdui-col-sm-2">
                  <button
                    class="
                      mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple
                    "
                    v-on:click="addUser"
                  >
                    <i class="mdui-icon material-icons">add</i></button
                  >添加用户
                </div>
                <div class="mdui-col-xs-3 mdui-col-sm-2">
                  <label class="mdui-switch" mdui-tooltip="{content:'文章内用户信息旁的屏蔽按钮也依赖于此开关'}">
                    <input
                      type="checkbox"
                      v-on:click="switchHandler"
                      id="filter"
                    />
                    <i class="mdui-switch-icon"></i>--功能开关--
                  </label>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="mdui-panel" mdui-panel>
            <div
              class="mdui-panel-item"
              v-bind:class="{
                'mdui-panel-item-open': memberNum && memberNum < 100,
              }"
            >
              <div class="mdui-panel-item-header">
                用户列表（{{ memberNum }}位）<i
                  class="mdui-panel-item-arrow mdui-icon material-icons"
                  >keyboard_arrow_down</i
                >
              </div>
              <div class="mdui-panel-item-body">
                <ul class="mdui-list">
                  <li
                    class="mdui-list-item"
                    v-for="(name, uid) in raw"
                    v-bind:key="uid"
                    style="cursor: default"
                  >
                    <i
                      class="mdui-list-item-icon mdui-icon material-icons"
                      :data-key="uid"
                      :data-name="name"
                      v-on:click="removeUser"
                      style="cursor: pointer"
                      >delete</i
                    ><a
                      v-bind:href="'https://www.acfun.cn/u/' + uid"
                      target="_blank"
                      ><i
                        class="mdui-list-item-icon mdui-icon material-icons"
                        v-bind:key="uid"
                        style="cursor: pointer"
                        >desktop_windows</i
                      ></a
                    >
                    <div class="mdui-list-item-content">
                      Uid:{{ uid }} UserName:{{ name }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="mdui-chip" v-if="!require">
        <span class="mdui-chip-title"
          >在此之前，请打开 通用-高级配置-前台-请求管理 开关。</span
        >
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-title">无良媒体。</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>