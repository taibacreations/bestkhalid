"use client";
import Image from "next/image";
import Ring from "./ring";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const h5Text = "Modern, Patient-Focused";
  const h2Line1 = "Websites for";
  const h2Line2 = "Healthcare Providers";
  const pText =
    "Turn your clinic`s website into a trusted, conversion-driven digital front door that attracts new patients and elevates your practice";

  // Wrap each word in a span with overflow-hidden parent to enable mask
  const wrapWordsInSpans = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-top"
        style={{ lineHeight: "1" }}
      >
        <span className="inline-block">{word}&nbsp;</span>
      </span>
    ));
  };

  // Refs for animated elements
  const h5Ref = useRef<HTMLHeadingElement>(null);
  const h2Line1Ref = useRef<HTMLDivElement>(null);
  const h2Line2Ref = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const bgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Background layer loop (unchanged)
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
        tl
          .to(bgLayersRef.current[i], { autoAlpha: 0, duration }, `+=${hold}`)
          .to(bgLayersRef.current[next], { autoAlpha: 1, duration }, `-=${duration}`);
      });

      return () => {
        tl.kill();
        gsap.killTweensOf(bgLayersRef.current);
      };
    }
  }, []);

  // Main entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateWithBounce = (target: HTMLElement | null) => {
        if (!target) return;
        const words = target.querySelectorAll("span > span");
        gsap.fromTo(
          words,
          {
            y: "-120%", // Start above (hidden)
            opacity: 0,
          },
          {
            y: "5%", // Slight overshoot downward (into overflow)
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.04,
            onComplete: () => {
              // Bounce back to y: 0
              gsap.to(words, {
                y: 0,
                duration: 0.4,
                ease: "elastic.out(0.8, 0.5)", // Subtle elastic bounce
              });
            },
          }
        );
      };

      const animateParagraph = (target: HTMLElement | null) => {
        if (!target) return;
        gsap.fromTo(
          target.querySelectorAll("span > span"),
          {
            y: "-100%",
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.04,
            delay: 0.1,
          }
        );
      };

      const animateImage = (target: HTMLElement | null) => {
        if (!target) return;
        gsap.fromTo(
          target.querySelector("img"),
          {
            scale: 2.18,
            y: -30, // Start slightly higher to simulate Z-depth
            opacity: 0,
            transformPerspective: 800,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
          }
        );
      };

      // Trigger
      animateWithBounce(h5Ref.current);
      animateWithBounce(h2Line1Ref.current);
      animateWithBounce(h2Line2Ref.current);
      animateParagraph(pRef.current);
      animateImage(heroImgRef.current);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative md:min-h-[120vh] overflow-hidden">
      {/* Background layers */}
      {["/layer-1.png", "/layer-2.png", "/layer-3.png", "/layer-4.png"].map(
        (src, i) => (
          <div
            key={i}
            ref={(el) => { bgLayersRef.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center z-0 will-change-opacity"
            style={{ backgroundImage: `url(${src})` }}
          />
        )
      )}

      <Image
        src="/hero-blur.png"
        height={100}
        width={100}
        alt="dots"
        className="w-full left-0 object-cover absolute xl:bottom-0 lg:bottom-15 md:bottom-25 -bottom-5 z-30"
      />

      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex flex-col md:flex-row items-center md:justify-between justify-center md:min-h-[120vh] pt-30 md:pt-0 relative">
        <div className="2xl:max-w-[682px] xl:max-w-[550px] md:max-w-[42%]">
          <h5
            ref={h5Ref}
            className="font-bricolage font-normal 2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[24px] tracking-[-0.07em] capitalize text-white"
          >
            {wrapWordsInSpans(h5Text)}
          </h5>

          <h2 className="font-bricolage font-extrabold 2xl:text-[90.64px] xl:text-[70px] lg:text-[55px] md:text-[42px] leading-[100%] text-[36px] tracking-[-0.07em] uppercase text-white">
            <div ref={h2Line1Ref}>{wrapWordsInSpans(h2Line1)}</div>
            <span
              ref={h2Line2Ref}
              className="font-tartuffo font-thin tracking-normal capitalize 2xl:-mt-12 xl:-mt-9 lg:-mt-7 -mt-5 inline-block"
            >
              {wrapWordsInSpans(h2Line2)}
            </span>
          </h2>

          <p
            ref={pRef}
            className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[20px] text-[18px] tracking-[-0.07em] capitalize text-white leading-[142%] mt-[2.4vh]"
          >
            {wrapWordsInSpans(pText)}
          </p>

          {/* CTA Button (unchanged) */}
          <button className="mt-7.5 bg-[#003459] text-white rounded-[334px] 2xl:w-[371px] lg:w-[300px] max-w-fit lg:max-w-full px-4 lg:px-0 2xl:h-[69px] h-[60px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline button-border" id="btn">
            <Image
              src="/button-arrow.svg"
              width={1000}
              height={100}
              alt="button-arrow"
              className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
            />
            Book a Free Consultation
          </button>

          {/* Socials (unchanged) */}
          <div className="md:flex items-center gap-1 2xl:mt-28 mt-24 z-50 relative hidden">
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

        {/* Hero Image */}
        <div
          ref={heroImgRef}
          className="md:absolute 2xl:-right-51 lg:right-0 md:-right-10 right-0 hero z-20 md:mt-0 mt-[5vh]"
        >
          <Image
            src="/hero.svg"
            height={100}
            width={100}
            alt="hero"
            className="2xl:w-[1057px] xl:w-[850px] lg:w-[700px] md:w-[600px] w-full md:scale-100 scale-120 2xl:h-[1107px] h-auto"
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