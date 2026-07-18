import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat, Unbounded } from "next/font/google";
import "./globals.css";
import MarketingScripts, { GtmNoScript } from "@/components/MarketingScripts";
import TrackingInit from "@/components/TrackingInit";
import LinkTracker from "@/components/LinkTracker";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ScrollToTop from "@/components/ScrollToTop";
import { BASE_URL, GSC_VERIFICATION } from "@/lib/constants";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Stance Health – Evidence-backed Orthopaedic Rehab",
    template: "%s | Stance Health",
  },
  description:
    "Evidence-backed Orthopaedic Rehab in Bangalore. Medical science & technology tailored for your performance and recovery. ACL, knee, back, running, sports rehab.",
  keywords: [
    "physiotherapy Bangalore",
    "orthopaedic rehab",
    "sports rehab",
    "ACL rehab",
    "running analysis",
    "MSK physiotherapy",
    "post-surgical rehab",
    "injury prevention",
    "performance training",
    "Stance Health",
  ],
  authors: [{ name: "Stance Health", url: BASE_URL }],
  creator: "Stance Health",
  publisher: "Stance Health",

  // Canonical + alternates
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Stance Health",
    title: "Stance Health – Evidence-backed Orthopaedic Rehab",
    description:
      "Evidence-backed Orthopaedic Rehab in Bangalore. Medical science & technology tailored for your performance and recovery.",
    images: [
      {
        url: "/assets/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Stance Health – Orthopaedic Rehab",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    site: "@stancehealth",
    creator: "@stancehealth",
    title: "Stance Health – Evidence-backed Orthopaedic Rehab",
    description:
      "Evidence-backed Orthopaedic Rehab in Bangalore. Medical science & technology tailored for your performance and recovery.",
    images: ["/assets/images/og-default.png"],
  },

  // Search-engine verification tokens
  verification: {
    google: GSC_VERIFICATION || undefined,
    // Add "yandex", "bing", etc. here when needed
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Organization + LocalBusiness JSON-LD — present on every page. */
const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Stance Health",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/images/logo.png`,
        width: 120,
        height: 36,
      },
      sameAs: [
        "https://instagram.com/stancehealth",
        "https://linkedin.com/company/stancehealth",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Stance Health",
      url: BASE_URL,
      description:
        "Evidence-backed Orthopaedic Rehab clinic in Bangalore, combining medical science and technology for performance and recovery.",
      image: `${BASE_URL}/assets/images/og-default.png`,
      priceRange: "₹₹",
      telephone: "+91-000-000-0000", // replace with real number
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        // Replace with real coordinates
        latitude: 12.9716,
        longitude: 77.5946,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      hasMap: `${BASE_URL}/centers`,
      parentOrganization: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full ${montserrat.variable} ${unbounded.variable}`}
    >
      <head>
        <MarketingScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GtmNoScript />
        {/* Capture & persist UTM / click-ID params on every navigation */}
        <Suspense fallback={null}>
          <TrackingInit />
          <AnalyticsProvider />
          <ScrollToTop />
        </Suspense>
        {/* Forward captured params onto every internal/external link on click */}
        <LinkTracker />
        {children}
      </body>
    </html>
  );
}
