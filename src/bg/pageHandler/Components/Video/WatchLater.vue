<template>
  <div class="mdui-panel-item mdui-panel-item-open" v-bind:id="name">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">稍后再看（助手自带）</div>
      <div class="mdui-panel-item-summary">
        自己实现的稍后再看，可不是主站的那个
      </div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>

    <div class="mdui-panel-item-body">
      <div class="mdui-container-flitem.dougaId">
        <div class="mdui-row">
          <div class="mdui-row">
            <div class="mdui-col-xs-12">
              <h3>列表</h3>
              <button
                class="
                  mdui-btn
                  mdui-color-green-400
                  mdui-color-theme-accent
                  mdui-ripple
                "
                v-on:click="loadList"
              >
                加载列表
              </button>
              <button
                class="
                  mdui-btn
                  mdui-color-green-400
                  mdui-color-theme-accent
                  mdui-ripple
                "
                v-on:click="start"
              >
                开始！
              </button>
              <label class="mdui-switch">
                <input
                  type="checkbox"
                  v-on:click="switchHandler"
                  id="watchLater"
                />
                <i class="mdui-switch-icon"></i>--功能开关--
              </label>
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
                列表（{{ memberNum }}位）<i
                  class="mdui-panel-item-arrow mdui-icon material-icons"
                  >keyboard_arrow_down</i
                >
              </div>
              <div class="mdui-panel-item-body">
                <ul class="mdui-list">
                  <li
                    class="mdui-list-item"
                    v-for="(item, dougaId) in videos"
                    v-bind:key="dougaId"
                    data-type="video"
                    style="cursor: default"
                  >
                    <i
                      class="mdui-list-item-icon mdui-icon material-icons"
                      :data-key="dougaId"
                      :data-name="item.title"
                      v-on:click="remove"
                      style="cursor: pointer"
                      mdui-tooltip="{content:'谨慎操作'}"
                      >delete</i
                    ><a
                      v-bind:href="'https://www.acfun.cn/v/ac' + dougaId"
                      target="_blank"
                      ><i
                        class="mdui-list-item-icon mdui-icon material-icons"
                        v-bind:key="dougaId"
                        style="cursor: pointer"
                        >videocam</i
                      ></a
                    >
                    <div class="mdui-list-item-content">
                      {{ item.user.name }}： 《 {{ item.title }} 》
                    </div>
                  </li>
                  <li
                    class="mdui-list-item"
                    v-for="(item, dougaId) in articles"
                    v-bind:key="dougaId"
                    data-type="article"
                    style="cursor: default"
                  >
                    <i
                      class="mdui-list-item-icon mdui-icon material-icons"
                      :data-key="dougaId"
                      :data-name="item.title"
                      v-on:click="remove"
                      style="cursor: pointer"
                      >delete</i
                    ><a
                      v-bind:href="'https://www.acfun.cn/a/ac' + dougaId"
                      target="_blank"
                      ><i
                        class="mdui-list-item-icon mdui-icon material-icons"
                        v-bind:key="dougaId"
                        style="cursor: pointer"
                        >import_contacts</i
                      ></a
                    >
                    <div class="mdui-list-item-content">
                      {{ item.user.name }}： 《 {{ item.title }} 》
                    </div>
                  </li>
                </ul>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="mdui-chip">
        <span class="mdui-chip-title"
          >那就尽量看完，这样也不失为一种支持。</span
        >
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>