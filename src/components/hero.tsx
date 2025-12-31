"use client";
import Image from "next/image";
import Ring from "./ring";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

// Helper: wrap each word in a span
const wrapWordsInSpans = (text: string) => {
  return text.split(" ").map((word, i) => (
    <span
      key={i}
      className="inline-block"
      style={{ willChange: "transform, opacity" }}
    >
      {word}&nbsp;
    </span>
  ));
};

const Hero = () => {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const h5WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const h2Line1WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const h2Line2WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  // Text content (for wrapping)
  const h5Text = "Modern, Patient-Focused";
  const h2Line1 = "Websites for";
  const h2Line2 = "Healthcare Providers";
  const pText =
    "Turn your clinic`s website into a trusted, conversion-driven digital front door that attracts new patients and elevates your practice";

  // Background layer animation (unchanged)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length !== 4) return;

    gsap.set(layers, { opacity: 0 });
    gsap.set(layers[0], { opacity: 1 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    for (let i = 0; i < 4; i++) {
      const current = layers[i];
      const next = layers[(i + 1) % 4];

      tl.to(
        current,
        {
          opacity: 0,
          scale: 1.02,
          duration: 1.2,
          ease: "power2.in",
        },
        i * 4
      );
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
      tl.to({}, { duration: 1.6 }, `+=0`);
    }

    const heroSection = document.querySelector("section");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => tl.pause());
      heroSection.addEventListener("mouseleave", () => tl.resume());
    }

    return () => tl.kill();
  }, []);

  // Word-by-word entrance animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Flatten all word refs
    const allWordRefs = [
      ...h5WordRefs.current,
      ...h2Line1WordRefs.current,
      ...h2Line2WordRefs.current,
      ...pWordRefs.current,
    ].filter(Boolean) as HTMLElement[];

    const otherElements = [ctaButtonRef.current, socialsRef.current].filter(
      Boolean
    ) as HTMLElement[];

    // Animate words first
    if (allWordRefs.length > 0) {
      gsap.from(allWordRefs, {
        y: -30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        stagger: 0.04, // 40ms between words → feels fluid
        delay: 0.3,
      });
    }

    // Then animate button & socials after words
    if (otherElements.length > 0) {
      gsap.from(otherElements, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1)",
        stagger: 0.15,
        delay: 0.3 + (allWordRefs.length * 0.04) + 0.2, // start after words
      });
    }
  }, []);

  return (
    <section id="#" className="relative md:min-h-[120vh] overflow-hidden">
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

      <Image
        src="/hero-blur.png"
        height={100}
        width={100}
        alt="dots"
        className="w-full left-0 object-cover absolute xl:bottom-0 lg:bottom-15 md:bottom-25 -bottom-5 z-30"
      />

      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex flex-col md:flex-row items-center md:justify-between justify-center md:min-h-[120vh] pt-30 md:pt-0 relative">
        <div className="2xl:max-w-[682px] xl:max-w-[550px] md:max-w-[42%]">
          {/* h5: word-by-word */}
          <h5 className="font-bricolage font-normal 2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[24px] tracking-[-0.07em] capitalize text-white">
            {wrapWordsInSpans(h5Text).map((word, i) => (
              <span
                ref={(el) => {
                  if (el) h5WordRefs.current[i] = el;
                  return undefined;
                }}
                key={i}
                className="inline-block"
              >
                {word}
              </span>
            ))}
          </h5>

          {/* h2: split into two lines, each word-animated */}
          <h2 className="font-bricolage font-extrabold 2xl:text-[90.64px] xl:text-[70px] lg:text-[55px] md:text-[42px] leading-[100%] text-[36px] tracking-[-0.03em] uppercase text-white">
            <div>
              {wrapWordsInSpans(h2Line1).map((word, i) => (
                <span
                  ref={(el) => (h2Line1WordRefs.current[i] = el)}
                  key={i}
                  className="inline-block"
                >
                  {word}
                </span>
              ))}
            </div>
            <span className="font-tartuffo font-thin tracking-normal capitalize 2xl:-mt-12 xl:-mt-9 lg:-mt-7 -mt-5 inline-block">
              {wrapWordsInSpans(h2Line2).map((word, i) => (
                <span
                  ref={(el) => (h2Line2WordRefs.current[i] = el)}
                  key={i}
                  className="inline-block"
                >
                  {word}
                </span>
              ))}
            </span>
          </h2>

          {/* Paragraph: word-by-word */}
          <p className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[20px] text-[18px] tracking-[-0.07em] capitalize text-white leading-[142%] mt-[2.4vh]">
            {wrapWordsInSpans(pText).map((word, i) => (
              <span
                ref={(el) => {
                  if (el) pWordRefs.current[i] = el;
                }}
                key={i}
                className="inline-block"
              >
                {word}
              </span>
            ))}
          </p>

          {/* CTA Button */}
          <button
            ref={ctaButtonRef}
            className="mt-7.5 bg-[#003459] text-white rounded-[334px] 2xl:w-[371px] lg:w-[300px] max-w-fit lg:max-w-full px-4 lg:px-0 2xl:h-[69px] h-[60px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline button-border"
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

          {/* Socials */}
          <div
            ref={socialsRef}
            className="md:flex items-center gap-1 2xl:mt-28 mt-24 z-50 relative hidden"
          >
            <div className="lg:w-5 lg:h-5 w-4 h-4 rounded-full shadow-button bg-[#003459]" />
            <div className="2xl:w-[98px] lg:w-[90px] w-[70px] border border-dashed border-white h-[1px]" />
            <div className="2xl:w-[201px] lg:w-[160px] w-[140px] h-[51px] rounded-full shadow-button button-border bg-[#003459] flex items-center justify-center gap-4">
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

        <div className="md:absolute 2xl:-right-51 lg:right-0 md:-right-10 right-0 hero z-20 md:mt-0 mt-[5vh]">
          <Image
            src="/hero.svg"
            height={100}
            width={100}
            alt="hero"
            className="2xl:w-[1057px] xl:w-[850px] lg:w-[700px] md:w-[600px] w-full md:scale-100 scale-120 2xl:h-[1107px] h-auto"
          />
        </div>
      </div>

      {/* Floating CTA Button */}
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

      {/* Ring */}
      <div className="absolute 2xl:right-40 xl:right-35 lg:right-25 md:right-15 rings -translate-x-1/2 md:translate-x-0 xl:top-56 lg:top-65 md:top-75 top-125 z-10">
        <Ring />
      </div>
    </section>
  );
};

export default Hero;