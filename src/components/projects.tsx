import Image from 'next/image'
import React from 'react'

const Projects = () => {
  return (
    <div>
        <div className='flex justify-center items-center w-full'>
          <Image src="/proj-new-3.svg" height={100} width={100} alt='project-1' className='xl:w-[477px] lg:w-[400px] md:w-[300px] w-[180px] 2xl:scale-128 h-auto relative 2xl:left-[7%] left-[10%] 2xl:top-[5.5vh]'/>
          <Image src="/proj-new-1.svg" height={100} width={100} alt='project-1' className='2xl:w-[541px] xl:w-[500px] lg:w-[400px] md:w-[300px] w-[180px] z-10 h-auto'/>
          <Image src="/proj-new-2.svg" height={100} width={100} alt='project-1' className='2xl:w-[477px] lg:w-[400px] md:w-[300px] w-[180px] 2xl:scale-128 h-auto relative 2xl:right-[6%] right-[10%] 2xl:top-[5.5vh]'/>
        </div>
    </div>
  )
}

export default Projects