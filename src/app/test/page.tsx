import { BorderBeam } from "@stianlarsen/border-beam";
import "@stianlarsen/border-beam/css";
import Image from "next/image";

export default function Card() {
  return (
    <div style={{ position: "relative", padding: "0rem", borderRadius: "8px" }}>
      <ul className="flex flex-col xl:gap-12 lg:gap-8 gap-6">
        <li className="bg-[url(/points-bg-new.png)] 2xl:bg-cover bg-contain bg-no-repeat 2xl:w-[364.11px] xl:w-[320px] lg:w-[280px] md:w-[250px] w-full 2xl:h-[87.64px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[82px] font-briclage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01%] text-white flex justify-center items-center text-center xl:px-15 lg:px-10 md:px-9 2xl:ml-[18%] xl:ml-[30%] lg:ml-[15%] md:ml-[5%] solution-points solution-points-2 solution-point relative hover:bg-[#0029CC] rounded-[32px] hover:bg-none transition-all duration-300 relative li-1 li">
          <div className="lii"></div>
          Patient-friendly and mobile-optimized
          <BorderBeam
        size={100}
        duration={8}
        colorFrom="#00FF88"
        colorTo="#0088FF"
        className="z-50 relative"
      />
        </li>

        <li className="bg-[url(/points-bg-new-1.png)] 2xl:bg-cover bg-contain bg-no-repeat 2xl:w-[372.09px] xl:w-[330px] lg:w-[290px] md:w-[250px] w-full 2xl:h-[87.64px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[82px] font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01%] text-white flex justify-center items-center text-center 2xl:px-15 lg:px-14 px-10 2xl:ml-[2%] xl:ml-[15%] md:ml-[0%] solution-points solution-points-2 hover:bg-[#0029CC] rounded-[32px] hover:bg-[#0029CC] rounded-[32px] hover:bg-none transition-all duration-300 relative lii-2 li">
          <div className="lii"></div>
          Designed to build trust and credibility
        </li>

        <li className="md:bg-[url(/points-bg-new-2.png)] 2xl:bg-cover bg-contain bg-no-repeat 2xl:min-w-[443.91px] xl:w-[380px] lg:w-[340px] md:w-[250px] w-full 2xl:h-[87.64px] xl:h-[80px] lg:h-[70px] md:h-[60px] h-[82px] font-bricolage font-bold 2xl:text-[20px] xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01%] text-white list-disc flex justify-center items-center text-center 2xl:px-22 lg:px-15 px-8 2xl:ml-[25%] xl:ml-[45%] md:ml-[30%] solution-points-2 hover:bg-[#0029CC] rounded-[32px] hover:bg-[#0029CC] rounded-[32px] hover:bg-none transition-all duration-300 relative li-3 li">
          <div className="lii"></div>
          <span className="md:mt-[-0.9vh] lg:mt-0">
            Equipped with online booking & lead capture
          </span>
        </li>
      </ul>
    </div>
  );
}
