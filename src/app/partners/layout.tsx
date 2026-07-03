import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Collaborate with Stance Health — we work with doctors, hospitals, sports academies, and corporates to deliver evidence-backed orthopaedic rehab.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partner With Us – Stance Health",
    description:
      "We collaborate with doctors, hospitals, sports academies, and corporates to deliver evidence-backed rehab.",
    url: "/partners",
    images: [{ url: "/assets/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With Us – Stance Health",
    description: "Collaborate with Stance Health to elevate rehab outcomes.",
    images: ["/assets/images/og-default.png"],
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
