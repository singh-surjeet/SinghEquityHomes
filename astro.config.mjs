import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  // GitHub Pages project site: served from /SinghEquityHomes/, not the domain root.
  // Update or remove these once a custom domain is attached.
  site: 'https://singh-surjeet.github.io',
  base: '/SinghEquityHomes',
});
