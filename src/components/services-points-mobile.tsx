"use client";

import { BorderBeam } from "@stianlarsen/border-beam";

const ServicespointsMobile = () => {
  const services = [
    {
      title: "Local SEO for Healthcare",
      description:
        "Beautiful, modern layouts built around your brand and patients’ needs.",
      wrapperClass: "",
    },
    {
      title: "Website Redesigns",
      description:
        "Refresh your digital presence with a modern, high-performing redesign.",
      wrapperClass: "",
    },
    {
      title: "Custom Website Design",
      description:
        "Tailored websites that reflect your unique brand and mission.",
      wrapperClass: "",
    },
    {
      title: "Patient Booking & Form Integration",
      description:
        "Seamless scheduling and contact forms to boost patient engagement.",
      wrapperClass: "",
    },
    {
      title: "Website Care & Maintenance",
      description:
        "Ongoing support, updates, and security to keep your site running smoothly.",
      wrapperClass: "",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {services.map((item, i) => (
        <div
          key={i}
          className={`group relative flex justify-center ${item.wrapperClass}`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[url(/glassy-2.png)] bg-cover bg-center rounded-[32px] transition-all duration-300 py-3 group-hover:h-[120px]" />
          <div className="absolute inset-0 bg-blue-600 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-300 h-[64px] group-hover:h-[120px]" />

          {/* Content */}
          <div
            className="
              relative z-10
              px-6 py-4
              rounded-[32px]
              w-fit
              transition-all duration-300
              group-hover:w-[480px]
              text-center
            "
          >
            <h5 className="font-bricolage font-bold text-white text-[18px] md:text-[20px] text-center">
              {item.title}
            </h5>

            <p
              className="
                font-bricolage text-[14px] text-white text-center
                w-[90%]
              "
            >
              {item.description}
            </p>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicespointsMobile;
