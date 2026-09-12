import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ouwww.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { format: 'directory' }
});
