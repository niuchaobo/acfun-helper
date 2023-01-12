/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// @ts-ignore
// import { chromeExtension } from "./packages/hy-vite-plugin-chrome-ext";
// // @ts-ignore
import Components from "unplugin-vue-components/vite";
// // @ts-ignore
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

const isDev = process.env.BUILD_ENV === "development";
// https://github.com/defghy/demos/blob/master/chrome-extension/vite.config.ts
// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  base: "./",
  mode: isDev ? "production" : "production",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: isDev ? false : "terser",
    sourcemap: false,
    outDir: path.resolve(__dirname, "output"),
    assetsDir: "./assets",
    rollupOptions: {
      inlineDynamicImports: true,
      input: {
        popup: path.resolve(__dirname, "src/UI/Popup/popup.html"),
        setting: path.resolve(__dirname, "src/UI/Setting/setting.html"),
        frontend: path.resolve(__dirname, "src/Frontend/frontend.ts"),
        background: path.resolve(__dirname, "src/Background/background.js"),
        // sdk: path.resolve(__dirname, "src/utils/sdk/page-sdk.ts"),
      },
      output: {
        assetFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
      },
    },
  },
  plugins: [
    vue(),
    // chromeExtension({
    //   singleScripts: ["content", "sdk"],
    // }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
});
