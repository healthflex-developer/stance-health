import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";
import DownloadContent from "./DownloadContent";

export const metadata: Metadata = withPublishedSeo("download", {
  title: "Download the App",
  description: "Download the Stance Health app on Android or iOS.",
  robots: { index: false, follow: false },
});

export default async function DownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const params = await searchParams;
  if (params.adminPreview !== "1") {
    const ua = (await headers()).get("user-agent") || "";
    if (/android/i.test(ua)) redirect(PLAY_STORE_URL);
    if (/iphone|ipad|ipod/i.test(ua)) redirect(APP_STORE_URL);
    redirect("/qr");
  }
  return <DownloadContent />;
}
