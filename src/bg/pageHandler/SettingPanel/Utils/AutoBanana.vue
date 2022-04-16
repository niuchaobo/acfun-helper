<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">自动投蕉</div>
      <div class="mdui-panel-item-summary">进入投稿就散蕉</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>
    <div class="mdui-panel-item-body">
      <div class="mdui-container-fluid">
        <div>
          <h3>启用</h3>
          <div class="mdui-row">
            <div class="mdui-col-xs-8 mdui-col-sm-8">
              <p>在进入稿件时执行功能</p>
            </div>
            <div class="mdui-col-xs-4 mdui-col-sm-4">
              <label class="mdui-switch">
                <input
                  id="auto_throw"
                  type="checkbox"
                  v-on:click="switchHandler($event)"
                />
                <i class="mdui-switch-icon"></i>
              </label>
            </div>
          </div>

          <div class="mdui-row">
            <div class="mdui-col-xs-9">
              <h3>投蕉模式</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">怎样投</div>
                <div class="mdui-col-xs-4 mdui-col-sm-4">
                  <select id="to_attention" class="mdui-select" mdui-select>
                    <option value="true">已关注的Up</option>
                    <option value="false">列表中的Up</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="mdui-row" v-show="isToFollowed">
            <div class="mdui-col-xs-9">
              <h3>投蕉模式</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-8 mdui-col-sm-8">投多少</div>
                <div class="mdui-col-xs-4 mdui-col-sm-4">
                  <select id="to_attention_num" class="mdui-select" mdui-select>
                    <option value="1">投 1 蕉</option>
                    <option value="2">投 2 蕉</option>
                    <option value="3">投 3 蕉</option>
                    <option value="4">投 4 蕉</option>
                    <option value="5">投 5 蕉</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="mdui-row">
            <div class="mdui-col-xs-12">
              <h3>特别重要人物列表</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-4 mdui-col-sm-2">
                  <button
                    class="
                      mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple
                    "
                    id="autoBananaAdd"
                    v-on:click="addUser"
                  >
                    <i class="mdui-icon material-icons">add</i></button
                  >添加用户
                </div>
                <div class="mdui-col-xs-4 mdui-col-sm-2">
                  <label class="mdui-switch">
                    <input
                      id="articleBanana"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>--包括文章
                  </label>
                </div>
                <div
                  class="mdui-col-xs-4 mdui-col-sm-2"
                  title="只要自定义Up开播弹出通知就立刻打开Up直播页面"
                >
                  <label class="mdui-switch">
                    <input
                      id="banana_notice"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>--发出通知
                  </label>
                </div>
                <div class="mdui-col-xs-4 mdui-col-sm-2">
                  <label class="mdui-switch">
                    <input
                      id="audioAfterBanana"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>--投蕉音效
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
                <ul id="liveFollowNotifList" class="mdui-list">
                  <li
                    class="mdui-list-item"
                    v-for="item in raw"
                    v-bind:key="item.uid"
                    style="cursor: default"
                  >
                    <i
                      class="mdui-list-item-icon mdui-icon material-icons"
                      :data-key="item.uid"
                      :data-name="item.name"
                      :data-num="item.bananaNum"
                      v-on:click="removeUser"
                      title="删除"
                      style="cursor: pointer"
                      >delete</i
                    >
                    <a v-bind:href="item.up_url" target="_blank">
                      <i
                        class="mdui-list-item-icon mdui-icon material-icons"
                        v-bind:key="item.uid"
                        style="cursor: pointer"
                        >desktop_windows</i
                      >
                    </a>
                    <a target="_blank">
                      <i
                        class="mdui-icon material-icons"
                        v-on:click="changeNum"
                        title="修改投蕉数量"
                        style="cursor: pointer"
                        >create</i
                      >
                    </a>
                    <div class="mdui-list-item-content">
                      [{{ item.uid }}] : {{ item.name }} ||每稿
                      {{ item.bananaNum }} 个蕉
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="mdui-chip">
        <span class="mdui-chip-title">天...天女散蕉？</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>