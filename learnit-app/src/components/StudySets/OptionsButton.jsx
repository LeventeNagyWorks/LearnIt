/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { SlOptions } from "react-icons/sl";

const OptionsButton = () => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
    className={`w-10 h-10 flex justify-center items-center rounded-full duration-500 cursor-pointer ${isHovered ? 'bg-slate-600' : ''}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
>
    <SlOptions className={`w-6 h-6 ${isHovered ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
</div>
  )
}

export default OptionsButton