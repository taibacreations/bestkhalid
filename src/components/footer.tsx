import Image from "next/image";

const Footer = () => {
  return (
    <footer className="">
      <div className="bg-[#0029CC] h-auto py-8 md:py-0 md:h-[436px]">
        <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex flex-col md:flex-row justify-between items-start md:pt-35 gap-8 md:gap-0">
          
          {/* Section 1: CTA — stays first */}
          <div className="flex flex-col max-w-full md:max-w-[250px] lg:max-w-[350px] xl:max-w-[416px] order-1">
            <h4 className="font-bricolage text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[34px] font-bold leading-[123%] tracking-[-0.07em] capitalize text-white">
              Ready to Grow Your Practice With{" "}
              <span className="font-[100] font-tartuffo tracking-[-0.01em]">
                a Website Patients Trust?
              </span>
            </h4>
            <p className="mt-2.5 font-bricolage font-normal text-[16px] xl:text-[18px] tracking-[-0.01em] capitalize">
              Let`s build something that sets your clinic apart.
            </p>
            <button className="mt-5.5 flex justify-center items-center gap-2 underline text-[16px] xl:text-[18px] font-bricolage capitalize tracking-[-0.07em] font-bold text-[#0033FF] bg-white rounded-full lg:w-[256px] max-w-fit px-4 h-[44px]">
              <Image
                src="/download-arrow.svg"
                height={100}
                width={100}
                alt="download"
                className="w-[15px]"
              />
              Download Free Guide
            </button>
          </div>

          {/* Section 2: Contact — appears LAST on mobile */}
          <div className="md:self-start order-3 md:order-2">
            <h4 className="font-bricolage text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[34px] font-bold leading-[123%] tracking-[-0.07em] capitalize text-white">
              Contact
            </h4>
            <div className="flex items-center gap-4 mt-3">
              <Image
                src="/envelope.svg"
                height={100}
                width={100}
                alt="phone"
                className="w-[16.76px]"
              />
              <h5 className="font-bricolage text-[16px] xl:text-[18px] font-normal leading-[142%] tracking-[-0.01em] capitalize text-white">
                +999 23654 2654
              </h5>
            </div>
            <div className="flex items-center gap-4 mt-2.5">
              <Image
                src="/phone.svg"
                height={100}
                width={100}
                alt="email"
                className="w-[17.44px]"
              />
              <h5 className="font-bricolage text-[16px] xl:text-[18px] font-normal leading-[142%] tracking-[-0.01em] capitalize text-white">
                dummy@help.com
              </h5>
            </div>
          </div>

          {/* Section 3: Social + Form — appears SECOND on mobile */}
          <div className="flex flex-col items-center w-full md:max-w-fit md:items-end gap-3 order-2 md:order-3">
            <div className="flex items-center gap-5">
              <div className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center">
                <Image
                  src="/insta.svg"
                  height={100}
                  width={100}
                  alt="instagram"
                  className="w-[16px]"
                />
              </div>
              <div className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center">
                <Image
                  src="/dribble.svg"
                  height={100}
                  width={100}
                  alt="dribbble"
                  className="w-[18px]"
                />
              </div>
              <div className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center">
                <Image
                  src="/be.svg"
                  height={100}
                  width={100}
                  alt="behance"
                  className="w-[18px]"
                />
              </div>
              <div className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center">
                <Image
                  src="/youtube.svg"
                  height={100}
                  width={100}
                  alt="youtube"
                  className="w-[18px]"
                />
              </div>
            </div>
            <form
              className="mt-4 border-b border-[white] flex justify-between lg:w-[300px] xl:w-[385px] w-full max-w-[385px] h-[40px]"
              action=""
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="font-bricolage text-[18px] font-normal leading-[142%] tracking-[-0.01em] capitalize text-white placeholder:text-white placeholder:font-bricolage placeholder:text-[18px] placeholder:font-normal placeholder:leading-[142%] placeholder:tracking-[-0.01em] focus:outline-none w-[90%]"
              />
              <button type="submit">
                <Image
                  src="/email-arrow.svg"
                  height={100}
                  width={100}
                  alt="submit"
                  className="w-[14px]"
                />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#171717] flex justify-center items-center h-[65px] text-center overflow-hidden">
        <h6 id="footer-h6" className="font-bricolage md:text-[16px] text-[15px] xl:text-[18px] font-normal leading-[142%] tracking-[-0.01em] capitalize text-white px-4">
          2026 © Copyrights BestKhalid. All Rights Reserved.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;