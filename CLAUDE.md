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
  automatically via `getStaticPaths`. Each service also carries a `faqs[]`
  array (4 real Q&As, not filler) rendered as a `<details>` accordion and
  emitted as `FAQPage` JSON-LD — give a new service real FAQs too, not a
  placeholder, since fabricated FAQ schema is exactly what Google's spam
  policies target.
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

Each post page also shows a "Related articles" section, computed in
`[slug].astro`'s `getStaticPaths()` by ranking other posts on shared `tags`
first, then recency, taking the top 3. It's derived at build time from the
`tags` frontmatter — there's nothing to maintain by hand when adding a post,
just give it accurate tags.

## Photos

Real (non-logo) photography goes in `src/assets/images/` with a **descriptive,
keyword-relevant filename** (e.g. `san-diego-backyard-pool-clear-water.webp`,
not `photo1.webp`) and is imported + rendered via `astro:assets`' `<Picture />`
(see `index.astro`) — not `<Image />` — with:

- `formats={['avif', 'webp']}` plus **`fallbackFormat="webp"`**. Without an
  explicit `fallbackFormat`, Astro doesn't trust webp/avif sources as a "safe"
  universal fallback and silently generates a same-dimensions **PNG** fallback
  per width instead — multiple megabytes each. Always set it explicitly.
- `widths={[...]}` + a `sizes` attribute matched to the image's actual
  rendered width in that layout (check the container/grid CSS, don't guess)
  — this is what makes mobile download a ~15-40KB variant instead of the
  same file desktop gets. Verify with real network requests at a mobile
  viewport before trusting it, not just by reading the markup.
- A specific, honest `alt` — describes what's actually in the frame,
  naturally includes location context, never keyword-stuffed.

This is different from the logo/favicon/OG-image files, which intentionally
stay in `public/` as fixed, already-sized assets referenced by exact path
(`/logo-full.png`, etc.) rather than imported — those are pre-sized for their
one specific use (favicon, header lockup) and don't need responsive variants.

Caption copy for photos should stay honest about what it's actually showing
— don't caption a photo as a specific documented Pool Tidal job/customer
unless that's confirmed true; general/aspirational framing ("what consistent
care looks like") is fine when the photo's provenance isn't established.

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
  from `LOCATIONS`; location, blog, and service pages each add their own
  `BreadcrumbList` JSON-LD, and service pages also add `FAQPage` JSON-LD.
- `src/pages/404.astro` is Astro's static-build convention for a 404 page —
  Vercel picks it up automatically for unmatched routes, nothing else to
  configure.
- `public/og-image.png` (1200×630, `og:image`/`twitter:image`, card type
  `summary_large_image`) was generated the same way as the CBD Dog Guide
  project's — a styled HTML template (teal gradient + caustics background,
  the real logo, a headline and a service-area pill) screenshotted at exact
  OG dimensions. Regenerate the same way if the headline/stat copy changes
  materially. The `LocalBusiness` schema's `image`/`logo` fields still point
  at `logo-full.png` on purpose — that's the actual brand mark, a separate
  concern from the social-share preview image.
- Blog post `<title>` tags only append `| Pool Tidal` when the post's own
  headline leaves room under Google's ~60-char display cutoff (see the
  `pageTitle` logic in `blog/[slug].astro`) — don't hardcode a suffix back
  on there without re-checking length.

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
