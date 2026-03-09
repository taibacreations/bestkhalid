"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CardData {
  id: string;
  text: string;
}

interface ForCardProps {
  id: string;
  text: string;
  isFirst: boolean;
  isXl: boolean;
  isMobile: boolean;
  activeCardRef: React.MutableRefObject<string | null>;
  onActivate: (id: string, reset: () => void) => void;
}

const cardData: CardData[] = [
  {
    id: "01",
    text: "You want more qualified case inquiries — not just more visitors who leave without calling",
  },
  {
    id: "02",
    text: "You operate in a competitive legal market where standing out actually matters",
  },
  {
    id: "03",
    text: "You value authority and positioning over generic design",
  },
  {
    id: "04",
    text: "You're serious about long-term growth — not a quick fix that fades in six months",
  },
  {
    id: "05",
    text: "You understand your website is an investment, not just a line item to tick off",
  },
];

const XL_BREAKPOINT = 1280;
const MD_BREAKPOINT = 768;

const useBreakpoints = (): { isXl: boolean; isMobile: boolean } => {
  const [state, setState] = useState<{ isXl: boolean; isMobile: boolean }>({
    isXl:
      typeof window !== "undefined"
        ? window.innerWidth >= XL_BREAKPOINT
        : true,
    isMobile:
      typeof window !== "undefined"
        ? window.innerWidth < MD_BREAKPOINT
        : false,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const width = entries[0]?.contentRect.width ?? window.innerWidth;
      setState({
        isXl: width >= XL_BREAKPOINT,
        isMobile: width < MD_BREAKPOINT,
      });
    });

    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  return state;
};

const ForCard: React.FC<ForCardProps> = ({
  id,
  text,
  isFirst,
  isXl,
  isMobile,
  activeCardRef,
  onActivate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const numRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const firstMargin = isMobile ? "0px" : isXl ? "-7.5vh" : "-6.9vh";
  const restMargin = isMobile ? "0px" : isXl ? "-13.5vh" : "-12.5vh";
  const marginTop = isFirst ? firstMargin : restMargin;

  // Reusable reset function — can be called externally to un-stick this card
  const resetCard = (): void => {
    const card = cardRef.current;
    const img = imgRef.current;
    const num = numRef.current;
    const txt = textRef.current;
    if (!card || !img || !num || !txt) return;

    gsap.killTweensOf([img, num, txt]);
    gsap.set(card, { zIndex: 1 });
    gsap.to(img, { opacity: 0, scale: 0.88, x: 10, duration: 0.45, ease: "power3.inOut" });
    gsap.to(num, { y: 0, duration: 0.35, ease: "power2.inOut" });
    gsap.to(txt, { x: 0, opacity: 0.85, duration: 0.35, ease: "power2.inOut" });
  };

  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const num = numRef.current;
    const txt = textRef.current;

    if (!card || !img || !num || !txt) return;

    if (isMobile) {
      gsap.set(img, { opacity: 1, scale: 1, x: 0 });
      return;
    }

    gsap.set(img, { opacity: 0, scale: 0.88, x: 10 });

    const onEnter = (): void => {
      // Force-reset the previously active card before activating this one.
      // This handles the case where mouseleave was swallowed by the overlapping area.
      onActivate(id, resetCard);

      gsap.killTweensOf([img, num, txt]);
      gsap.set(card, { zIndex: 50 });
      gsap.to(img, { opacity: 1, scale: 1, x: 0, duration: 0.55, ease: "power3.out" });
      gsap.to(num, { y: -6, duration: 0.4, ease: "power2.out" });
      gsap.to(txt, { x: 6, opacity: 1, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = (): void => {
      // Only reset if this card is still the active one
      if (activeCardRef.current === id) {
        activeCardRef.current = null;
      }
      resetCard();
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, id]);

  // ─── MOBILE LAYOUT ───────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="flex items-start gap-4 py-5 for-border relative">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="font-sora font-extrabold text-[22px] text-white leading-none">
            {id}
          </span>
          <p className="font-bricolage font-normal text-[15px] leading-[148%] tracking-[-0.01em] capitalize text-white">
            {text}
          </p>
        </div>
        <img
          src="/new-home/for1.webp"
          alt="img"
          className="w-[90px] h-auto flex-shrink-0 rounded-sm"
        />
      </div>
    );
  }

  // ─── DESKTOP / TABLET LAYOUT ─────────────────────────────────────────────────
  return (
    <div
      ref={cardRef}
      className="flex md:flex-row flex-col justify-between items-center relative cursor-pointer xl:h-[303px] h-[280px]"
      style={{ marginTop, zIndex: 1 }}
    >
      <h3
        ref={numRef}
        className="font-sora font-extrabold 2xl:text-[54px] xl:text-[48px] lg:text-[42px] text-[36px] xl:leading-[69px] text-white"
      >
        {id}
      </h3>

      <h5
        ref={textRef}
        className="font-bricolage font-normal 2xl:text-[24px] xl:text-[22px] lg:text-[20px] text-[17px] leading-[142%] tracking-[-0.01em] capitalize text-white 2xl:w-[518px] xl:w-[470px] lg:w-[430px] w-[380px] absolute left-[49%] -translate-x-1/2"
        style={{ opacity: 0.85 }}
      >
        {text}
      </h5>

      <img
        ref={imgRef}
        src="/new-home/for1.webp"
        alt="img"
        className="relative z-10 2xl:w-auto xl:w-[250px] lg:w-[230px] w-[200px] h-auto"
        style={{ willChange: "transform, opacity" }}
      />

      <img
        src="/new-home/border.webp"
        alt="border"
        className="absolute bottom-[22%]"
      />
    </div>
  );
};

const For: React.FC = () => {
  const { isXl, isMobile } = useBreakpoints();

  // Shared ref to track which card is currently active + its reset fn
  const activeCardRef = useRef<string | null>(null);
  const resetFnRef = useRef<(() => void) | null>(null);

  const handleActivate = (id: string, resetFn: () => void): void => {
    // If a different card was previously active, force-reset it immediately
    if (activeCardRef.current !== null && activeCardRef.current !== id) {
      resetFnRef.current?.();
    }
    activeCardRef.current = id;
    resetFnRef.current = resetFn;
  };

  return (
    <section className="max-w-[1370px] mx-auto xl:px-10 px-4 lg:mt-[14vh] lg:my-[8vh] md:mt-[10vh] my-[6vh]">
      <div>
        <div className="relative z-20">
          <h2 className="flex flex-col justify-center item-center font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize">
            Who This Is For{" "}
            <span className="font-tartuffo font-thin tracking-0">
              This is for you if:
            </span>
          </h2>
        </div>

        <div className={`flex flex-col justify-center ${isMobile ? "mt-8 px-1" : ""}`}>
          {cardData.map((card: CardData, index: number) => (
            <ForCard
              key={card.id}
              id={card.id}
              text={card.text}
              isFirst={index === 0}
              isXl={isXl}
              isMobile={isMobile}
              activeCardRef={activeCardRef}
              onActivate={handleActivate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default For;