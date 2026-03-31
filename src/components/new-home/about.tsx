"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "7+", label: "Years Designing\nfor Law Firms" },
  { value: "40+", label: "Law Firm Websites\nLaunched" },
  { value: "34%", label: "Avg. Increase in\nConsultations" },
  { value: "100%", label: "Custom — Never\nTemplates" },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const tagRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const para1Ref = useRef<HTMLParagraphElement | null>(null);
  const para2Ref = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const ctaBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // 🔁 Animated CTA button backgrounds
  useEffect(() => {
    const conImages = [
      "/cons-1.webp",
      "/cons-2.webp",
      "/cons-3.webp",
      "/cons-4.webp",
      "/cons-5.webp",
    ];

    conImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    let ctaTl: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      const layers = ctaBgLayersRef.current;
      if (layers.length !== conImages.length) return;

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const duration = 0.8;
      const hold = 0.5;

      ctaTl = gsap.timeline({ repeat: -1 });

      layers.forEach((_, i) => {
        const next = (i + 1) % layers.length;
        ctaTl!
          .to(layers[i], { autoAlpha: 0, duration }, `+=${hold}`)
          .to(layers[next], { autoAlpha: 1, duration }, `-=${duration}`);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ctaTl?.kill();
      gsap.killTweensOf(ctaBgLayersRef.current);
    };
  }, []);

  // 🎬 Scroll-triggered entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tag badge fades down
      gsap.fromTo(
        tagRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tagRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Heading fades up
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Badge floats in from left
      gsap.fromTo(
        badgeRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Paragraphs stagger up
      gsap.fromTo(
        [para1Ref.current, para2Ref.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: para1Ref.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // CTA fades up
      gsap.fromTo(
        ctaRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Image slides in from right
      gsap.fromTo(
        imageRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Divider line expands
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Stats stagger up
      gsap.fromTo(
        statsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      {/* Ambient glow — right side */}
      <img
        src="/new-home/law-blur.webp"
        alt="vector glow"
        aria-hidden
        className="absolute right-[0%] top-[-40vh]"
      />

      <div
        ref={sectionRef}
        className="max-w-[1505px] mx-auto xl:px-10 px-4 lg:mb-[14.5vh] lg:mt-[0vh] md:my-[10vh] my-[8vh] relative"
      >
        {/* ─────────────────────────────────────────────────────
            TOP BADGE
        ───────────────────────────────────────────────────── */}
        <div className="flex justify-start mb-[3vh]">
        </div>

        <div className="relative z-10">
          {/* ── Main layout: text left / image right ── */}
          <div className="flex lg:flex-row flex-col justify-between items-start lg:gap-16 gap-[6vh]">

            {/* ════════════════════════════════════
                LEFT — Copy Column
            ════════════════════════════════════ */}
            <div className="lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[650px] w-full flex flex-col">

              {/* Heading */}
              <h2
                ref={headingRef}
                style={{ willChange: "transform, opacity" }}
                className="font-bricolage font-semibold 2xl:text-[58px] xl:text-[50px] lg:text-[42px] md:text-[38px] text-[34px] md:leading-[88%] leading-[95%] tracking-[-0.07em] capitalize text-white 2xl:max-w-[550px] xl:max-w-[480px] lg:max-w-[400px] md:max-w-full max-w-[75vw] about-heading"
              >
                The Person Behind{" "}
                <span className="font-tartuffo font-thin 2xl:text-[54px] xl:text-[46px] lg:text-[38px] md:text-[34px] text-[32px] tracking-[0em]">
                  Every Strategy
                </span>
              </h2>

              {/* Decorative divider */}
              <div
                ref={dividerRef}
                style={{ willChange: "transform, opacity" }}
                className="mt-[3vh] mb-[3vh] h-px w-full"
                aria-hidden
              >
                <div className="h-px w-full bg-gradient-to-r from-[#7AB4FD40] via-[#7AB4FD20] to-transparent" />
              </div>

              {/* Body copy */}
              <p
                ref={para1Ref}
                style={{ willChange: "transform, opacity" }}
                className="font-bricolage font-normal tracking-[-0.01em] leading-[158%] capitalize 2xl:text-[18px] xl:text-[17px] lg:text-[15px] text-[14px] text-[#FFFFFFCC]"
              >
                I'm a{" "}
                <span className="text-white font-medium">
                  specialist in law firm website design
                </span>{" "}
                with over seven years focused exclusively on helping attorneys
                turn their online presence into a genuine client acquisition
                engine. Not a generalist. Not an agency with a law firm
                "package." Just deep, focused expertise in one industry.
              </p>

              <p
                ref={para2Ref}
                style={{ willChange: "transform, opacity" }}
                className="font-bricolage font-normal tracking-[-0.01em] leading-[158%] capitalize 2xl:text-[18px] xl:text-[17px] lg:text-[15px] text-[14px] text-[#FFFFFFCC] mt-[2.5vh]"
              >
                I've watched too many law firms pour money into
                beautiful-looking sites that never ring the phone. So I stopped
                building websites and started building{" "}
                <span className="text-white font-medium">
                  structured lead-capturing systems
                </span>{" "}
                — the difference isn't cosmetic, it's architectural. Every
                section, every headline, every CTA has a job to do.
              </p>
            </div>

            {/* ════════════════════════════════════
                RIGHT — Image Column
            ════════════════════════════════════ */}
            <div
              ref={imageRef}
              style={{ willChange: "transform, opacity" }}
              className="relative flex flex-1 justify-end items-start lg:pt-0 pt-4"
            >

              {/* Image container with subtle border treatment */}
              <div className="relative">
                {/* Top-left accent line */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#7AB4FD50] rounded-tl-[4px] z-10 pointer-events-none" />
                {/* Bottom-right accent line */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#7AB4FD50] rounded-br-[4px] z-10 pointer-events-none" />

                <img
                  src="/new-home/heros.webp"
                  alt="Khalid — Law Firm Website Designer"
                  className="object-cover relative z-0 2xl:max-w-[560px] xl:max-w-[560px] lg:max-w-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;