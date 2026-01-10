"use client";
import { BorderBeam } from "@stianlarsen/border-beam";
import Image from "next/image";

const Servicespoints = () => {
  const services = [
    {
      title: "Local SEO for Healthcare",
      description:
        "Beautiful, modern layouts built around your brand and patients’ needs.",
      wrapperClass:
        "items-start max-w-fit left-[82%] xl:top-[-4.9vh] top-[-3vh]",
      contentClass: "group-hover:w-[480px] text-left 2xl:px-8 xl:px-6 px-4",
      descAlign: "left-0 text-left 2xl:px-8 xl:px-6 px-4 -mt-2.5",
      image: "/a.png", // ✅ Unique image
    },
    {
      title: "Website Redesigns",
      description:
        "Refresh your digital presence with a modern, high-performing redesign.",
      wrapperClass: "items-start max-w-fit left-[42%] lg:top-[2vh] top-[0vh]",
      contentClass: "group-hover:w-[480px] text-left 2xl:px-8 xl:px-6 px-4",
      descAlign: "left-0 text-left 2xl:px-8 xl:px-6 px-4 -mt-2.5",
      image: "/a.png", // ✅ Unique image
    },
    {
      title: "Custom Website Design",
      description:
        "Tailored websites that reflect your unique brand and mission.",
      wrapperClass: "items-start max-w-fit lg:top-[9.3vh] top-[6vh]",
      contentClass: "group-hover:w-[480px] 2xl:px-8 xl:px-6 px-4",
      descAlign: "left-0 text-left 2xl:px-8 xl:px-6 px-4 -mt-2.5",
      image: "/e.png", // ✅ Unique image
    },
    {
      title: "Patient Booking & Form Integration",
      description:
        "Seamless scheduling and contact forms to boost patient engagement.",
      wrapperClass:
        "items-start max-w-fit lg:top-[17vh] top-[10vh] xl:left-[17%] -left-15",
      contentClass: "group-hover:w-[480px] 2xl:px-8 xl:px-6 px-4",
      descAlign: "left-0 text-left 2xl:px-8 xl:px-6 px-4 -mt-2.5",
      image: "/c.png", // ✅ Unique image
    },
    {
      title: "Website Care & Maintenance",
      description:
        "Ongoing support, updates, and security to keep your site running smoothly.",
      wrapperClass:
        "items-start max-w-fit lg:top-[24.5vh] top-[16vh] xl:left-[34%] left-[0%] -z-10 hover:z-10",
      contentClass: "group-hover:w-[480px] 2xl:px-8 xl:px-6 px-4 -z-10",
      descAlign: "left-0 text-left 2xl:px-8 px-6 -mt-2.5 -z-10",
      image: "/d.png", // ✅ Unique image
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {services.map((item, i) => (
        <div key={i} className={`group relative rounded-[32px] flex ${item.wrapperClass}`}>
          <BorderBeam
            size={121}
            duration={10}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 hidden lg:block"
          />
          <BorderBeam
            size={80}
            duration={10}
            delay={2}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 hidden lg:block"
          />
          <BorderBeam
            size={80}
            duration={10}
            delay={4}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 hidden lg:block"
          />
          <BorderBeam
            size={121}
            duration={10}
            delay={6}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 hidden lg:block"
          />
          <BorderBeam
            size={100}
            duration={10}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 lg:hidden"
          />
          <BorderBeam
            size={60}
            duration={10}
            delay={2}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 lg:hidden"
          />
          <BorderBeam
            size={60}
            duration={10}
            delay={4}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 lg:hidden"
          />
          <BorderBeam
            size={100}
            duration={10}
            delay={6}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative 2xl:mb-1 xl:-mb-0.5 lg:hidden"
          />

          {/* ✅ 2. Unique service image overlay */}
          <div className="absolute inset-0 rounded-[32px] overflow-hidden transition-all duration-300 xl:h-[64px] group-hover:h-[120px]">
            <Image
              src={item.image}
              alt={`${item.title} visual`}
              fill
              className="object-cover"
              priority={i < 2} // Optional: load first 2 images immediately
            />
          </div>

          {/* 3. Hover blue fill (on top of image) */}
          <div className="absolute inset-0 bg-blue-600 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-300 h-[64px] group-hover:h-[120px] z-10" />

          {/* 4. Text content (on top of all) */}
          <div
            className={`
              relative z-20
              2xl:px-8 xl:px-6 xl:py-4 px-4 py-3
              rounded-[32px]
              w-fit
              transition-all duration-300
              ${item.contentClass}
            `}
          >
            <h5 className="font-bricolage font-bold 2xl:text-[24px] xl:text-[20px] lg:text-[18px] text-[16px] text-white">
              {item.title}
            </h5>

            <p
              className={`
                absolute top-[64px]
                opacity-0 translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300
                font-bricolage 2xl:text-[18px] xl:text-[16px] lg:text-[15px] text-[14px] text-white
                ${item.descAlign}
              `}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Servicespoints;
