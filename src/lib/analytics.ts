/**
 * Product-analytics pipeline.
 *
 * A single {@link track} call fans an event out to BOTH:
 *   1. GA4 — via the gtag()/dataLayer already loaded by MarketingScripts / GTM.
 *   2. Firebase Analytics — the modular web SDK, lazy-loaded client-side.
 *
 * Every event is automatically enriched with the visitor's stable identifiers
 * and attribution (anonymous_id, session_id, utm_*, gclid/fbclid, landing_page)
 * pulled from the tracking store (see src/lib/tracking.ts), so you never have
 * to pass them manually.
 *
 * Firebase is optional: if its config isn't set the pipeline degrades to
 * GA4-only. Everything is browser-only and SSR-guarded.
 */
import type { Analytics } from "firebase/analytics";
import { FIREBASE_CONFIG } from "@/lib/constants";
import { getTrackingData } from "@/lib/tracking";

type EventParams = Record<string, string | number | boolean | undefined | null>;

// ── gtag / dataLayer typings ────────────────────────────────────────────────
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ── Firebase lazy singleton ─────────────────────────────────────────────────
let firebasePromise: Promise<Analytics | null> | null = null;
let firebaseAnalytics: Analytics | null = null;

/** True once the minimum Firebase config needed for Analytics is present. */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    FIREBASE_CONFIG.apiKey &&
      FIREBASE_CONFIG.projectId &&
      FIREBASE_CONFIG.appId &&
      FIREBASE_CONFIG.measurementId
  );
}

/**
 * Initialize Firebase Analytics once, client-side, via dynamic import so the
 * SDK never enters the SSR bundle or the critical path. Safe to call repeatedly
 * (returns the cached promise). Resolves to null when unsupported/unconfigured.
 */
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;
  if (firebasePromise) return firebasePromise;

  firebasePromise = (async () => {
    try {
      const [{ initializeApp, getApps }, analyticsMod] = await Promise.all([
        import("firebase/app"),
        import("firebase/analytics"),
      ]);
      const supported = await analyticsMod.isSupported().catch(() => false);
      if (!supported) return null;

      const app = getApps().length
        ? getApps()[0]
        : initializeApp(FIREBASE_CONFIG);
      firebaseAnalytics = analyticsMod.getAnalytics(app);
      return firebaseAnalytics;
    } catch {
      // Firebase failed to load — GA4 path still works.
      return null;
    }
  })();

  return firebasePromise;
}

// ── Property enrichment ─────────────────────────────────────────────────────

/** Identifiers/attribution attached to every event automatically. */
function baseProperties(): EventParams {
  const t = getTrackingData();
  return {
    anonymous_id: t.anonymous_id,
    session_id: t.session_id,
    utm_source: t.utm_source,
    utm_medium: t.utm_medium,
    utm_campaign: t.utm_campaign,
    utm_content: t.utm_content,
    utm_term: t.utm_term,
    gclid: t.gclid,
    fbclid: t.fbclid,
    landing_page: t.landing_page,
  };
}

/** Drop null/undefined so we don't send empty params. */
function clean(params: EventParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  }
  return out;
}

// ── Public API ──────────────────────────────────────────────────────────────

/**
 * Fire a custom product-analytics event to GA4 and Firebase at once.
 * Base identifiers/attribution are merged in automatically; explicit `params`
 * win on key collision.
 *
 * @example track("cta_click", { cta: "book_appointment", location: "navbar" })
 */
export function track(eventName: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  const payload = clean({ ...baseProperties(), ...params });

  // 1) GA4 via gtag/dataLayer (works with either standalone gtag or GTM).
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, ...payload });
    }
  } catch {
    /* non-fatal */
  }

  // 2) Firebase Analytics (lazy — fire once the SDK is ready).
  void initAnalytics().then((analytics) => {
    if (!analytics) return;
    import("firebase/analytics")
      .then(({ logEvent }) => logEvent(analytics, eventName, payload))
      .catch(() => {});
  });
}

/**
 * Set user-scoped properties (segment, plan, persona…) on both GA4 and Firebase
 * so subsequent events can be broken down by them.
 */
export function setUserProperties(props: Record<string, string>): void {
  if (typeof window === "undefined") return;
  const cleaned = clean(props) as Record<string, string>;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("set", "user_properties", cleaned);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "set_user_properties", user_properties: cleaned });
    }
  } catch {
    /* non-fatal */
  }

  void initAnalytics().then((analytics) => {
    if (!analytics) return;
    import("firebase/analytics")
      .then(({ setUserProperties: fbSetUserProps }) =>
        fbSetUserProps(analytics, cleaned)
      )
      .catch(() => {});
  });
}

/**
 * Associate the current visitor with a stable user id (post-login) on both
 * destinations. The anonymous_id from the tracking store remains as an event
 * property so pre/post-login sessions can be stitched.
 */
export function identify(userId: string): void {
  if (typeof window === "undefined" || !userId) return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("set", { user_id: userId });
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "identify", user_id: userId });
    }
  } catch {
    /* non-fatal */
  }

  void initAnalytics().then((analytics) => {
    if (!analytics) return;
    import("firebase/analytics")
      .then(({ setUserId }) => setUserId(analytics, userId))
      .catch(() => {});
  });
}

/** Convenience page-view event (also natively tracked by GA4 config). */
export function trackPageView(path: string, title?: string): void {
  track("web_page_view", { page_path: path, page_title: title ?? document.title });
}
