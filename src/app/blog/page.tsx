import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogSections } from "@/components/sections/BlogSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { getAllBlogs } from "@/lib/blogs";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("blog", {
    title: "Blog",
    description: "Insights on orthopaedic rehab, sports performance, and recovery from the Stance Health clinical team.",
    image: `${OG_ASSETS}/og-default.png`,
    ogTitle: "Blog – Stance Health",
    ogDescription: "Insights on orthopaedic rehab, sports performance, and recovery.",
  });
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  return (
    <PublishedPage slug="blog">
      <Navbar />
      <BlogSections
        posts={blogs.map((post) => ({
          slug: post.slug,
          title: post.title,
          summary: post.summary,
          coverImage: post.coverImage,
          tags: post.tags.join(","),
          authorName: post.author.name,
          authorAvatar: post.author.avatar,
          publishedAt: post.publishedAt,
          readMinutes: String(post.readMinutes),
        }))}
      />
      <Footer />
    </PublishedPage>
  );
}
