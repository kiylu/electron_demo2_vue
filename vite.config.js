import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: 'localhost'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  base: './' // 重要：Electron 需要相对路径，这个配置的作用是 vite 在打包时，生成的 index.html 中引用的资源路径是相对路径，而不是绝对路径
});
