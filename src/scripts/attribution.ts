// Lightweight, best-effort lead-source attribution. No backend, no new
// dependency — just sessionStorage so a multi-page visit (e.g. calculator
// -> contact) keeps the *first* utm params and landing page for the
// session, not whatever page the visitor happens to submit the form from.

interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  landing_path?: string;
}

const STORAGE_KEY = 'pt_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

function readStored(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function captureAttribution(): void {
  try {
    const existing = readStored();
    const params = new URLSearchParams(window.location.search);
    const next: Attribution = { ...existing };

    // Only overwrite a utm param if this page actually carries one —
    // preserves the original campaign params through later, param-less
    // navigation within the same session.
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) next[key] = value;
    });

    // First page of the session only — a visitor landing on /blog/x then
    // browsing to /contact should still be attributed to the blog post.
    if (!next.landing_path) {
      next.landing_path = window.location.pathname;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage can be unavailable (private browsing, etc.) — this is
    // best-effort only and must never break the page.
  }
}

export function getAttribution(): Attribution {
  return readStored();
}

captureAttribution();
