import ContactPage from "@/components/contact";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

/* ---------------------------------
   SEO (Contact Page)
---------------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(`
    *[_type == "contactPageSeo"][0]{
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
    title: seo?.metaTitle || "Contact",
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
   Contact Page UI
---------------------------------- */
const Contact = () => {
  return (
    <section>
      <ContactPage />
    </section>
  );
};

export default Contact;
