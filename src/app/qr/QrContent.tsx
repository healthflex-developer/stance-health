"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const DEFAULTS = {
  eyebrow: "Get the app",
  heading: "Download Stance Health",
  description: "Scan the QR code with your phone camera to download the app, or use the buttons below.",
  qrAlt: "Scan to download the Stance Health app",
  playLabel: "Get it on Google Play",
  playUrl: PLAY_STORE_URL,
  appStoreLabel: "Download on the App Store",
  appStoreUrl: APP_STORE_URL,
};

export default function QrContent({ qrDataUrl }: { qrDataUrl: string }) {
  const draft = useAdminPreviewBlock("qr-download", "QrDownload");
  const text = (key: keyof typeof DEFAULTS) => previewText(draft, key, DEFAULTS[key]) || DEFAULTS[key];

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="qr-download" blockType="QrDownload">
          <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-[#132644]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
            <div className="relative max-w-md mx-auto px-4 text-center">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {text("eyebrow")}
              </p>
              <h1 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                {text("heading")}
              </h1>
              <p data-admin-field="description" className="text-white/60 mb-8">
                {text("description")}
              </p>

              <div className="bg-white rounded-2xl p-6 inline-block mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt={text("qrAlt")} width={280} height={280} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a data-admin-field="playLabel" href={text("playUrl")} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {text("playLabel")}
                </a>
                <a data-admin-field="appStoreLabel" href={text("appStoreUrl")} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  {text("appStoreLabel")}
                </a>
              </div>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
