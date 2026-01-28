import BlogPage from "@/components/blog";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

/* ---------------------------------
   SEO (Blog Listing Page)
---------------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(`
    *[_type == "blogPageSeo"][0]{
      seo{
        metaTitle,
        metaDescription,
        keywords,
        canonicalUrl,
        noIndex,
        openGraph{
          ogTitle,
          ogDescription,
          ogImage
        }
      }
    }
  `);

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || "Blog",
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle || seo?.metaTitle,
      description:
        seo?.openGraph?.ogDescription || seo?.metaDescription,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : [],
    },
  };
}

/* ---------------------------------
   Blog Page UI
---------------------------------- */
const Blog = () => {
  return (
    <section>
      <BlogPage />
    </section>
  );
};

export default Blog;
