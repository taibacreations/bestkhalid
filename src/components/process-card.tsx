import { BorderBeam } from "@stianlarsen/border-beam";
import "@stianlarsen/border-beam/css";
import Image from "next/image";

export default function ProcessCard() {
  return (
    <div className="md:bg-[url(/process.png)] xl:rounded-[32px] lg:rounded-[20px] rounded-[14px] 2xl:bg-cover bg-no-repeat bg-contain bg-center 2xl:w-[1450px] min-h-[303px] mx-auto flex flex-col gap-8 md:flex-row md:justify-between items-center 2xl:px-31 lg:px-20 md:px-10 relative xl:mt-10 lg:mt-0 md:-mt-10 mt-[5vh] z-30">
      <BorderBeam
        size={289}
        duration={8}
        colorFrom="#00000000" // fully transparent
        colorTo="#7AB4FD"
        className="z-40 relative rounded-[32px] my-19 lg:my-12 xl:my-2.5 2xl:my-0 beam-process"
      />
      <BorderBeam
        size={100}
        duration={8}
        delay={2}
        colorFrom="#00000000" // fully transparent
        colorTo="#7AB4FD"
        className="z-40 relative rounded-[32px] my-19 lg:my-12 xl:my-2.5 2xl:my-0 beam-process"
      />
      <BorderBeam
        size={289}
        duration={8}
        delay={4}
        colorFrom="#00000000" // fully transparent
        colorTo="#7AB4FD"
        className="z-40 relative rounded-[32px] my-19 lg:my-12 xl:my-2.5 2xl:my-0 beam-process"
      />
      <BorderBeam
        size={100}
        duration={8}
        delay={6}
        colorFrom="#00000000" // fully transparent
        colorTo="#7AB4FD"
        className="z-40 relative rounded-[32px] my-19 lg:my-12 xl:my-2.5 2xl:my-0 beam-process"
      />
      <Image
        src="/line.png"
        height={100}
        width={100}
        alt="line"
        className="2xl:w-[1170px] w-[80vw] h-[1px] absolute xl:top-21 lg:top-23 top-26 hidden md:block"
      />
      <div className="md:max-w-[311px] max-w-full z-20 process">
        <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
          01
        </div>
        <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[28px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white lg:mt-6.5 mt-5 lg:mb-3 mb-2">
          Discovery Call
        </h4>
        <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
          We discuss your practice, patients, and goals.
        </p>
      </div>
      <div className="md:max-w-[311px] max-w-full z-20 process">
        <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
          02
        </div>
        <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[28px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white lg:mt-6.5 mt-5 lg:mb-3 mb-2">
          Design & Build
        </h4>
        <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
           I create a custom website that reflects your expertise.
        </p>
      </div>
      <div className="md:max-w-[311px] max-w-full z-20 process">
        <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
          03
        </div>
        <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[28px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white lg:mt-6.5 mt-5 lg:mb-3 mb-2">
          Launch & Optimize
        </h4>
        <p className="font-bricolage font-normal xl:text-[18px] lg:text-[16px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
           Your site goes live with full support and optimization.
        </p>
      </div>
    </div>
  );
}
