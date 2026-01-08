"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Projects = () => {
  const leftRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Only run if all refs exist
    if (!leftRef.current || !centerRef.current || !rightRef.current) return;

    const duration = 1.5;
    const stagger = 0; // all at once

    // Animate all three together
    gsap.fromTo(
      [leftRef.current, centerRef.current, rightRef.current],
      {
        x: (i) => (i === 0 ? -450 : i === 2 ? 450 : 0), // left: -150, right: +150, center: 0
        y: (i) => (i === 1 ? 350 : 0), // only center comes from bottom (y: 100)
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: centerRef.current, // or parent section
          start: "top 120%",
          once: true,
          // markers: true, // for debugging
        },
      }
    );
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <Image
          ref={leftRef}
          src="/proj-new-3.svg"
          height={100}
          width={100}
          alt="project-1"
          className="xl:w-[477px] lg:w-[400px] md:w-[300px] w-[180px] 2xl:scale-128 h-auto relative 2xl:left-[7%] left-[10%] 2xl:top-[5.5vh]"
        />
        <Image
          ref={centerRef}
          src="/proj-new-1.svg"
          height={100}
          width={100}
          alt="project-1"
          className="2xl:w-[541px] xl:w-[500px] lg:w-[400px] md:w-[300px] w-[180px] z-10 h-auto"
        />
        <Image
          ref={rightRef}
          src="/proj-new-2.svg"
          height={100}
          width={100}
          alt="project-1"
          className="2xl:w-[477px] lg:w-[400px] md:w-[300px] w-[180px] 2xl:scale-128 h-auto relative 2xl:right-[6%] right-[10%] 2xl:top-[5.5vh]"
        />
      </div>
    </div>
  );
};

export default Projects;
