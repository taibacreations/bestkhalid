import BlogPage from "@/components/blog";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(
    `*[_type == "blogSeo"][0]{
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
    }`,
    {},
    { next: { revalidate: 0 } }
  );

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || "Blog",
    description: seo?.metaDescription || null,
    keywords: seo?.keywords || null,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl || null,
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle || seo?.metaTitle || "Blog",
      description: seo?.openGraph?.ogDescription || seo?.metaDescription || null,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : [],
    },
  };
}

const Blog = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4NDX1ZTJFY"
        async
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4NDX1ZTJFY');
          `,
        }}
      />
      <section>
        <BlogPage />
      </section>
    </>
  );
};

export default Blog;