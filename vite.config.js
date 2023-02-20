import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from "node:path";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VitePWA({
      mode: "development",
      registerType: "autoUpdate",
      base: "/",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Opto Templat3",
        short_name: "Template",
        theme_color: "#ffffff",
        icons: [
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        permissions: ["notifications"],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,woff2}"],
        globIgnores: ["**/node_modules/**/*"],
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-animated-emoji",
              expiration: {
                maxEntries: 30,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})