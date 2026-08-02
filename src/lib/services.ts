export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  bullets: string[];
  icon: 'waves' | 'wrench' | 'gear' | 'sun';
  faqs: Faq[];
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
    faqs: [
      {
        question: 'How often does my pool actually need to be cleaned?',
        answer:
          "Most San Diego County pools do well on a weekly visit, especially in summer when heat and pool use are highest. Lower-use pools or pools with strong existing filtration can sometimes stretch to every other week — we'll recommend a schedule based on your specific pool rather than defaulting to one plan for everyone.",
      },
      {
        question: "What's included in a routine cleaning visit?",
        answer:
          'Water testing and chemical balancing, skimming and vacuuming, brushing walls and tile, emptying skimmer and pump baskets, and a quick equipment check for anything that looks off — filter pressure, unusual noise, that kind of thing.',
      },
      {
        question: 'Do I need to be home for the visit?',
        answer:
          "No. Most of our weekly customers aren't home when we service the pool. We just need gate or yard access — let us know the best way to get in and we'll work around it.",
      },
      {
        question: 'What happens if my pool has a pool cover or it rains?',
        answer:
          "We still perform the visit — testing and balancing matters even more after rain, since it changes water chemistry. If the pool is covered, we'll service what's accessible and flag anything that needs the cover off to address properly.",
      },
    ],
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
    faqs: [
      {
        question: 'How do I know if I need a repair versus just a cleaning?',
        answer:
          "Signs like unusual pump noise, a filter pressure gauge that's climbing, water that won't clear despite balanced chemistry, or a dropping water level usually point to a repair issue rather than something a cleaning fixes. If you're not sure, we can take a look and tell you honestly which one it is.",
      },
      {
        question: 'Do you diagnose before quoting, or just guess and quote?',
        answer:
          "We diagnose first. That might mean pressure testing for a leak, checking a pump's electrical draw, or running a filter through a cycle to see where it's actually failing — then we give you an itemized quote for what we find, not a guess.",
      },
      {
        question: 'What if the problem turns out to be something else once you start?',
        answer:
          "We'll stop and talk to you before doing anything beyond what was quoted. No surprise line items added after the fact without your sign-off.",
      },
      {
        question: 'Do you work on all pool equipment brands?',
        answer:
          "We work across the equipment brands and setups common in San Diego County pools, both older systems and newer builds. If you have something unusual, mention it when you reach out and we'll confirm we're a good fit before scheduling.",
      },
    ],
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
    faqs: [
      {
        question: 'How do I know if equipment needs replacing instead of repairing?',
        answer:
          "It usually comes down to age, repair cost relative to replacement cost, and how often it's been failing. A pump that's needed two repairs in a year is often cheaper to replace than to keep patching. We'll give you a straight answer on which makes more sense for your situation rather than defaulting to a sale.",
      },
      {
        question: 'Is a variable-speed pump worth the extra cost?',
        answer:
          "For most pools running filtration several hours a day, yes — the lower energy draw over the pump's lifespan tends to offset the higher upfront cost, plus they run quieter. It depends on your runtime and local electricity rates though; we can walk through the actual numbers for your pool.",
      },
      {
        question: 'How long does an equipment installation take?',
        answer:
          'A straightforward pump or filter swap is usually done in a single visit. Larger jobs — a full automation system, a new heater with gas line work, or a salt system installation — can take longer depending on what else is involved.',
      },
      {
        question: 'Do equipment upgrades ever require permits?',
        answer:
          "Some upgrades can, depending on your city and what's being installed — gas heater work in particular sometimes does. We'll flag it if your project needs one rather than assuming either way.",
      },
    ],
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
    faqs: [
      {
        question: 'How long does it take to clear a green pool?',
        answer:
          "A moderately green pool typically takes 2-4 days of shock treatment and continuous filtration to fully clear. Severely neglected or swampy pools can take longer, sometimes needing a second round. We'll give you a realistic timeline once we see the pool.",
      },
      {
        question: "Can a pool that's been neglected for months still be saved?",
        answer:
          "In almost all cases, yes. Green and neglected pools look worse than they usually are — it's rare that a pool needs to be drained and restarted from scratch rather than recovered through treatment and filtration.",
      },
      {
        question: 'Do I need to close my pool for winter in San Diego?',
        answer:
          "Most San Diego County pools don't need a full winter shutdown the way colder climates do, since the season stays mild enough to keep running. Some owners still prefer a seasonal closing for a pool they won't use for a few months — we can do either.",
      },
      {
        question: 'What actually causes a pool to turn green in the first place?',
        answer:
          'Almost always a chlorine level that dropped too low for too long, letting algae establish. That can happen from a service gap, an equipment failure that went unnoticed, or heavy rain diluting chemistry without a rebalance afterward.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
