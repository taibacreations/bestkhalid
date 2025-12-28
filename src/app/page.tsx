import Hero from "@/components/hero";
import LogoMarquee from "@/components/marquee";
import Problem from "@/components/problem";
import Services from "@/components/services";
import Solution from "@/components/solution";

export default function Home() {
  return (
    <div>
      <Hero />
      <LogoMarquee />
      <Problem />
      <Solution />
      <Services />
    </div>
  );
}
