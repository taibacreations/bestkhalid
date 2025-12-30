import Image from "next/image";
import Servicespoints from "./services-points";
import ServicespointsMobile from "./services-points-mobile";

const Services = () => {
  return (
    <section id="services" className="bg-[url(/services-bg.png)] bg-cover bg-center md:min-h-screen py-10 relative z-40 overflow-hidden">
      <div className="relative xl:pt-23 lg:pt-20 z-40">
        <div className="text-center max-w-[992px] mx-auto z-40 relative">
          <h3 className="mt-4 font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white">
            Healthcare Web{" "}
            <span className="text-white font-tartuffo font-thin tracking-[0.01em]">
              Design Services
            </span>
          </h3>
        </div>
        <Image
          src="/macbook-2.svg"
          height={100}
          width={100}
          alt="macbook-2"
          className="2xl:w-[1446px] xl:w-[1100px] lg:w-[950px] md:w-[850px] md:scale-100 scale-130 w-full h-auto 2xl:ml-[25.2%] xl:ml-[27%] md:ml-[20%] 2xl:-mt-43 xl:-mt-25 z-30"
        />
        <div className="xl:w-[822px] xl:h-[822px] lg:w-[730px] lg:h-[730px] w-[600px] h-[600px] border border-[#F0F0F0] rounded-full absolute top-0 left-[20.5%] top-[29%] -z-10 hidden md:block" />
        <Image src="/services-blur.png" height={100} width={100} alt="services-blur" className="w-full xl:h-[100px] 2xl:h-auto absolute left-0 2xl:-bottom-120 xl:-bottom-15 lg:-bottom-70 -bottom-60"/>
        <div className="absolute left-[12%] lg:top-[28%] top-[20%] hidden md:block">
          <Servicespoints />
        </div>
        <div className="relative flex justify-center items-center text-center md:hidden mt-[8vh] px-5">
          <ServicespointsMobile />
        </div>
      </div>
    </section>
  );
};

export default Services;
