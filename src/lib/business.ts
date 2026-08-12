export const BUSINESS = {
  name: 'Pool Tidal',
  tagline: 'San Diego pool cleaning, repair & service',
  phone: '(858) 800-2312',
  phoneHref: 'tel:+18588002312',
  email: 'jim@pooltidal.com',
  emailHref: 'mailto:jim@pooltidal.com',
  serviceRegion: 'San Diego County, CA',
  siteUrl: 'https://www.pooltidal.com',
  twitterUrl: 'https://x.com/pooltidal',
  instagramUrl: 'https://www.instagram.com/pooltidal/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61592865894686',
  tiktokUrl: 'https://www.tiktok.com/@pool.tidal',

  // Unverified business facts — every field here MUST stay undefined until
  // the real, confirmed value is supplied. Nothing reads these as truthy
  // defaults; templates check `BUSINESS.licenseNumber ? ... : null` (etc.)
  // so an unset field simply never renders anywhere on the public site,
  // in the footer, or in structured data. Do not fill these in with a
  // placeholder or a guess — see CLAUDE.md's legal-claim guardrails.
  licenseNumber: undefined as string | undefined,
  insured: undefined as boolean | undefined,
  address: undefined as
    | { streetAddress: string; addressLocality: string; addressRegion: string; postalCode: string }
    | undefined,
  openingHours: undefined as string[] | undefined, // schema.org-style, e.g. "Mo-Fr 08:00-17:00"
  googleBusinessUrl: undefined as string | undefined,
} as const;
