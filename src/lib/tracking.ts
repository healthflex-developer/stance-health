/**
 * Tracked query params that should be captured on landing and forwarded to
 * every outbound CTA link (app install, dashboard signup, booking).
 */
export const TRACKED_PARAMS = [
  // UTM
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  // Ad-network click IDs
  "fbclid",  // Facebook / Meta
  "gclid",   // Google Ads
  "gbraid",  // Google Ads (app campaigns, privacy-safe)
  "wbraid",  // Google Ads (web campaigns, privacy-safe)
  "ttclid",  // TikTok
  "msclkid", // Microsoft/Bing Ads
  "twclid",  // Twitter/X Ads
  // Internal
  "ref",
  "affiliate_id",
] as const;

export type TrackedParam = (typeof TRACKED_PARAMS)[number];

const SESSION_KEY = "stance_tracking";

/** Read all tracked params from the current URL and persist them. */
export function captureTrackingParams(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const stored = readStoredParams();
  let changed = false;

  for (const key of TRACKED_PARAMS) {
    const value = url.searchParams.get(key);
    if (value) {
      stored[key] = value;
      changed = true;
    }
  }

  if (changed) {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(stored));
    } catch {
      // sessionStorage unavailable (private mode, storage full) — silent fail
    }
  }
}

/** Read the previously captured tracking params from sessionStorage. */
export function readStoredParams(): Partial<Record<TrackedParam, string>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Append stored tracking params to a destination URL.
 * Params already present in the destination are NOT overwritten.
 *
 * Uses the WHATWG URL API on both server and client so the output string is
 * normalized identically in both places (e.g. a bare origin like
 * "https://book.stance.health" always becomes ".../" ). Skipping this on the
 * server (via a `typeof window` check) previously caused the SSR-rendered
 * href to differ from the client-rendered one, triggering a hydration
 * mismatch. Only the sessionStorage read — which is genuinely browser-only —
 * needs to be guarded.
 */
export function buildTrackedUrl(destination: string): string {
  try {
    const url = new URL(destination);
    const stored = readStoredParams();

    for (const [key, value] of Object.entries(stored)) {
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    return url.toString();
  } catch {
    return destination;
  }
}
