import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = withPublishedSeo("navbar", {
  title: "Navbar",
  robots: { index: false, follow: false },
});

export default async function NavbarPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const params = await searchParams;
  if (params.adminPreview !== "1") redirect("/");

  return (
    <main className="min-h-screen bg-[#0c1b30]">
      <Navbar />
    </main>
  );
}
