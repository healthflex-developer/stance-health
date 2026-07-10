/**
 * Global first-party tracking store.
 *
 * On every page load {@link captureTrackingParams} reads any marketing params
 * present in the URL, derives visit context (landing page, referrer), reads
 * analytics cookies (GA / Meta) when available, and generates stable client
 * identifiers — all persisted as a single object in `localStorage`.
 *
 * {@link buildTrackedUrl} appends the forwardable subset of that object to any
 * destination (internal path or external URL) so attribution follows the user
 * across page-to-page navigation and out to the booking / app-store CTAs.
 *
 * Everything here is browser-only and guarded with `typeof window` checks so it
 * is safe to import from Server Components (calls become no-ops during SSR).
 */

// ── Forwardable URL params ─────────────────────────────────────────────────
// Captured from the landing URL and appended to outbound/internal links.
export const TRACKED_PARAMS = [
  // UTM
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_adgroup",
  "utm_matchtype",
  "utm_device",
  "utm_network",
  // Placement / creative
  "placement",
  "asset_id",
  // Ad-network click IDs
  "gclid", // Google Ads
  "fbclid", // Facebook / Meta
  // Extra click IDs still worth capturing (privacy-safe / other networks)
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
  "twclid",
  // Internal
  "ref",
  "affiliate_id",
] as const;

// Visit-derived + generated identifiers stored alongside the URL params.
// These are also forwarded so downstream systems can stitch the session.
const DERIVED_KEYS = [
  "landing_page",
  "referrer",
  "ga_client_id",
  "fbp",
  "fbc",
  "session_id",
  "anonymous_id",
] as const;

export type TrackedParam = (typeof TRACKED_PARAMS)[number];
type DerivedKey = (typeof DERIVED_KEYS)[number];
export type TrackingData = Partial<Record<TrackedParam | DerivedKey, string>>;

const STORAGE_KEY = "stance_tracking";
const SESSION_KEY = "stance_session";
// A new session starts after this much inactivity (or on a brand-new browser).
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

// The keys we actually append to links. `landing_page` / `referrer` are context
// for analytics, not query params we want to smear onto every URL.
const FORWARD_KEYS: readonly string[] = [
  ...TRACKED_PARAMS,
  "ga_client_id",
  "fbp",
  "fbc",
  "session_id",
  "anonymous_id",
];

// ── Storage helpers ─────────────────────────────────────────────────────────

/** Read the persisted tracking object from localStorage. */
export function readStoredParams(): TrackingData {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingData) : {};
  } catch {
    return {};
  }
}

function writeStoredParams(data: TrackingData): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private mode, quota) — silent fail.
  }
}

/** Full persisted tracking object (URL params + derived + generated IDs). */
export function getTrackingData(): TrackingData {
  return readStoredParams();
}

// ── Small utilities ─────────────────────────────────────────────────────────

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function uuid(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  // Fallback for older browsers without crypto.randomUUID.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Parse `_ga` cookie (`GA1.1.<c1>.<c2>`) into the GA4 client id (`<c1>.<c2>`). */
function parseGaClientId(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const parts = raw.split(".");
  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : undefined;
}

// ── Capture ─────────────────────────────────────────────────────────────────

/**
 * Read tracked params from the current URL, derive visit context, read
 * analytics cookies, ensure the anonymous/session IDs exist, and persist the
 * merged result. Safe to call on every navigation.
 */
export function captureTrackingParams(): TrackingData {
  if (typeof window === "undefined") return {};

  const stored = readStoredParams();
  const url = new URL(window.location.href);
  const now = Date.now();

  // 1) URL params — first-touch wins (don't overwrite an earlier attribution).
  for (const key of TRACKED_PARAMS) {
    const value = url.searchParams.get(key);
    if (value && !stored[key]) stored[key] = value;
  }

  // 2) Visit context — captured once, on the first page of the visit.
  if (!stored.landing_page) stored.landing_page = url.pathname;
  if (stored.referrer === undefined) {
    const ref = typeof document !== "undefined" ? document.referrer : "";
    // Only store external referrers; same-origin nav isn't a referrer.
    if (ref && !ref.startsWith(window.location.origin)) stored.referrer = ref;
    else stored.referrer = "";
  }

  // 3) Analytics cookies (present only once GA/Pixel have loaded).
  const gaClientId = parseGaClientId(readCookie("_ga"));
  if (gaClientId) stored.ga_client_id = gaClientId;

  const fbp = readCookie("_fbp");
  if (fbp) stored.fbp = fbp;

  const fbc = readCookie("_fbc");
  if (fbc) {
    stored.fbc = fbc;
  } else if (!stored.fbc && stored.fbclid) {
    // Meta's documented fbc format when only fbclid is available.
    stored.fbc = `fb.1.${now}.${stored.fbclid}`;
  }

  // 4) Stable client + session identifiers.
  if (!stored.anonymous_id) stored.anonymous_id = uuid();

  const lastSeen = Number(window.localStorage.getItem(SESSION_KEY) ?? 0);
  const sessionExpired = !lastSeen || now - lastSeen > SESSION_TTL_MS;
  if (!stored.session_id || sessionExpired) stored.session_id = uuid();
  try {
    window.localStorage.setItem(SESSION_KEY, String(now));
  } catch {
    /* ignore */
  }

  writeStoredParams(stored);
  return stored;
}

// ── Forwarding ──────────────────────────────────────────────────────────────

/**
 * Append the forwardable tracking params to a destination URL.
 *
 * Works for both relative internal paths (`/about`, `/conditions/x?foo=1`) and
 * absolute external URLs (`https://dashboard.stance.health/...`). Params already
 * present in the destination are never overwritten. Non-http schemes
 * (`tel:`, `mailto:`, `#…`, `javascript:`) are returned untouched.
 *
 * Internal same-origin results come back root-relative so Next's client router
 * treats them as in-app navigation; external results keep their full origin.
 */
export function buildTrackedUrl(destination: string): string {
  if (typeof window === "undefined" || !destination) return destination;

  // Skip non-navigational / non-http schemes.
  if (/^(tel:|mailto:|sms:|javascript:|#)/i.test(destination.trim())) {
    return destination;
  }

  try {
    const origin = window.location.origin;
    const url = new URL(destination, origin);

    if (url.protocol !== "http:" && url.protocol !== "https:") return destination;

    const stored = readStoredParams();
    let paramsAdded = false;
    for (const key of FORWARD_KEYS) {
      const value = stored[key as keyof TrackingData];
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
        paramsAdded = true;
      }
    }

    // If nothing was added, return the original string untouched.
    // This prevents the WHATWG URL normalisation (trailing-slash on bare
    // origins, etc.) from producing a string that differs from the SSR-
    // rendered href and causing a React hydration mismatch.
    if (!paramsAdded) return destination;

    // Keep internal links root-relative; return absolute for external hosts.
    if (url.origin === origin) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
    return url.toString();
  } catch {
    return destination;
  }
}
