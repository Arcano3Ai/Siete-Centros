import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        breathwork: resolve(import.meta.dirname, 'breathwork.html'),
        kriya: resolve(import.meta.dirname, 'kriya-yoga.html'),
        tantra: resolve(import.meta.dirname, 'tantra.html'),
        circulos: resolve(import.meta.dirname, 'circulos-de-palabra.html'),
        retiros: resolve(import.meta.dirname, 'retiros.html')
      }
    }
  }
});
