/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: '/',
    plugins: [react(), command === 'build' && removeConsole()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      host: true,
      proxy: {
        '/functions': {
          target: 'https://onofrsiptqngmwfzenlr.supabase.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/functions/, '/functions/v1'),
        },
      },
    },
    test: {
      environment: 'jsdom',
      testTimeout: 30000,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Konva 특정 목적
            // 적용: konva-[hash].js
            // 미적용: table-state-[hash].js
            if (/node_modules\/konva\//.test(id)) {
              return 'konva';
            }
            return null;
          },
          assetFileNames({ names }) {
            const name = names[0];
            if (/\.(css)$/.test(name)) {
              return 'assets/css/[name]-[hash][extname]';
            } else if (/\.(png|jp?g|webp|svg)$/.test(name)) {
              return 'assets/images/[name]-[hash][extname]';
            } else if (/\.(ico)$/.test(name)) {
              return 'assets/favicon/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames({ name }) {
            if (/^view/.test(name)) {
              return 'js/view/[name]-[hash].js';
            } else if (/^index/.test(name)) {
              return 'js/index/[name]-[hash].js';
            }
            return 'js/[name]-[hash].js';
          },
          entryFileNames() {
            return 'js/[name]-[hash].js';
          },
        },
      },
    },
  };
});
