import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb'],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js ecosystem — only loaded when /about is visited (lazy import)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
          // Animation libs — cached independently so returns visits skip re-download
          'vendor-motion': ['framer-motion'],
          'vendor-gsap':   ['gsap'],
        },
      },
    },
  },
})
