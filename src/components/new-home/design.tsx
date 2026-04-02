import { BorderBeam } from "@stianlarsen/border-beam";
import "@stianlarsen/border-beam/css";
import Image from "next/image";

const Design = () => {
  return (
    <section className="max-w-[1525px] mx-auto xl:px-10 px-4 md:mt-[10vh] mt-[6vh]">
      <div>
        <div>
          <h2 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize">
            A Smooth, Stress-Free{" "}
            <span className="font-tartuffo font-light tracking-0">
              Design Process
            </span>
          </h2>
          <p className="font-bricolage font-normal 2xl:text-[18px] text-[16px] leading-[142%] tracking-[-0.01em] capitalize text-white text-center my-[1.5vh]">
            Simple, transparent, and done for you
          </p>
        </div>

        <div className="md:bg-[url(/new-home/design.webp)] xl:rounded-[32px] lg:rounded-[20px] rounded-[14px] 2xl:bg-cover bg-no-repeat lg:bg-contain md:bg-[length:100%_100%] bg-contain bg-center 2xl:w-[1450px] xl:min-h-[380px] mx-auto flex flex-col gap-8 md:flex-row md:justify-between items-start xl:pt-[6.5vh] py-[2vh] md:px-[6.5vw] relative z-20 my-[3.5vh]">
          <BorderBeam
            size={289}
            duration={8}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam 2xl:my-0 xl:my-[1vh] design-beam md:block hidden"
          />
          <BorderBeam
            size={289}
            duration={10}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam 2xl:my-0 xl:my-[1vh] design-beam md:block hidden"
          />
          <Image
            src="/line.webp"
            height={100}
            width={100}
            alt="line"
            className="2xl:w-[1170px] w-[80vw] h-px absolute 2xl:top-[24%] xl:top-[22%] lg:top-[15%] top-[13%] hidden md:block"
          />
          <div className="md:max-w-[311px] max-w-full z-20 process rounded-[14px]">


            <BorderBeam
            size={289}
            duration={8}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam design-beam md:hidden mb-[49.2vh] mt-[2vh] design-beam-1"
          />
          <BorderBeam
            size={289}
            duration={10}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam design-beam md:hidden mb-[49.2vh] mt-[2vh] design-beam-1"
          />


            <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
              01
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[26px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white xl:mt-6.5 mt-5 lg:mb-3 mb-2">
              Strategic Research
            </h4>
            <p className="font-bricolage font-normal xl:text-[18px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              I dig into your competitors, practice areas, and local market
              before a single page gets designed. No guesswork.
            </p>
          </div>
          <div className="md:max-w-[331px] max-w-full z-20 process rounded-[14px]">

            <BorderBeam
            size={289}
            duration={8}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam design-beam md:hidden mb-[26.5vh] mt-[24.5vh] design-beam-2"
          />
          <BorderBeam
            size={289}
            duration={10}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam design-beam md:hidden mb-[26.5vh] mt-[24.5vh] design-beam-2"
          />


            <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
              02
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[26px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white xl:mt-6.5 mt-5 lg:mb-3 mb-2">
              Conversion-Focused Design
            </h4>
            <p className="font-bricolage font-normal xl:text-[18px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              A custom law firm website built for authority and lead generation.
              Not a template with your logo dropped in.
            </p>
          </div>
          <div className="xl:max-w-[334px] lg:max-w-[260px] md:max-w-[200px] max-w-full z-20 process rounded-[14px]">
            
            <BorderBeam
            size={289}
            duration={8}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam design-beam md:hidden mb-[2vh] mt-[47vh] design-beam-3"
          />
          <BorderBeam
            size={289}
            duration={10}
            colorFrom="#00000000" // fully transparent
            colorTo="#7AB4FD"
            className="z-40 relative rounded-[32px] thick-beam design-beam md:hidden mb-[2vh] mt-[47vh] design-beam-3"
          />


            <div className="bg-white text-[#0A0A0A] rounded-full xl:w-[47px] xl:h-[47px] lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] font-bricolage font-bold xl:text-[24px] md:text-[20px] text-[18px] leading-[123%] tracking-[-0.03em] flex justify-center items-center">
              03
            </div>
            <h4 className="font-bricolage font-bold 2xl:text-[34px] xl:text-[32px] lg:text-[26px] text-[22px] leading-[123%] tracking-[-0.03em] capitalize text-white xl:mt-6.5 mt-5 lg:mb-3 mb-2">
              Launch & Optimize
            </h4>
            <p className="font-bricolage font-normal xl:text-[18px] text-[14px] leading-[142%] tracking-[-0.01em] capitalize text-white">
              Speed-optimized, SEO-structured, and tested before it goes live.
              Then handed over properly. Clear milestones. Transparent
              communication. Structured timeline. You'll always know where
              things stand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Design;
