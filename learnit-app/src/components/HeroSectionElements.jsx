/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const HeroSectionElements = ({ isLarge, bgImg, text }) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
        className={`w-full h-full object-cover rounded-[30px] shadow-md ${isLarge ? 'row-span-5' : 'row-span-3'} ${isHovered ? 'scale-[110%]' : 'scale-100'} duration-500`}
        style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} 
    >
        <div className={`w-full h-full rounded-[30px] bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center px-4
            ${isHovered ? 'opacity-100' : 'opacity-0'} duration-500`}
        >
            <h1 className='text-cstm_white text-4xl font-medium text-center select-none'>{text}</h1>
        </div>
    </div>
  )
}

export default HeroSectionElements;