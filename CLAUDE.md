# Pool Tidal

Marketing/lead-gen site for Pool Tidal, a pool cleaning, repair, and equipment
service company covering San Diego County. Static site, no e-commerce — every
page ends in a phone call or the contact form.

## Stack

- **Astro** (static output, no SSR adapter).
- **Tailwind CSS v4** via `@tailwindcss/vite`, tokens in `src/styles/global.css`'s
  `@theme` block ("Coastal Tide" palette — teal `primary`, warm `accent`, see
  the contrast notes in that file's comment before changing colors).
- Fonts: Outfit (display/headings) + Inter (body), via `@fontsource-variable`.
- Vanilla Astro components, no client-side framework.

## Data model — the real content lives in `src/lib/`

- `src/lib/locations.ts` — the 18 San Diego County cities/communities Pool
  Tidal serves. Each entry has a unique `about` (general area description)
  and `poolNote` (pool-service-specific angle for that area). **Never make a
  new location page a template with just the city name swapped in** — Google
  treats that as thin/duplicate content. Every new city needs its own real
  `about`/`poolNote` copy.
- `src/lib/services.ts` — the 4 services offered. Adding a 5th service is just
  adding an entry here; `src/pages/services/[slug].astro` picks it up
  automatically via `getStaticPaths`.
- `src/lib/business.ts` — name/phone/email/domain used everywhere (header,
  footer, schema.org JSON-LD). Update contact info here, not per-page.

`src/pages/locations/[slug].astro` and `src/pages/services/[slug].astro` are
both `getStaticPaths()`-driven off those arrays — adding a city or service to
the data file is enough to generate its page, nav entries, footer links, and
sitemap entry.

## Blog

`src/content/blog/*.md` is an Astro content collection (schema in
`src/content.config.ts`, loader-based — Astro 5+ Content Layer API, not the
legacy `content/config.ts` pattern). `src/pages/blog/index.astro` lists posts
sorted newest-first; `src/pages/blog/[slug].astro` renders one via
`getStaticPaths()` off the collection and emits its own `BlogPosting` +
`BreadcrumbList` JSON-LD. Reading time is computed from word count at build
time, not stored in frontmatter.

Posts are written for SEO: a real, specific `description` (used as the meta
description), internal links into the relevant `/services/*` and
`/locations/*` pages, and a closing CTA into `/contact`. Keep that pattern
for new posts rather than writing generic copy with no internal linking.

Markdown body styling is the hand-rolled `.prose` block in `global.css`
(headings/lists/links tied to the site's own tokens) — there's no
`@tailwindcss/typography` dependency, so don't add markup that assumes it.

## Logo

`public/logo-full.png` is the real brand mark (a wave-badge icon + "Pool
Tidal / Pool Service / San Diego, CA" wordmark baked into one image) —
user-supplied art, background removed and cropped from the original. It's
used as-is in `Header.astro` (h-16) and `Footer.astro` (h-24); `favicon.png`
and `apple-touch-icon.png` are separate crops of just the icon (no
wordmark), since the full lockup's tagline text is illegible below ~64px
tall — don't drop `logo-full.png` into a small/icon-sized slot without
re-testing legibility at that size first.

The logo's blues are a **deliberately different color family** from the
site's teal/coral "Coastal Tide" UI tokens (a considered choice, not an
oversight) — don't try to reconcile them by recoloring one or the other
without it being asked for again.

## SEO

- `astro.config.mjs`'s `site` is the production domain — keep it in sync with
  `public/robots.txt`'s `Sitemap:` line if the domain changes.
- `Layout.astro` emits a sitewide `LocalBusiness` JSON-LD block (including
  `image`/`logo` pointing at `logo-full.png`) with `areaServed` generated
  from `LOCATIONS`; location pages add their own `BreadcrumbList` JSON-LD.
- `og:image`/`twitter:image` currently point at `logo-full.png` as a
  placeholder — it's square-ish and logo-only, not an ideal social-share
  image. A real 1200×630 OG image (screenshot a styled HTML template, same
  approach noted in the CBD Dog Guide project) is still worth generating
  before launch.

## Contact form

`src/pages/contact.astro` posts to [FormSubmit](https://formsubmit.co) using
`BUSINESS.email` as the target — no backend required. **The first real
submission triggers a one-time confirmation email** that must be clicked to
activate delivery; do that before relying on the form going live.

## Commands

- `npm run dev` — dev server
- `npm run build` — static build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run check` — Astro type/diagnostics check
