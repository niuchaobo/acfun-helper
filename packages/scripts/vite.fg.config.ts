import { defineConfig } from "vite";
import path from "path";
import { commonDevOptions } from "../../vite.config";

const isDev = process.env.BUILD_ENV === "development";

const devOptions = {
  ...commonDevOptions,
  base: "../../",
  build: {
    minify: isDev ? false : true,
    sourcemap: false,
    outDir: "../../output",
    assetsDir: "../../Asset",
    rollupOptions: {
      inlineDynamicImports: true,
      input: {
        frontend: "../../src/Frontend/frontend.ts",
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
      "@": path.resolve(__dirname, "../../src"),
    },
  },
};

export default defineConfig(devOptions);
