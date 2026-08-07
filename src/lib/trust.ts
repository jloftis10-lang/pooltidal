export interface TrustItem {
  label: string;
  icon: 'waves' | 'droplet' | 'gear' | 'wrench' | 'map-pin';
}

/**
 * Homepage trust strip — factual, service-based claims only. Do NOT add
 * "Licensed", "Insured", star ratings, years-in-business, or guarantee
 * language here unless the corresponding BUSINESS field (business.ts) is
 * actually populated with a verified value. This list is the single place
 * to add/remove/reorder trust-strip items; the component just renders it.
 */
export const TRUST_ITEMS: TrustItem[] = [
  { label: 'Weekly Service', icon: 'waves' },
  { label: 'Water Chemistry', icon: 'droplet' },
  { label: 'Equipment Checks', icon: 'gear' },
  { label: 'Repairs & Upgrades', icon: 'wrench' },
  { label: 'San Diego County', icon: 'map-pin' },
];
