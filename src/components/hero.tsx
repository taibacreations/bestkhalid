"use client";
import Image from "next/image";
import Ring from "./ring";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const Hero = () => {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ensure we're in browser
    if (typeof window === "undefined") return;

    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];

    if (layers.length !== 4) return;

    // Set initial state: only first layer visible
    gsap.set(layers, { opacity: 0 });
    gsap.set(layers[0], { opacity: 1 });

    // Create a timeline that loops
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    // Cycle through layers: fade out current, fade in next
    for (let i = 0; i < 4; i++) {
      const current = layers[i];
      const next = layers[(i + 1) % 4];

      // Fade out current + subtle zoom-out
      tl.to(
        current,
        {
          opacity: 0,
          scale: 1.02,
          duration: 1.2,
          ease: "power2.in",
        },
        i * 4 // start at 0s, 4s, 8s, 12s
      );

      // Fade in next + subtle zoom-in from slightly scaled up
      tl.fromTo(
        next,
        { opacity: 0, scale: 1.03 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        i * 4
      );

      // Hold each layer for ~2.8s (4s total per layer: 1.2s out + 1.2s in + 1.6s hold)
      tl.to({}, { duration: 1.6 }, `+=0`); // pause
    }

    // Optional: pause on hover
    const heroSection = document.querySelector("section");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => tl.pause());
      heroSection.addEventListener("mouseleave", () => tl.resume());
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative md:min-h-[120vh] overflow-hidden">
      {/* Animated Background Layers */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i - 1] = el;
          }}
          className="absolute inset-0 bg-cover bg-center will-change-transform z-0"
          style={{ backgroundImage: `url(/layer-${i}.png)`, zIndex: 0 }}
        />
      ))}

      {/* Dots overlay */}
      <Image
        src="/hero-blur.png"
        height={100}
        width={100}
        alt="dots"
        className="w-full left-0 object-cover absolute xl:bottom-0 lg:bottom-15 md:bottom-25 bottom-0 z-30"
      />
      {/* <Link href="#next-section">
        <Image
          src="/scroll-down.png"
          height={100}
          width={100}
          alt="dots"
          className="w-[101px] left-1/2 -translate-x-1/2 bottom-44 absolute z-30 bounce"
        />
      </Link> */}

      {/* Content container */}
      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex flex-col md:flex-row items-center md:justify-between justify-center md:min-h-[120vh] pt-30 md:pt-0 relative">
        <div className="2xl:max-w-[682px] xl:max-w-[550px] md:max-w-[42%]">
          <h5 className="font-bricolage font-normal 2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[24px] tracking-[-0.07em] capitalize text-white lg:-mb-5 -mb-3">
            Modern, Patient-Focused
          </h5>
          <h2 className="flex flex-col font-bricolage font-extrabold 2xl:text-[90.64px] xl:text-[70px] lg:text-[55px] md:text-[42px] text-[36px] tracking-[-0.03em] uppercase text-white">
            Websites for{" "}
            <span className="font-tartuffo font-thin tracking-normal capitalize 2xl:-mt-12 xl:-mt-9 lg:-mt-7 -mt-5">
              Healthcare Providers
            </span>
          </h2>
          <p className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[20px] text-[18px] tracking-[-0.07em] capitalize text-white leading-[142%]">
            Turn your clinic`s website into a trusted, conversion-driven digital
            front door that attracts new patients and elevates your practice
          </p>
          <button
            className="mt-7.5 bg-[#003459] text-white rounded-[334px] 2xl:w-[371px] lg:w-[300px] max-w-fit lg:max-w-full px-4 lg:px-0 2xl:h-[59px] h-[50px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline"
            style={{ boxShadow: "0px -6px 20.3px 0px #2E90FA inset" }}
          >
            <Image
              src="/button-arrow.svg"
              width={1000}
              height={100}
              alt="button-arrow"
              className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
            />
            Book a Free Consultation
          </button>
          <div className="md:flex items-center gap-1 2xl:mt-28 mt-24 z-50 relative hidden">
            <div className="lg:w-5 lg:h-5 w-4 h-4 rounded-full shadow-button" />
            <div className="2xl:w-[98px] lg:w-[90px] w-[70px] border border-dashed border-white h-[1px]" />
            <div className="2xl:w-[201px] lg:w-[160px] w-[140px] h-[51px] rounded-full shadow-button bg-[#003459] flex items-center justify-center gap-4">
              <Image
                src="/linkedin.svg"
                width={100}
                height={100}
                alt="linkedin"
                className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
              />
              <Image
                src="/facebook.svg"
                width={100}
                height={100}
                alt="facebook"
                className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
              />
              <Image
                src="/inst.svg"
                width={100}
                height={100}
                alt="insta"
                className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
              />
              <Image
                src="/twitter.svg"
                width={100}
                height={100}
                alt="twitter"
                className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
              />
            </div>
          </div>
        </div>
        <div className="md:absolute 2xl:-right-51 lg:right-0 md:-right-10 right-0 hero z-20">
          <Image
            src="/hero.svg"
            height={100}
            width={100}
            alt="hero"
            className="2xl:w-[1057px] xl:w-[850px] lg:w-[700px] md:w-[600px] w-full 2xl:h-[1107px] h-auto"
          />
        </div>
      </div>

      {/* Floating CTA Button */}
      <div className="absolute xl:right-60 lg:right-25 md:right-18 rings -translate-x-1/2 md:translate-x-0 md:bottom-55 bottom-15 z-40">
        <button className="bg-[url(/hero-text-bg.png)] bg-cover bg-center text-white rounded-[334px] 2xl:w-[443px] lg:w-[380px] md:w-[300px] w-[250px] lg:px-0 2xl:h-[59px] h-[50px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline">
          <Image
            src="/button-arrow.svg"
            width={1000}
            height={100}
            alt="button-arrow"
            className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
          />
          See Healthcare Website Examples
        </button>
      </div>

      {/* Ring */}
      <div className="absolute 2xl:right-40 xl:right-35 lg:right-25 md:right-15 rings -translate-x-1/2 md:translate-x-0 lg:top-56 md:top-75 top-125 z-10">
        <Ring />
      </div>
    </section>
  );
};

export default Hero;
