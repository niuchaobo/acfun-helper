/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// @ts-ignore
// import { chromeExtension } from "./packages/hy-vite-plugin-chrome-ext";
// // @ts-ignore
import Components from "unplugin-vue-components/vite";

const isDev = process.env.BUILD_ENV === "development";

export const commonDevOptions = {
  root: "src",
  mode: isDev ? "development" : "production",
  plugins: [
    vue({
      template:{
        compilerOptions:{
          isCustomElement: (tag) => tag.startsWith('mdui-'),
        }
      }
    }),
    // chromeExtension({
    //   singleScripts: ["content", "sdk"],
    // }),
    Components({
      resolvers: [],
    }),
  ],
}

export const fullDevOptions: UserConfigExport = {
  ...commonDevOptions,
  base: "./",
  build: {
    minify: isDev ? false : "terser",
    sourcemap: false,
    outDir: path.resolve(__dirname, "output"),
    assetsDir: "./assets",
    rollupOptions: {
      inlineDynamicImports: true,
      input: {
        popup: "src/UI/Popup/popup.html",
        setting: "src/UI/Setting/setting.html",
        frontend: path.resolve(__dirname, "src/Frontend/frontend.ts"),
        background: path.resolve(__dirname, "src/Background/background.ts"),
        // sdk: path.resolve(__dirname, "src/utils/sdk/page-sdk.ts"),
      },
      output: {
        assetFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}

// https://github.com/defghy/demos/blob/master/chrome-extension/vite.config.ts
// https://vitejs.dev/config/
export default defineConfig(fullDevOptions);
