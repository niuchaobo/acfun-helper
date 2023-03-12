import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./crxManifest.json" assert { type: "json" };
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  server: {
    cors: true,
    hmr: {
      port: 5174,
    },
  },
  plugins: [vue(), crx({ manifest })],
});
