"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1505px] mx-auto xl:px-10 px-4 lg:my-[15vh] my-[10vh]"
    >
      <div className="flex lg:flex-row flex-col items-center justify-between">
        
        {/* Left Image */}
        <div
          ref={imageRef}
          className=""
        >
          <img
            src="/new-home/hero.svg" // 🔁 replace with your image
            alt="about"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div
          ref={contentRef}
          className="w-full lg:w-[52%]"
        >
          <h2 className="font-bricolage font-bold 2xl:text-[44px] xl:text-[38px] lg:text-[36px] text-[30px] leading-[140%] tracking-[-0.04em] text-white">
            Lead Capturing Law Firm Website Design.
          </h2>

          <h3 className="font-tartuffo font-normal 2xl:text-[40px] xl:text-[34px] lg:text-[30px] text-[26px] leading-[140%] text-white mt-[1vh]">
            Built to Generate More Qualified Case Inquiries
          </h3>

          <p className="font-bricolage font-normal text-[15px] md:text-[16px] leading-[150%] text-[#FFFFFFCC] mt-[2vh]">
            I design strategic, conversion-focused websites for law firms that
            want measurable growth, not just a prettier site that nobody calls from.
          </p>

          <p className="font-bricolage font-normal text-[15px] md:text-[16px] leading-[150%] text-[#FFFFFFCC] mt-[1.5vh]">
            Over the years, I've helped attorneys turn their websites from
            expensive digital dust collectors into actual client acquisition assets.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;