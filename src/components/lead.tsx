"use client";
import Image from "next/image";
import Projects from "./projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const Lead = () => {
  useEffect(() => {
    // Register ScrollTrigger (safe in useEffect)
    gsap.registerPlugin(ScrollTrigger);

    const animateElement = (
      headingSelector: string,
      rotation: number,
      startY: string,
      rotationD: number
    ) => {
      const heading = document.querySelector(headingSelector);
      if (!heading) return;

      const wrapper = heading.parentElement;
      if (!wrapper) return;

      // Start with overflow hidden (in case it was reset)
      wrapper.style.overflow = "hidden";

      gsap.fromTo(
        heading,
        {
          y: startY,
          rotation: rotation,
          opacity: 0,
        },
        {
          y: "5%",
          rotation: rotationD,
          opacity: 1,
          duration: 1.4,
          ease: "spring(1, 90, 18)",
          scrollTrigger: {
            trigger: heading, // or use wrapper
            start: "top 85%", // animate when top of element hits 85% from top of viewport
            once: true, // animate only once
          },
          onComplete: () => {
            gsap.to(heading, {
              y: 0,
              rotation: 0,
              duration: 0.6,
              ease: "spring(1, 120, 22)",
              onComplete: () => {
                if (wrapper) {
                  wrapper.style.overflow = "visible";
                }
              },
            });
          },
        }
      );
    };

    animateElement("#leads-h5", -5, "-100%", 2);
    animateElement("#leads-h3", -5, "-120%", 2);
    animateElement("#leads-content", 0, "-150%", 0);

    // Cleanup: kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="bg-[url(/lead-bg.png)] bg-cover bg-center min-h-screen relative xl:px-10 px-5">
      <Image
        src="/lead-blur.png"
        height={100}
        width={100}
        alt="blur"
        className="w-full h-auto absolute left-0 2xl:-bottom-[50vh] lg:-bottom-[30vh] bottom-[10vh] z-20"
      />
      <div className="xl:pt-33 lg:pt-20 pt-10">
        <div className="text-center max-w-[992px] mx-auto z-40 relative">
          <h5
            id="leads-h5"
            className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white"
          >
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              [
            </span>{" "}
            Lead Magnet{" "}
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              ]
            </span>
          </h5>
          <div className="overflow-hidden -mt-1">
            <h3 id="leads-h3" className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white">
              Not Ready Yet?{" "}
              <span className="font-tartuffo font-thin tracking-[0.01em]">
                Get My Free Guide
              </span>
            </h3>
          </div>
          <p id="leads-content" className="mt-5.5 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white">
            “Top 7 Website Essentials Every Healthcare Provider Needs to Attract
            More Patients”
          </p>
        </div>
        <div className="mt-10 2xl:w-[1453px] h-auto mx-auto relative">
          <Projects />
          <div className="absolute lg:bottom-55 md:bottom-15 -bottom-[10vh] left-1/2 -translate-x-1/2 z-20 w-full">
            <div className="flex flex-col justify-center items-center md:gap-5 gap-3">
              <div>
                <button className="bg-[#003459] text-white md:w-[190px] max-w-fit p-3 lg:w-[230px] xl:w-[250px] 2xl:w-[336px] md:h-[50px] 2xl:h-[59px] rounded-[334px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize shadow-button">
                  <Image
                    src="/button-arrow.svg"
                    width={1000}
                    height={100}
                    alt="button-arrow"
                    className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
                  />
                  Download Free Guide
                </button>
              </div>
              <p className="font-bricolage font-normal xl:text-[18px] text-[16px] leading-[142%] tracking-[-0.01em] capitalize text-white mb-[-5px] text-center">
                Perfect for growing your email list!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lead;
