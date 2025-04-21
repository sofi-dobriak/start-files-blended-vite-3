import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { sourcemap: true },
  server: {
    proxy: {
      '/api': {
        target: 'https://restcountries.com/v3.1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
