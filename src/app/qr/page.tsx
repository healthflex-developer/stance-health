import type { Metadata } from "next";
import QRCode from "qrcode";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APP_STORE_URL, PLAY_STORE_URL, BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Download Stance Health",
  description: "Download the Stance Health app on Android or iOS.",
  alternates: { canonical: "/qr" },
  robots: { index: false, follow: false },
};

const DOWNLOAD_URL = `${BASE_URL}/download`;

export default async function QRPage() {
  const qrDataUrl = await QRCode.toDataURL(DOWNLOAD_URL, {
    width: 400,
    margin: 1,
    color: { dark: "#132644", light: "#ffffff" },
  });

  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 bg-[#132644]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
          <div className="relative max-w-md mx-auto px-4 text-center">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Get the app
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Download Stance Health
            </h1>
            <p className="text-white/60 mb-8">
              Scan the QR code with your phone camera to download the app, or use the buttons below.
            </p>

            <div className="bg-white rounded-2xl p-6 inline-block mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="Scan to download the Stance Health app" width={280} height={280} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get it on Google Play
              </a>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Download on the App Store
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
