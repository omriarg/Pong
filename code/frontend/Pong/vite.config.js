import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Django backend
                changeOrigin: true, // Helps to avoid CORS issues
                secure: false, // If using HTTP instead of HTTPS
                rewrite: path => path.replace(/^\/api/, ''), // Optionally rewrite the URL path
            },
        },
    },
});
