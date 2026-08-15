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
  | 'blog_remodel_cost_san_diego'
  | 'blog_resurfacing_cost_san_diego'
  | 'blog_tile_coping_replacement'
  | 'blog_pool_deck_options'
  | 'blog_repair_vs_remodel'
  | 'blog_remodel_timeline'
  | 'blog_remodel_checklist'
  | 'blog_remodel_equipment_upgrades'
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
