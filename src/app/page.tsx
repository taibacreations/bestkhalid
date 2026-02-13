import Hero from "@/components/hero";
import Lead from "@/components/lead";
import LogoMarquee from "@/components/marquee";
import Problem from "@/components/problem";
import Process from "@/components/process";
import Services from "@/components/services";
import Solution from "@/components/solution";
import Testimonials from "@/components/testimonials";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { groq } from "next-sanity";

/* ---------------------------------
   SEO (Home Page)
---------------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(`
    *[_type == "homePageSeo"][0]{
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
      }
    }
  `);

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
      description:
        seo?.openGraph?.ogDescription || seo?.metaDescription,
      images: seo?.openGraph?.ogImage
        ? [
            {
              url: urlFor(seo.openGraph.ogImage).url(),
            },
          ]
        : [],
    },
  };
}

/* ---------------------------------
   Home Page UI
---------------------------------- */
export default async function Home() {
  // Fetch testimonials data
  const testimonials = await client.fetch(
    groq`*[_type == "testimonial" && isActive == true] | order(order asc) {
      _id,
      name,
      role,
      quote,
      "image": image.asset->url,
      rating
    }`
  );

  return (
    <main>
      <Hero />
      <LogoMarquee />
      <Problem />
      <Solution />
      <Services />
      <Testimonials sanityTestimonials={testimonials} />
      <Lead />
      <Process />
    </main>
  );
}