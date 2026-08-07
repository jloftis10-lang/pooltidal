/**
 * Logo assets. `logo-full.png` (the real, user-supplied brand mark) is the
 * only file that currently exists, and remains the fallback for every slot
 * below. The optional slots are here so that once purpose-built variants
 * are dropped into `public/`, swapping them in is a one-line change in
 * this file rather than hunting through Header.astro/Footer.astro — do
 * NOT fabricate these files yourself; leave a slot `null` until the real
 * asset is supplied.
 *
 * - horizontal: a wide lockup (icon + wordmark side-by-side) sized for a
 *   horizontal header bar. logo-full.png is a tall stacked lockup, which
 *   is why the header currently looks a bit compressed at typical header
 *   heights — a true horizontal version would look more intentional there.
 * - mark: icon only, no wordmark — for tight spaces (mobile menu trigger,
 *   social avatars).
 * - white: a white/light version of the mark or horizontal lockup, for use
 *   on dark backgrounds (e.g. directly on the teal hero) without the
 *   current logo's white canvas showing as a box.
 */
export const LOGO_ASSETS: {
  horizontal: string | null;
  mark: string | null;
  white: string | null;
  fallback: string;
} = {
  horizontal: null, // e.g. '/logo-horizontal.svg' once supplied
  mark: null, // e.g. '/logo-mark.svg' once supplied
  white: null, // e.g. '/logo-white.svg' once supplied
  fallback: '/logo-full.png',
};

export const HEADER_LOGO = LOGO_ASSETS.horizontal ?? LOGO_ASSETS.fallback;
export const FOOTER_LOGO = LOGO_ASSETS.horizontal ?? LOGO_ASSETS.fallback;
