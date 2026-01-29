import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
  preview: {
    host: true, // or '0.0.0.0'
    allowedHosts: ['.railway.app'], // allows any *.railway.app subdomain
  },
})
