import { track } from '@vercel/analytics';

export type TrackedEvent =
  | 'phone_click'
  | 'email_click'
  | 'quote_cta_click'
  | 'quote_form_started'
  | 'quote_form_submitted'
  | 'service_cta_click'
  | 'location_cta_click'
  | 'calculator_completed'
  | 'cost_calculator_started'
  | 'cost_calculator_completed'
  | 'exact_quote_requested'
  | 'poolsavr_cta_click';

type EventProps = Record<string, string | number | boolean>;

/**
 * Fires a lightweight conversion event to both Vercel Analytics and
 * Microsoft Clarity. Never pass PII here — no names, phone numbers,
 * addresses, emails, or free-text message content as property values.
 * Safe, non-PII properties (a service slug, a city slug, a shape name)
 * are fine.
 */
export function trackEvent(name: TrackedEvent, props?: EventProps): void {
  try {
    track(name, props);
  } catch {
    // Analytics must never break the page.
  }
  try {
    const w = window as typeof window & { clarity?: (...args: unknown[]) => void };
    w.clarity?.('event', name);
  } catch {
    // ignore
  }
}

declare global {
  interface Window {
    trackEvent: typeof trackEvent;
  }
}

window.trackEvent = trackEvent;
