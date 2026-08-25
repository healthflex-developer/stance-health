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
 * Public short-link resolver:
 * GET /a/:code → resolve via Stance API → proxy the PDF (not redirect).
 *
 * Why proxy instead of redirect:
 *   iOS Safari follows a 302 to an S3 URL and either shows an AccessDenied
 *   XML page (if the bucket blocks direct access) or triggers a download
 *   instead of an inline PDF view. By fetching the PDF server-side and
 *   streaming it back we control the Content-Type / Content-Disposition
 *   headers, so Safari renders it inline every time.
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
  if (fallback) origins.push(fallback);

  let pdfUrl: string | null = null;
  let lastStatus = 502;

  // Step 1 — resolve the short code to the real S3 PDF URL
  for (const apiOrigin of origins) {
    try {
      const res = await fetchRedirect(apiOrigin, code);

      if ([301, 302, 307, 308].includes(res.status)) {
        const location = res.headers.get("location");
        if (location) {
          pdfUrl = location;
          break;
        }
      }

      if (res.status === 404) { lastStatus = 404; continue; }
      if (res.status === 410) {
        return new NextResponse("This link has expired or been deactivated.", { status: 410 });
      }

      lastStatus = res.status;
    } catch {
      lastStatus = 502;
    }
  }

  if (!pdfUrl) {
    if (lastStatus === 404) return new NextResponse("Short link not found.", { status: 404 });
    return new NextResponse("Unable to resolve short link.", { status: 502 });
  }

  // Step 2 — proxy the PDF so iOS Safari renders it inline
  try {
    const s3Res = await fetch(pdfUrl, { cache: "no-store" });

    if (!s3Res.ok) {
      // Fallback: redirect if proxy fails (e.g. S3 public URL works fine on Android/desktop)
      return NextResponse.redirect(pdfUrl, 302);
    }

    const body = await s3Res.arrayBuffer();

    // Derive a clean filename from the URL (e.g. "Invoice_I-0042.pdf")
    const fileName = pdfUrl.split("/").pop()?.split("?")[0] ?? "document.pdf";

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // inline = show in browser, not download
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Content-Length": String(body.byteLength),
        // Allow Safari to cache for 10 min so re-opens are instant
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch {
    // If proxying fails for any reason, fall back to direct redirect
    return NextResponse.redirect(pdfUrl, 302);
  }
}
