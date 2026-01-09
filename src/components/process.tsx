"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import ProcessCard from "./process-card";

const Process = () => {
  useEffect(() => {
    // Register ScrollTrigger (safe in useEffect)
    gsap.registerPlugin(ScrollTrigger);

    const animateElement = (
      headingSelector: string,
      startY: string,
    ) => {
      const heading = document.querySelector(headingSelector);
      if (!heading) return;

      gsap.fromTo(
        heading,
        {
          y: startY,
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1.4,
          ease: "spring(1, 90, 18)",
          scrollTrigger: {
            trigger: heading, // or use wrapper
            start: "top 85%", // animate when top of element hits 85% from top of viewport
            once: true, // animate only once
          },
        }
      );
    };

    animateElement("#proces", "-100%");

    // Cleanup: kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
    id="process"
      className="xl:pb-31 pb-10 bg-black xl:px-10 px-5 2xl:mt-[-5.5vh] mt-[-15vh] lg:mt-[0vh] relative"
    >
      <Image
        src="/lead-blur.png"
        height={100}
        width={100}
        alt="blur"
        className="w-full h-auto absolute left-0 -top-[15vh] lg:hidden"
      />

      <div>
        <div id="proces" className="text-center max-w-[992px] mx-auto z-40 relative">
          <h5
            id="process-h5"
            className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white"
          >
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              [
            </span>{" "}
            Process{" "}
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              ]
            </span>
          </h5>
          <div className="overflow-hidden -mt-1">
            <h3 id="process-h3" className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white">
              A Smooth, Stress-Free{" "}
              <span className="font-tartuffo font-thin tracking-[0.01em]">
                Design Process
              </span>
            </h3>
          </div>
          <p id="process-content" className="mt-5.5 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white">
            Simple, transparent, and done for you
          </p>
        </div>
        <ProcessCard />
      </div>
    </section>
  );
};

export default Process;
