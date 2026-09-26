import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = withPublishedSeo("footer", {
  title: "Footer",
  robots: { index: false, follow: false },
});

export default async function FooterPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const params = await searchParams;
  if (params.adminPreview !== "1") redirect("/");

  return (
    <>
      <Navbar />
      <main className="h-24 bg-[#132644]" />
      <Footer />
    </>
  );
}
