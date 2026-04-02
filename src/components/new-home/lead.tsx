"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Projects from "./projects";

const Lead = () => {
  const downloadBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // 🔁 Animate Download Button Background (same as Header CTA)
  useEffect(() => {
    const downImages = ["/dow-1.webp", "/dow-2.webp", "/dow-3.webp", "/dow-4.webp", "/dow-5.webp"];

    // Preload images
    downImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const animateDownloadBg = () => {
      if (downloadBgLayersRef.current.length !== downImages.length) return;

      gsap.set(downloadBgLayersRef.current, { autoAlpha: 0 });
      gsap.set(downloadBgLayersRef.current[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 0.8;
      const hold = 0.5;

      downloadBgLayersRef.current.forEach((_, i) => {
        const next = (i + 1) % downloadBgLayersRef.current.length;
        tl
          .to(downloadBgLayersRef.current[i], { autoAlpha: 0, duration }, `+=${hold}`)
          .to(downloadBgLayersRef.current[next], { autoAlpha: 1, duration }, `-=${duration}`);
      });

      return () => {
        tl.kill();
        gsap.killTweensOf(downloadBgLayersRef.current);
      };
    };

    const timer = setTimeout(animateDownloadBg, 100);
    return () => clearTimeout(timer);
  }, []);

  // 📜 Scroll-triggered heading animation (unchanged)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateElement = (
      headingSelector: string,
      rotation: number,
      startY: string,
      rotationD: number
    ) => {
      const heading = document.querySelector(headingSelector);
      if (!heading) return;

      gsap.fromTo(
        heading,
        {
          y: startY,
          rotation: rotation,
          opacity: 0,
        },
        {
          y: "5%",
          rotation: rotationD,
          opacity: 1,
          duration: 1.4,
          ease: "spring(1, 90, 18)",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
          onComplete: () => {
            gsap.to(heading, {
              y: 0,
              rotation: 0,
              duration: 0.6,
              ease: "spring(1, 120, 22)",
            });
          },
        }
      );
    };
    
    animateElement("#leads", 0, "-100%", 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="bg-[url(/lead-bg.webp)] bg-cover bg-center relative xl:px-10 px-5">
      <Image
        src="/lead-blur.webp"
        height={100}
        width={100}
        alt="blur"
        className="w-full md:h-auto h-62.5 absolute left-0 2xl:-bottom-[50vh] xl:-bottom-[33vh] lg:-bottom-[20vh] md:-bottom-[16vh] -bottom-[17%] z-20"
      />
      <div className="xl:pt-0">
        <div id="leads" className="text-center max-w-[992px] mx-auto z-40 relative">
          <h5
            id="leads-h5"
            className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white"
          >
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              [
            </span>{" "}
            Portfolio{" "}
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              ]
            </span>
          </h5>
          <div className="overflow-hidden -mt-1">
            <h3 id="leads-h3" className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white">
              Work That Speaks{" "}
              <span className="font-tartuffo font-thin tracking-[0.01em]">
                for Itself
              </span>
            </h3>
          </div>
          <p id="leads-content" className="mt-5.5 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[0em] leading-[142%] text-white">
            “A portfolio of projects showcasing my skills, problem-solving mindset, and the value I bring to every collaboration.”
          </p>
        </div>
        <div className="mt-10 2xl:w-[1453px] h-auto mx-auto relative">
          <Projects />
          <div className="absolute xl:bottom-55 lg:bottom-40 md:bottom-15 -bottom-[5vh] left-1/2 -translate-x-1/2 z-20 w-full">
            <div className="flex flex-col justify-center items-center md:gap-5 gap-3">
              {/* ✅ Animated Download Button */}
              <div className="relative">
                {/* Background layers */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`dow-${i}`}
                    ref={(el) => { downloadBgLayersRef.current[i] = el }}
                    className="absolute inset-0 rounded-[334px] bg-contain bg-no-repeat bg-center z-0"
                    style={{ backgroundImage: `url(/dow-${i + 1}.webp)` }}
                  />
                ))}
                {/* Button on top */}
                <Link href="/portfolio" className="relative bg-transparent text-white md:min-w-[190px] max-w-fit lg:p-3 p-6 lg:min-w-[230px] xl:min-w-[250px] 2xl:min-w-[336px] md:h-[50px] 2xl:h-[59px] rounded-[334px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] tracking-[-0.07em] capitalize z-10">
                  <Image
                    src="/button-arrow.webp"
                    width={1000}
                    height={100}
                    alt="button-arrow"
                    className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
                  />
                  See Recent Work
                </Link>
              </div>
              <p className="font-bricolage font-normal xl:text-[18px] text-[16px] leading-[142%] tracking-[0em] text-white mb-[-5px] text-center">
                Explore real projects focused on leads & conversions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lead;