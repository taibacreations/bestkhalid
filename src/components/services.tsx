import Image from "next/image"
import Servicespoints from "./services-points"

const Services = () => {
    return (
        <section className='bg-[url(/services-bg.png)] bg-cover bg-center min-h-screen relative z-40'>
            <div className="relative pt-23 z-40">
                <div className="text-center max-w-[992px] mx-auto z-40 relative">
                    <h5 className="font-bricolage font-normal text-[28px] tracking-[-0.07em] capitalize text-white">
                        <span className="text-[40px]">[</span> services{" "}
                        <span className="text-[40px]">]</span>
                    </h5>
                    <h3 className="mt-4 font-bricolage font-bold text-[48px] tracking-[-0.03em] leading-[123%] capitalize text-white">
                        Healthcare Web{" "}
                        <span className="text-[#FFFFFF38] font-tartuffo font-thin tracking-[0.01em]">
                            Design Services
                        </span>
                    </h3>
                </div>
                <Image src="/macbook-2.svg" height={100} width={100} alt="macbook-2" className="w-[1446px] h-auto ml-auto -mt-43 z-30"/>
                <div className="w-[822px] h-[822px] border border-[#F0F0F0] rounded-full absolute top-0 left-[20.5%] top-[26.5%] -z-10"/>
                {/* <Image src="/services-blur.png" height={100} width={100} alt="services-blur" className="w-full h-10 absolute left-0 -top-35 z-10"/> */}
                <div className="absolute left-0 top-50">
                    <Servicespoints />
                </div>
            </div>
        </section>
    )
}

export default Services