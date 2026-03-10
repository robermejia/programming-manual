import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('shiki')) return 'shiki';
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('react')) return 'react-core';
            if (id.includes('lucide-react')) return 'lucide';
            return 'vendor';
          }
        }
      }
    }
  }
})
