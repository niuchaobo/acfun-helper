import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "AcFun-Helper-Bang2",
    description: "test ext",
    version: "2.1.1",
    default_locale: "zh_CN",
    author: "ncb",
    action: {
      "default_title": "AcFun助手",
      "default_icon": "icon/icon128.png",
    },
    omnibox: {
      "keyword": "ac"
    },
    commands: {
    },
    icons: {
      16: 'icon/icon16.png',
      32: 'icon/icon32.png',
      48: 'icon/icon48.png',
      64: 'icon/icon64.png',
      128: 'icon/icon128.png',
    },
    permissions: [
      "storage",
      "tabs",
      "cookies",
      "notifications",
      "declarativeContent",
      "scripting",
      "contextMenus"
    ],
  },
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  entrypointsDir: "./Core/Entry",
  publicDir: "./Asset",
  srcDir: "./src/",
  runner: {

  },
  vite: () => ({
    plugins: [vue({
      template: {
        compilerOptions: {
          // 所有以 mdui- 开头的标签名都是 mdui 组件
          isCustomElement: (tag) => tag.startsWith('mdui-')
        }
      }
    })],
    resolve: {
      alias: {
      }
    },
  }),
});
