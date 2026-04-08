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
import { groq } from "next-sanity";

async function Page() {
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
    { next: { revalidate: 0 } },
  );
  return (
    <section>
      <Hero />
      <LogoMarquee />
      {/* <Potential /> */}
      <Law />
      <Approach />
      <About />
      <Timeline />
      <Lead />
      <Testimonials sanityTestimonials={testimonials} /> {/* ✅ prop passed */}
      {/* <For /> */}
      <Design />
      <Faq />
      {/* <Optimized /> */}
      <Ready />
    </section>
  );
}

export default Page;
