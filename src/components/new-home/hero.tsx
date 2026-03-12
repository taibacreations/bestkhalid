"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const ctaBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for entry animations
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const floatingCtaRef = useRef<HTMLDivElement | null>(null);

  // 🎬 Entry animations: content from left, image + CTA from right
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { x: "-100px", opacity: 0 },
        { x: "0px", opacity: 1, duration: 2 },
        0,
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { x: "140px", opacity: 0 },
        { x: "0px", opacity: 1, duration: 2.1 },
        0.15,
      );
    }

    if (floatingCtaRef.current) {
      tl.fromTo(
        floatingCtaRef.current,
        { x: "100px", opacity: 0 },
        { x: "0px", opacity: 1, duration: 1.9 },
        0.35,
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // 🔁 Button & social pill background animations
  useEffect(() => {
    const conImages = [
      "/new-home/cons-1.webp",
      "/new-home/cons-2.webp",
      "/new-home/cons-3.webp",
      "/new-home/cons-4.webp",
      "/new-home/cons-5.webp",
    ];
    const icoImages = [
      "/icon-1.webp",
      "/icon-2.webp",
      "/icon-3.webp",
      "/icon-4.webp",
      "/icon-5.webp",
    ];

    [...conImages, ...icoImages].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const animateBgLayers = (
      layers: (HTMLDivElement | null)[],
      imageCount: number,
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
          `-=${duration}`,
        );
      });

      return tl;
    };

    let ctaTl: gsap.core.Timeline | null = null;
    let socialTl: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      ctaTl = animateBgLayers(ctaBgLayersRef.current, conImages.length);
      socialTl = animateBgLayers(socialBgLayersRef.current, icoImages.length);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctaTl?.kill();
      socialTl?.kill();
      gsap.killTweensOf([
        ...ctaBgLayersRef.current,
        ...socialBgLayersRef.current,
      ]);
    };
  }, []);

  return (
    <section className="relative h-[109vh] overflow-hidden">
      <div className="bg-[url(/new-home/banner.webp)] bg-cover bg-center w-full h-full z-10 absolute" />
      <div className="relative z-20 max-w-[1525px] mx-auto xl:px-10 px-4 flex md:mt-[17.5vh] mt-[2vh]">

        {/* ← Content slides in from left */}
        <div
          ref={contentRef}
          style={{ willChange: "transform, opacity" }}
          className="2xl:max-w-[635px] xl:max-w-[570px] lg:max-w-[430px] md:max-w-[330px] w-full mt-[10.5vh]"
        >
          <h3 className="font-bricolage font-normal 2xl:text-[30px] xl:text-[27px] lg:text-[20px] md:text-[16px] text-[14px] leading-[142%] capitalize text-white">
            Lead Capturing Law Firm Website Design.
          </h3>
          <h1 className="font-bricolage font-extrabold 2xl:text-[50px] xl:text-[42px] lg:text-[32px] md:text-[25px] text-[23px] leading-[98%] uppercase tracking-[-0.03em] text-white mt-[1.4vh] flex flex-col">
            Built to Generate More{" "}
            <span className="font-tartuffo font-thin capitalize 2xl:text-[77px] xl:text-[65px] lg:text-[50px] md:text-[39px] text-[35px] tracking-[0.01em] mt-[1.5vh]">
              Qualified Case Inquiries
            </span>
          </h1>
          <p className="font-bricolage font-normal tracking-[-0.07em] leading-[142%] capitalize 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] text-white my-[3vh]">
            I design strategic, conversion-focused websites for law firms that
            want measurable growth, not just a prettier site that nobody calls
            from.
          </p>
          <p className="font-bricolage font-normal tracking-[-0.07em] leading-[142%] capitalize 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] text-white">
            Over the years, I've helped attorneys turn their websites from
            expensive digital dust collectors into actual client acquisition
            assets.
          </p>

          {/* ✅ Animated CTA Button */}
          <div className="relative max-w-fit my-[2vh]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`cta-${i}`}
                ref={(el) => {
                  ctaBgLayersRef.current[i] = el;
                }}
                className="absolute inset-0 rounded-full bg-contain bg-no-repeat bg-center z-0 2xl:w-[405px] xl:w-[360px] lg:w-[320px] w-[250px] 2xl:h-[59px] md:h-[50px] h-[40px]"
                style={{ backgroundImage: `url(/new-home/cons-${i + 1}.webp)` }}
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

          <p className="font-bricolage font-extralight tracking-[0em] leading-[142%] capitalize 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[13px] text-white">
            Limited law firm projects are accepted each month.
          </p>

          {/* ✅ Animated Social Links Pill */}
          <div className="flex items-center gap-1 z-40 relative 2xl:mr-[2vw] xl:mr-0 mr-[2vw] md:mt-[10.8vh] mt-[3vh]">
            <div className="xl:w-5 xl:h-5 w-4 h-4 rounded-full button-shadow bg-[#003459]" />
            <div className="2xl:w-[98px] xl:w-[90px] lg:w-[60px] w-[70px] border border-dashed border-white h-px" />
            <div className="relative 2xl:w-[201px] xl:w-[160px] lg:w-[150px] w-[140px] md:h-[51px] h-[40px] rounded-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`icon-${i}`}
                  ref={(el) => {
                    socialBgLayersRef.current[i] = el;
                  }}
                  className="absolute inset-0 rounded-full 2xl:bg-cover bg-contain bg-no-repeat bg-center z-0"
                  style={{ backgroundImage: `url(/icon-${i + 1}.webp)` }}
                />
              ))}
              <div className="relative z-10 flex items-center justify-center gap-4 rounded-full 2xl:mt-[1.5vh] md:mt-[1.8vh] mt-[1.3vh]">
                <Link href="https://www.linkedin.com/in/bestkhalid/" target="_blank" className="hover:scale-125 hover:-translate-y-1 transition-all duration-300">
                  <Image src="/linkedin.webp" width={100} height={100} alt="linkedin" className="2xl:w-[19.77px] lg:w-[16px] w-[14px]" />
                </Link>
                <Link href="https://www.facebook.com/bestkhalid" target="_blank" className="hover:scale-125 hover:-translate-y-1 transition-all duration-300">
                  <Image src="/facebook.webp" width={100} height={100} alt="facebook" className="2xl:w-[19.77px] lg:w-[16px] w-[14px]" />
                </Link>
                <Link href="https://www.instagram.com/bestkhalidm/" target="_blank" className="hover:scale-125 hover:-translate-y-1 transition-all duration-300">
                  <Image src="/inst.webp" width={100} height={100} alt="insta" className="2xl:w-[19.77px] lg:w-[16px] w-[14px]" />
                </Link>
                <Link href="https://twitter.com/bestkhalid" target="_blank" className="hover:scale-125 hover:-translate-y-1 transition-all duration-300">
                  <Image src="/twitter.webp" width={100} height={100} alt="twitter" className="2xl:w-[19.77px] lg:w-[16px] w-[14px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* → Image & floating CTA slide in from right */}
        <div>
          <img
            ref={imageRef}
            src="/new-home/banner-lap.webp"
            alt="Banner Image"
            style={{ willChange: "transform, opacity" }}
            className="2xl:w-[861px] xl:w-[720px] lg:w-[550px] md:w-[400px] w-full lg:h-auto md:h-full h-auto absolute md:top-0 top-[58vh] 2xl:right-[-4%] md:right-0 left-[50%] -translate-x-1/2 md:left-auto md:translate-x-0"
          />
          <div
            ref={floatingCtaRef}
            style={{ willChange: "transform, opacity" }}
            className="absolute md:bottom-[0.5%] md:top-auto top-[90vh] md:right-[9%] left-[50%] -translate-x-1/2 md:left-auto md:translate-x-0"
          >
            <Link
              href="/portfolio"
              className="bg-[url(/new-home/hero-text-bg.webp)] bg-cover bg-center text-white rounded-[334px] 2xl:w-[443px] lg:w-[380px] md:w-[300px] w-[250px] lg:px-0 2xl:h-[59px] md:h-[50px] h-[40px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold healthcare text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize"
            >
              <Image
                src="/button-arrow.webp"
                width={1000}
                height={100}
                alt="button-arrow"
                className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
              />
              See lawfirm Website Examples
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;