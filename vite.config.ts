import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/common', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@^login': fileURLToPath(new URL('./src/modules/login', import.meta.url)),
      '@^stuffs': fileURLToPath(new URL('./src/modules/stuffs', import.meta.url)),
      '@^histories': fileURLToPath(new URL('./src/modules/histories', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/common/assets/styles/main.scss"; 
        @import "./node_modules/bootstrap-icons/font/bootstrap-icons.css";
        `,
      },
    },
  },
});
