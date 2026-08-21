import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  // Served from the custom domain root via public/CNAME — see README for the
  // Cloudflare DNS records required to point it at GitHub Pages.
  site: 'https://singhequityhomes.co.uk',
});
