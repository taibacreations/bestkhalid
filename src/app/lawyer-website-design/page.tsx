import LogoMarquee from "@/components/marquee";
// import About from "@/components/new-home/about";
import Approach from "@/components/new-home/approach";
import Design from "@/components/new-home/design";
import Faq from "@/components/new-home/faq";
import For from "@/components/new-home/for";
import Hero from "@/components/new-home/hero";
import Law from "@/components/new-home/law";
import Lead from "@/components/new-home/lead";
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

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(
    `*[_type == "lawyerPageSeo"][0]{
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
    title: seo?.metaTitle || "Lawyer Website Design",
    description: seo?.metaDescription || null,
    keywords: seo?.keywords || null,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl || null,
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle || seo?.metaTitle || "Lawyer Website Design",
      description: seo?.openGraph?.ogDescription || seo?.metaDescription || null,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : [],
    },
  };
}

// ✅ async so we can fetch testimonials
export default async function LawyerWebsiteDesign() {
  // ✅ same fetch as the home page
  const testimonials = await client.fetch(
    groq`*[_type == "testimonial" && isActive == true] | order(order asc) {
      _id,
      name,
      role,
      quote,
      "image": image.asset->url,
      rating
    }`,
    {},
    { next: { revalidate: 0 } }
  );

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
        <Hero />
        <LogoMarquee />
        <Potential />
        <Law />
        <Approach />
        {/* <About /> */}
        <Timeline />
        <Lead />
        <Testimonials sanityTestimonials={testimonials} /> {/* ✅ prop passed */}
        <For />
        <Design />
        <Faq />
        <Optimized />
        <Ready />
      </section>
    </>
  );
}