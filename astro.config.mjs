import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import paperNight from './src/shiki/paper-night.json';

export default defineConfig({
  site: 'https://alexvcasillas.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: paperNight, wrap: false },
  },
});
