<template>
  <div class="mdui-panel-item mdui-panel-item-open">
    <div class="mdui-panel-item-header">
      <div class="mdui-panel-item-title">用户标记</div>
      <div class="mdui-panel-item-summary">Somebody Special</div>
      <i class="mdui-panel-item-arrow mdui-icon material-icons"
        >keyboard_arrow_down</i
      >
    </div>
    <div class="mdui-panel-item-body">
      <div class="mdui-container-fluid">
        <div class="mdui-row">
          <div class="mdui-col-xs-12">
            <h3>重点观察列表</h3>
            <div class="mdui-row">
              <div class="mdui-col-xs-4 mdui-col-sm-2">
                <button
                  class="
                    mdui-btn mdui-btn-icon mdui-color-theme-accent mdui-ripple
                  "
                  id="openAddUserTag"
                  mdui-dialog="{target: '#addUserTag'}"
                >
                  <i class="mdui-icon material-icons">add</i></button
                >添加用户
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
              <ul id="tagList" class="mdui-list">
                <li
                  class="mdui-list-item"
                  v-for="(item, uid) in raw"
                  v-bind:key="uid"
                  style="cursor: default"
                >
                  <i
                    class="mdui-list-item-icon mdui-icon material-icons"
                    :data-key="uid"
                    :data-name="item.name"
                    :data-tag="item.tag"
                    :data-desc="item.desc"
                    v-on:click="remove"
                    title="删除"
                    style="cursor: pointer"
                    >delete</i
                  >
                  <a
                    v-bind:href="'https://www.acfun.cn/u/' + uid"
                    target="_blank"
                    ><i
                      class="mdui-list-item-icon mdui-icon material-icons"
                      style="cursor: pointer"
                      >desktop_windows</i
                    >
                  </a>
                  <a target="_blank">
                    <i
                      class="mdui-icon material-icons"
                      v-on:click="change"
                      style="cursor: pointer"
                      mdui-dialog="{target: '#changeUserTag'}"
                      title="修改"
                      >create</i
                    >
                  </a>
                  <div class="mdui-list-item-content">
                    {{ item.name }} - {{ item.tag }}
                  </div>
                  <a>
                    <i
                      class="mdui-list-item-icon mdui-icon material-icons"
                      v-if="item?.desc ?? false"
                      :mdui-tooltip="'{content:' + item.desc + '}'"
                      v-on:click="showDesc"
                      >description</i
                    >
                  </a>
                  <a
                    v-if="item?.refer"
                    v-bind:href="
                      item?.commentId
                        ? item?.refer + '#ncid=' + item.commentId
                        : item?.refer
                    "
                    target="_blank"
                  >
                    <i class="mdui-icon material-icons">filter_none</i>
                  </a>
                  <i
                    class="mdui-icon material-icons"
                    v-if="item?.evidence ?? false"
                    mdui-tooltip="{content: '复制内容'}"
                    v-bind:title="item.evidence"
                    v-on:click="copyEvidence"
                    >format_align_left</i
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="mdui-chip">
        <span class="mdui-chip-title">我正在看着你 看着你 目不转睛。</span>
      </div>
    </div>

    <div class="mdui-dialog" id="addUserTag">
      <div class="mdui-dialog-title">来点信息</div>
      <div class="mdui-dialog-content">
        <div
          class="mdui-textfield mdui-textfield-floating-label"
          v-bind:class="{ 'mdui-textfield-invalid': uidError }"
        >
          <label class="mdui-textfield-label">用户Uid 或者 用户页面链接</label>
          <input
            id="userTag_uid"
            class="mdui-textfield-input"
            type="text"
            required
          />
          <div class="mdui-textfield-error">{{ uidErrorMsg }}</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">标记</label>
          <input
            id="userTag_tag"
            class="mdui-textfield-input"
            type="text"
            maxlength="10"
            required
          />
          <div class="mdui-textfield-error">不能为空</div>
        </div>
        <div class="mdui-textfield mdui-textfield-floating-label">
          <label class="mdui-textfield-label">描述[可选]</label>
          <input class="mdui-textfield-input" id="userTag_desc" />
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>算了</button>
        <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>OK</button>
      </div>
    </div>

    <div class="mdui-dialog" id="changeUserTag">
      <div class="mdui-dialog-title">详细信息</div>
      <div class="mdui-dialog-content">
        <div class="mdui-textfield">
          <label class="mdui-textfield-label"></label>
          <input
            id="detailUserTag_uid"
            class="mdui-textfield-input"
            type="text"
            disabled
          />
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">标记</label>
          <input
            id="detailUserTag_tag"
            class="mdui-textfield-input"
            type="text"
            maxlength="10"
            required
          />
          <div class="mdui-textfield-error">不能为空</div>
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">描述[可选]</label>
          <input class="mdui-textfield-input" id="detailUserTag_desc" />
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">参考链接[可选]</label>
          <input class="mdui-textfield-input" id="detailUserTag_refer" />
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">证据内容[可选]</label>
          <input class="mdui-textfield-input" id="detailUserTag_evidence" />
        </div>
        <div class="mdui-textfield">
          <label class="mdui-textfield-label">楼层ID[可选]</label>
          <input class="mdui-textfield-input" id="detailUserTag_commentId" />
        </div>
      </div>
      <div class="mdui-dialog-actions">
        <button class="mdui-btn mdui-ripple" mdui-dialog-close>算了</button>
        <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>