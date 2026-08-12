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
  `about`/`poolNote` copy. Beyond those two required fields, `Location` has
  several **optional** richer fields — `neighborhoods`, `localPoolChallenges`,
  `intro`, `serviceNotes`, `faq`, `relatedLocations`, `featured` — that
  `[slug].astro` only renders when present, so a city can start minimal and
  get filled in later without touching the page template. The 8 `featured:
  true` cities (San Diego, Carlsbad, Oceanside, San Marcos, Vista, Solana
  Beach, Encinitas, Del Mar) have these populated already; use them as the
  reference for what real (non-generic, non-invented) content in these
  fields looks like before adding more.
- `src/lib/services.ts` — the 4 services offered. Adding a 5th service is just
  adding an entry here; `src/pages/services/[slug].astro` picks it up
  automatically via `getStaticPaths`. Each service also carries a `faqs[]`
  array (4 real Q&As, not filler) rendered as a `<details>` accordion and
  emitted as `FAQPage` JSON-LD — give a new service real FAQs too, not a
  placeholder, since fabricated FAQ schema is exactly what Google's spam
  policies target.
- `src/lib/business.ts` — name/phone/email/domain used everywhere (header,
  footer, schema.org JSON-LD). Update contact info here, not per-page. Also
  holds a block of **unverified-fact fields** (`licenseNumber`, `insured`,
  `address`, `openingHours`, `googleBusinessUrl`) that default to
  `undefined` on purpose — every page that could render one of these
  (Footer, `LocalBusiness` JSON-LD) checks for a real value first and
  renders nothing if it's unset. **Never fill these in with a placeholder
  or invented value** — only set them once the real, confirmed fact is
  supplied. Same rule for `src/lib/reviews.ts`'s `REVIEWS` array (rendered
  by `Testimonials.astro`, which renders nothing while it's empty) — no
  sample/demo reviews, ever.
- `src/lib/trust.ts` (`TRUST_ITEMS`, used by `TrustStrip.astro`) and
  `src/lib/differentiators.ts` (`DIFFERENTIATORS`, used on the homepage) —
  small, centralized lists of factual, already-substantiated claims
  (service scope, not credentials/ratings). Add to these lists rather than
  hardcoding a new trust badge or differentiator card inline.

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

Two more required/optional frontmatter fields beyond the original set:
`cluster` (required — one of `Pool Maintenance`, `Pool Equipment`, `Pool
Problems`, `San Diego Pool Care`; groups posts into sections on `/blog`) and
`relatedService` (optional — a service slug from `src/lib/services.ts` that
renders a compact `BlogServiceCTA` at the end of the post). See
`SEO-CONTENT-ROADMAP.md` for planned future topics already mapped to a
cluster and service.

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

For **future field photography** (technician servicing, chemistry testing,
before/after, finished pools, etc.) that doesn't exist yet, don't touch this
pattern — `src/components/PhotoGallery.astro` + `src/lib/photo-slots.ts`
handle it separately by globbing `src/assets/photos/*` and rendering only
the categories that have a real file, per the naming convention in
`IMAGE-GUIDE.md`. It's already mounted on the About page and renders nothing
until real photos are dropped in — never add stock/AI imagery to fill it.

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

## Analytics

Two analytics scripts run sitewide, both from `Layout.astro`, deliberately
via different mechanisms:
- **Vercel Web Analytics** — the official `@vercel/analytics/astro`
  component (`<Analytics />` in the `<body>`).
- **Microsoft Clarity** — the vendor's manual `<script is:inline>` snippet
  pasted verbatim into `<head>` (project ID `xwsuw7hzb9`), not the
  `@microsoft/clarity` npm package. That package is for apps that need to
  programmatically call the Clarity API (custom events, identify, consent) —
  this is a static multi-page site with no such need, so the plain snippet
  is the right fit. Keep `is:inline` on it; without that directive Astro
  will try to process/bundle the script through Vite, which can break its
  plain-JS IIFE syntax.

