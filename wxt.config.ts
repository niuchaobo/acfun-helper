import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';
import inject from '@rollup/plugin-inject';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "AcFun-Helper",
    description: "AcFun-Helper",
    version: "2.0.29",
    default_locale: "zh_CN",
    author: { "email": "348983704@qq.com" },
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
      "storage","alarms",
      "tabs",
      "cookies",
      "notifications",
      "declarativeContent",
      "scripting",
      "contextMenus",
      "declarativeNetRequest", "declarativeNetRequestWithHostAccess", "declarativeNetRequestFeedback"
    ],
  },
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  entrypointsDir: "./Core/Entry",
  publicDir: "./src/Asset",
  modulesDir: "./WxtModules",
  srcDir: "./src/",
  webExt: {

  },
  vite: () => ({
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 所有以 mdui- 开头的标签名都是 mdui 组件
            isCustomElement: (tag) => tag.startsWith('mdui-')
          }
        }
      }),
      inject({
        jQuery: 'jquery',
      }),
    ],
    resolve: {
      alias: {
      }
    },
    optimizeDeps: {
      include: ["jquery"],
    },
    css: {
      preprocessorOptions: {
        "scss": {
          api: "modern-compiler",
        },
        "sass": {
          includePaths: ["./src/"],
          api: "modern-compiler",
        },
      }
    }
  }),
});
