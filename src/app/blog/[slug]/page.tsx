import SingleBlogPage from "@/components/singleblog";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

type PageProps = {
  params: {
    slug: string;
  };
};

/* ---------------------------------
   SEO (Single Blog)
---------------------------------- */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = params?.slug;

  // 🛑 Safety check (important)
  if (!slug) {
    return {
      title: "Blog",
    };
  }

  const data = await client.fetch(
    `
    *[_type == "blog" && slug.current == $slug][0]{
      title,
      excerpt,
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
  `,
    { slug },
    { next: { revalidate: 0 } }
  );

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || data?.title,
    description: seo?.metaDescription || data?.excerpt,
    keywords: seo?.keywords,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title:
        seo?.openGraph?.ogTitle ||
        seo?.metaTitle ||
        data?.title,
      description:
        seo?.openGraph?.ogDescription ||
        seo?.metaDescription ||
        data?.excerpt,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : [],
    },
  };
}

/* ---------------------------------
   Blog Page UI
---------------------------------- */
const SingleBlog = () => {
  return (
    <section>
      <SingleBlogPage />
    </section>
  );
};

export default SingleBlog;
