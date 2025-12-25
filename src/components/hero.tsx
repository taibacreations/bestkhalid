import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-[url(/hero-img.svg)] bg-cover min-h-[120vh] relative">
      <Image
        src="/dots.png"
        height={100}
        width={100}
        alt="dots"
        className="w-[2540px] h-[1458px] object-contain absolute left-0 top-0"
      />
      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex items-center min-h-[120vh] relative">
        <div className="max-w-[682px]">
          <h5 className="font-bricolage font-normal text-[40px] tracking-[-0.07em] capitalize text-white -mb-5">
            Modern, Patient-Focused
          </h5>
          <h2 className="flex flex-col font-bricolage font-extrabold text-[90.64px] tracking-[-0.03em] uppercase text-white">
            Websites for{" "}
            <span className="font-tartuffo font-thin tracking-normal capitalize -mt-12">
              Healthcare Providers
            </span>
          </h2>
          <p className="font-bricolage font-normal text-[28px] tracking-[-0.07em] capitalize text-white leading-[142%]">
            Turn your clinic`s website into a trusted, conversion-driven digital
            front door that attracts new patients and elevates your practice
          </p>
          <button
            className="mt-7.5 bg-[#003459] text-white rounded-[334px] w-[371px] h-[59px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline"
            style={{ boxShadow: "0px -6px 20.3px 0px #2E90FA inset" }}
          >
            <Image
              src="/button-arrow.svg"
              width={1000}
              height={100}
              alt="button-arrow"
              className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
            />
            Book a Free Consultation
          </button>
          <div className="flex items-center gap-1 mt-28">
            <div className="w-5 h-5 rounded-full shadow-button"/>
            <div className="w-[98px] border border-dashed border-white h-[1px]"/>
            <div className="w-[201px] h-[51px] rounded-full shadow-button bg-[#003459] flex items-center justify-center gap-4">
                <Image src="/linkedin.svg" width={100} height={100} alt="linkedin"  className="w-[19.77px]"/>
                <Image src="/facebook.svg" width={100} height={100} alt="facebook"  className="w-[19.77px]"/>
                <Image src="/inst.svg" width={100} height={100} alt="insta"  className="w-[19.77px]"/>
                <Image src="/twitter.svg" width={100} height={100} alt="twitter"  className="w-[19.77px]"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
