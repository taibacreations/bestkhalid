"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Potential = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const letters = heading.querySelectorAll<HTMLSpanElement>(".letter");

    const ctx = gsap.context(() => {
      // 🔡 Letter-by-letter color reveal (unchanged)
      gsap.fromTo(
        letters,
        { color: "rgba(255,255,255,0.15)" },
        {
          color: "rgba(255,255,255,1)",
          ease: "none",
          stagger: { each: 0.03 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );

      // 🃏 Cards slide up and fade in with stagger
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitLetters = (
    text: string,
    extraClass: string = "",
    startWhite: boolean = false
  ) =>
    text.split("").map((char, i) =>
      char === " " ? (
        <span key={i} className="inline-block" style={{ marginRight: "0.25em" }} />
      ) : (
        <span
          key={i}
          className={`letter inline-block ${extraClass}`}
          style={{ color: startWhite ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.15)" }}
        >
          {char}
        </span>
      )
    );

  const cards = [
    {
      img: "/new-home/potential1.webp",
      title: "Authority-Driven Law Firm Website Design",
      px: "px-[10px]",
    },
    {
      img: "/new-home/potential2.webp",
      title: "SEO-Optimized Structure for Legal Markets",
      px: "px-[10px]",
    },
    {
      img: "/new-home/potential3.webp",
      title: "Conversion-Focused Layout",
      px: "xl:px-[60px] px-[40px]",
    },
    {
      img: "/new-home/potential4.webp",
      title: "Built for Competitive Legal Markets",
      px: "px-[10px]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="max-w-[1525px] mx-auto xl:px-10 px-4 lg:my-[11.2vh] my-[8vh] relative z-10"
    >
      <div>
        <div>
          <h2
            ref={headingRef}
            className="font-bricolage font-bold 2xl:text-[44px] xl:text-[38px] lg:text-[36px] text-[32px] leading-[142%] tracking-[-0.04em] capitalize text-center"
          >
            {splitLetters("When potential ", "", true)}
            {splitLetters("clients search for a lawyer,", "", false)}
            <br />
            {splitLetters("your website has seconds to earn trust.", "font-tartuffo font-light tracking-[0em]", false)}
          </h2>
        </div>

        <div className="flex md:flex-row flex-col justify-between md:flex-wrap lg:flex-nowrap md:gap-0 gap-6 items-center my-[2.3vh]">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{ willChange: "transform, opacity" }}
              className={`2xl:w-[329px] xl:w-[295px] md:w-[235px] w-full md:h-[249px] h-[220px] ${card.px} bg-[#0B1C3F] box-shadow flex flex-col gap-[1.3vh] justify-center items-center potential-card${i === 3 ? " lg:mt-0 md:mt-[2vh]" : ""}`}
            >
              <div className="2xl:w-[99px] 2xl:h-[99px] w-[80px] h-[80px] rounded-full bg-[#00020F4D] flex justify-center items-center">
                <img src={card.img} alt="icon" className="2xl:w-auto w-[35px]" />
              </div>
              <h4 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[20px] md:text-[17px] text-[20px] leading-[142%] capitalize text-white text-center">
                {card.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Potential;