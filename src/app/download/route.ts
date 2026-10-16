import { NextRequest, NextResponse } from "next/server";
import { APP_STORE_URL, PLAY_STORE_URL, BASE_URL } from "@/lib/constants";

const WEBSITE_URL = `${BASE_URL}/qr`;

/**
 * Smart app-download redirect. Detects the visitor's platform from the
 * User-Agent header and redirects to the appropriate store listing.
 * Falls back to /qr on desktop / unknown user agents.
 */
export async function GET(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";

  let destination = WEBSITE_URL;

  if (/android/i.test(ua)) {
    destination = PLAY_STORE_URL;
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    destination = APP_STORE_URL;
  }

  return NextResponse.redirect(destination, { status: 307 });
}
