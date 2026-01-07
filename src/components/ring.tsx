import Image from "next/image"

const Ring = () => {
  return (
    <div className="">
        <div className="border border-[#9A9A9A] 2xl:w-[608px] xl:w-[550px] lg:w-[450px] md:w-[350px] w-[300px] 2xl:h-[608px] xl:h-[550px] lg:h-[450px] md:h-[350px] h-[300px] rounded-full relative animate-[spin_30s_linear_infinite]">
            <Image src="/elementor.svg" height={100} width={100} alt="elementor" className="2xl:w-[119px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute left-1/2 -translate-x-1/2 xl:-top-15 -top-10 animate-[spin_30s_linear_infinite_reverse]" />
            <Image src="/elementor.svg" height={100} width={100} alt="elementor" className="2xl:w-[119px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute left-1/2 -translate-x-1/2 xl:-bottom-15 -bottom-10  animate-[spin_30s_linear_infinite_reverse]" />
            <Image src="/photoshop.svg" height={100} width={100} alt="photoshop" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -left-8 lg:top-24 top-16 animate-[spin_30s_linear_infinite_reverse]" />
            <Image src="/wordpress.svg" height={100} width={100} alt="wordpress" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -right-8 lg:top-24 top-16 animate-[spin_30s_linear_infinite_reverse]" />
            <Image src="/wordpress.svg" height={100} width={100} alt="wordpress" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -left-9 lg:bottom-32 bottom-20 animate-[spin_30s_linear_infinite_reverse]" />
            <Image src="/photoshop.svg" height={100} width={100} alt="photoshop" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -right-8 lg:bottom-32 bottom-20 animate-[spin_30s_linear_infinite_reverse]" />

        </div>
    </div>
  )
}

export default Ring