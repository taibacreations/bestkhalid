import Image from "next/image";
import Revolving from "./revolving";

const Problem = () => {
  return (
    <section className="-mt-7 relative min-h-[120vh] bg-[url(/problem-bg.png)] bg-cover bg-right overflow-hidden">
      <Image
        src="/macbook.svg"
        height={100}
        width={100}
        alt="macbook"
        className="w-[1398px] h-auto absolute -left-18 top-25"
      />
      <div className="flex gap-4 items-end absolute bottom-51 left-64">
        <div className="bg-[url(/hero-text-bg.png)] bg-cover bg-center w-[479px] h-[94px] rounded-full font-bricolage font-normal text-[24px] leading-[142%] tracking-[-0.01em] capitalize text-white flex justify-center items-center text-center">
        A weak website means missed appointments and lost trust.
        </div>
        <Image src="/l-line.png" height={100} width={100} alt="l-line" className="w-[100px] h-auto mb-10"/>
      </div>
      <div className="absolute -right-[56%]">
        <Revolving />
      </div>
      <div>
        <div className="text-center max-w-[842px] mx-auto">
          <h5 className="font-bricolage font-normal text-[28px] tracking-[-0.07em] capitalize text-white">
            <span className="text-[40px]">[</span> The Problem{" "}
            <span className="text-[40px]">]</span>
          </h5>
          <h3 className="mt-4 font-bricolage font-bold text-[48px] tracking-[-0.03em] leading-[123%] capitalize text-white">
            Your Website{" "}
            <span className="text-[#FFFFFF38]">Shouldn`t Be Why Patients</span>{" "}
            <span className="text-[#FFFFFF38] font-tartuffo font-thin tracking-[0.01em]">
              Choose Your Competitor
            </span>
          </h3>
          <p className="mt-5 font-bricolage font-normal text-[18px] tracking-[-0.01em] capitalize leading-[142%] text-white">
            Most healthcare websites are outdated, hard to navigate, and don’t
            reflect the quality of care you provide. In today`s digital-first
            world, patients expect a seamless online experience
          </p>
        </div>
        <div className="bg-[#0E1A4A08] h-[483px] w-[817px] ml-[35%] relative mt-13">
          <Image
            src="/glass-overlay.png"
            height={100}
            width={100}
            alt="glass-overlay"
            className="absolute inset-0 w-full h-auto z-0"
          />
          <div className="flex justify-end mr-17">
            <ul className="font-bricolage font-bold text-[28px] leading-[142%] tracking-[-0.01em] capitalize text-white flex flex-col gap-3 justify-center mt-12 list-disc">
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
        </div>
      </div>
    </section>
  );
};

export default Problem;
