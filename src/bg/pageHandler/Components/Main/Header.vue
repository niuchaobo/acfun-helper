<template>
  <header class="appbar mdui-appbar mdui-appbar-fixed">
    <div class="mdui-toolbar mdui-color-theme">
      <span
        class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"
        mdui-drawer="{target: '#drawer'}"
        style="cursor: default"
      >
        <i class="mdui-icon material-icons">menu</i>
      </span>
      <a class="mdui-typo-headline mdui-hidden-xs">AcFun助手</a>
      <a class="mdui-typo-title">设置</a>
      <div class="mdui-toolbar-spacer"></div>
      <a
        href="javascript:;"
        class="mdui-btn mdui-btn-icon"
        mdui-dialog="{target: '#mainTheme'}"
        mdui-tooltip="{content: '设置主题'}"
      >
        <i class="mdui-icon material-icons">palette</i>
      </a>
      <a
        href="https://sokwva.gitlab.io/acfun-helper/"
        target="_blank"
        class="mdui-btn mdui-btn-icon"
        mdui-tooltip="{content: '主页'}"
      >
        <i class="mdui-icon material-icons">account_balance</i>
      </a>
      <a
        href="https://github.com/niuchaobo/acfun-helper"
        target="_blank"
        class="mdui-btn mdui-btn-icon"
        mdui-tooltip="{content: 'Github'}"
      >
        <i class="mdui-icon material-icons">receipt</i>
      </a>
      <a
        href="https://gitlab.com/Sokwva/acfun-helper"
        target="_blank"
        class="mdui-btn mdui-btn-icon"
        mdui-tooltip="{content: 'Gitlab'}"
      >
        <i class="mdui-icon material-icons">receipt</i>
      </a>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>