import Portfolio from "@/components/portfolio";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import Script from "next/script";

/* ---------------------------------
   SEO (Portfolio Listing Page)
---------------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(
    `
    *[_type == "portfolioSeo"][0]{
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
    {},
    { next: { revalidate: 0 } }
  );

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || "Portfolio",
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
   Portfolio Page UI
---------------------------------- */
const PortfolioPage = () => {
  return (
    <>
      {/* Google Analytics (gtag.js) - Immediately after <head> */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-4NDX1ZTJFY"
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
        <Portfolio />
      </section>
    </>
  );
};

export default PortfolioPage;
