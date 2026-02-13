import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
// Deploy trigger: 2026-02-13 Force Update
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['sgo-icon.svg'],
      manifest: {
        name: 'SGO - Sentra Guest OS',
        short_name: 'SGO',
        description: 'SGO Web Application for Hotel Management',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'sgo-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    }),],
});