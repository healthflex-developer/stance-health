/**
 * Public / service URL helpers for the marketing site.
 */

const stripTrailingSlash = (url: string) => url.replace(/\/$/, "");

/**
 * Origin of the Stance API that serves GET /a/:code (advance receipt) redirects.
 * Local: SHORT_LINK_API_ORIGIN (default http://localhost:3000)
 * Deployed: https://api.stance.health
 */
export function getApiOrigin(): string {
  if (process.env.SHORT_LINK_API_ORIGIN) {
    return stripTrailingSlash(process.env.SHORT_LINK_API_ORIGIN);
  }

  if (process.env.NEXT_PUBLIC_API_ORIGIN) {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_API_ORIGIN);
  }

  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return "https://api.stance.health";
  }

  // next dev / preview without explicit override → local API
  return "http://localhost:3000";
}
