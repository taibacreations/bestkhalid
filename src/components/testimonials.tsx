"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

interface TestimonialsProps {
  sanityTestimonials?: Array<{
    _id: string;
    name: string;
    role: string;
    quote: string;
    image: string;
    rating?: number;
  }>;
}

const Testimonials = ({ sanityTestimonials }: TestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Duplicate the array to ensure smooth infinite loop
  const testimonialsData = sanityTestimonials && Array.isArray(sanityTestimonials) && sanityTestimonials.length > 0
    ? [...sanityTestimonials, ...sanityTestimonials]
    : [];

  const getSlideBackground = (idx: number) => {
    const totalSlides = sanityTestimonials?.length || 5;
    const normalizedIdx = idx % totalSlides;
    const normalizedActive = activeIndex % totalSlides;

    // Calculate adjacent indices (left and right of active)
    const leftIdx = (normalizedActive - 1 + totalSlides) % totalSlides;
    const rightIdx = (normalizedActive + 1) % totalSlides;

    // Active slide and its immediate neighbors get white background
    if (
      normalizedIdx === normalizedActive ||
      normalizedIdx === leftIdx ||
      normalizedIdx === rightIdx
    ) {
      return "white";
    }

    // Determine if slide is on the left or right side of active
    let distance = normalizedIdx - normalizedActive;
    if (distance < -(totalSlides / 2)) distance += totalSlides;
    if (distance > totalSlides / 2) distance -= totalSlides;

    if (distance > 0) {
      // Right side - reverse gradient (fade from left to right)
      return "linear-gradient(90deg, rgba(120, 120, 120, 0.4) 0%, rgba(80, 80, 80, 0) 29.82%)";
    } else {
      // Left side - normal gradient (fade from right to left)
      return "linear-gradient(270deg, rgba(120, 120, 120, 0.4) 0%, rgba(80, 80, 80, 0) 29.82%)";
    }
  };

  const isContentVisible = (idx: number) => {
    const totalSlides = sanityTestimonials?.length || 5;
    const normalizedIdx = idx % totalSlides;
    const normalizedActive = activeIndex % totalSlides;
    const leftIdx = (normalizedActive - 1 + totalSlides) % totalSlides;
    const rightIdx = (normalizedActive + 1) % totalSlides;

    // Only show content for active slide and its neighbors
    return (
      normalizedIdx === normalizedActive ||
      normalizedIdx === leftIdx ||
      normalizedIdx === rightIdx
    );
  };

  // ✅ CTA background images
  const moreReviews = [
    "/cons-1.png",
    "/cons-2.png",
    "/cons-3.png",
    "/cons-4.png",
    "/cons-5.png",
  ];

  const moreReviewsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Preload & animate CTA backgrounds
  useEffect(() => {
    // Preload
    moreReviews.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Animate on mount
    const animateCtaBg = () => {
      if (moreReviewsRef.current.length !== moreReviews.length) return;

      gsap.set(moreReviewsRef.current, { autoAlpha: 0 });
      gsap.set(moreReviewsRef.current[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 0.8;
      const hold = 0.5;

      moreReviewsRef.current.forEach((_, i) => {
        const next = (i + 1) % moreReviewsRef.current.length;
        tl.to(
          moreReviewsRef.current[i],
          { autoAlpha: 0, duration },
          `+=${hold}`,
        ).to(
          moreReviewsRef.current[next],
          { autoAlpha: 1, duration },
          `-=${duration}`,
        );
      });

      return () => {
        tl.kill();
        gsap.killTweensOf(moreReviewsRef.current);
      };
    };

    // Slight delay to ensure DOM is ready
    const timer = setTimeout(animateCtaBg, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Register ScrollTrigger (safe in useEffect)
    gsap.registerPlugin(ScrollTrigger);

    const animateElement = (
      headingSelector: string,
      rotation: number,
      startY: string,
      rotationD: number
    ) => {
      const heading = document.querySelector(headingSelector);
      if (!heading) return;

      const wrapper = heading.parentElement;
      if (!wrapper) return;

      // Start with overflow hidden (in case it was reset)
      wrapper.style.overflow = "hidden";

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
            trigger: heading, // or use wrapper
            start: "top 85%", // animate when top of element hits 85% from top of viewport
            once: true, // animate only once
          },
          onComplete: () => {
            gsap.to(heading, {
              y: 0,
              rotation: 0,
              duration: 0.6,
              ease: "spring(1, 120, 22)",
              onComplete: () => {
                if (wrapper) {
                  wrapper.style.overflow = "visible";
                }
              },
            });
          },
        }
      );
    };

    animateElement("#testi-h5", -5, "-100%", 2);
    animateElement("#testi-h3", -5, "-120%", 2);

    // Cleanup: kill ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="social-proof"
      className="bg-[#171717] lg:py-16 py-10 relative overflow-hidden scroll-mt-[10vh]"
    >
      <div className="max-w-[1390px] mx-auto px-4 xl:px-10">
        <div className="text-center max-w-[992px] mx-auto z-40 relative mb-9">
          <h5
            id="testi-h5"
            className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white"
          >
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              [
            </span>{" "}
            Social Proof{" "}
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              ]
            </span>
          </h5>
          <div className="overflow-hidden">
            <h3
              id="testi-h3"
              className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white"
            >
              Trusted by Growing{" "}
              <span className="text-white font-tartuffo font-thin tracking-[0.01em]">
              Brands & Businesses 
              </span>
            </h3>
          </div>
        </div>
        {/* Custom Navigation */}
        <div className="flex xl:justify-between justify-center z-20 relative h-0">
          <button className="swiper-button-prev-custom bg-white lg:w-[42px] lg:h-[42px] w-[35px] h-[35px] rounded-full flex justify-center items-center absolute 2xl:left-[-7.3%] xl:left-0 xl:top-[9vh] lg:top-[24vh] md:top-[24vh] top-[22vh] lg:left-[45%] md:left-[43%] left-[37%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="black"
              className="size-3.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom bg-white lg:w-[42px] lg:h-[42px] w-[35px] h-[35px] rounded-full flex justify-center items-center absolute 2xl:right-[-7.3%] xl:right-0 xl:top-[9vh] lg:top-[24vh] md:top-[24vh] top-[22vh] lg:right-[45%] md:right-[43%] right-[37%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="black"
              className="size-3.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Swiper Wrapper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={100}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={600}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          onSlideChange={(swiper: SwiperType) =>
            setActiveIndex(swiper.realIndex)
          }
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 36,
            },
            768: {
              slidesPerView: 2.0,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3.3,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 2.8,
              spaceBetween: 30,
            },
          }}
          className="!pb-10 !overflow-visible"
        >
          {testimonialsData.map((item, idx) => (
            <SwiperSlide key={idx} className="!flex !justify-center">
              <div
                className="w-full md:max-w-[442px] max-w-[90vw] md:min-h-[211px] xl:py-3 lg:py-2 p-5 rounded-[20px] flex flex-col justify-center md:px-6 md:py-0 xl:px-8.5 transition-all duration-300"
                style={{
                  background: getSlideBackground(idx),
                }}
              >
                <div 
                  className="transition-opacity duration-300"
                  style={{
                    opacity: isContentVisible(idx) ? 1 : 0,
                    pointerEvents: isContentVisible(idx) ? 'auto' : 'none'
                  }}
                >
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={item.image}
                      height={100}
                      width={100}
                      alt={item.name}
                      className="xl:w-[76px] w-[65px] h-auto rounded-full object-cover"
                    />
                    <div>
                      <h5 className="font-bricolage font-bold text-[20px] xl:text-[24px] leading-[123%] tracking-[-0.03em] capitalize text-[#000000]">
                        {item.name}
                      </h5>
                      <p className="font-bricolage font-normal text-[12px] xl:text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-[#000000]">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-3">
                    <p className="font-bricolage font-normal text-[16px] xl:text-[18px] leading-[142%] tracking-[-0.01em] text-[#000000]">
                      {item.quote}
                    </p>
                    <Image
                      src="/stars.png"
                      height={24}
                      width={110}
                      alt="Rating stars"
                      className="w-[110px] mt-2"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center items-center md:mt-[7vh] mt-[6vh] xl:mt-0">
          {/* ✅ Desktop CTA Button with Animated Background */}
          <div className="flex shrink-0 relative">
            {/* Background layers */}
            {moreReviews.map((src, i) => (
              <div
                key={i}
                ref={(el) => {
                  moreReviewsRef.current[i] = el;
                }}
                className="absolute inset-0 rounded-[334px] bg-contain bg-no-repeat bg-center z-0"
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}

            {/* Button content on top */}
            <Link
              href="https://www.fiverr.com/s/vvL0wkz"
              target="_blank"
              className="relative bg-transparent text-white md:w-[270px] w-[90vw] lg:px-0 xl:h-[59px] h-[50px] rounded-[334px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize z-10"
            >
              <Image
                src="/button-arrow.svg"
                width={1000}
                height={100}
                alt="button-arrow"
                className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
              />
              Read More Reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;