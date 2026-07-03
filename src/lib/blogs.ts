import path from "path";
import { promises as fs } from "fs";

export type BlogSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "tip"; content: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  sections: BlogSection[];
};

let _cache: BlogPost[] | null = null;

export async function getAllBlogs(): Promise<BlogPost[]> {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), "public", "data", "blogs.json");
  const raw = await fs.readFile(filePath, "utf-8");
  _cache = JSON.parse(raw) as BlogPost[];
  return _cache;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await getAllBlogs();
  return blogs.find((b) => b.slug === slug) ?? null;
}
