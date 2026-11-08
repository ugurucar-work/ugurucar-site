import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ugurucar.work',
  integrations: [sitemap({ filter: (page) => !page.includes('/portfolio') })],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
