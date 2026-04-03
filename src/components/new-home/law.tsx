"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Law = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const row1Ref = useRef<(HTMLDivElement | null)[]>([]);
  const row2Ref = useRef<(HTMLDivElement | null)[]>([]);
  const footerTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 📝 Subtitle & subheading fade up
      gsap.fromTo(
        [subtitleRef.current, subheadingRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // 🃏 Row 1 cards
      gsap.fromTo(
        row1Ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: row1Ref.current[0],
            start: "top 85%",
            once: true,
          },
        },
      );

      // 🃏 Row 2 cards
      gsap.fromTo(
        row2Ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: row2Ref.current[0],
            start: "top 85%",
            once: true,
          },
        },
      );

      // 📌 Footer text
      gsap.fromTo(
        footerTextRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerTextRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1525px] mx-auto xl:px-10 px-4 relative lg:mb-[15.5vh] lg:mt-[10vh] mb-[10vh] md:mt-[6vh] mt-[-4vh] z-10"
    >
      <img
        src="/new-home/law-blur.webp"
        alt="vector"
        className="absolute right-[-13%] top-[-50vh]"
      />

      <div className="relative z-10">
        <div>
          {/* ✅ Plain heading (no animation) */}
          <h2 className="font-bricolage font-bold 2xl:text-[44px] xl:text-[38px] lg:text-[36px] text-[32px] md:leading-[142%] leading-[120%] tracking-[-0.04em] uppercase text-center text-white">
            Is Your Law Firm{" "}
            <span>Website Costing You Cases?</span>
          </h2>

          <p
            ref={subtitleRef}
            className="font-bricolage font-normal 2xl:text-[20px] text-[18px] leading-[130%] tracking-[0em] text-white text-center mb-[2vh] mt-[1vh]"
          >
            Nobody calls to tell you your website lost them. They just quietly
            hire the firm down the road whose website made them feel more
            confident.
          </p>

          <h2
            ref={subheadingRef}
            className="font-tartuffo font-normal 2xl:text-[44px] xl:text-[38px] lg:text-[36px] text-[32px] md:leading-[142%] capitalize text-white text-center"
          >
            Most law firm websites:
          </h2>
        </div>

        <div className="mt-[3vh]">
          {/* Row 1 */}
          <div className="flex lg:flex-nowrap md:flex-wrap md:flex-row flex-col lg:justify-between justify-center md:gap-[20px] lg:gap-0 gap-[20px] items-center">
            <div
              ref={(el) => {
                row1Ref.current[0] = el;
              }}
              style={{ willChange: "transform, opacity" }}
              className="2xl:w-[460px] xl:w-[410px] lg:w-[320px] md:w-[48%] w-[100%] xl:h-[207px] bg-[url(/new-home/law.webp)] 2xl:bg-cover bg-contain bg-no-repeat bg-center xl:pt-[3vh] py-[3vh] md:px-[2.8vw] px-[20px] law-box"
            >
              <img
                src="/new-home/law1.webp"
                alt="icon"
                className="xl:w-auto w-[35px]"
              />
              <h4 className="font-bricolage font-bold xl:text-[20px] text-[18px] xl:leading-[142%] leading-[100%] capitalize text-white my-[1.3vh]">
                Look Outdated or Generic
              </h4>
              <p className="font-bricolage font-normal xl:text-[16px] text-[14px] leading-[130%] tracking-[-0.01em] capitalize text-white">
                which, in a trust-based profession, is a big problem dressed up
                as a small one
              </p>
            </div>
            <div
              ref={(el) => {
                row1Ref.current[1] = el;
              }}
              style={{ willChange: "transform, opacity" }}
              className="2xl:w-[460px] xl:w-[410px] lg:w-[320px] md:w-[48%] w-[100%] xl:h-[207px] bg-[url(/new-home/law.webp)] 2xl:bg-cover md:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center xl:pt-[3vh] py-[3vh] md:px-[2.8vw] px-[20px] law-box"
            >
              <img
                src="/new-home/law2.webp"
                alt="icon"
                className="xl:w-auto w-[35px]"
              />
              <h4 className="font-bricolage font-bold xl:text-[20px] text-[18px] xl:leading-[142%] leading-[100%] capitalize text-white my-[1.3vh]">
                Have no real consultation funnel
              </h4>
              <p className="font-bricolage font-normal xl:text-[16px] text-[14px] leading-[130%] tracking-[-0.01em] capitalize text-white">
                a buried contact form is not a strategy
              </p>
            </div>
            <div
              ref={(el) => {
                row1Ref.current[2] = el;
              }}
              style={{ willChange: "transform, opacity" }}
              className="2xl:w-[460px] xl:w-[410px] lg:w-[320px] md:w-[48%] w-[100%] xl:h-[207px] bg-[url(/new-home/law.webp)] 2xl:bg-cover md:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center xl:pt-[3vh] py-[3vh] md:px-[2.8vw] px-[20px] law-box lg:mt-0 md:mt-[-1.5vh]"
            >
              <img
                src="/new-home/law3.webp"
                alt="icon"
                className="xl:w-auto w-[35px]"
              />
              <h4 className="font-bricolage font-bold xl:text-[20px] text-[18px] xl:leading-[142%] leading-[100%] capitalize text-white my-[1.3vh]">
                Don't rank for high-intent legal keywords
              </h4>
              <p className="font-bricolage font-normal xl:text-[16px] text-[14px] leading-[130%] tracking-[-0.01em] capitalize text-white">
                so the right clients never even find you
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex lg:flex-nowrap md:flex-wrap md:flex-row flex-col lg:justify-between justify-center gap-[20px] lg:gap-0 mt-[20px] items-center xl:mt-[3vh] lg:mt-0 md:mt-[1.5vh]">
            <div
              ref={(el) => {
                row2Ref.current[0] = el;
              }}
              style={{ willChange: "transform, opacity" }}
              className="2xl:w-[460px] xl:w-[410px] lg:w-[320px] md:w-[48%] w-[100%] xl:h-[207px] bg-[url(/new-home/law.webp)] 2xl:bg-cover md:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center xl:pt-[3vh] py-[3vh] md:px-[2.8vw] px-[20px] pr-[5vw] law-box"
            >
              <img
                src="/new-home/law4.webp"
                alt="icon"
                className="xl:w-auto w-[35px]"
              />
              <h4 className="font-bricolage font-bold xl:text-[20px] text-[18px] xl:leading-[142%] leading-[100%] capitalize text-white my-[1.3vh]">
                Have no real consultation funnel
              </h4>
              <p className="font-bricolage font-normal xl:text-[16px] text-[14px] leading-[130%] tracking-[-0.01em] capitalize text-white">
                a buried contact form is not a strategy
              </p>
            </div>
            <div
              ref={(el) => {
                row2Ref.current[1] = el;
              }}
              style={{ willChange: "transform, opacity" }}
              className="2xl:w-[460px] xl:w-[410px] lg:w-[320px] md:w-[48%] w-[100%] xl:h-[207px] bg-[url(/new-home/law.webp)] 2xl:bg-cover md:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center xl:pt-[3vh] py-[3vh] md:px-[2.8vw] px-[20px] law-box"
            >
              <img
                src="/new-home/law5.webp"
                alt="icon"
                className="xl:w-auto w-[35px]"
              />
              <h4 className="font-bricolage font-bold xl:text-[20px] text-[18px] xl:leading-[142%] leading-[100%] capitalize text-white my-[1.3vh]">
                Load slowly on mobile
              </h4>
              <p className="font-bricolage font-normal xl:text-[16px] text-[14px] leading-[130%] tracking-[-0.01em] capitalize text-white">
                as over 60% of legal searches happen on a phone
              </p>
            </div>
            <div
              ref={(el) => {
                row2Ref.current[2] = el;
              }}
              style={{ willChange: "transform, opacity" }}
              className="2xl:w-[460px] xl:w-[410px] lg:w-[320px] md:w-[48%] w-[100%] xl:h-[207px] bg-[url(/new-home/law.webp)] 2xl:bg-cover md:bg-contain bg-[length:100%_100%] bg-no-repeat bg-center xl:pt-[3vh] py-[3vh] md:px-[2.8vw] px-[20px] law-box"
            >
              <img
                src="/new-home/law6.webp"
                alt="icon"
                className="xl:w-auto w-[35px]"
              />
              <h4 className="font-bricolage font-bold xl:text-[20px] text-[18px] xl:leading-[142%] leading-[100%] capitalize text-white my-[1.3vh]">
                Build zero immediate credibility
              </h4>
              <p className="font-bricolage font-normal xl:text-[16px] text-[14px] leading-[130%] tracking-[-0.01em] capitalize text-white">
                as first impressions online are brutally fast
              </p>
            </div>
          </div>
        </div>

        <p
          ref={footerTextRef}
          style={{ willChange: "transform, opacity" }}
          className="xl:text-[20px] lg:text-[18px] text-[16px] md:leading-[32.5px] leading-[130%] text-center text-[#FFFFFFE5] font-semibold font-inter lg:w-[890px] md:w-[80%] w-full mx-auto mt-[5vh]"
        >
          Potential clients compare multiple firms quickly. If your website
          doesn't project authority instantly, they move on.
        </p>
      </div>
    </section>
  );
};

export default Law;
