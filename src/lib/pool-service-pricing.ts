/**
 * DORMANT — not currently imported anywhere. This was the pricing model for
 * a `/pool-service-cost` calculator page that has been removed for now.
 * Left in place in case that feature comes back; if it's clear it won't,
 * this file can be deleted. Every dollar figure in this file is a
 * DEVELOPMENT PLACEHOLDER, not a real Pool Tidal rate — see
 * "PRICING INPUTS REQUIRED FROM OWNER" below.
 *
 * Do not hardcode any of these numbers into a page/component. Everything
 * calculator-facing should import from `estimatePoolServiceCost()` so the
 * whole model stays a one-file change once real pricing is confirmed.
 *
 * ============================================================
 * PRICING INPUTS REQUIRED FROM OWNER (replace every PLACEHOLDER value):
 *   1. Base monthly weekly-service range for a small chlorine pool, no
 *      spa, clear/normal condition.
 *   2. How much more a medium and a large pool cost per month vs. small.
 *   3. How much more a saltwater pool costs per month vs. chlorine
 *      (salt cell maintenance, testing).
 *   4. How much more an attached spa adds per month.
 *   5. Base one-time price range for a green-pool/algae recovery job
 *      (and whether it scales with pool size — assumed yes below).
 *   6. Base one-time price range for a one-time/standard cleaning
 *      (move-in/move-out, vacation return, etc.) on a pool that isn't
 *      green — assumed lower than a full algae recovery.
 *   7. Whether any service areas carry a route/travel surcharge (South
 *      Bay vs. North Coastal, etc.) — currently no location modifier is
 *      applied; only add one if a real routing cost differential exists.
 * ============================================================
 */

export type PoolSize = 'small' | 'medium' | 'large' | 'not-sure';
export type PoolType = 'chlorine' | 'saltwater' | 'not-sure';
export type SpaOption = 'yes' | 'no';
export type ServiceNeeded = 'weekly-maintenance' | 'green-pool-cleanup' | 'one-time-service' | 'not-sure';
export type PoolCondition = 'clear' | 'slightly-cloudy' | 'green-algae' | 'not-serviced-recently' | 'not-sure';

export interface PoolServiceCalculatorInput {
  poolSize: PoolSize;
  poolType: PoolType;
  spa: SpaOption;
  service: ServiceNeeded;
  condition: PoolCondition;
}

export interface PoolServiceEstimate {
  mode: 'recurring' | 'one-time';
  low: number;
  high: number;
  label: string;
  /** Short factual bullets summarizing what drove the estimate — shown under the range. */
  basedOn: string[];
  /** Additional context/disclaimers surfaced by the inputs (e.g. condition-driven notes). */
  notes: string[];
}

interface Range {
  min: number;
  max: number;
}

function addRange(a: Range, b: Range): Range {
  return { min: a.min + b.min, max: a.max + b.max };
}

// ---- PLACEHOLDER pricing config — see doc block above ----
const PRICING = {
  recurring: {
    // Small chlorine pool, no spa, clear condition, weekly service.
    baseMonthly: { min: 120, max: 160 } as Range, // PLACEHOLDER
    sizeModifier: {
      small: { min: 0, max: 0 } as Range,
      medium: { min: 20, max: 30 } as Range, // PLACEHOLDER
      large: { min: 45, max: 65 } as Range, // PLACEHOLDER
      'not-sure': { min: 20, max: 30 } as Range, // treated as medium
    } satisfies Record<PoolSize, Range>,
    poolTypeModifier: {
      chlorine: { min: 0, max: 0 } as Range,
      saltwater: { min: 10, max: 15 } as Range, // PLACEHOLDER — salt cell upkeep
      'not-sure': { min: 0, max: 0 } as Range,
    } satisfies Record<PoolType, Range>,
    spaModifier: {
      yes: { min: 20, max: 30 } as Range, // PLACEHOLDER
      no: { min: 0, max: 0 } as Range,
    } satisfies Record<SpaOption, Range>,
  },
  oneTime: {
    // Base one-time job price by service type, before size/condition.
    baseByService: {
      'green-pool-cleanup': { min: 250, max: 450 } as Range, // PLACEHOLDER
      'one-time-service': { min: 100, max: 180 } as Range, // PLACEHOLDER
    } satisfies Record<'green-pool-cleanup' | 'one-time-service', Range>,
    sizeModifier: {
      small: { min: 0, max: 0 } as Range,
      medium: { min: 30, max: 50 } as Range, // PLACEHOLDER
      large: { min: 75, max: 120 } as Range, // PLACEHOLDER
      'not-sure': { min: 30, max: 50 } as Range,
    } satisfies Record<PoolSize, Range>,
    // Only meaningfully affects green-pool-cleanup pricing — a one-time
    // *standard* cleaning on a clear pool doesn't get a condition penalty.
    conditionModifier: {
      clear: { min: 0, max: 0 } as Range,
      'slightly-cloudy': { min: 0, max: 40 } as Range, // PLACEHOLDER
      'green-algae': { min: 100, max: 250 } as Range, // PLACEHOLDER — heavier chemical/labor load
      'not-serviced-recently': { min: 50, max: 120 } as Range, // PLACEHOLDER
      'not-sure': { min: 0, max: 0 } as Range,
    } satisfies Record<PoolCondition, Range>,
  },
} as const;

