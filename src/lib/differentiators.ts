export interface Differentiator {
  title: string;
  description: string;
  icon: 'mail' | 'wrench' | 'waves' | 'map-pin' | 'check';
}

/**
 * "Why Pool Tidal" homepage section. Every claim here must already be
 * substantiated elsewhere on the site (services.ts descriptions/bullets,
 * the FAQ answers, etc.) — this is a summary of existing claims, not a
 * place to introduce new ones. No "licensed/insured/#1/guaranteed"-style
 * language; see CLAUDE.md's legal-claim guardrails before editing.
 */
export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Clear communication',
    description: "You'll know what's being done and why — no jargon, no vague line items.",
    icon: 'mail',
  },
  {
    title: 'Itemized repair quotes',
    description: 'We diagnose before we quote, and quote before any repair work starts — no surprises after the fact.',
    icon: 'wrench',
  },
  {
    title: 'Consistent route service',
    description: 'Tight regional routes so your technician can get to know your pool over time, instead of a different person each visit.',
    icon: 'waves',
  },
  {
    title: 'Local San Diego County routing',
    description: 'Every route is built around the county — from coastal salt-air routes to inland heat routes — not a generic national franchise territory.',
    icon: 'map-pin',
  },
  {
    title: 'Problems caught early',
    description: 'Regular visits mean a rising filter pressure reading or a slow leak gets flagged before it becomes an expensive repair.',
    icon: 'check',
  },
];
