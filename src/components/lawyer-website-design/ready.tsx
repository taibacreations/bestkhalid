"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Ready = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const noteRef = useRef<HTMLParagraphElement | null>(null);
  const vector1Ref = useRef<HTMLImageElement | null>(null);
  const vector2Ref = useRef<HTMLImageElement | null>(null);
  const ctaBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vectors slide in from their respective sides
      gsap.fromTo(
        vector1Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        vector2Ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // Heading, paragraph, CTA, and note cascade up
      gsap.fromTo(
        [headingRef.current, paraRef.current, ctaRef.current, noteRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const conImages = [
      "/new-home/cons-1.webp",
      "/new-home/cons-2.webp",
      "/new-home/cons-3.webp",
      "/new-home/cons-4.webp",
      "/new-home/cons-5.webp",
    ];

    [...conImages].forEach((src) => {
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

    const timer = setTimeout(() => {
      ctaTl = animateBgLayers(ctaBgLayersRef.current, conImages.length);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctaTl?.kill();
      gsap.killTweensOf([
        ...ctaBgLayersRef.current,
      ]);
    };
  }, []);

  return (
    <section ref={sectionRef} className="md:py-[13vh] py-[6vh] relative">
      <img
        ref={vector1Ref}
        src="/new-home/ready-vector1.webp"
        alt="vector"
        style={{ willChange: "transform, opacity" }}
        className="absolute right-0 top-0 2xl:w-auto xl:w-[400px] w-[300px]"
      />
      <img
        ref={vector2Ref}
        src="/new-home/ready-vector2.webp"
        alt="vector"
        style={{ willChange: "transform, opacity" }}
        className="absolute left-0 bottom-[10%] 2xl:w-auto xl:w-[400px] w-[300px]"
      />
      <div className="max-w-[1450px] mx-auto xl:px-10 px-4 relative">
        <div className="2xl:max-w-[750px] xl:max-w-[670px] lg:max-w-[630px] max-w-[550px] mx-auto flex flex-col justify-center items-center relative">
          <h2
            ref={headingRef}
            style={{ willChange: "transform, opacity" }}
            className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize"
          >
            Ready to Position Your Law Firm{" "}
            <span className="font-tartuffo font-light tracking-0">
              as the Authority in Your Market?
            </span>
          </h2>
          <div className="lg:max-w-[690px] max-w-[600px] text-center">
            <p
              ref={paraRef}
              style={{ willChange: "transform, opacity" }}
              className="font-bricolage font-light xl:text-[20px] text-[18px] leading-[130%] tracking-[0em] text-white mt-[1vh]"
            >
              If you're serious about increasing consultation inquiries and
              strengthening your online presence, let's discuss your goals.
            </p>
            <div className="flex flex-col justify-center items-center gap-[2vh]">
              {/* ✅ Animated CTA Button */}
              <div className="relative max-w-fit mt-[2vh] lg:mb-[1vh]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`cta-${i}`}
                    ref={(el) => {
                      ctaBgLayersRef.current[i] = el;
                    }}
                    className="absolute inset-0 rounded-full bg-contain bg-no-repeat bg-center z-0 2xl:w-[405px] xl:w-[360px] lg:w-[320px] w-[250px] 2xl:h-[59px] md:h-[50px] h-[40px]"
                    style={{
                      backgroundImage: `url(/new-home/cons-${i + 1}.webp)`,
                    }}
                  />
                ))}
                <Link
                  href="/contact"
                  className="relative bg-transparent text-white font-bricolage font-bold 2xl:text-[22px] xl:text-[20px] lg:text-[18px] text-[15px] leading-[100%] tracking-[-0.07em] capitalize 2xl:w-[405px] xl:w-[360px] lg:w-[320px] w-[250px] 2xl:h-[59px] md:h-[50px] h-[40px] rounded-full flex justify-center items-center gap-2 z-10 border-0"
                >
                  <img
                    src="/button-arrow.webp"
                    alt="arrow"
                    className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
                  />
                  Book your Free Strategy Call
                </Link>
              </div>
              <p
                ref={noteRef}
                style={{ willChange: "transform, opacity" }}
                className="font-bricolage font-light text-[18px] leading-[130%] tracking-[0em] text-white"
              >
                I only accept a limited number of law firm projects each month
                to maintain quality and focus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ready;