const SIZE_LABEL: Record<PoolSize, string> = {
  small: 'Small pool',
  medium: 'Medium pool',
  large: 'Large pool',
  'not-sure': 'Pool size not specified',
};

const TYPE_LABEL: Record<PoolType, string> = {
  chlorine: 'Chlorine',
  saltwater: 'Saltwater',
  'not-sure': 'Pool type not specified',
};

const SERVICE_LABEL: Record<ServiceNeeded, string> = {
  'weekly-maintenance': 'Weekly service',
  'green-pool-cleanup': 'Green pool cleanup',
  'one-time-service': 'One-time service',
  'not-sure': 'Service not specified',
};

const CONDITION_LABEL: Record<PoolCondition, string> = {
  clear: 'Clear water',
  'slightly-cloudy': 'Slightly cloudy',
  'green-algae': 'Green/algae',
  'not-serviced-recently': "Hasn't been serviced recently",
  'not-sure': 'Condition not specified',
};

export function estimatePoolServiceCost(input: PoolServiceCalculatorInput): PoolServiceEstimate {
  const { poolSize, poolType, spa, service, condition } = input;
  const basedOn = [SIZE_LABEL[poolSize]];
  if (poolType !== 'not-sure') basedOn.push(TYPE_LABEL[poolType]);
  if (spa === 'yes') basedOn.push('Attached spa');
  basedOn.push(SERVICE_LABEL[service]);

  if (service === 'green-pool-cleanup' || service === 'one-time-service') {
    const cfg = PRICING.oneTime;
    const base = cfg.baseByService[service];
    let range = addRange(base, cfg.sizeModifier[poolSize]);

    const notes: string[] = [];
    if (service === 'green-pool-cleanup') {
      range = addRange(range, cfg.conditionModifier[condition]);
      if (condition !== 'not-sure') basedOn.push(CONDITION_LABEL[condition]);
      notes.push(
        'Green pool recovery is priced per job, not per visit — final cost depends on how far along the algae is and how many treatment cycles it takes to fully clear.'
      );
    } else {
      notes.push(
        'A one-time cleaning on a pool that turns out to be green or heavily neglected may need to switch to a green-pool recovery instead — we\'ll confirm before starting.'
      );
    }

    return {
      mode: 'one-time',
      low: range.min,
      high: range.max,
      label: 'Estimated one-time service range',
      basedOn,
      notes,
    };
  }

  // weekly-maintenance or not-sure -> recurring monthly estimate
  const cfg = PRICING.recurring;
  let range = cfg.baseMonthly;
  range = addRange(range, cfg.sizeModifier[poolSize]);
  range = addRange(range, cfg.poolTypeModifier[poolType]);
  range = addRange(range, cfg.spaModifier[spa]);

  const notes: string[] = [];
  if (condition === 'green-algae' || condition === 'not-serviced-recently') {
    notes.push(
      'Pools that are green or haven\'t been serviced recently typically need an initial one-time recovery visit before settling into the regular monthly rate above.'
    );
  } else if (condition === 'slightly-cloudy') {
    notes.push('A pool that\'s currently slightly cloudy may need an extra visit or two to fully rebalance before settling into a normal routine.');
  }

  return {
    mode: 'recurring',
    low: range.min,
    high: range.max,
    label: 'Estimated monthly service range',
    basedOn,
    notes,
  };
}
