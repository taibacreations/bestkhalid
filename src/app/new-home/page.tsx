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
import Script from "next/script";

const testimonials = await client.fetch(`
  *[_type == "testimonial" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    quote,
    rating,
    "image": image.asset->url
  }
`);

const Home = () => {
  return (
    <>
      {/* Google Analytics (gtag.js) - Immediately after <head> */}
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
};

export default Home;
