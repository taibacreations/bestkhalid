import Hero from "@/components/hero";
import Lead from "@/components/lead";
import LogoMarquee from "@/components/marquee";
import Problem from "@/components/problem";
import Process from "@/components/process";
import Services from "@/components/services";
import Solution from "@/components/solution";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <LogoMarquee />
      <Problem />
      <Solution />
      {/* <Services /> */}
      <Testimonials />
      {/* <Lead /> */}
      <Process />
    </div>
  );
}
