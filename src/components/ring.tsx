const Ring = () => {
  return (
    <div className="">
        <div className="border border-[#9A9A9A] 2xl:w-[608px] xl:w-[550px] lg:w-[450px] md:w-[350px] w-[300px] 2xl:h-[608px] xl:h-[550px] lg:h-[450px] md:h-[350px] h-[300px] rounded-full relative animate-[spin_30s_linear_infinite]">
            <img src="/elementor.webp" height={100} width={100} alt="elementor" className="2xl:w-[119px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute left-1/2 -translate-x-1/2 xl:-top-15 -top-10 animate-[spin_30s_linear_infinite_reverse]" />
            <img src="/elementor.webp" height={100} width={100} alt="elementor" className="2xl:w-[119px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute left-1/2 -translate-x-1/2 xl:-bottom-15 -bottom-10  animate-[spin_30s_linear_infinite_reverse]" />
            <img src="/figma.webp" height={100} width={100} alt="figma" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -left-8 lg:top-24 top-16 animate-[spin_30s_linear_infinite_reverse]" />
            <img src="/wordpress.webp" height={100} width={100} alt="wordpress" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -right-8 lg:top-24 top-16 animate-[spin_30s_linear_infinite_reverse]" />
            <img src="/wordpress.webp" height={100} width={100} alt="wordpress" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -left-9 lg:bottom-32 bottom-20 animate-[spin_30s_linear_infinite_reverse]" />
            <img src="/figma.webp" height={100} width={100} alt="figma" className="2xl:w-[121.48px] xl:w-[100px] lg:w-[80px] md:w-[70px] w-[60px] absolute -right-8 lg:bottom-32 bottom-20 animate-[spin_30s_linear_infinite_reverse]" />

        </div>
    </div>
  )
}

export default Ring