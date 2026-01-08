"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

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
        <div className="md:bg-[url(/process.png)] 2xl:bg-cover bg-no-repeat bg-contain bg-center 2xl:w-[1450px] min-h-[303px] mx-auto flex flex-col gap-8 md:flex-row md:justify-between items-center 2xl:px-31 lg:px-20 md:px-10 relative xl:mt-10 lg:mt-0 md:-mt-10 mt-[5vh] z-30">
          <Image
            src="/line.png"
            height={100}
            width={100}
            alt="line"
            className="2xl:w-[1170px] w-[80vw] h-[1px] absolute xl:top-21 lg:top-23 top-26 hidden md:block"
          />
          <div className="md:max-w-[311px] max-w-full z-20 process">
            <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
              01
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[28px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white lg:mt-6.5 mt-5 lg:mb-3 mb-2">
              Discovery Call
            </h4>
            <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              We discuss your practice, patients, and goals.
            </p>
          </div>
          <div className="md:max-w-[311px] max-w-full z-20 process">
            <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
              02
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[28px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white lg:mt-6.5 mt-5 lg:mb-3 mb-2">
              Design & Build
            </h4>
            <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
               I create a custom website that reflects your expertise.
            </p>
          </div>
          <div className="md:max-w-[311px] max-w-full z-20 process">
            <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
              03
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[28px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white lg:mt-6.5 mt-5 lg:mb-3 mb-2">
              Launch & Optimize
            </h4>
            <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
               Your site goes live with full support and optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
