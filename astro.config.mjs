import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  // GitHub Pages project site: served from /SinghEquityHomes/, not the domain root.
  // Update or remove these once a custom domain is attached.
  site: 'https://singh-surjeet.github.io',
  base: '/SinghEquityHomes',
});
