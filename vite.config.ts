import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 按需加载包
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// vue子类全局引入
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  publicDir: 'assets', // 静态文件
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // css预处理器
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/varibles.scss" as *;',
      },
    },

  },
  server: {
    open: true, // 自动打开浏览器
    host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    port: 9527,
    hmr: {
      overlay: false,
    },
    // 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  plugins: [
    vue({
      refTransform: true, // 开启ref转化
    }),
    // 配置vue子类全局引入
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
    }),
    // vite不能使用webpack的plugin-babel-import, 因此需要引入按需加载包
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
  ],
})
