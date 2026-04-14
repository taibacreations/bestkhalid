"use client";
import Link from "next/link";
// import "@stianlarsen/border-beam/css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Approach = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for entry animations
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const row1Ref = useRef<(HTMLDivElement | null)[]>([]);
  const row2Ref = useRef<(HTMLDivElement | null)[]>([]);
  const row3Ref = useRef<HTMLDivElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);

  // 🔁 Button background animation
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

      // Heading & paragraph fade up
      gsap.fromTo(
        [headingRef.current, paraRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      // Row 1 — left card from left, right card from right
      if (row1Ref.current[0]) {
        gsap.fromTo(row1Ref.current[0], { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row1Ref.current[0], start: "top 85%", once: true },
        });
      }
      if (row1Ref.current[1]) {
        gsap.fromTo(row1Ref.current[1], { x: 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row1Ref.current[1], start: "top 85%", once: true },
        });
      }

      // Row 2 — left card from left, right card from right
      if (row2Ref.current[0]) {
        gsap.fromTo(row2Ref.current[0], { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row2Ref.current[0], start: "top 85%", once: true },
        });
      }
      if (row2Ref.current[1]) {
        gsap.fromTo(row2Ref.current[1], { x: 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row2Ref.current[1], start: "top 85%", once: true },
        });
      }

      // Row 3 (full-width) — slide up
      gsap.fromTo(row3Ref.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: row3Ref.current, start: "top 85%", once: true },
      });

      // CTA button — fade up
      gsap.fromTo(ctaWrapRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ctaWrapRef.current, start: "top 90%", once: true },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1505px] mx-auto xl:px-10 px-4 relative mb-[12vh] md:-mt-[5vh]"
    >
      <img
        src="/new-home/approach.webp"
        alt="overlay"
        className="absolute w-full h-[120vh] z-0 top-[-50vh]"
      />
      <div className="relative">

        {/* Heading & paragraph */}
        <div className="max-w-[1100px] mx-auto">
          <h2
            ref={headingRef}
            style={{ willChange: "transform, opacity" }}
            className="font-bricolage font-semibold 2xl:text-[64px] xl:text-[48px] lg:text-[42px] md:text-[36px] text-[32px] md:leading-[82%] leading-[100%] tracking-[-0.07em] capitalize text-white md:text-center md:w-full w-[80vw]"
          >
            A Different Approach to{" "}
            <span className="font-tartuffo font-thin 2xl:text-[52px] xl:text-[42px] lg:text-[36px] md:text-[32px] text-[30px] tracking-[0em]">
              Therapist Website Design
            </span>{" "}
          </h2>
          <p
            ref={paraRef}
            style={{ willChange: "transform, opacity" }}
            className="font-bricolage font-normal xl:text-[20px] lg:text-[16px] text-[16px] leading-[130%] tracking-[0em] md:text-center text-white mt-[2.5vh] xl:w-full md:w-[80%] mx-auto"
          >
            I don’t just design websites for therapists, I build structured digital experiences that help potential clients feel informed, reassured, and confident in taking the next step.
          </p>
          <p
            ref={paraRef}
            style={{ willChange: "transform, opacity" }}
            className="font-bricolage font-normal xl:text-[20px] lg:text-[16px] text-[16px] leading-[130%] tracking-[0em] md:text-center text-white mt-[2.5vh]"
          >
            Good design is not enough for mental health. The experience must feel calm, clear, and trustworthy.
          </p>
        </div>

        {/* Row 1 */}
        <div className="flex flex-col md:flex-row md:gap-0 gap-[2vh] justify-between items-center mt-[4vh]">
          <div
            ref={(el) => { row1Ref.current[0] = el; }}
            style={{ willChange: "transform, opacity" }}
            className="bg-[url(/new-home/approach1.webp)] bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[150px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[4vw] md:pr-[3vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col"
          >
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]" />
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[15px] md:leading-[142%] leading-[130%] tracking-[-0.01em] capitalize text-white pb-[1vh]">
              Trust-centered design structure built to immediately create emotional safety, establish credibility, and help visitors feel confident engaging with your services.
            </h4>
          </div>
          <div
            ref={(el) => { row1Ref.current[1] = el; }}
            style={{ willChange: "transform, opacity" }}
            className="bg-[url(/new-home/approach1.webp)] bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[150px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[6vw] md:pr-0 px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col"
          >
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]" />
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[15px] md:leading-[142%] leading-[130%] tracking-[-0.01em] capitalize text-white pb-[1vh]">
              Clear communication of your therapeutic approach so visitors instantly understand who you help, what you offer, and how your process works.
            </h4>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row md:gap-0 gap-[2vh] justify-between items-center mt-[2vh]">
          <div
            ref={(el) => { row2Ref.current[0] = el; }}
            style={{ willChange: "transform, opacity" }}
            className="bg-[url(/new-home/approach1.webp)] bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[150px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[6vw] md:pr-[3vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col"
          >
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]" />
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[15px] md:leading-[142%] leading-[130%] tracking-[-0.01em] capitalize text-white pb-[1vh]">
              Client-friendly navigation flow designed to reduce confusion, minimize emotional friction, and guide users effortlessly to the right information.
            </h4>
          </div>
          <div
            ref={(el) => { row2Ref.current[1] = el; }}
            style={{ willChange: "transform, opacity" }}
            className="bg-[url(/new-home/approach1.webp)] bg-[length:100%_100%] bg-no-repeat bg-center 2xl:w-[703px] md:w-[49%] xl:h-[150px] 2xl:px-[1.8vw] md:pl-[1.8vw] xl:pr-[5vw] md:pr-[3vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col"
          >
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]" />
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[15px] md:leading-[142%] leading-[130%] tracking-[-0.01em] capitalize text-white pb-[1vh]">
              A mobile-optimized experience ensures seamless access for users searching in urgent or emotional moments across all devices.
            </h4>
          </div>
        </div>

        {/* Row 3 — full width */}
        <div className="flex justify-between items-center mt-[2vh]">
          <div
            ref={row3Ref}
            style={{ willChange: "transform, opacity" }}
            className="md:bg-[url(/new-home/approach2.webp)] bg-[url(/new-home/approach1.webp)] bg-[length:100%_100%] bg-no-repeat bg-center w-[1425px] xl:h-[150px] md:pl-[1.8vw] 2xl:pr-[7vw] xl:pr-[14vw] md:pr-[6vw] px-[4vw] xl:py-[.5vh] py-[1.5vh] flex justify-center flex-col"
          >
            <img src="/new-home/mark.webp" alt="verified" className="xl:w-[55px] w-[45px] xl:mt-0 mt-[-1vh]" />
            <h4 className="font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[15px] text-[15px] md:leading-[142%] leading-[130%] tracking-[-0.01em] capitalize text-white pb-[1vh]">
              Fast, calm, distraction-free experience with seamless booking integration — combining clean, focused layouts that reduce overwhelm with an easy, frictionless path for clients to take the next step when they’re ready.
            </h4>
          </div>
        </div>

        {/* ✅ Animated CTA Button */}
        <div
          ref={ctaWrapRef}
          style={{ willChange: "transform, opacity" }}
          className="flex justify-center mt-[2vh]"
        >
          <div className="relative my-[2vh]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`cta-${i}`}
                ref={(el) => { ctaBgLayersRef.current[i] = el; }}
                className="absolute inset-0 rounded-full bg-contain bg-no-repeat bg-center z-0 2xl:w-[405px] xl:w-[360px] lg:w-[320px] w-[250px] 2xl:h-[59px] md:h-[50px] h-[40px]"
                style={{ backgroundImage: `url(/cons-${i + 1}.webp)` }}
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
        </div>

      </div>
    </section>
  );
};

export default Approach;