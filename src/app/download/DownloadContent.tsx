"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const DEFAULTS = {
  eyebrow: "Smart link",
  heading: "Download the App",
  description: "Phone visitors go straight to their app store. Everyone else lands on the QR page.",
  androidLabel: "Google Play",
  androidUrl: PLAY_STORE_URL,
  iosLabel: "App Store",
  iosUrl: APP_STORE_URL,
  fallbackLabel: "QR page",
  fallbackUrl: "/qr",
};

export default function DownloadContent() {
  const draft = useAdminPreviewBlock("download-redirect", "DownloadRedirect");
  const text = (key: keyof typeof DEFAULTS) => previewText(draft, key, DEFAULTS[key]) || DEFAULTS[key];

  const destinations = [
    { title: "Android phones", labelKey: "androidLabel" as const, urlKey: "androidUrl" as const },
    { title: "iPhone and iPad", labelKey: "iosLabel" as const, urlKey: "iosUrl" as const },
    { title: "Desktop and other devices", labelKey: "fallbackLabel" as const, urlKey: "fallbackUrl" as const },
  ];

  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="download-redirect" blockType="DownloadRedirect">
          <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-[#132644]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
            <div className="relative max-w-xl mx-auto px-4 text-center">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {text("eyebrow")}
              </p>
              <h1 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                {text("heading")}
              </h1>
              <p data-admin-field="description" className="text-white/60 mb-8">
                {text("description")}
              </p>
              <div className="space-y-3 text-left">
                {destinations.map((item) => (
                  <div key={item.urlKey} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#cdfe71]/70 mb-1">{item.title}</p>
                    <p data-admin-field={item.labelKey} className="text-white font-semibold">{text(item.labelKey)}</p>
                    <p data-admin-field={item.urlKey} className="text-white/50 text-sm break-all mt-1">{text(item.urlKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
