import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({
    filename: 'qr-order-admin-rollup-bundle.html',
    gzipSize: true,
    open: true,
  })],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
