<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">关注直播推送</div>
      <div class="mdui-panel-item-summary">
        将你所关注的主播直播信息通过浏览器推送
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
              <h3>关注列表</h3>
              <div class="mdui-row">
                <div class="mdui-col-xs-3 mdui-col-sm-2">
                  <button
                    class="
                      mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple
                    "
                    id="liveFollowAdd"
                    v-on:click="addUser"
                  >
                    <i class="mdui-icon material-icons">add</i></button
                  >添加关注用户
                </div>
                <div class="mdui-col-xs-3 mdui-col-sm-2">
                  <label class="mdui-switch">
                    <input
                      id="liveFloowNotif"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>--自定Up开播提醒--
                  </label>
                </div>
                <div
                  class="mdui-col-xs-3 mdui-col-sm-2"
                  title="只要自定义Up开播弹出通知就立刻打开Up直播页面"
                >
                  <label class="mdui-switch">
                    <input
                      id="liveFollowOpenNow"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>--立即打开页面--
                  </label>
                </div>
                <div class="mdui-col-xs-3 mdui-col-sm-2">
                  <label class="mdui-switch">
                    <input
                      id="followLiveNotif"
                      type="checkbox"
                      v-on:click="switchHandler"
                    />
                    <i class="mdui-switch-icon"></i>--关注Up开播提醒--
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
                    v-for="(name, uid) in raw"
                    v-bind:key="uid"
                    style="cursor: default"
                  >
                    <i
                      class="
                        mdui-list-item-icon mdui-icon
                        material-icons
                        liveFloowingsItems
                      "
                      :data-key="uid"
                      :data-name="name"
                      v-on:click="removeUser"
                      style="cursor: pointer"
                      >delete</i
                    ><a
                      v-bind:href="'https://live.acfun.cn/live/' + uid"
                      target="_blank"
                      ><i
                        class="
                          mdui-list-item-icon mdui-icon
                          material-icons
                          liveWatchOrig
                        "
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
      <br>
      <div class="mdui-chip">
        <span class="mdui-chip-title">准点新闻，该看就看！</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>