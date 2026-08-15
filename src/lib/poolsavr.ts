// PoolSavr is a separate, commonly-owned sister company that handles pool
// remodeling (Pool Tidal itself doesn't do remodels — weekly service,
// repair, and equipment only). Keep this centralized rather than
// hardcoding the URL/label in multiple components/pages.
export const POOLSAVR = {
  name: 'PoolSavr',
  url: 'https://www.poolsavr.com',
  navLabel: 'Remodel Cost Estimator',
} as const;

export type PoolSavrSource =
  | 'remodel_page_primary'
  | 'remodel_page_secondary'
  | 'homepage_services'
  | 'service_pool_repair'
  | 'service_equipment_installation'
  | 'blog_variable_speed_pumps'
  | 'blog_saltwater_vs_chlorine'
  | `location_${string}`
  | 'thank_you';

export function getPoolSavrUrl(source: PoolSavrSource): string {
  const url = new URL(POOLSAVR.url);
  url.searchParams.set('utm_source', 'pooltidal');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'remodel_funnel');
  url.searchParams.set('utm_content', source);
  return url.toString();
}
