import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist/react-playground', // Set the output directory to dist/react-playground
  },
  base: '/react-playground/', // This sets the base path for all assets (use it for the uicoded.com/react-playground)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
