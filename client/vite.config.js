import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
