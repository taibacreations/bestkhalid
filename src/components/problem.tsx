import Image from "next/image";
import Revolving from "./revolving";

const Problem = () => {
  return (
    <section className="-mt-7 relative lg:min-h-[110vh] py-5 lg:py-0 bg-[url(/problem-bg.png)] bg-cover xl:bg-[70%_30%] overflow-hidden xl:px-10 px-5">
      <Image
        src="/macbook.svg"
        height={100}
        width={100}
        alt="macbook"
        className="2xl:w-[1398px] xl:w-[1150px] lg:w-[850px] w-[750px] h-auto absolute lg:-left-5 -left-30 xl:top-27 lg:top-40 top-50 hidden md:block"
      />
      <div className="md:flex gap-4 items-end absolute xl:bottom-[15.5%] lg:bottom-[24%] md:bottom-[7%] bottom-[25%] 2xl:left-64 lg:left-[5%] left-3 hidden">
        <div className="bg-[url(/hero-text-bg.png)] bg-cover 2xl:w-[479px] 2xl:h-[94px] xl:w-[400px] lg:w-[350px] w-[300px] lg:h-[80px] h-[60px] rounded-full font-bricolage font-normal 2xl:text-[24px] xl:text-[22px] lg:text-[20px] text-[16px] leading-[142%] tracking-[-0.01em] capitalize text-white flex justify-center items-center text-center">
          A weak website means missed appointments and lost trust.
        </div>
        <Image
          src="/l-line.png"
          height={100}
          width={100}
          alt="l-line"
          className="lg:w-[100px] w-[70px] lg:h-[196px] h-auto lg:mb-10 mb-8"
        />
      </div>
      <div className="absolute -right-[56%] hidden">
        <Revolving />
      </div>
      <div>
        <div className="text-center 2xl:max-w-[988px] xl:max-w-[900px] lg:max-w-[800px] md:max-w-[600px] max-w-full mx-auto">
          <div className="2xl:max-w-[842px] xl:max-w-[780px] lg:max-w-[700px] md:max-w-[550px] max-w-full mx-auto">
            <h5 className="font-bricolage font-normal 2xl:text-[28px] xl:text-[24px] lg:text-[22px] text-[20px] tracking-[-0.07em] capitalize text-white -mb-2">
              <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">[</span> The Problem{" "}
              <span className="2xl:text-[40px] xl:text-[36px] lg:text-[30px] text-[26px]">]</span>
            </h5>
            <h3 className="xl:mt-4 mt-2 font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[142%] capitalize text-white">
              Your Website{" "}
              <span className="text-white">Shouldn`t Be Why Patients</span>{" "}
              <span className="text-white font-tartuffo font-thin tracking-[0.01em]">
                Choose Your Competitor
              </span>
            </h3>
          </div>
          <p className="xl:mt-5 mt-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] text-white">
            Most healthcare websites are outdated, hard to navigate, and don’t
            reflect the quality of care you provide. In today`s digital-first
            world, patients expect a seamless online experience
          </p>
        </div>
        <div className="bg-[#0E1A4A08] 2xl:h-[483px] 2xl:h-[400px] md:h-[380px] min-h-[300px] 2xl:w-[817px] xl:w-[750px] lg:w-[600px] md:w-[500px] max-w-full lg:ml-[35%] md:ml-[30%] relative 2xl:mt-13 xl:mt-10 mt-8 z-20 relative overflow-hidden">
          <Image
            src="/glass-overlay.png"
            height={100}
            width={100}
            alt="glass-overlay"
            className="absolute inset-0 w-full md:h-auto min-h-[300px] z-0"
          />
          <div className="flex md:justify-end justify-start items-center 2xl:mr-20 lg:mr-[3vw] md:mr-[5vw] points-margin">
            <ul className="font-bricolage font-bold 2xl:text-[28px] xl:text-[26px] lg:text-[22px] text-[18px] leading-[142%] tracking-[-0.01em] capitalize text-white flex flex-col gap-3 justify-center 2xl:mt-12 mt-10 lg:mt-8 md:mt-5 mt-8 list-disc list">
              <li className="">Slow load times</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="w-full h-[2px]"
              />
              <li>Confusing appointment booking</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="w-full h-[2px]"
              />
              <li>Unclear services</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="w-full h-[2px]"
              />
              <li>Not mobile-friendly</li>
              <Image
                src="/li-border.png"
                height={100}
                width={100}
                alt="border"
                className="w-full h-[2px]"
              />
              <li>Poor SEO</li>
            </ul>
          </div>
          <Image
            src="/macbook.svg"
            height={100}
            width={100}
            alt="macbook"
            className="w-full h-auto md:hidden scale-140 mt-[3vh]"
          />
          <div className="md:hidden gap-2 items-end w-full mt-[-3vh] z-40 relative">
            <div className="bg-[url(/hero-text-bg.png)] bg-cover py-3 px-3 rounded-full font-bricolage font-normal text-[11px] leading-[142%] tracking-[-0.01em] capitalize text-white flex justify-center items-center text-center">
              A weak website means missed appointments and lost trust.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
