import SingleBlogPage from "@/components/singleblog";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Script from "next/script";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // ✅ await params first

  if (!slug) return { title: "Blog" };

  const data = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      excerpt,
      "mainImage": mainImage.asset->url,
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
    { slug },
    { next: { revalidate: 0 } }
  );

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || data?.title || "Blog",
    description: seo?.metaDescription || data?.excerpt || null,
    keywords: seo?.keywords || null,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl || null,
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle || seo?.metaTitle || data?.title,
      description: seo?.openGraph?.ogDescription || seo?.metaDescription || data?.excerpt,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : data?.mainImage
        ? [{ url: data.mainImage }]
        : [],
    },
  };
}

const SingleBlog = () => {
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
        <SingleBlogPage />
      </section>
    </>
  );
};

export default SingleBlog;