export interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  bullets: string[];
  icon: 'waves' | 'wrench' | 'gear' | 'sun';
}

export const SERVICES: Service[] = [
  {
    slug: 'weekly-cleaning-maintenance',
    name: 'Weekly Pool Cleaning & Maintenance',
    shortDesc: 'Recurring visits that keep water balanced, equipment running, and your pool ready to swim.',
    longDesc:
      "Our core service is a scheduled weekly visit: we test and balance your water chemistry, skim and vacuum debris, brush walls and tile, empty baskets, and check equipment for early warning signs before they turn into repair calls. You get a consistent tech who knows your pool, not a rotating crew.",
    bullets: [
      'Water testing and chemical balancing (chlorine, pH, alkalinity, stabilizer)',
      'Skimming, vacuuming, and brushing walls and tile',
      'Skimmer and pump basket cleanout',
      'Filter pressure and equipment check every visit',
      'Photo or text update after each visit on request',
    ],
    icon: 'waves',
  },
  {
    slug: 'pool-repair',
    name: 'Pool Repair',
    shortDesc: 'Diagnostics and repair for pumps, filters, leaks, heaters, and automation systems.',
    longDesc:
      "When something breaks, we diagnose before we quote — no guessing, no unnecessary part swaps. We repair and troubleshoot pumps, filters, salt cells, heaters, plumbing leaks, and automation/control systems across the makes and models common in San Diego County builds, old and new.",
    bullets: [
      'Pump, motor, and filter diagnostics and repair',
      'Leak detection and plumbing repair',
      'Salt cell and heater troubleshooting',
      'Automation and control system repair',
      'Straightforward, itemized quotes before any work starts',
    ],
    icon: 'wrench',
  },
  {
    slug: 'equipment-installation',
    name: 'Equipment Installation & Replacement',
    shortDesc: 'Pump, filter, heater, and automation upgrades sized correctly for your pool.',
    longDesc:
      'Old, inefficient equipment costs more to run and fails more often. We install and replace pumps, filters, heaters, salt systems, and automation controllers, sizing each component to your pool rather than defaulting to whatever is easiest to source — including variable-speed pump upgrades that typically cut energy costs.',
    bullets: [
      'Variable-speed pump upgrades',
      'Filter replacement (cartridge, DE, and sand)',
      'Gas and heat-pump heater installation',
      'Salt chlorination system installation',
      'Smart automation and app-controlled system setup',
    ],
    icon: 'gear',
  },
  {
    slug: 'green-pool-recovery',
    name: 'Green Pool Recovery & Seasonal Openings',
    shortDesc: 'Bringing neglected or algae-heavy pools back to swim-ready, plus seasonal opening/closing service.',
    longDesc:
      "Inherited a green pool, coming back from vacation to a mess, or need a pool opened or closed for the season? We handle full green-to-clean recovery — shock treatment, filtration cycling, and repeat balancing until the water is clear — as well as seasonal opening and closing visits for pools that aren't run year-round.",
    bullets: [
      'Full algae and green-pool recovery',
      'Shock treatment and multi-visit rebalancing',
      'Seasonal opening service',
      'Seasonal closing and winterization',
      'One-time deep cleans for move-in/move-out',
    ],
    icon: 'sun',
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
