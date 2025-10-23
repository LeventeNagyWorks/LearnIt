import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/data': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/registration': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/login': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/upload': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/updateFavorite': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/delete': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
