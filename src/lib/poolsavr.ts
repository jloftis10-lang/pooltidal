// PoolSavr is a separate, commonly-owned sister company that handles pool
// remodeling (Pool Tidal itself doesn't do remodels — weekly service,
// repair, and equipment only). Keep this centralized rather than
// hardcoding the URL/label in multiple components/pages.
export const POOLSAVR = {
  name: 'PoolSavr',
  url: 'https://www.poolsavr.com',
  navLabel: 'Looking to Remodel?',
} as const;
