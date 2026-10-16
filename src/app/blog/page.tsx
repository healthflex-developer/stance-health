import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogs } from "@/lib/blogs";
import { OG_ASSETS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on orthopaedic rehab, sports performance, and recovery from the Stance Health clinical team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog – Stance Health",
    description:
      "Insights on orthopaedic rehab, sports performance, and recovery.",
    url: "/blog",
    images: [{ url: `${OG_ASSETS}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog – Stance Health",
    description: "Insights on orthopaedic rehab, sports performance, and recovery.",
    images: [`${OG_ASSETS}/og-default.png`],
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="section-title mb-3">
              Stance <span>Blog</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Evidence-based insights on orthopaedic rehab, sports performance, and recovery — from our clinical team.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-[#1a3358] rounded-2xl overflow-hidden border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-auto">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      className="rounded-full bg-[#132644]"
                    />
                    <div>
                      <p className="text-xs font-medium text-white/80">{post.author.name}</p>
                      <p className="text-xs text-white/40">
                        {formatDate(post.publishedAt)} · {post.readMinutes} min
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
