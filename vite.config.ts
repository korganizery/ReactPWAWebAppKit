/// <reference lib="webworker" />
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'
import { viteVConsole } from 'vite-plugin-vconsole';
// 生产还是开发
// const mode = 'production'
// 类型声明
declare let self: ServiceWorkerGlobalScope & typeof globalThis;

// https://vite.dev/config/
export default defineConfig(({mode}: UserConfig) => {
  console.log("defineConfig: ", mode);
  
  return {
    base: './', // 设置相对路径
    plugins: [
      react(),
      VitePWA({
        mode: 'development',
        base: '/',
        manifest: {
          name: 'pwaapps',
          short_name: 'pwaapps',
          description: 'PWA应用IOS/Android/H5',
          theme_color: "#000000",
          icons: [
            //添加图标， 注意路径和图像像素正确
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
          ],
          // 配置开机画面
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          screenshots: [
            {
              src: 'screenshot.png',
              sizes: '1080x1920',
              type: 'image/png'
            },
          ]
        },
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}', '/registerSW.js'], //缓存相关静态资源
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.origin === self.location.origin,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 天
                }
              }
            }
          ],
          skipWaiting: true,
          clientsClaim: true,
        },
        devOptions: {
          enabled: true, 
        },
      }),
      viteVConsole({
        entry: path.resolve('src/main.tsx'),
        enabled: mode !== 'production', // 打包环境下/发布测试包
        config: {
          log: {
            maxLogNumber: 1000,
          },
          theme: 'dark'
        }
      })
    ],
    server: {
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
});
