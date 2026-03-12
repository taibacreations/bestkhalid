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

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Vectors slide in from their respective sides
      gsap.fromTo(
        vector1Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        vector2Ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      // Heading, paragraph, CTA, and note cascade up
      gsap.fromTo(
        [headingRef.current, paraRef.current, ctaRef.current, noteRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="md:py-[13vh] py-[10vh] relative">
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
        <div className="2xl:max-w-[957px] lg:max-w-[800px] max-w-[700px] mx-auto flex flex-col justify-center items-center relative">
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
              className="font-bricolage font-light xl:text-[18px] text-[16px] leading-[142%] tracking-[-0.01em] text-white capitalize mt-[2.3vh]"
            >
              If you're serious about increasing consultation inquiries and
              strengthening your online presence, let's discuss your goals.
            </p>
            <div className="flex flex-col justify-center items-center mt-[2vh] gap-[2vh]">
              <div
                ref={ctaRef}
                style={{ willChange: "transform, opacity" }}
              >
                <Link
                  href="/contact"
                  className="font-bricolage font-bold xl:text-[18px] md:text-[16px] text-[14px] leading-[100%] tracking-[-0.07em] capitalize bg-white xl:w-[378px] md:w-[320px] md:h-[44px] w-fit p-3 rounded-full flex justify-center items-center gap-2 text-[#0033FF] hover:opacity-80 transition-all duration-300"
                >
                  <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="12"
                    viewBox="0 0 17 12"
                    fill="none"
                  >
                    <path
                      d="M0.75 5.52297L-3.49691e-07 5.52297L-4.15258e-07 6.27297L0.75 6.27297L0.75 5.52297ZM16.2803 6.0533C16.5732 5.76041 16.5732 5.28554 16.2803 4.99264L11.5074 0.219671C11.2145 -0.073222 10.7396 -0.073222 10.4467 0.219671C10.1538 0.512564 10.1538 0.987438 10.4467 1.28033L14.6893 5.52297L10.4467 9.76561C10.1538 10.0585 10.1538 10.5334 10.4467 10.8263C10.7396 11.1192 11.2145 11.1192 11.5074 10.8263L16.2803 6.0533ZM0.75 5.52297L0.75 6.27297L15.75 6.27297L15.75 5.52297L15.75 4.77297L0.75 4.77297L0.75 5.52297ZM0.75 5.52297L1.5 5.52297L1.5 1.52297L0.75 1.52297L0 1.52297L-3.49691e-07 5.52297L0.75 5.52297Z"
                      fill="#0033FF"
                    />
                  </svg>
                  Book Your Free Strategy Consultation
                </Link>
              </div>
              <p
                ref={noteRef}
                style={{ willChange: "transform, opacity" }}
                className="font-bricolage font-light text-[12px] leading-[142%] tracking-[-0.01em] capitalize text-white"
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