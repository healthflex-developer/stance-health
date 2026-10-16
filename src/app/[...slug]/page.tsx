import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  searchParams: Promise<{ adminPreview?: string }>;
};

// Unknown slugs stay a 404 on the public site. In the admin preview the page
// uses the same header and footer as the rest of the website, with the new
// page content between them.
export default async function UnpublishedPage({ searchParams }: Props) {
  const params = await searchParams;
  if (params.adminPreview !== "1") notFound();
  return (
    <>
      <Navbar />
      <main data-admin-draft-root className="min-h-screen bg-[#0d1f3c] pt-24" />
      <Footer />
    </>
  );
}
