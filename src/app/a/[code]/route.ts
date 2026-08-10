import { NextRequest, NextResponse } from "next/server";
import { getApiOrigin, getApiOriginFallback } from "@/lib/urls";

export const dynamic = "force-dynamic";

async function fetchRedirect(
  apiOrigin: string,
  code: string,
): Promise<Response> {
  const upstream = `${apiOrigin}/a/${encodeURIComponent(code)}`;
  return fetch(upstream, {
    method: "GET",
    redirect: "manual",
    cache: "no-store",
    headers: { Accept: "text/html" },
  });
}

/**
 * Public advance-receipt short-link resolver:
 * GET /a/:code → proxy to Stance API → 302 to the S3 PDF URL.
 *
 * WhatsApp messages use https://stance.health/a/{code} (redirects to www).
 * Tries prod API first; on 404 falls back to devapi (dev MongoDB receipts).
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ code: string }> },
) {
  const { code: rawCode } = await context.params;
  const code = rawCode?.trim();

  if (!code) {
    return new NextResponse("Short link not found.", { status: 404 });
  }

  const origins = [getApiOrigin()];
  const fallback = getApiOriginFallback();
  if (fallback) {
    origins.push(fallback);
  }

  let lastStatus = 502;
  let lastUpstream = "";

  for (const apiOrigin of origins) {
    lastUpstream = `${apiOrigin}/a/${encodeURIComponent(code)}`;
    try {
      const res = await fetchRedirect(apiOrigin, code);

      if (
        res.status === 301 ||
        res.status === 302 ||
        res.status === 307 ||
        res.status === 308
      ) {
        const location = res.headers.get("location");
        if (location) {
          return NextResponse.redirect(location, 302);
        }
      }

      if (res.status === 404) {
        lastStatus = 404;
        continue;
      }

      if (res.status === 410) {
        return new NextResponse("This link has expired or been deactivated.", {
          status: 410,
        });
      }

      lastStatus = res.status;
    } catch (error) {
      console.error("[advance-short-link] upstream resolve failed", {
        upstream: lastUpstream,
        error,
      });
      lastStatus = 502;
    }
  }

  if (lastStatus === 404) {
    return new NextResponse("Short link not found.", { status: 404 });
  }

  return new NextResponse("Unable to resolve short link.", { status: 502 });
}
