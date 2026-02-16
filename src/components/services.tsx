"use client";
import Image from "next/image";
import Servicespoints from "./services-points";
import ServicespointsMobile from "./services-points-mobile";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Services = () => {
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

    animateElement("#services-h3", -5, "-100%", 2);

    // Cleanup: kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mbook = document.querySelector("#mbook");
    const points = document.querySelector("#service-points");
    if (!points) return;

    const duration = 1.6;
    const start = "top 50%";

    // Enhanced "from depth" animation
    gsap.fromTo(
      mbook,
      {
        scale: 1.35,     // start slightly larger (simulates "closer")
        y: 40,           // start lower (adds drop-in feel)
        opacity: 0,
        rotateX: 8,      // subtle 3D tilt (optional but nice)
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        rotateX: 0,
        delay: .5,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mbook,
          start: start,
          once: true,
          // markers: true, // for debugging
        }
      }
    );
    // Enhanced "from depth" animation
    gsap.fromTo(
      points,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        delay: .5,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: points,
          start: start,
          once: true,
          // markers: true, // for debugging
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="services"
      className="bg-[url(/services-bg.png)] bg-cover bg-center md:min-h-screen xl:py-10 py-10 lg:py-0 relative z-40 overflow-hidden scroll-mt-[10vh]"
    >
      <Image src="/services-blur-new.png" width={100} height={100} alt="blur-image" className="w-full h-auto absolute left-0 xl:top-[-25%] top-[-20%] z-40" />
      <div className="relative xl:pt-23 lg:pt-20 z-40">
        <div className="text-center max-w-[992px] mx-auto z-40 relative">
          <div className="overflow-hidden mt-4 ">
            <h3
              id="services-h3"
              className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white"
            >
              High-Performance Web{" "}
              <span className="text-white font-tartuffo font-thin tracking-[0.01em]">
                Design Services
              </span>
            </h3>
          </div>
        </div>
        <img
          id="mbook"
          src="/macbook-2.webp"
          height={100}
          width={100}
          alt="macbook-2"
          className="2xl:w-[1446px] xl:w-[1100px] lg:w-[950px] md:w-[850px] relative md:scale-100 scale-130 w-full h-auto 2xl:ml-[25.2%] xl:ml-[27%] md:ml-[20%] 2xl:-mt-43 xl:-mt-25 z-20"
        />
        <div className="xl:w-[822px] xl:h-[822px] lg:w-[730px] lg:h-[730px] w-[600px] h-[600px] border border-[#F0F0F0] rounded-full absolute top-0 left-[20.5%] top-[29%] -z-10 hidden md:block" />
        <Image
          src="/services-blur.png"
          height={100}
          width={100}
          alt="services-blur"
          className="w-full xl:h-[100px] 2xl:h-auto absolute left-0 2xl:-bottom-120 xl:-bottom-15 lg:-bottom-70 -bottom-60 z-30"
        />
        <div id="service-points" className="absolute left-[12%] lg:top-[28%] top-[20%] hidden md:block z-40">
          <Servicespoints />
        </div>
        <div className="relative flex justify-center items-center text-center md:hidden mt-[8vh] px-5">
          <ServicespointsMobile />
        </div>
      </div>
    </section>
  );
};

export default Services;
