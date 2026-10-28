import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { colorTheme } from './build/colorTheme';
import { schemeScript } from './build/schemeScript';

export default defineConfig({
  plugins: [colorTheme(), schemeScript(), vue(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
