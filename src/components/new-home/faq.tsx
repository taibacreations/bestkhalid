"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqCardProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "How Long Does The Process Take?",
    answer:
      "Typically 4-6 weeks from strategy to launch. This includes research, design, development, and revisions. Complex projects with custom integrations may take longer, but I'll always give you a clear timeline upfront.",
  },
  {
    id: 2,
    question: "Do You Include SEO?",
    answer:
      "Yes — every website I build is optimized for on-page SEO from the ground up. This includes proper semantic HTML structure, meta tags, page speed optimization, mobile responsiveness, and schema markup where applicable.",
  },
  {
    id: 3,
    question: "Can You Redesign My Current Website?",
    answer:
      "Absolutely. I work with existing brands and websites regularly. Whether you need a full redesign or a refined refresh, I'll audit what you have, identify what's holding you back, and build something that actually converts.",
  },
  {
    id: 4,
    question: "Do You Work Internationally?",
    answer:
      "Yes, I work with clients globally. Time zone differences are never a barrier — I communicate clearly and keep projects moving through async updates and scheduled calls at times that work for you.",
  },
];

const FaqCard: React.FC<FaqCardProps> = ({ item, isOpen, onToggle }) => {
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
          onComplete: () => {
            isAnimating.current = false;
          },
        },
      );
      gsap.to(iconRef.current, {
        rotation: 180,
        duration: 0.35,
        ease: "power2.out",
      });
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
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  // Set initial state
  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    gsap.set(el, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      display: isOpen ? "block" : "none",
    });
    gsap.set(iconRef.current, { rotation: isOpen ? 180 : 0 });
  }, []);

  return (
    <div
      className="rounded-[14px] cursor-pointer transition-colors duration-300 bg-[#0F193280] px-[4vw] relative"
      style={{
        background: isOpen ? "#0F193280" : "#0F193280",
        border: "1px solid #FFFFFF0F",
      }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between py-6 gap-4 relative z-30">
        <h3 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[22px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] text-white capitalize">
          {item.question}
        </h3>
        <img ref={iconRef} src="/new-home/faq-arrow.webp" alt="arrow" className="xl:w-auto w-[25px]"/>
      </div>

      <div ref={answerRef} style={{ overflow: "hidden" }}>
        <p className="font-bricolage font-normal 2xl:text-[18px] xl:text-[16px] text-[15px] leading-[142%] tracking-[-0.01em] capitalize text-white xl:pt-[1.3vh] pb-[2vh] md:pr-[14vw] pr-[10vw] relative z-30">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<number>(1);

  const handleToggle = (id: number): void => {
    setOpenId((prev) => (prev === id ? 0 : id));
  };

  return (
    <section className="max-w-[1525px] mx-auto xl:px-10 px-4 lg:my-[14vh] md:my-[10vh] my-[8vh] relative">
      <img src="/new-home/faq-vector.webp" alt="vector" className="absolute right-[-16%] top-[-50vh] z-0"/>
      <div>
        <div>
          <h2 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize relative z-30">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col md:gap-5 gap-3 mt-12">
          {faqData.map((item: FaqItem) => (
            <FaqCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
