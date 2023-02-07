import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./crxManifest.json" assert { type: "json" };

export default defineConfig({
  server: {
    cors: true,
    hmr: {
      port: 5174,
    },
  },
  plugins: [vue(), crx({ manifest })],
});
