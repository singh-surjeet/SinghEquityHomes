/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8973A',
          light: '#D4AF5A',
          dark: '#8A6E25',
        },
        navy: {
          DEFAULT: '#0F1E35',
          mid: '#1A2E4A',
          light: '#243A5E',
        },
        'off-white': '#F7F5F0',
        'warm-gray': '#E8E4DC',
        'text-mid': '#4A5568',
        'text-light': '#718096',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
