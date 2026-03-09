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

const Home = () => {
  return (
    <div>
        <Hero />
        <LogoMarquee />
        <Potential />
        <Law />
        <Approach />
        <Timeline />
        <Testimonials />
        <For />
        <Design />
        <Faq />
        <Optimized />
        <Ready />
    </div>
  );
};

export default Home;
