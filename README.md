# Pool Tidal

Marketing/lead-gen site for Pool Tidal, a pool cleaning, repair, and
equipment service company covering San Diego County. Static Astro site, no
backend, no e-commerce — every page ends in a phone call or the contact
form. Deployed to Vercel as a static build.

See `CLAUDE.md` for the full architecture reference (data model, blog
system, photo pipeline, SEO/structured-data setup). This file covers getting
the project running locally and how the lead-capture form works.

## Commands

```bash
npm install
npm run dev       # dev server
npm run build     # static build to dist/
npm run preview   # preview the production build locally
npm run check     # Astro type/diagnostics check
```

## Project structure at a glance

- `src/lib/` — centralized data: `business.ts` (contact info + optional
  unverified facts), `services.ts`, `locations.ts`, `reviews.ts` (empty
  until real reviews exist), `trust.ts`, `differentiators.ts`,
  `photo-slots.ts`. Pages are generated from these, not hardcoded.
- `src/content/blog/` — blog posts (Astro content collection).
- `src/pages/` — routes, including `[slug].astro` dynamic routes for
  services and locations.
- `src/components/` — shared UI.
- `src/assets/photos/` — drop real field photography here; see
  `IMAGE-GUIDE.md`.

## How the contact form works

`src/pages/contact.astro` posts directly to
[FormSubmit](https://formsubmit.co) — a hosted form-relay service, so there's
no backend or server code involved. Submissions get emailed to
`BUSINESS.email` (`src/lib/business.ts`).

**Activation (one-time, required before the form works):** the first real
submission FormSubmit receives for an email address triggers a confirmation
email to that address. Someone with access to `BUSINESS.email` has to click
the link in that email before FormSubmit will deliver any submissions
(including that first one). Nothing else needs configuring — no API keys, no
environment variables.

**Where submissions go:** straight to `BUSINESS.email` as a plain email,
formatted by FormSubmit. There's no database or admin panel — the inbox is
the record.

**Spam protection:** `_captcha` (FormSubmit's built-in captcha, shown on
their confirmation flow) plus a honeypot field (`_honey`) — a hidden input
real users never see or fill in; if it arrives populated, FormSubmit treats
the submission as spam.

**Thank-you redirect:** the form sets FormSubmit's `_next` field to
`https://www.pooltidal.com/thank-you`, so a successful submission redirects
there instead of FormSubmit's generic confirmation page. `/thank-you` fires
the `quote_form_submitted` analytics event on load — that redirect is the
only reliable "this actually sent" signal available without a backend to
confirm delivery server-side.

**Safe testing:** submitting the form for real during development will
email `BUSINESS.email` and (before activation) trigger FormSubmit's
confirmation email. To test the UI/UX without sending real email, inspect
the form markup and preselection/validation behavior directly (e.g. via
browser devtools or a headless browser) rather than clicking Submit, or
temporarily point `formAction` in `contact.astro` at a disposable test
inbox. Don't submit test data to the live `BUSINESS.email` address.

## Analytics

Two sitewide scripts (both wired in `Layout.astro`): Vercel Web Analytics
(pageviews, automatic) and Microsoft Clarity (session recordings/heatmaps).
Custom conversion events go through `window.trackEvent()`
(`src/scripts/track.ts`) — see `CLAUDE.md`'s Analytics section for the full
event vocabulary and the hard rule against sending PII as event properties.

## Content planning

`SEO-CONTENT-ROADMAP.md` lists future blog topics, organized by search
intent and mapped to the service/cluster each would support — a planning
list, not drafts in progress.
