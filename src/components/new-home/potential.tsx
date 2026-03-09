"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Potential = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const letters = heading.querySelectorAll<HTMLSpanElement>(".letter");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        { color: "rgba(255,255,255,0.15)" },
        {
          color: "rgba(255,255,255,1)",
          ease: "none",
          stagger: {
            each: 0.03,
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
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
            {/* "When potential" starts white, rest animates letter by letter */}
            {splitLetters("When potential ", "", true)}
            {splitLetters("clients search for a lawyer,", "", false)}
            <br />
            {splitLetters("your website has seconds to earn trust.", "font-tartuffo font-light tracking-[0em]", false)}
          </h2>
        </div>

        <div className="flex md:flex-row flex-col justify-between md:flex-wrap lg:flex-nowrap md:gap-0 gap-6 items-center my-[2.3vh]">
          <div className="2xl:w-[329px] xl:w-[295px] md:w-[235px] w-full md:h-[249px] h-[220px] px-[10px] bg-[#0B1C3F] box-shadow flex flex-col gap-[1.3vh] justify-center items-center potential-card">
            <div className="2xl:w-[99px] 2xl:h-[99px] w-[80px] h-[80px] rounded-full bg-[#00020F4D] flex justify-center items-center">
              <img src="/new-home/potential1.webp" alt="icon" className="2xl:w-auto w-[35px]" />
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[20px] md:text-[17px] text-[20px] leading-[142%] capitalize text-white text-center">
              Authority-Driven Law Firm Website Design
            </h4>
          </div>
          <div className="2xl:w-[329px] xl:w-[295px] md:w-[235px] w-full md:h-[249px] h-[220px] px-[10px] bg-[#0B1C3F] box-shadow flex flex-col gap-[1.3vh] justify-center items-center potential-card">
            <div className="2xl:w-[99px] 2xl:h-[99px] w-[80px] h-[80px] rounded-full bg-[#00020F4D] flex justify-center items-center">
              <img src="/new-home/potential2.webp" alt="icon" className="2xl:w-auto w-[35px]" />
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[20px] md:text-[17px] text-[20px] leading-[142%] capitalize text-white text-center">
              SEO-Optimized Structure for Legal Markets
            </h4>
          </div>
          <div className="2xl:w-[329px] xl:w-[295px] md:w-[235px] w-full md:h-[249px] h-[220px] xl:px-[60px] px-[40px] bg-[#0B1C3F] box-shadow flex flex-col gap-[1.3vh] justify-center items-center potential-card">
            <div className="2xl:w-[99px] 2xl:h-[99px] w-[80px] h-[80px] rounded-full bg-[#00020F4D] flex justify-center items-center">
              <img src="/new-home/potential3.webp" alt="icon" className="2xl:w-auto w-[35px]" />
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[20px] md:text-[17px] text-[20px] leading-[142%] capitalize text-white text-center">
              Conversion-Focused Layout
            </h4>
          </div>
          <div className="2xl:w-[329px] xl:w-[295px] md:w-[235px] w-full md:h-[249px] h-[220px] px-[10px] bg-[#0B1C3F] box-shadow flex flex-col gap-[1.3vh] justify-center items-center lg:mt-0 md:mt-[2vh] potential-card">
            <div className="2xl:w-[99px] 2xl:h-[99px] w-[80px] h-[80px] rounded-full bg-[#00020F4D] flex justify-center items-center">
              <img src="/new-home/potential4.webp" alt="icon" className="2xl:w-auto w-[35px]" />
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[20px] md:text-[17px] text-[20px] leading-[142%] capitalize text-white text-center">
              Built for Competitive Legal Markets
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Potential;