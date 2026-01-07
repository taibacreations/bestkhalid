"use client";
import Image from "next/image";
import Circle from "./circle";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Problem = () => {
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

  const problemH5Ref = useRef<HTMLHeadingElement>(null);
  const problemH3Ref = useRef<HTMLHeadingElement>(null);
  const problemPRef = useRef<HTMLParagraphElement>(null); // ✅ Ref for paragraph

  // Animation for headings (with bounce)
  const animateWithBounce = (target: HTMLElement | null) => {
    if (!target) return;
    const words = target.querySelectorAll("span > span");
    gsap.fromTo(
      words,
      { y: "-120%", opacity: 0 },
      {
        y: "5%",
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.04,
        onComplete: () => {
          gsap.to(words, {
            y: 0,
            duration: 0.4,
            ease: "elastic.out(0.8, 0.5)",
          });
        },
      }
    );
  };

  // ✅ Animation for paragraph (NO bounce — smooth only)
  const animateParagraph = (target: HTMLElement | null) => {
    if (!target) return;
    gsap.fromTo(
      target.querySelectorAll("span > span"),
      { y: "-100%", opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.04, delay: 0.15 }
    );
  };

  // Trigger all animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateWithBounce(problemH5Ref.current);
      animateWithBounce(problemH3Ref.current);
      animateParagraph(problemPRef.current); // ✅ Animate paragraph
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-problem"
      className="-mt-7 relative lg:min-h-[110vh] py-5 lg:py-0 bg-[#0A0A0A] overflow-hidden xl:px-10 px-5"
    >
      <Image
        src="/names.png"
        height={100}
        width={100}
        alt="name"
        className="2xl:max-w-[1075px] 2xl:max-h-[1075px] xl:max-w-[600px] xl:max-h-[600px] lg:max-w-[500px] lg:max-h-[500px] max-w-[400px] max-h-[400px] w-full h-full 2xl:-top-[7vh] -top-[5vh] object-contain absolute 2xl:-right-[20.5vw] names z-30 hidden md:block"
      />
      <div className="absolute 2xl:-right-[55.5vw] -right-[75vw] lg:-top-[22vh] top-[-33vh] revolving hidden md:block">
        <Circle />
      </div>
      <Image
        src="/macbook.svg"
        height={100}
        width={100}
        alt="macbook"
        className="2xl:w-[1398px] xl:w-[1150px] lg:w-[850px] w-[750px] h-auto absolute lg:-left-5 -left-30 xl:top-27 lg:top-40 top-50 hidden md:block z-30"
      />
      <div className="md:flex gap-4 items-end absolute xl:bottom-[15.5%] lg:bottom-[24%] md:bottom-[7%] bottom-[25%] 2xl:left-64 lg:left-[5%] left-3 hidden hover:translate-y-[-75px] hover:translate-x-[-16px] hover:transition-all duration-300 z-30">
        <div className="bg-[url(/hero-text-bg.png)] bg-cover 2xl:w-[479px] 2xl:h-[94px] xl:w-[400px] lg:w-[350px] w-[300px] lg:h-[80px] h-[60px] rounded-full font-bricolage font-normal 2xl:text-[24px] xl:text-[22px] lg:text-[20px] text-[16px] leading-[142%] tracking-[-0.01em] capitalize text-white flex justify-center items-center text-center">
          A weak website means missed appointments and lost trust.
        </div>
        <Image
          src="/l-line.png"
          height={100}
          width={100}
          alt="l-line"
          className="lg:w-[100px] w-[70px] lg:h-[196px] h-auto lg:mb-10 mb-8"
        />
      </div>
      <div>
        <div className="text-center 2xl:max-w-[988px] xl:max-w-[900px] lg:max-w-[800px] md:max-w-[600px] max-w-full mx-auto">
          <div className="2xl:max-w-[842px] xl:max-w-[780px] lg:max-w-[700px] md:max-w-[550px] max-w-full mx-auto">
            <h5
              ref={problemH5Ref}
              className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white -mb-2"
            >
              {wrapWordsInSpans(`[ The Problem ]`)}
            </h5>

            <h3
              ref={problemH3Ref}
              className="xl:mt-4 mt-2 font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[142%] capitalize text-white"
            >
              {wrapWordsInSpans(
                `Your Website Shouldn't Be Why Patients Choose Your Competitor`
              )}
            </h3>
          </div>

          {/* ✅ Animated paragraph — no bounce */}
          <p
            ref={problemPRef}
            className="xl:mt-5 mt-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white"
          >
            {wrapWordsInSpans(
              "Most healthcare websites are outdated, hard to navigate, and don’t reflect the quality of care you provide. In today`s digital-first world, patients expect a seamless online experience"
            )}
          </p>
        </div>
        <div className="bg-[#0E1A4A08] 2xl:h-[483px] 2xl:h-[400px] md:h-[380px] min-h-[300px] 2xl:w-[817px] xl:w-[750px] lg:w-[600px] md:w-[500px] max-w-full lg:ml-[35%] md:ml-[30%] relative 2xl:mt-13 xl:mt-10 mt-8 z-20 relative overflow-hidden rotating-border problem-bg-animation">
          <div className="problem-bg-animation-2"></div>
          <Image
            src="/glass-overlay.png"
            height={100}
            width={100}
            alt="glass-overlay"
            className="absolute inset-0 w-full md:h-auto min-h-[300px] z-0 overflow-hidden"
          />
          <div className="flex md:justify-end justify-start items-center 2xl:mr-20 xl:mr-[-4vw] lg:mr-[-12vw] md:mr-[-24vw] points-margin">
            <ul className="font-bricolage font-bold 2xl:text-[28px] xl:text-[26px] lg:text-[22px] text-[18px] leading-[142%] tracking-[-0.01em] capitalize text-white flex flex-col gap-3 justify-center 2xl:mt-12 mt-10 lg:mt-8 md:mt-5 mt-8 list-disc list">
              <li className="li-2">Slow load times</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="2xl:w-full xl:w-[80%] md:w-[60%] w-full h-[2px]"
              />
              <li className="li-2">Confusing appointment booking</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="2xl:w-full xl:w-[80%] md:w-[60%] w-full h-[2px]"
              />
              <li className="li-2">Unclear services</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="2xl:w-full xl:w-[80%] md:w-[60%] w-full h-[2px]"
              />
              <li className="li-2">Not mobile-friendly</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="2xl:w-full xl:w-[80%] md:w-[60%] w-full h-[2px]"
              />
              <li className="li-2">Poor SEO</li>
            </ul>
          </div>
          <Image
            src="/macbook.svg"
            height={100}
            width={100}
            alt="macbook"
            className="w-full h-auto md:hidden scale-140 mt-[3vh]"
          />
          <div className="md:hidden gap-2 items-end w-full mt-[-3vh] z-40 relative">
            <div className="bg-[url(/hero-text-bg.png)] bg-cover py-3 px-3 rounded-full font-bricolage font-normal text-[11px] leading-[142%] tracking-[-0.01em] capitalize text-white flex justify-center items-center text-center">
              A weak website means missed appointments and lost trust.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;