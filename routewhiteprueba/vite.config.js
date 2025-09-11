import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@user': path.resolve(__dirname, 'src/pages/user'),
      '@userHooks': path.resolve(__dirname, 'src/pages/user/hooks'),
      '@userComponents': path.resolve(__dirname, 'src/pages/user/components'),
      '@adminComponents': path.resolve(__dirname, 'src/pages/admin/components'),
      '@landingComponents': path.resolve(__dirname, 'src/pages/landing/components'),
    },
  },
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js'),
  },
  optimizeDeps: {
    include: ['@radix-ui/react-dialog'],
  },
  ssr: {
    noExternal: ['@radix-ui/react-dialog'],
  },
});
