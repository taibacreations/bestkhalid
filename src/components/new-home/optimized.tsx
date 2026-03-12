"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Optimized = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading fades up
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      // Image slides in from the left
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%", once: true },
        }
      );

      // Steps slide in from the right, staggered
      gsap.fromTo(
        stepsRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: stepsRef.current[0], start: "top 80%", once: true },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Clear scope before project start",
      desc: "We define every detail upfront so there are no surprises during development.",
    },
    {
      num: "02",
      title: "Defined Timeline",
      desc: "Transparent milestones and deadlines keep your project on track from day one.",
    },
    {
      num: "03",
      title: "Structured revision Rounds",
      desc: "Built-in feedback cycles ensure the final product matches your vision perfectly.",
    },
    {
      num: "04",
      title: "Post-Launch support",
      desc: "Ongoing assistance after go-live to ensure everything runs smoothly.",
    },
    {
      num: "05",
      title: "Performance-focused build",
      desc: "Optimized code and architecture for lightning-fast load times and scalability.",
    },
  ];

  return (
    <section ref={sectionRef} className="max-w-[1450px] mx-auto xl:px-10 px-4">
      <div>
        <div>
          <h2
            ref={headingRef}
            style={{ willChange: "transform, opacity" }}
            className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize"
          >
            Built for the Future Optimized{" "}
            <span className="font-tartuffo font-light tracking-0">
              for Right Now
            </span>
          </h2>
        </div>

        <div className="flex md:flex-row flex-col justify-between my-[3.8vh]">

          {/* ← Image slides in from left */}
          <div
            ref={imageRef}
            style={{ willChange: "transform, opacity" }}
            className="relative md:mt-0 mt-[3vh]"
          >
            <img
              src="/new-home/ipad.webp"
              alt="ipad"
              className="2xl:w-auto xl:w-[540px] lg:w-[420px] md:w-[320px] w-full"
            />
          </div>

          {/* → Steps slide in from right */}
          <div className="xl:w-[590px] lg:w-[480px] md:w-[370px] w-full flex flex-col gap-8 relative xl:mt-[9.5vh] lg:mt-[7vh] mt-[5vh]">
            <div className="border border-dashed border-white xl:w-[546px] lg:w-[500px] md:w-[460px] w-[500px] rotate-[90deg] absolute xl:top-[40%] top-[49%] 2xl:left-[-13.2vw] xl:left-[-43%] lg:left-[-49%] md:left-[-58%] md:right-auto right-[30vw] optimize-border" />

            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el; }}
                style={{ willChange: "transform, opacity" }}
                className="flex md:gap-[.8vw] gap-3 relative"
              >
                <div className="bg-[#0029CC] 2xl:h-[36.5px] 2xl:w-[45px] lg:h-[35px] lg:w-[40px] md:w-[40px] md:h-[30px] h-[32px] w-[50px] rounded-full flex justify-center items-center optimized-shadow font-inter font-[500] xl:text-[18px] lg:text-[16px] md:text-[14px] text-[16px] text-[#E2E8F0] lg:leading-[30.15px] shrink-0">
                  {step.num}
                </div>
                <div>
                  <h5 className="font-bricolage font-bold xl:text-[18px] lg:text-[16px] md:text-[14px] text-[16px] leading-[142%] tracking-[-0.01em] capitalize text-white">
                    {step.title}
                  </h5>
                  <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] md:text-[14px] text-[16px] leading-[142%] tracking-[-0.01em] capitalize text-[#AFAFAF] mt-[1vh]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Optimized;