Custom conversion events go through `src/scripts/track.ts`'s `trackEvent()`
(exposed as `window.trackEvent`, imported once in `Layout.astro`), which
fires to both Vercel Analytics' `track()` and `window.clarity('event', ...)`
in one call. Call sites use inline `onclick="window.trackEvent && ..."`
(guarded since the script needs a tick to attach) rather than addEventListener,
matching the rest of the site's no-framework approach. The fixed event
vocabulary is `phone_click`, `email_click`, `quote_cta_click`,
`quote_form_started`, `quote_form_submitted`, `service_cta_click`,
`location_cta_click`, `calculator_completed`, `cost_calculator_started`,
`cost_calculator_completed`, `exact_quote_requested` — reuse one of these
rather than inventing a new event name, and **never pass name, phone,
email, address, or message text as an event property** — only non-PII
context like a service/location slug.

`src/scripts/attribution.ts` (also imported once in `Layout.astro`)
captures `utm_source`/`utm_medium`/`utm_campaign`/`utm_content` and the
session's true landing page into `sessionStorage` on every page load —
first-touch, not last-touch (a later page without utm params doesn't
overwrite the campaign that actually brought the visitor in). `contact.astro`
reads it back via `getAttribution()` into hidden form fields
(`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `landing_page`)
right before submission, so FormSubmit emails carry lead-source context
without a backend.

## Pool service cost calculator (removed, pricing model kept dormant)

A `/pool-service-cost` lead-qualification calculator (pool type/size/spa/
service/condition → an estimated range) existed briefly and was removed —
the `/remodel` page + PoolSavr cross-promotion took its place as the
featured secondary CTA instead. Its pricing math is still sitting, unused,
in `src/lib/pool-service-pricing.ts` (`estimatePoolServiceCost()`,
**every dollar figure a clearly-marked placeholder**) in case the feature
comes back — if it's clear it won't, delete that file. Don't resurrect a
pricing calculator page without routing through that module rather than
hardcoding numbers again.

## Case studies (dormant)

`src/content/projects/` is a content collection (schema in
`content.config.ts`) for real before/after job write-ups, rendered by
`src/pages/projects/[slug].astro`. It currently has zero `.md` files, so
`getStaticPaths()` generates zero pages — nothing is linked to it anywhere.
**Do not add a placeholder/example entry to "fill it out."** Add a real
`.md` file (with real before/after photos per `IMAGE-GUIDE.md`) only once
an actual completed job exists to document.

## Pool volume calculator

`src/pages/pool-volume-calculator.astro` is a standalone interactive tool
(rectangular/round/oval shape, constant or shallow+deep depth, live gallons
output) — the only page on the site with real client-side logic, in a plain
`<script>` tag (no framework, matches the "vanilla TypeScript" stack note
above). It has its own `FAQPage` + `BreadcrumbList` JSON-LD, is linked from
the footer's Company column, and is cross-linked from blog posts where
chemical dosing comes up (`why-regular-pool-maintenance-matters.md`,
`how-long-to-clear-a-green-pool.md`).

If you touch the calculation logic, verify it in an actual browser rather
than trusting the code by inspection — it's genuinely easy to get the
oval shape factor (0.85), the round-pool radius-vs-diameter math, or the
dual-depth averaging wrong in a way that reads fine but computes wrong.
The three formulas: rectangular/oval = length × width × avg depth (× 0.85
for oval), round = π × radius² × avg depth; cubic feet → gallons is × 7.5.
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

Hidden fields: `_captcha` (FormSubmit's built-in captcha), `_honey` (a
honeypot input hidden via CSS and `tabindex="-1"` — bots that fill every
field trip it, real users never see it), and `_next` (set to
`${BUSINESS.siteUrl}/thank-you`, so a successful submission redirects there
instead of FormSubmit's default confirmation page). `service`/`location`
`<select>` options carry a `data-slug` attribute so `/contact?service=<slug>`
and `/contact?city=<slug>` (used by service/location page CTAs) can
preselect the right option — matched against `data-slug`, not the visible
label, so relabeling an option's text doesn't break the query-param link.
A `?gallons=<n>` param (from the pool volume calculator) prefills the
message field with the estimated volume.

`/thank-you` fires the `quote_form_submitted` analytics event on load, since
the FormSubmit redirect is the only reliable "it actually sent" signal
available without a backend.

## Commands

- `npm run dev` — dev server
- `npm run build` — static build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run check` — Astro type/diagnostics check
