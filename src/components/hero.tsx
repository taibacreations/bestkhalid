"use client";
import Image from "next/image";
import Ring from "./ring";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const Hero = () => {
  const bgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const consultationBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // 🔁 Main hero background loop (unchanged)
  useEffect(() => {
    const imagePaths = [
      "/layer-1.png",
      "/layer-2.png",
      "/layer-3.png",
      "/layer-4.png",
    ];
    imagePaths.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    if (bgLayersRef.current.length === 4) {
      gsap.set(bgLayersRef.current, { autoAlpha: 0 });
      gsap.set(bgLayersRef.current[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 1.2;
      const hold = 2;

      bgLayersRef.current.forEach((_, i) => {
        const next = (i + 1) % bgLayersRef.current.length;
        tl.to(
          bgLayersRef.current[i],
          { autoAlpha: 0, duration },
          `+=${hold}`
        ).to(
          bgLayersRef.current[next],
          { autoAlpha: 1, duration },
          `-=${duration}`
        );
      });

      return () => {
        tl.kill();
        gsap.killTweensOf(bgLayersRef.current);
      };
    }
  }, []);

  // 🔁 Consultation button & Social pill background animations
  // 🔁 Consultation button & Social pill background animations — SAME as Header CTA
  useEffect(() => {
    const conImages = [
      "/cons-1.png",
      "/cons-2.png",
      "/cons-3.png",
      "/cons-4.png",
      "/cons-5.png",
    ];
    const icoImages = [
      "/icon-1.png",
      "/icon-2.png",
      "/icon-3.png",
      "/icon-4.png",
      "/icon-5.png",
    ];

    // Preload all images
    [...conImages, ...icoImages].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const animateBgLayers = (
      layers: (HTMLDivElement | null)[],
      imageCount: number
    ) => {
      if (layers.length !== imageCount) return null;

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 0.8;
      const hold = 0.5;

      layers.forEach((_, i) => {
        const next = (i + 1) % layers.length;
        tl.to(layers[i], { autoAlpha: 0, duration }, `+=${hold}`).to(
          layers[next],
          { autoAlpha: 1, duration },
          `-=${duration}`
        );
      });

      return tl;
    };

    let consultationTl: gsap.core.Timeline | null = null;
    let socialTl: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      consultationTl = animateBgLayers(
        consultationBgLayersRef.current,
        conImages.length
      );
      socialTl = animateBgLayers(socialBgLayersRef.current, icoImages.length);
    }, 100);

    return () => {
      clearTimeout(timer);
      consultationTl?.kill();
      socialTl?.kill();
      gsap.killTweensOf([
        ...consultationBgLayersRef.current,
        ...socialBgLayersRef.current,
      ]);
    };
  }, []);

  // 📜 Scroll-triggered heading animations (unchanged)
  useEffect(() => {
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
            trigger: heading,
            start: "top 85%",
            once: true,
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

    animateElement("#hero-h5", -5, "-100%", 2);
    animateElement("#hero-h2", -5, "-120%", 2);
    animateElement("#hero-content", 0, "-150%", 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="hero" className="relative md:min-h-[120vh] overflow-hidden">
      {/* Background layers */}
      {["/layer-1.png", "/layer-2.png", "/layer-3.png", "/layer-4.png"].map(
        (src, i) => (
          <div
            key={i}
            ref={(el) => {
              bgLayersRef.current[i] = el;
            }}
            className="absolute inset-0 bg-cover bg-center z-0 will-change-opacity"
            style={{ backgroundImage: `url(${src})` }}
          />
        )
      )}

      <Image
        src="/hero-blur-new.png"
        height={100}
        width={100}
        alt="dots"
        className="w-full left-0 object-cover absolute xl:bottom-0 lg:bottom-15 md:bottom-25 -bottom-5 z-30"
      />
      <Link href="#the-problem" className="scroll-mt-[20vh]">
        <Image
          src="/scroll-down.svg"
          height={100}
          width={100}
          alt="dots"
          className="md:w-[101px] w-[70px] h-auto left-1/2 -translate-x-1/2 object-cover absolute md:bottom-[15.5%] bottom-0 z-40"
        />
      </Link>

      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex flex-col md:flex-row items-center md:justify-between justify-center md:min-h-[120vh] pt-30 md:pt-0 relative">
        <div className="2xl:max-w-[682px] xl:max-w-[550px] md:max-w-[42%]">
          <h5
            id="hero-h5"
            className="font-bricolage font-normal 2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[24px] tracking-[-0.07em] capitalize text-white"
          >
            Modern, Patient-Focused
          </h5>

          <div className="overflow-hidden">
            <h2
              id="hero-h2"
              className="font-bricolage font-extrabold 2xl:text-[90.64px] xl:text-[70px] lg:text-[55px] md:text-[42px] leading-[100%] text-[36px] tracking-[-0.07em] uppercase text-white"
            >
              <div>Websites for</div>
              <span className="font-tartuffo font-thin tracking-normal capitalize 2xl:-mt-12 xl:-mt-9 lg:-mt-7 -mt-5 inline-block">
                Healthcare Providers
              </span>
            </h2>
          </div>

          <p
            id="hero-content"
            className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[20px] text-[18px] tracking-[-0.07em] capitalize text-white leading-[142%] mt-[2.4vh]"
          >
            Turn your clinic`s website into a trusted, conversion-driven digital
            front door that attracts new patients and elevates your practice
          </p>

          {/* ✅ Animated Consultation CTA Button */}
          <div id="btn" className="mt-7.5 relative max-w-fit lg:max-w-full">
            {/* Background layers for consultation button */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`cons-${i}`}
                ref={(el) => {
                  consultationBgLayersRef.current[i] = el;
                }}
                className="absolute inset-0 rounded-[334px] bg-contain bg-no-repeat bg-center z-0 2xl:w-[371px] lg:w-[300px] md:h-[50px] w-full lg:px-0 2xl:h-[69px] h-[60px]"
                style={{ backgroundImage: `url(/cons-${i + 1}.png)` }}
              />
            ))}
            <button className="relative bg-transparent text-white rounded-[334px] 2xl:w-[371px] lg:w-[300px] w-full lg:px-0 2xl:h-[69px] h-[60px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline z-10 md:ml-[2.5vw] lg:ml-0 lg:pb-[1vh] md:-mt-1.5 lg:mt-0 md:pl-[0vw] 2xl:pb-0 p-8 lg:pt-0 lg:pl-0 lg:pr-0">
              <Image
                src="/button-arrow.svg"
                width={1000}
                height={100}
                alt="button-arrow"
                className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
              />
              Book a Free Consultation
            </button>
          </div>

          {/* ✅ Animated Social Links Background */}
          <div className="md:flex items-center gap-1 2xl:mt-28 mt-24 z-40 relative hidden">
            <div className="lg:w-5 lg:h-5 w-4 h-4 rounded-full shadow-button bg-[#003459]" />
            <div className="2xl:w-[98px] lg:w-[90px] w-[70px] border border-dashed border-white h-[1px]" />
            <div className="relative 2xl:w-[201px] lg:w-[160px] w-[140px] h-[51px] rounded-full">
              {/* Background layers for social pill */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`icon-${i}`}
                  ref={(el) => {
                    socialBgLayersRef.current[i] = el;
                  }}
                  className="absolute inset-0 rounded-full lg:bg-cover bg-contain bg-no-repeat bg-center z-0"
                  style={{ backgroundImage: `url(/icon-${i + 1}.png)` }}
                />
              ))}
              <div className="relative z-10 flex items-center justify-center gap-4 2xl:mt-[1.6vh] mt-[2vh]">
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
        </div>

        {/* Hero Image */}
        <div className="md:absolute 2xl:-right-51 lg:right-0 md:-right-10 right-0 hero z-20 md:mt-0 mt-[5vh]">
          <Image
            src="https://res.cloudinary.com/duwampjn2/image/upload/v1768380785/best-khalid/hero.svg"
            height={100}
            width={100}
            alt="hero"
            className="2xl:w-[1057px] xl:w-[850px] lg:w-[700px] md:w-[600px] w-full md:scale-100 scale-120 2xl:h-[1107px] h-auto"
            priority={true}
          />
        </div>
      </div>

      {/* Floating CTA & Ring (unchanged) */}
      <div className="absolute xl:right-60 lg:right-25 md:right-18 rings -translate-x-1/2 md:translate-x-0 md:bottom-55 bottom-15 z-40">
        <button className="bg-[url(/hero-text-bg.png)] bg-cover bg-center text-white rounded-[334px] 2xl:w-[443px] lg:w-[380px] md:w-[300px] w-[250px] lg:px-0 2xl:h-[59px] md:h-[50px] h-[40px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold healthcare text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline">
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

      <div className="absolute 2xl:right-40 xl:right-35 lg:right-25 md:right-15 rings -translate-x-1/2 md:translate-x-0 xl:top-56 lg:top-65 md:top-75 top-125 z-10">
        <Ring />
      </div>
    </section>
  );
};

export default Hero;
