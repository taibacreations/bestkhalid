"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "@stianlarsen/border-beam/css";
// import { BorderBeam } from "@stianlarsen/border-beam";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// 🎯 CUSTOMIZE DOT POSITIONS PER BREAKPOINT HERE
// Each breakpoint applies when screen width >= its value (px)
// Breakpoints are checked largest-first (like Tailwind)
// top: vertical position for each dot [dot0, dot1, dot2]
// left: horizontal position (same for all dots at that breakpoint)
// ============================================================
const dotConfig: {
  minWidth: number;
  left: string;
  top: [string, string, string];
}[] = [
  {
    minWidth: 1536, // 2xl
    left: "26.1vw",
    top: ["9.5vh", "46.3vh", "84vh"],
  },
  {
    minWidth: 1300, // xl
    left: "32.5vw",
    top: ["9.5vh", "46.3vh", "84vh"],
  },
  {
    minWidth: 1280, // xl
    left: "28.4vw",
    top: ["9.5vh", "46.3vh", "84vh"],
  },
  {
    minWidth: 1024, // lg
    left: "27.5vw",
    top: ["9vh", "45vh", "82vh"],
  },
  {
    minWidth: 768, // md
    left: "43.6vw",
    top: ["8vh", "72vh", "140vh"],
  },
  {
    minWidth: 0, // default / sm
    left: "14vw",
    top: ["7vh", "42vh", "78vh"],
  },
];
// ============================================================

const getActiveDotConfig = () => {
  const sorted = [...dotConfig].sort((a, b) => b.minWidth - a.minWidth);
  return (
    sorted.find((bp) => window.innerWidth >= bp.minWidth) ??
    dotConfig[dotConfig.length - 1]
  );
};

const applyDotPositions = (dots: (HTMLDivElement | null)[]) => {
  const config = getActiveDotConfig();
  dots.forEach((dot, i) => {
    if (!dot) return;
    dot.style.left = config.left;
    dot.style.top = config.top[i];
  });
};

// Per-section data
const strategies = [
  [
    { icon: "timeline-icon1", text: "Restructured practice area pages" },
    { icon: "timeline-icon2", text: "Built a strong consultation funnel" },
    { icon: "timeline-icon3", text: "Improved mobile performance" },
    { icon: "timeline-icon4", text: "Optimized on-page SEO" },
  ],
  [
    { icon: "timeline-icon1", text: "Rewrote homepage messaging" },
    { icon: "timeline-icon2", text: "Added authority-building sections" },
    { icon: "timeline-icon3", text: "Simplified consultation process" },
    { icon: "timeline-icon4", text: "improved structure clarity" },
  ],
  [
    { icon: "timeline-icon1", text: "Authority-focused redesign" },
    { icon: "timeline-icon2", text: "Stronger call-to-action placement" },
    { icon: "timeline-icon3", text: "Optimized mobile UX" },
    { icon: "timeline-icon4", text: "Improved headline clarity" },
  ],
];

const challenges = [
  "Low inquiry rate and weak local visibility.",
  "The website lacked trust and emotional positioning.",
  "Low conversion rate despite steady traffic",
];

const results = [
  [
    {
      icon: "timeline-icon5",
      text: "34% increase in consultation inquiries",
      wide: false,
    },
    {
      icon: "timeline-icon6",
      text: "Significant improvement in mobile engagement",
      wide: true,
    },
    {
      icon: "timeline-icon7",
      text: "Higher local search visibility",
      wide: false,
    },
  ],
  [
    {
      icon: "timeline-icon5",
      text: "27% increase in form submissions",
      wide: false,
    },
    {
      icon: "timeline-icon6",
      text: "Longer average session duration",
      wide: true,
    },
    {
      icon: "timeline-icon7",
      text: "Stronger client trust perception",
      wide: false,
    },
  ],
  [
    {
      icon: "timeline-icon5",
      text: "31% increase in inbound inquiries",
      wide: false,
    },
    { icon: "timeline-icon6", text: "Reduced bounce rate", wide: true },
    { icon: "timeline-icon7", text: "Improved lead quality", wide: false },
  ],
];

