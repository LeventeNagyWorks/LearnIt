/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { SlOptions } from "react-icons/sl";

const OptionsButton = ({ onClick }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
    className={`w-10 h-10 flex justify-center items-center rounded-full duration-500 cursor-pointer ${isHovered ? 'bg-slate-600' : ''}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={onClick}
>
    <SlOptions className={`w-6 h-6 ${isHovered ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
</div>
  )
}

export default OptionsButton