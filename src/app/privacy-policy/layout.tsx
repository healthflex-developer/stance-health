import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Stance Health's privacy policy — how we collect, use, and protect your personal and health-related information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
