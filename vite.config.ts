/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import removeConsole from 'vite-plugin-remove-console';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), command === 'build' && removeConsole()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      host: true,
    },
    test: {
      environment: 'jsdom',
    },
  };
});
