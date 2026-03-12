"use client";
import Link from "next/link";
import "@stianlarsen/border-beam/css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Approach = () => {
  const ctaBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const conImages = [
      "/cons-1.webp",
      "/cons-2.webp",
      "/cons-3.webp",
      "/cons-4.webp",
      "/cons-5.webp",
    ];

    conImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    let ctaTl: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      const layers = ctaBgLayersRef.current;
      if (layers.length !== conImages.length) return;

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const duration = 0.8;
      const hold = 0.5;

      ctaTl = gsap.timeline({ repeat: -1 });

      layers.forEach((_, i) => {
        const next = (i + 1) % layers.length;
        ctaTl!
          .to(layers[i], { autoAlpha: 0, duration }, `+=${hold}`)
          .to(layers[next], { autoAlpha: 1, duration }, `-=${duration}`);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ctaTl?.kill();
      gsap.killTweensOf(ctaBgLayersRef.current);
    };
  }, []);

  return (
    <section className="max-w-[1505px] mx-auto xl:px-10 px-4 relative my-[12vh]">
      <img
        src="/new-home/approach.webp"
        alt="overlay"
        className="absolute w-full h-[120vh] z-0 top-[-50vh]"
      />
      <div className="relative">
        <div className="max-w-[1020px] mx-auto">
          <h2 className="font-bricolage font-semibold 2xl:text-[64px] xl:text-[48px] lg:text-[42px] md:text-[36px] text-[32px] md:leading-[82%] leading-[100%] tracking-[-0.07em] capitalize text-white text-center">
            What Makes My Approach{" "}
            <span className="font-tartuffo font-thin 2xl:text-[52px] xl:text-[42px] lg:text-[36px] md:text-[32px] text-[30px] tracking-[0em]">
              Different
            </span>{" "}
          </h2>
          <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] text-center capitalize text-white mt-[2.5vh]">
            I don't design "pretty websites." I build structured{" "}
            <span className="text-[#1E90FF]">
              lead-capturing systems tailored specifically for law firms.
            </span>{" "}
            Pretty websites get compliments at dinner parties. Structured
            systems get your phone ringing.{" "}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:gap-0 gap-[2vh] justify-between items-center mt-[4vh]">
          <div className="bg-[url(/new-home/approach1.webp)] 2xl:bg-cover lg:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[139px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[4vw] md:pr-[3vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col">
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]"/>
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              Position yourself as the trusted authority in your practice area,
              not just say you are one
            </h4>
          </div>
          <div className="bg-[url(/new-home/approach1.webp)] 2xl:bg-cover lg:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[139px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[6vw] md:pr-0 px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col">
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]"/>
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              Guide visitors directly toward booking a consultation; don't leave
              them guessing what to do next
            </h4>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-0 gap-[2vh] justify-between items-center mt-[2vh]">
          <div className="bg-[url(/new-home/approach1.webp)] 2xl:bg-cover lg:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[139px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[6vw] md:pr-[3vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col">
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]"/>
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              Communicate credibility within seconds, because that's genuinely
              all the time you get
            </h4>
          </div>
          <div className="bg-[url(/new-home/approach1.webp)] 2xl:bg-cover lg:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[139px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[5vw] md:pr-[3vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col">
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]"/>
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              Rank properly in local search, so the right people actually find
              you
            </h4>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[2vh]">
          <div className="md:bg-[url(/new-home/approach2.webp)] bg-[url(/new-home/approach1.webp)] 2xl:bg-cover lg:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center w-[1425px] xl:h-[139px] md:pl-[1.8vw] 2xl:pr-[7vw] xl:pr-[14vw] md:pr-[6vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col">
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]"/>
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              Capture high-intent leads 24/7, including while you're in court,
              in a meeting, or finally on that holiday you've been postponing
              since 2019
            </h4>
          </div>
        </div>

        {/* ✅ Animated CTA Button */}
        <div className="flex justify-center mt-[2vh]">
          <div className="relative my-[2vh]">
            {/* Animated background layers */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`cta-${i}`}
                ref={(el) => {
                  ctaBgLayersRef.current[i] = el;
                }}
                className="absolute inset-0 rounded-full bg-contain bg-no-repeat bg-center z-0 2xl:w-[405px] xl:w-[360px] lg:w-[320px] w-[250px] 2xl:h-[59px] md:h-[50px] h-[40px]"
                style={{ backgroundImage: `url(/cons-${i + 1}.webp)` }}
              />
            ))}
            <Link
              href="/contact"
              className="relative bg-transparent text-white font-bricolage font-bold 2xl:text-[22px] xl:text-[20px] lg:text-[18px] text-[15px] leading-[100%] tracking-[-0.07em] capitalize 2xl:w-[405px] xl:w-[360px] lg:w-[320px] w-[250px] 2xl:h-[59px] md:h-[50px] h-[40px] rounded-full flex justify-center items-center gap-2 z-10 border-0"
            >
              <img src="/button-arrow.webp" alt="arrow" className="w-[12px] md:w-[14px] lg:w-[15px] h-auto" />
              Book your Free Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;