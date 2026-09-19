import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/task-tracker/', // important for github pages
  server: {
    port: 3000,
  }
});
