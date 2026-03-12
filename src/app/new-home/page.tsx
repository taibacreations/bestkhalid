import LogoMarquee from "@/components/marquee";
import Approach from "@/components/new-home/approach";
import Design from "@/components/new-home/design";
import Faq from "@/components/new-home/faq";
import For from "@/components/new-home/for";
import Hero from "@/components/new-home/hero";
import Law from "@/components/new-home/law";
import Optimized from "@/components/new-home/optimized";
import Potential from "@/components/new-home/potential";
import Ready from "@/components/new-home/ready";
import Timeline from "@/components/new-home/timeline";
import Testimonials from "@/components/testimonials";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { groq } from "next-sanity";
import Script from "next/script";

/* ---------------------------------
   SEO (Home Page 2)
---------------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(
    `*[_type == "homePageSeo"][0]{
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
        },
        extraMeta
      },
      ogImage
    }`,
    {},
    { next: { revalidate: 0 } }
  );

  const seo = data?.seo;

  return {
    title: seo?.metaTitle || "Home",
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle || seo?.metaTitle,
      description: seo?.openGraph?.ogDescription || seo?.metaDescription,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : [],
    },
  };
}

/* ---------------------------------
   Home Page 2 UI
---------------------------------- */
export default async function Home() {
  const testimonials = await client.fetch(
    groq`*[_type == "testimonial" && isActive == true] | order(order asc) {
      _id,
      name,
      role,
      quote,
      rating,
      "image": image.asset->url
    }`,
    {},
    { next: { revalidate: 0 } }
  );

  return (
    <>
      {/* Google Analytics */}
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
      <div>
        <Hero />
        <LogoMarquee />
        <Potential />
        <Law />
        <Approach />
        <Timeline />
        <Testimonials sanityTestimonials={testimonials} />
        <For />
        <Design />
        <Faq />
        <Optimized />
        <Ready />
      </div>
    </>
  );
}