# Adding real photography

Pool Tidal's site currently uses one real photo
(`src/assets/images/san-diego-backyard-pool-clear-water.webp`) plus the logo
and favicon. Everywhere else that would normally show team, technician, or
customer photos is intentionally empty rather than filled with stock or
AI-generated imagery — see `CLAUDE.md`'s legal/business-claim guardrails.

`src/components/PhotoGallery.astro` is built to pick up real photos
automatically once they exist, with zero code changes. It's currently
mounted on the About page.

## How it works

Drop image files into `src/assets/photos/`. The gallery globs that folder at
build time and sorts each file into a category ("slot") by filename prefix.
A slot with no matching file just doesn't render — no broken images, no
gray placeholder boxes.

## Filename convention

`<slot-id>-##.<ext>` — lowercase, hyphenated, two-digit index if you have
more than one photo in a slot. Supported extensions: `.jpg`, `.jpeg`,
`.png`, `.webp`.

| Slot ID | Example filename | What it should show |
|---|---|---|
| `before-after` | `before-after-01.jpg` | A pool before service next to the same pool after |
| `technician-servicing` | `technician-servicing-01.jpg` | A technician actively working on a pool |
| `chemistry-testing` | `chemistry-testing-01.jpg` | Test kit or digital reader in use poolside |
| `brushing-skimming` | `brushing-skimming-01.jpg` | Wall/tile brushing or surface skimming in progress |
| `equipment-pads` | `equipment-pads-01.jpg` | Pump, filter, and equipment pad setups |
| `filter-cleaning` | `filter-cleaning-01.jpg` | A filter being cleaned or serviced |
| `equipment-replacements` | `equipment-replacements-01.jpg` | New equipment being installed |
| `green-pool-recovery` | `green-pool-recovery-01.jpg` | Green/algae pool recovery, in progress or before/after |
| `finished-pools` | `finished-pools-01.jpg` | Clear, finished pools after service |

To add a new category entirely, add an entry to `PHOTO_SLOTS` in
`src/lib/photo-slots.ts` — the gallery picks it up automatically.

## Recommended dimensions

- Minimum **1600×1200px** (4:3) source resolution — Astro's image pipeline
  generates 400/640/800px responsive variants and re-encodes to
  avif/webp, so start bigger than you need rather than smaller.
- Landscape orientation works best in the grid; portrait photos will get
  cropped by `object-cover`.
- JPEG or PNG straight from a phone camera is fine — Astro's build-time
  pipeline handles compression and format conversion. Don't pre-compress.

## What NOT to do

- Never add stock photography, AI-generated images, or photos of people who
  aren't actually Pool Tidal's team/customers.
- Never invent a caption or claim about who's pictured — if a photo doesn't
  have a real, verifiable story behind it, don't use it.
- Don't leave a slot half-filled with a placeholder graphic — an empty slot
  (no render) is always preferable to a fake one.
