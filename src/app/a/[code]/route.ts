import { NextRequest, NextResponse } from "next/server";
import { getApiOrigin } from "@/lib/urls";

export const dynamic = "force-dynamic";

/**
 * Public advance-receipt short-link resolver:
 * GET /a/:code → proxy to Stance API → 302 to the S3 PDF URL.
 *
 * WhatsApp messages use https://stance.health/a/{code}.
 * The API owns the Mongo mapping (GET /a/:code).
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

  const apiOrigin = getApiOrigin();
  const upstream = `${apiOrigin}/a/${encodeURIComponent(code)}`;

  try {
    const res = await fetch(upstream, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
      headers: { Accept: "text/html" },
    });

    if (
      res.status === 301 ||
      res.status === 302 ||
      res.status === 307 ||
      res.status === 308
    ) {
      const location = res.headers.get("location");
      if (location) {
        // Redirect to the S3 PDF — browser opens / downloads the receipt
        return NextResponse.redirect(location, 302);
      }
    }

    if (res.status === 404) {
      return new NextResponse("Short link not found.", { status: 404 });
    }
    if (res.status === 410) {
      return new NextResponse("This link has expired or been deactivated.", {
        status: 410,
      });
    }

    return new NextResponse("Unable to resolve short link.", { status: 502 });
  } catch (error) {
    console.error("[advance-short-link] upstream resolve failed", {
      upstream,
      error,
    });
    return new NextResponse("Unable to resolve short link.", { status: 502 });
  }
}
