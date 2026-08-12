export interface Review {
  reviewerName: string;
  /** 1-5 */
  rating: number;
  reviewText: string;
  /** Where this review actually came from — shown next to the reviewer name. */
  source: 'Google' | 'Yelp' | 'Facebook' | 'Direct';
  /** ISO date string, e.g. '2026-03-14'. */
  date: string;
  /** Link back to the original review, when the source supports one. */
  sourceUrl?: string;
}

/**
 * REAL, VERIFIED REVIEWS ONLY.
 *
 * This array is empty on purpose — Pool Tidal has no reviews on file yet.
 * Never add a placeholder, sample, or "for demonstration" entry here; the
 * Testimonials component (src/components/Testimonials.astro) is built to
 * render nothing at all when this array is empty, which is the correct
 * behavior. A fabricated review is exactly the kind of unverifiable trust
 * claim CLAUDE.md's legal-claim guardrails exist to prevent.
 *
 * To add a real review once one exists, copy this shape:
 *   {
 *     reviewerName: 'Jane D.',
 *     rating: 5,
 *     reviewText: "Exact quote from the review, not paraphrased.",
 *     source: 'Google',
 *     date: '2026-03-14',
 *     sourceUrl: 'https://g.page/r/....',
 *   }
 */
export const REVIEWS: Review[] = [];
