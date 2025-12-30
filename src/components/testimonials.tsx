"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Testimonial data
const testimonialsData = [
  {
    name: "Jessica H.",
    role: "Mother of two & Teacher",
    quote: "“Finally something that actually works with toddlers!”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Michael R.",
    role: "Pediatric Dentist",
    quote: "“My patients’ parents love the simplicity and results.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Amanda L.",
    role: "Daycare Owner",
    quote: "“Reduced meltdowns during transitions by 80%.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "David K.",
    role: "Clinic Manager",
    quote: "“Easy onboarding for our entire staff.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Sarah T.",
    role: "Speech Therapist",
    quote: "“Engages kids better than any app we’ve tried.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Jessica H.",
    role: "Mother of two & Teacher",
    quote: "“Finally something that actually works with toddlers!”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Michael R.",
    role: "Pediatric Dentist",
    quote: "“My patients’ parents love the simplicity and results.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Amanda L.",
    role: "Daycare Owner",
    quote: "“Reduced meltdowns during transitions by 80%.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "David K.",
    role: "Clinic Manager",
    quote: "“Easy onboarding for our entire staff.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
  {
    name: "Sarah T.",
    role: "Speech Therapist",
    quote: "“Engages kids better than any app we’ve tried.”",
    image: "/testi-1.png",
    stars: "/stars.png",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlideBackground = (idx: number) => {
    const normalizedIdx = idx % 5; // Since testimonials repeat
    const normalizedActive = activeIndex % 5;

    // Calculate adjacent indices (left and right of active)
    const leftIdx = (normalizedActive - 1 + 5) % 5;
    const rightIdx = (normalizedActive + 1) % 5;

    // Active slide and its immediate neighbors get white background
    if (
      normalizedIdx === normalizedActive ||
      normalizedIdx === leftIdx ||
      normalizedIdx === rightIdx
    ) {
      return "white";
    }

    // Determine if slide is on the left or right side of active
    // For slides on the right side, reverse the gradient direction
    let distance = normalizedIdx - normalizedActive;
    if (distance < -2) distance += 5; // Handle wrap-around
    if (distance > 2) distance -= 5;

    if (distance > 0) {
      // Right side - reverse gradient (90deg instead of 270deg)
      return "linear-gradient(90deg, rgba(120, 120, 120, 0.4) 0%, rgba(80, 80, 80, 0) 29.82%)";
    } else {
      // Left side - normal gradient
      return "linear-gradient(270deg, rgba(120, 120, 120, 0.4) 0%, rgba(80, 80, 80, 0) 29.82%)";
    }
  };

  const isContentVisible = (idx: number) => {
    const normalizedIdx = idx % 5;
    const normalizedActive = activeIndex % 5;
    const leftIdx = (normalizedActive - 1 + 5) % 5;
    const rightIdx = (normalizedActive + 1) % 5;

    // Only show content for active slide and its neighbors
    return (
      normalizedIdx === normalizedActive ||
      normalizedIdx === leftIdx ||
      normalizedIdx === rightIdx
    );
  };

  return (
    <section id="social-proof" className="bg-[#171717] lg:py-16 py-10 relative overflow-hidden">
      <div className="max-w-[1390px] mx-auto px-4 xl:px-10">
        <div className="text-center max-w-[992px] mx-auto z-40 relative mb-9">
          <h5 className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white">
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              [
            </span>{" "}
            Social Proof{" "}
            <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">
              ]
            </span>
          </h5>
          <h3 className=" font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white">
            Trusted by Growing{" "}
            <span className="text-white font-tartuffo font-thin tracking-[0.01em]">
              Healthcare Practices
            </span>
          </h3>
        </div>
        {/* Custom Navigation */}
        <div className="flex xl:justify-between justify-center z-20 relative h-0">
          <button className="swiper-button-prev-custom bg-white lg:w-[42px] lg:h-[42px] w-[35px] h-[35px] rounded-full flex justify-center items-center absolute 2xl:left-[-7.3%] xl:left-0 xl:top-[9vh] lg:top-[28vh] md:top-[27vh] top-[24vh] lg:left-[45%] md:left-[43%] left-[37%]">
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

          <button className="swiper-button-next-custom bg-white lg:w-[42px] lg:h-[42px] w-[35px] h-[35px] rounded-full flex justify-center items-center absolute 2xl:right-[-7.3%] xl:right-0 xl:top-[9vh] lg:top-[28vh] md:top-[27vh] top-[24vh] lg:right-[45%] md:right-[43%] right-[37%]">
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
                className="w-full md:max-w-[442px] max-w-[90vw] md:h-[211px] p-5 rounded-[20px] flex flex-col justify-center md:px-6 md:py-0 xl:px-8.5 testimonial-card transition-all duration-300"
                style={{
                  background: getSlideBackground(idx),
                }}
              >
                {isContentVisible(idx) && (
                  <>
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
                        src={item.stars}
                        height={24}
                        width={110}
                        alt="Rating stars"
                        className="w-[110px] mt-2"
                      />
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
