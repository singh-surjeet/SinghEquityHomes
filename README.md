# SinghEquity Homes Website

Business website for **SinghEquity Homes Ltd** — UK land & property development.
Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), output as static HTML.

---

## Tech stack

| Layer       | Tool                                    |
|-------------|-----------------------------------------|
| Framework   | Astro 4 (static output)                 |
| Styling     | Tailwind CSS 3                          |
| Fonts       | Playfair Display + Inter (Google Fonts) |
| CI/CD       | GitHub Actions → GitHub Pages           |

---

## Day-to-day development

```bash
# Install dependencies (first time only)
npm install

# Start the local dev server — visit http://localhost:4321
npm run dev

# Build the static site into dist/
npm run build

# Preview the built site locally
npm run preview
```

Every push to **`main`** triggers the GitHub Actions workflow at
`.github/workflows/deploy.yml`, which builds the site and publishes `dist/`
to GitHub Pages.

---

## Project structure

```
src/
  layouts/
    BaseLayout.astro   <- <html>, <head>, fonts, scroll-animation JS
  components/
    Header.astro       <- fixed navigation bar
    Hero.astro         <- full-height hero section
    About.astro        <- about split layout
    Services.astro     <- six service cards
    Process.astro      <- numbered process steps
    LandSection.astro  <- sell your land + CTA box
    Contact.astro      <- enquiry form
    Footer.astro       <- footer columns
  pages/
    index.astro        <- assembles all components
  styles/
    global.css         <- Tailwind directives + shared utilities
tailwind.config.mjs    <- brand colours & fonts
astro.config.mjs       <- Astro + Tailwind integration, GitHub Pages site/base
```

### Brand tokens (in `tailwind.config.mjs`)

| Token        | Value     | Usage            |
|--------------|-----------|------------------|
| `gold`       | #B8973A   | Accents, buttons |
| `gold-light` | #D4AF5A   | Hover states     |
| `navy`       | #0F1E35   | Backgrounds      |
| `navy-mid`   | #1A2E4A   | Gradients        |
| `navy-light` | #243A5E   | Gradients        |
| `off-white`  | #F7F5F0   | Section fills    |
| `warm-gray`  | #E8E4DC   | Borders          |

---

## Deployment

### GitHub Pages (current)

`.github/workflows/deploy.yml` builds the site and deploys it on every push
to `main`, using `actions/deploy-pages`. One manual, one-time step is
required in the repo itself:

1. Go to **Settings → Pages** on the GitHub repo.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

Once that's set, the live URL is:

```
https://singh-surjeet.github.io/SinghEquityHomes/
```

`astro.config.mjs` sets `site` and `base` to match this project-page path.
If a custom domain is attached later, update/remove `base` there and add a
`CNAME` file, or switch `site` to the custom domain.

### Moving to production hosting later

The previous setup targeted a friend's hosting via SFTP (GitHub Actions +
`wlixcc/SFTP-Deploy-Action`). That workflow was swapped out in favour of
GitHub Pages for the initial deploy. To reinstate it, restore the SFTP step
in `deploy.yml` (or add it as a second workflow) and add these repository
secrets under **Settings → Secrets and variables → Actions**:

| Secret name | What to put in it                          |
|-------------|--------------------------------------------|
| `SFTP_HOST` | Server hostname, e.g. `srv123.example.com` |
| `SFTP_USER` | SFTP username                              |
| `SFTP_PASS` | SFTP password                              |

---

## Outstanding placeholders

- Replace `[Your Number]` in `src/components/Footer.astro` with your Companies House number.
- The contact email in `src/components/Footer.astro` is still on the `singhequity.co.uk` domain — update once a `singhequityhomes.co.uk` (or chosen) domain is live.

---

(c) 2026 SinghEquity Homes Ltd
