import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
      "@common": fileURLToPath(new URL("./src/common", import.meta.url)),
      "@core": fileURLToPath(new URL("./src/core", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import './src/core/assets/styles/main.scss';"
      }
    }
  }
});
