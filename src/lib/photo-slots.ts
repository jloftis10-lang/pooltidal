export interface PhotoSlot {
  id: string;
  label: string;
  description: string;
}

// Each slot maps to a filename prefix under src/assets/photos/ — see
// IMAGE-GUIDE.md at the repo root for the full naming convention and
// recommended dimensions. Do not fill these with stock or AI-generated
// photography; a slot with no real file simply doesn't render.
export const PHOTO_SLOTS: PhotoSlot[] = [
  {
    id: 'before-after',
    label: 'Before & After',
    description: 'A pool before service next to the same pool after.',
  },
  {
    id: 'technician-servicing',
    label: 'Technician Servicing',
    description: 'A technician actively working on a pool.',
  },
  {
    id: 'chemistry-testing',
    label: 'Water Chemistry Testing',
    description: 'Test kit or digital reader in use poolside.',
  },
  {
    id: 'brushing-skimming',
    label: 'Brushing & Skimming',
    description: 'Wall/tile brushing or surface skimming in progress.',
  },
  {
    id: 'equipment-pads',
    label: 'Equipment Pads',
    description: 'Pump, filter, and equipment pad setups.',
  },
  {
    id: 'filter-cleaning',
    label: 'Filter Cleaning',
    description: 'A filter being cleaned or serviced.',
  },
  {
    id: 'equipment-replacements',
    label: 'Equipment Replacements',
    description: 'New equipment being installed.',
  },
  {
    id: 'green-pool-recovery',
    label: 'Green Pool Recovery',
    description: 'Green/algae pool recovery in progress or before/after.',
  },
  {
    id: 'finished-pools',
    label: 'Finished Pools',
    description: 'Clear, finished pools after service.',
  },
];
