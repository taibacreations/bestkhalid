import LogoMarquee from "@/components/marquee";
import About from "@/components/fitness-coach-website-design/about";
import Approach from "@/components/fitness-coach-website-design/approach";
import Design from "@/components/fitness-coach-website-design/design";
import Faq from "@/components/fitness-coach-website-design/faq";
import Hero from "@/components/fitness-coach-website-design/hero";
import Law from "@/components/fitness-coach-website-design/law";
import Lead from "@/components/fitness-coach-website-design/lead";
import Ready from "@/components/fitness-coach-website-design/ready";
import Timeline from "@/components/fitness-coach-website-design/timeline";
import Testimonials from "@/components/fitness-coach-website-design/testimonials";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { groq } from "next-sanity";


// ✅ MUST be outside component
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(
    `*[_type == "fitnessPageSeo"][0]{
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
    title: seo?.metaTitle || "Fitness Website Design",
    description: seo?.metaDescription || null,
    keywords: seo?.keywords || null,
    robots: seo?.noIndex ? "noindex,nofollow" : "index,follow",
    alternates: {
      canonical: seo?.canonicalUrl || null,
    },
    openGraph: {
      title:
        seo?.openGraph?.ogTitle ||
        seo?.metaTitle ||
        "Fitness Website Design",
      description:
        seo?.openGraph?.ogDescription ||
        seo?.metaDescription ||
        null,
      images: seo?.openGraph?.ogImage
        ? [{ url: urlFor(seo.openGraph.ogImage).url() }]
        : [],
    },
  };
}


// ✅ Page Component
export default async function Page() {
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
    <section>
      <Hero />
      <LogoMarquee />
      <Law />
      <Approach />
      <About />
      <Timeline />
      <Lead />
      <Testimonials sanityTestimonials={testimonials} />
      <Design />
      <Faq />
      <Ready />
    </section>
  );
}