/**
 * Public / service URL helpers for the marketing site.
 *
 * Features should import from here instead of reading env inline.
 */

const stripTrailingSlash = (url: string) => url.replace(/\/$/, "");

/** Public advance receipt links (WhatsApp) — always stance.health/a/:code */
export const ADVANCE_SHORT_LINK_BASE_URL = "https://stance.health";

/** Production Stance API */
export const API_ORIGIN_PROD = "https://api.stance.health";

/** Development Stance API (same MongoDB as local bun run dev) */
export const API_ORIGIN_DEV = "https://devapi.stance.health";

/**
 * Primary API for GET /a/:code resolve on deployed stance.health.
 * Override with SHORT_LINK_API_ORIGIN if needed.
 */
export function getApiOrigin(): string {
  if (process.env.SHORT_LINK_API_ORIGIN) {
    return stripTrailingSlash(process.env.SHORT_LINK_API_ORIGIN);
  }

  if (process.env.NEXT_PUBLIC_API_ORIGIN) {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_API_ORIGIN);
  }

  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
  if (graphqlUrl) {
    try {
      return new URL(graphqlUrl).origin;
    } catch {
      // fall through
    }
  }

  // Deployed marketing site (Vercel production) → prod API
  if (process.env.VERCEL_ENV === "production") {
    return API_ORIGIN_PROD;
  }

  // Local next dev / preview → dev API (matches local dashboard API + dev MongoDB)
  return API_ORIGIN_DEV;
}

/** Fallback when primary API returns 404 (e.g. receipt created on dev MongoDB). */
export function getApiOriginFallback(): string | null {
  if (process.env.SHORT_LINK_API_ORIGIN) {
    return null;
  }
  const primary = getApiOrigin();
  if (primary === API_ORIGIN_PROD) {
    return API_ORIGIN_DEV;
  }
  if (primary === API_ORIGIN_DEV) {
    return API_ORIGIN_PROD;
  }
  return null;
}

export function getAdvanceShortLinkBaseUrl(): string {
  return stripTrailingSlash(ADVANCE_SHORT_LINK_BASE_URL);
}
