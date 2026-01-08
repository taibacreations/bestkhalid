"use client";
import { useEffect } from "react";
import Image from "next/image";
import Solutionoints from "./solution-points";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Solution = () => {
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
          trigger: heading,           // or use wrapper
          start: "top 85%",           // animate when top of element hits 85% from top of viewport
          once: true,                 // animate only once
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

  animateElement("#solution-h5", -5, "-100%", 2);
  animateElement("#solution-h3", -5, "-120%", 2);
  animateElement("#solution-content", 0, "-150%", 0);

  // Cleanup: kill ScrollTriggers on unmount
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);

  return (
    <section
      id="the-solution"
      className="bg-[url(/stones.png)] bg-cover bg-center w-full lg:min-h-screen py-10 lg:py-0 relative xl:px-10 px-5"
    >
      <Image
        src="/points-blur.png"
        height={100}
        width={100}
        alt="points-blur"
        className="w-full xl:h-[533px] h-[300px] absolute left-0 z-30 lg:-top-60 -top-20 hidden md:block"
      />
      <Image
        src="/blue-blur.png"
        height={100}
        width={100}
        alt="blue-blur"
        className="w-[30%] h-full -top-[40%] absolute right-0 z-30"
      />
      <div>
        <div className="text-center xl:max-w-[992px] max-w-[800px] mx-auto z-40 relative">
            <h5
              id="solution-h5"
              className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white -mb-4.5"
            >
              <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
                [
              </span>{" "}
              The Solution{" "}
              <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
                ]
              </span>
            </h5>

          {/* H3 Wrapper */}
          <div className="overflow-hidden mt-2 md:mt-4">
            <h3
              id="solution-h3"
              className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white inline-block"
            >
              I Build Clean, Professional, HIPAA-Conscious Websites{" "}
              <span className="text-white font-tartuffo font-thin tracking-[0.01em]">
                That Bring You More Patients
              </span>
            </h3>
          </div>

          <p id="solution-content" className="lg:mt-7 mt-5 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white">
            I specialize exclusively in web design for healthcare providers, so
            every site I build is
          </p>
        </div>
        <div className="xl:w-[1036px] lg:w-[800px] md:w-[700px] w-full h-auto xl:h-[777px] mx-auto z-40 relative md:mt-[-6vh] my-[4vh] hidden md:block">
          <Image
            src="/iphone.svg"
            height={100}
            width={100}
            alt="iphone"
            className="w-full h-auto scale-150 md:scale-100"
          />
        </div>
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 2xl:top-69 lg:top-75 top-65 w-full z-40">
          <Solutionoints />
        </div>
      </div>
    </section>
  );
};

export default Solution;
