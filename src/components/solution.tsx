import Image from 'next/image'
import Solutionoints from './solution-points'

const Solution = () => {
    return (
        <section className='bg-[url(/stones.png)] bg-cover bg-center w-full min-h-screen relative'>
            <Image src="/points-blur.png" height={100} width={100} alt='points-blur' className='w-full h-[533px] absolute left-0 z-30 -top-60 object-fit'/>
            <Image src="/blue-blur.png" height={100} width={100} alt='blue-blur' className='w-[30%] h-full -top-[40%] absolute right-0 z-50'/>
            <div>
                <div className="text-center max-w-[992px] mx-auto z-40 relative">
                    <h5 className="font-bricolage font-normal text-[28px] tracking-[-0.07em] capitalize text-white">
                        <span className="text-[40px]">[</span> The Solution{" "}
                        <span className="text-[40px]">]</span>
                    </h5>
                    <h3 className="mt-4 font-bricolage font-bold text-[48px] tracking-[-0.03em] leading-[123%] capitalize text-white">
                        I Build Clean, Professional, HIPAA-Conscious Websites{" "}
                        <span className="text-[#FFFFFF38] font-tartuffo font-thin tracking-[0.01em]">
                            That Bring You More Patients
                        </span>
                    </h3>
                    <p className="mt-5 font-bricolage font-normal text-[18px] tracking-[-0.01em] capitalize leading-[142%] text-white">
                        I specialize exclusively in web design for healthcare providers, so every site I build is
                    </p>
                </div>
                <div className='w-[1036px] h-[777px] mx-auto z-40 relative'>
                    <Image src="/iphone.svg" height={100} width={100} alt='iphone' className='w-full h-auto'/>
                </div>
                <div className='absolute left-1/2 -translate-x-1/2 top-74 w-full z-40'>
                    <Solutionoints />
                </div>
            </div>
        </section>
    )
}

export default Solution