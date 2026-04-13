import Law from "@/components/fitness-coach-website-design/law";
import LogoMarquee from "@/components/marquee";
import About from "@/components/therapist-website-design/about";
import Approach from "@/components/therapist-website-design/approach";
import Design from "@/components/therapist-website-design/design";
import Faq from "@/components/therapist-website-design/faq";
import Hero from "@/components/therapist-website-design/hero";
import Lead from "@/components/therapist-website-design/lead";
import Ready from "@/components/therapist-website-design/ready";
import Testimonials from "@/components/therapist-website-design/testimonials";
import Timeline from "@/components/therapist-website-design/timeline";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";
import { groq } from "next-sanity";


// ✅ SEO (same as others)
export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(
    `*[_type == "therapistPageSeo"][0]{
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
    title: seo?.metaTitle || "Therapist Website Design",
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
        "Therapist Website Design",
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


// ✅ Page
export default async function TherapistWebsiteDesign() {
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