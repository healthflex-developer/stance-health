import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import QRCode from "qrcode";
import { BASE_URL } from "@/lib/constants";
import QrContent from "./QrContent";

export const metadata: Metadata = withPublishedSeo("qr", {
  title: "Download the App",
  description: "Download the Stance Health app on Android or iOS.",
  alternates: { canonical: "/qr" },
  robots: { index: false, follow: false },
});

const DOWNLOAD_URL = `${BASE_URL}/download`;

export default async function QRPage() {
  const qrDataUrl = await QRCode.toDataURL(DOWNLOAD_URL, {
    width: 400,
    margin: 1,
    color: { dark: "#132644", light: "#ffffff" },
  });

  return <QrContent qrDataUrl={qrDataUrl} />;
}
