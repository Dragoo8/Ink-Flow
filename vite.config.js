import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // للتوافق مع GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
