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
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
    openGraph?: {
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: any;
    };
  };
}