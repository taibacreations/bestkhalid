"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqCardProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  animRef: (el: HTMLDivElement | null) => void;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "How long does the process take?",
    answer:
      "Most therapist websites are completed within 2–3 weeks, depending on requirements.",
  },
  {
    id: 2,
    question: "Can you redesign my current website?",
    answer:
      "Yes, I can improve clarity, structure, and trust signals in your existing website.",
  },
  {
    id: 3,
    question: "Do you work with all types of therapists?",
    answer:
      "Yes, including psychologists, counselors, psychotherapists, and clinics.",
  },
  {
    id: 4,
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes, every website is fully optimized for mobile users.",
  },
];

const FaqCard: React.FC<FaqCardProps> = ({ item, isOpen, onToggle, animRef }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef<boolean>(false);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.set(el, { display: "block" });
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => { isAnimating.current = false; },
        }
      );
      gsap.to(iconRef.current, { rotation: 180, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(el, { display: "none" });
          isAnimating.current = false;
        },
      });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.35, ease: "power2.out" });
    }
  }, [isOpen]);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    gsap.set(el, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      display: isOpen ? "block" : "none",
    });
    gsap.set(iconRef.current, { rotation: isOpen ? 180 : 0 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={animRef}
      style={{ border: "1px solid #FFFFFF0F", willChange: "transform, opacity" }}
      className="rounded-[14px] cursor-pointer transition-colors duration-300 bg-[#0F193280] px-[4vw] relative"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between py-6 gap-4 relative z-30">
        <h3 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] leading-[123%] tracking-[0em] text-white">
          {item.question}
        </h3>
        <img ref={iconRef} src="/new-home/faq-arrow.webp" alt="arrow" className="xl:w-auto w-[25px]" />
      </div>

      <div ref={answerRef} style={{ overflow: "hidden" }}>
        <p className="font-bricolage font-normal 2xl:text-[18px] xl:text-[16px] text-[15px] leading-[142%] tracking-[0em] text-white xl:pt-[1.3vh] pb-[2vh] md:pr-[14vw] pr-[10vw] relative z-30">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<number>(1);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const vectorRef = useRef<HTMLImageElement | null>(null);
  const cardAnimRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (id: number): void => {
    setOpenId((prev) => (prev === id ? 0 : id));
  };

  // 🎬 Scroll-triggered entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Vector slides in from right
      gsap.fromTo(
        vectorRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      // Heading fades up
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        }
      );

      // FAQ cards stagger up
      gsap.fromTo(
        cardAnimRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: cardAnimRefs.current[0], start: "top 85%", once: true },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1525px] mx-auto xl:px-10 px-4 lg:my-[14vh] md:my-[10vh] my-[8vh] relative"
    >
      <img
        ref={vectorRef}
        src="/new-home/faq-vector.webp"
        alt="vector"
        style={{ willChange: "transform, opacity" }}
        className="absolute right-[-16%] top-[-50vh] z-0"
      />
      <div>
        <div>
          <h2
            ref={headingRef}
            style={{ willChange: "transform, opacity" }}
            className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize relative z-30"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col md:gap-5 gap-3 mt-12">
          {faqData.map((item: FaqItem, index: number) => (
            <FaqCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
              animRef={(el) => { cardAnimRefs.current[index] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;