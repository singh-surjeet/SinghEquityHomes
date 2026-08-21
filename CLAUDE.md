# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:4321
npm run build    # build static site into dist/
npm run preview  # serve the built dist/ locally
```

There is no lint or test setup in this repo — don't invent commands for either. Verify changes with `npm run build` (it fails loudly on Astro/TS errors) and by eyeballing `npm run dev`.

Node **must** be >=22.12 (Astro 7 hard-requires it and exits immediately otherwise). The CI workflow pins `node-version: '22'` for this reason — don't drop it back to 20.

## Architecture

This is a single-page static marketing site: `src/pages/index.astro` assembles one section component per `<section>` from `src/components/`, in page order (Header, Hero, About, Services, Process, LandSection, Contact, Footer). Each section owns an `id` (`#about`, `#services`, `#process`, `#land`, `#contact`) that `Header.astro`'s nav and in-page CTAs link to via hash anchors — there's no routing, so adding a new section means both dropping the component into `index.astro` and wiring a nav entry in `Header.astro`.

`src/layouts/BaseLayout.astro` is the only layout and every page uses it. Besides the `<head>`/fonts boilerplate, it injects a single global `IntersectionObserver` script that drives the scroll-reveal effect: any element with class `fade-up` starts hidden (`opacity:0`, translated down) via `src/styles/global.css` and gets `.visible` added when it scrolls into view, staggered per sibling. This is the one piece of client-side JS in the whole site — it's inline in the layout, not a component, so it's easy to miss when reading a section component in isolation.

Styling is Tailwind v4 via `@tailwindcss/vite` (configured in `astro.config.mjs`), **not** the `@astrojs/tailwind` integration. Brand tokens (colors, fonts) still live in the legacy-style `tailwind.config.mjs` and are pulled in through Tailwind v4's `@config` compatibility directive at the top of `src/styles/global.css` — that's why a v3-shaped config file coexists with `@import 'tailwindcss'`. Shared component classes (`.btn-primary`, `.section-title`, `.section-eyebrow`, `.section-sub`, etc.) are defined once in `global.css` under `@layer components` and reused across sections rather than repeating utility strings.

Deployment is GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`, builds on every push to `main`). `astro.config.mjs` sets `site`/`base` to match the GitHub Pages project-page path (`/SinghEquityHomes`) — if a custom domain is ever attached, `base` needs to be removed/updated and a `CNAME` added, or the whole page path scheme breaks. GitHub Pages also requires the repo to stay public; it isn't available for private repos on the free plan.

Copy across all components is deliberately written in first-person plural ("we"), direct and low-jargon — a conscious choice for a small property business, not a house style default. Preserve that voice when editing marketing copy; don't drift into third-person corporate phrasing ("SinghEquity Homes Ltd is a...").

## Technology choices

**Astro, static output.** This is a lead-gen marketing site with no user accounts, no dynamic per-request data, and no backend — static HTML is sufficient and simplest to host, and Astro's zero-JS-by-default model keeps it fast without giving up component-based authoring (`.astro` files) for the section-per-file structure this site uses.

**Tailwind v4 via `@tailwindcss/vite`, not `@astrojs/tailwind`.** The site originally used `@astrojs/tailwind`, but that integration's peer dependency range caps at `astro@^5.0.0` even in its latest release — incompatible with Astro 7. Downgrading Astro to 5.x to keep the old integration was considered and rejected: Astro <7.1 carries several patched high-severity XSS/SSRF advisories. Migrating to Tailwind's own official Vite plugin avoided both problems while keeping `tailwind.config.mjs` working unchanged via the `@config` directive.

**GitHub Pages for hosting.** Chosen over the SFTP-to-third-party-hosting setup this repo started with, and over Cloudflare Pages, specifically because it's operable end-to-end from the GitHub Actions workflow and `gh` CLI without needing a separate hosting account connected through an external dashboard. The trade-off is the repo must be public and the site is served from a `/SinghEquityHomes` subpath rather than a domain root, both accepted for the initial deploy.
