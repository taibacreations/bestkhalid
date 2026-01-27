// src/types/blog.ts
export interface SanityBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: string;
  category: string;
  color: string;
  content: any[];
  publishedAt: string;
}