const caseLabels = ["#1", "#2", "#3"] as const;

const SectionCards = ({
  i,
  activeLayerRef,
  mobileTitleRef,
}: {
  i: number;
  activeLayerRef: (el: HTMLDivElement | null) => void;
  mobileTitleRef: (el: HTMLDivElement | null) => void;
}) => {
  const sharedStrategyContent = (
    <div className="flex flex-col gap-[1.3vh]">
      {strategies[i].map((item, idx) => (
        <div
          key={idx}
          className="flex items-center md:gap-[.5vw] gap-2 xl:mt-[.3vh] mt-[1vh]"
        >
          <img
            src={`/new-home/${item.icon}.webp`}
            alt="icon"
            className="xl:w-auto w-[25px]"
          />
          <h5 className="font-bricolage font-normal 2xl:text-[18px] text-[16px] xl:leading-[81%] leading-[100%] tracking-[-0.01em] capitalize text-white">
            {item.text}
          </h5>
        </div>
      ))}
    </div>
  );

  const sharedResultContent = (
    <div className="flex flex-col gap-[1vh] pl-[1.5vw] mt-[1.4vh] w-full">
      {results[i].map((item, idx) => (
        <div
          key={idx}
          className="flex items-center md:gap-[.5vw] gap-2 mt-[.3vh] md:px-0 px-4"
        >
          <img src={`/new-home/${item.icon}.webp`} alt="icon" />
          <h5
            className={`font-bricolage font-normal 2xl:text-[18px] xl:text-[16px] text-[14px] tracking-[-0.01em] capitalize text-white ${
              item.wide ? "leading-[115%]" : "leading-[81%]"
            }`}
          >
            {item.text}
          </h5>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* ── Mobile-only title (max-767px) — hidden at sm (≥768px) and above ── */}
      <div
        ref={mobileTitleRef}
        className="md:hidden mb-3"
        style={{ opacity: 0, transform: "translateY(8px)" }}
      >
        <h4 className="font-bricolage font-bold text-[18px] leading-[142%] tracking-[-0.07em] capitalize text-white">
          Case Study {caseLabels[i]}
        </h4>
        <h2 className="font-bricolage font-semibold text-[32px] leading-[82%] tracking-[-0.07em] capitalize text-white">
          Personal Injury Law Firm
        </h2>
      </div>

      <div className="relative">
        {/* ── INACTIVE LAYER (always underneath) ── */}
        <div className="flex lg:flex-row flex-col justify-center gap-[2vw] items-center">
          <div className="2xl:w-[416px] xl:w-[380px] md:w-[320px] w-full 2xl:h-[327px] xl:h-[300px] h-[280px] bg-[#37373799] opacity-30 border border-[#333333] rounded-[30px] xl:py-[4.5vh] pt-[3vh] pb-[2vh] 2xl:pl-[2.8vw] xl:pl-[2vw] xl:pr-0 md:px-[2vw] px-5">
            <h3 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] text-[22px] leading-[142%] tracking-[-0.07em] text-white capitalize">
              Strategy Implemented
            </h3>
            {sharedStrategyContent}
          </div>
          <div className="flex flex-col 2xl:gap-[2vh] gap-[1vh] items-center md:mt-0 mt-[1vh]">
            <div className="2xl:w-[414px] xl:w-[380px] md:w-[320px] w-[92vw] 2xl:h-[106px] xl:h-[100px] h-[90px] rounded-[32px] bg-[#37373799] opacity-30 border border-[#333333]">
              <div className="flex flex-col items-center md:px-0 px-5">
                <h3 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] text-[22px] leading-[142%] tracking-[-0.07em] text-white capitalize xl:w-[196px] xl:h-[45px] w-[140px] h-[35px] flex justify-center items-center bg-[#56565633] rounded-bl-[20px] rounded-br-[20px]">
                  Challenge
                </h3>
                <h5 className="font-bricolage font-normal 2xl:text-[18px] xl:text-[16px] text-[14px] leading-[112%] tracking-[-0.01em] capitalize text-white mt-[1vh] 2xl:px-[1.3vw] px-[2vw]">
                  {challenges[i]}
                </h5>
              </div>
            </div>
            <div className="2xl:w-[414px] xl:w-[380px] md:w-[320px] w-[92vw] 2xl:h-[207px] xl:h-[200px] h-[180px] rounded-[32px] bg-[#37373799] opacity-30 border border-[#333333] flex flex-col items-center md:mt-0 mt-[1vh]">
              <div className="flex flex-col items-center w-full">
                <h3 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] text-[22px] leading-[142%] tracking-[-0.07em] text-white capitalize xl:w-[196px] xl:h-[45px] w-[140px] h-[35px] flex justify-center items-center bg-[#56565633] rounded-bl-[20px] rounded-br-[20px]">
                  Result
                </h3>
                {sharedResultContent}
              </div>
            </div>
          </div>
        </div>

        {/* ── ACTIVE LAYER (fades in on top via GSAP) ── */}
        <div
          ref={activeLayerRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="flex lg:flex-row flex-col gap-[2vw] items-center md:justify-start justify-center">
            <div className="2xl:w-[416px] xl:w-[380px] md:w-[320px] w-full 2xl:h-[327px] xl:h-[300px] h-[280px] timeline-box rounded-[30px] xl:py-[4.5vh] pt-[3vh] pb-[2vh] 2xl:pl-[2.8vw] xl:pl-[2vw] xl:pr-0 md:px-[2vw] px-5">
              <h3 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] text-[22px] leading-[142%] tracking-[-0.07em] text-white capitalize">
                Strategy Implemented
              </h3>
              {sharedStrategyContent}
            </div>
            <div className="flex flex-col 2xl:gap-[2vh] gap-[1vh] items-center md:mt-0 mt-[1vh]">
              <div className="2xl:w-[414px] xl:w-[380px] md:w-[320px] w-[92vw] 2xl:h-[106px] xl:h-[100px] h-[90px] rounded-[32px] bg-[url(/new-home/timeline-card.webp)] 2xl:bg-cover bg-[length:100%_100%] bg-center bg-no-repeat">
                {/* <BorderBeam
                  size={169}
                  duration={8}
                  colorFrom="#00000000" // fully transparent
                  colorTo="#7AB4FD"
                  className="z-40 relative rounded-[32px] 2xl:ml-[23.7vw] xl:ml-[28.3vw] lg:ml-[33.3vw] ml-0 xl:mb-[21.5vh] lg:mb-[19.3vh] lg:mt-auto md:mt-[30.3vh] mt-[30.5vh] md:mb-[19.5vh] mb-[20.3vh] timeline-beam-1"
                />
                <BorderBeam
                  size={169}
                  duration={10}
                  colorFrom="#00000000" // fully transparent
                  colorTo="#7AB4FD"
                  className="z-40 relative rounded-[32px] 2xl:ml-[23.7vw] xl:ml-[28.3vw] lg:ml-[33.3vw] ml-0 xl:mb-[21.5vh] lg:mb-[19.3vh] lg:mt-auto md:mt-[30.3vh] mt-[30.5vh] md:mb-[19.5vh] mb-[20.3vh] timeline-beam-1"
                /> */}

                <div className="flex flex-col items-center md:px-0 px-5">
                  <h3 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] text-[22px] leading-[142%] tracking-[-0.07em] text-white capitalize xl:w-[196px] xl:h-[45px] w-[140px] h-[35px] flex justify-center items-center bg-[#0430D2] rounded-bl-[20px] rounded-br-[20px]">
                    Challenge
                  </h3>
                  <h5 className="font-bricolage font-normal 2xl:text-[18px] xl:text-[16px] text-[14px] leading-[112%] tracking-[-0.01em] capitalize text-white mt-[1vh] 2xl:px-[1.3vw] px-[2vw]">
                    {challenges[i]}
                  </h5>
                </div>
              </div>
              <div className="2xl:w-[414px] xl:w-[380px] md:w-[320px] w-[92vw] 2xl:h-[207px] xl:h-[200px] h-[180px] rounded-[32px] bg-[url(/new-home/timeline-card1.webp)] 2xl:bg-cover bg-[length:100%_100%] bg-center bg-no-repeat flex flex-col items-center md:mt-0 mt-[1vh]">
                {/* <BorderBeam
                  size={169}
                  duration={8}
                  colorFrom="#00000000" // fully transparent
                  colorTo="#7AB4FD"
                  className="z-40 relative rounded-[32px] 2xl:ml-[23.7vw] xl:ml-[28.3vw] lg:ml-[33.3vw] ml-0 2xl:mt-[12vh] xl:mt-[11.3vh] lg:mt-[10.2vh] md:mt-[40.5vh] mt-[41.8vh] timeline-beam-2"
                />
                <BorderBeam
                  size={169}
                  duration={10}
                  colorFrom="#00000000" // fully transparent
                  colorTo="#7AB4FD"
                  className="z-40 relative rounded-[32px] 2xl:ml-[23.7vw] xl:ml-[28.3vw] lg:ml-[33.3vw] ml-0 2xl:mt-[12vh] xl:mt-[11.3vh] lg:mt-[10.2vh] md:mt-[40.5vh] mt-[41.8vh] timeline-beam-2"
                /> */}

                <div className="flex flex-col items-center w-full">
                  <h3 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] text-[22px] leading-[142%] tracking-[-0.07em] text-white capitalize xl:w-[196px] xl:h-[45px] w-[140px] h-[35px] flex justify-center items-center bg-[#0430D2] rounded-bl-[20px] rounded-br-[20px]">
                    Result
                  </h3>
                  {sharedResultContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileTitlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeLayerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const DURATION = 0.55;
  const EASE = "power2.inOut";

  const cases = [
    { num: "#1", title: "Private Therapy Practice" },
    { num: "#2", title: "Online Counseling Service" },
    { num: "#3", title: "Mental Health Clinic" },
  ];

  const activateSection = (i: number) => {
    const dot = dotsRef.current[i];
    const title = titlesRef.current[i];
    const mobileTitle = mobileTitlesRef.current[i];
    const activeLayer = activeLayerRefs.current[i];

    if (dot) {
      gsap.to(dot, {
        opacity: 1,
        scale: 1.15,
        duration: DURATION * 0.6,
        ease: "back.out(1.7)",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        delay: DURATION * 0.6,
      });
    }
    if (title) {
      gsap.to(title, { opacity: 1, y: 0, duration: DURATION, ease: EASE });
    }
    if (mobileTitle) {
      gsap.to(mobileTitle, {
        opacity: 1,
        y: 0,
        duration: DURATION,
        ease: EASE,
      });
    }
    if (activeLayer) {
      gsap.to(activeLayer, { opacity: 1, duration: DURATION, ease: EASE });
    }
  };

  const deactivateSection = (i: number) => {
    const dot = dotsRef.current[i];
    const title = titlesRef.current[i];
    const mobileTitle = mobileTitlesRef.current[i];
    const activeLayer = activeLayerRefs.current[i];

    if (dot) {
      gsap.to(dot, { opacity: 0, scale: 1, duration: DURATION, ease: EASE });
    }
    if (title) {
      gsap.to(title, { opacity: 0, y: 8, duration: DURATION, ease: EASE });
    }
    if (mobileTitle) {
      gsap.to(mobileTitle, {
        opacity: 0,
        y: 8,
        duration: DURATION,
        ease: EASE,
      });
    }
    if (activeLayer) {
      gsap.to(activeLayer, { opacity: 0, duration: DURATION, ease: EASE });
    }
  };

  useEffect(() => {
    applyDotPositions(dotsRef.current);

    const handleResize = () => {
      applyDotPositions(dotsRef.current);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      for (let i = 0; i < 3; i++) {
        const group = cardGroupRefs.current[i];
        if (!group) continue;

        ScrollTrigger.create({
          trigger: group,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => activateSection(i),
          onEnterBack: () => activateSection(i),
          onLeave: () => deactivateSection(i),
          onLeaveBack: () => deactivateSection(i),
        });
      }
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="md:mt-[10vh] mt-[6vh] md:mb-[15vh] mb-[10vh] relative"
    >
      <div
        id="leads"
        className="text-center max-w-[1100px] mx-auto z-40 relative my-[5vh]"
      >
        <h5
          id="leads-h5"
          className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white"
        >
          <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
            [
          </span>{" "}
          Case Studies{" "}
          <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
            ]
          </span>
        </h5>
        <div className="overflow-hidden -mt-1">
          <h3
            id="leads-h3"
            className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white"
          >
            Thoughtfully Designed Websites{" "}
            <span className="font-tartuffo font-thin tracking-[0.01em]">
               With Real Impact
            </span>
          </h3>
        </div>
        <p
          id="leads-content"
          className="font-bricolage font-normal xl:text-[20px] text-[18px] tracking-[0em] leading-[130%] text-white md:mt-0 max-w-[1505px] mx-auto px-4 xl:px-10 md:w-[80%] xl:w-full"
        >
          A selection of therapist-focused website projects demonstrating improved clarity, stronger client trust, and better inquiry rates.
        </p>
      </div>
      <img
        src="/new-home/timeline-vector.webp"
        alt="vector"
        className="absolute left-0 bottom-[-13vh]"
      />
      <div className="flex justify-between max-w-[1525px] mx-auto xl:px-10 px-4 relative">
        {/* Vertical line + dots */}
        <div className="relative hidden md:block">
          <div className="border border-white 2xl:w-[1113px] xl:w-[1030px] lg:w-[960px] w-[1850px] absolute rotate-[90deg] 2xl:left-[-2vw] xl:left-[-2vw] lg:left-[-18vw] left-[-75vw] top-[50%] timeline-border" />
          {([0, 1, 2] as const).map((i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => {
                dotsRef.current[i] = el;
              }}
              className="absolute"
              style={{ opacity: 0 }}
            >
              <div className="flex justify-center items-center xl:w-[35px] xl:h-[35px] w-[28px] h-[28px] rounded-full bg-[#0028C9]">
                <div className="xl:w-[19px] xl:h-[19px] w-[13px] h-[13px] rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Titles — your original, completely untouched */}

        <div className="2xl:ml-[-6vw] xl:ml-0 lg:ml-[-6vw] md:ml-[-14.8vw] 2xl:max-w-[444px] xl:max-w-[400px] md:max-w-[240px] flex-col 2xl:gap-[23.4vh] lg:gap-[25vh] gap-[54vh] hidden md:flex">
          {cases.map((item, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => {
                titlesRef.current[i] = el;
              }}
              style={{ opacity: 0, transform: "translateY(8px)" }}
            >
              <h4 className="font-bricolage font-bold 2xl:text-[28px] xl:text-[24px] lg:text-[20px] text-[18px] leading-[142%] tracking-[-0.07em] capitalize text-white">
                Case Example {item.num}:
              </h4>

              <h2 className="font-bricolage font-semibold 2xl:text-[64px] xl:text-[56px] text-[42px] leading-[82%] tracking-[-0.07em] capitalize text-white">
                {item.title}
              </h2>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center gap-[3vh]">
          {([0, 1, 2] as const).map((i) => (
            <div key={i}>
              <div
                ref={(el: HTMLDivElement | null) => {
                  cardGroupRefs.current[i] = el;
                }}
              >
                <SectionCards
                  i={i}
                  activeLayerRef={(el: HTMLDivElement | null) => {
                    activeLayerRefs.current[i] = el;
                  }}
                  mobileTitleRef={(el: HTMLDivElement | null) => {
                    mobileTitlesRef.current[i] = el;
                  }}
                />
              </div>

              {i < 2 && (
                <div className="border border-[#FFFFFF80] 2xl:w-[108%] 2xl:ml-[-2.5vw] mt-[2.3vh]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
