// components/LogoMarquee.tsx
"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

const LogoMarquee = () => {
  const logos = [
    {
      src: "/marquee-1.png",
      className: "max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[150px] 2xl:max-w-[157px]",
    },
    {
      src: "/marquee-2.png",
      className: "max-w-[100px] sm:max-w-[130px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[190px] 2xl:max-w-[196px]",
    },
    {
      src: "/marquee-3.png",
      className: "max-w-[90px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-[170px] xl:max-w-[180px] 2xl:max-w-[184px]",
    },
    {
      src: "/marquee-4.png",
      className: "max-w-[50px] sm:max-w-[60px] md:max-w-[70px] lg:max-w-[80px] xl:max-w-[90px] 2xl:max-w-[94px]",
    },
  ];

  const Separator = () => (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10">
      <Image
        src="/marquee-border.svg"
        width={2}
        height={32}
        alt="separator"
        className="w-full h-auto"
      />
    </div>
  );

  // Duplicate logos for seamless infinite loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="bg-[#0029CC] md:mt-[-100px] mb-20 z-50 relative">
      <div className="lg:h-[105px] md:h-[90px] max-w-[1525px] mx-auto px-4 xl:px-10 flex items-center overflow-hidden">
        <Marquee pauseOnHover speed={30} className="flex items-center h-full">
          {allLogos.map((logo, index) => (
            <div key={index} className="flex items-center h-full">
              {/* Logo container with responsive max-width */}
              <div className={`flex items-center justify-center h-[50px] px-2 ${logo.className} flex-shrink-0`}>
                <Image
                  src={logo.src}
                  width={500} // large placeholder for aspect ratio
                  height={60}
                  alt={`Client logo ${index % logos.length + 1}`}
                  className="w-full h-auto object-contain"
                />
              </div>
               <Separator />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LogoMarquee;