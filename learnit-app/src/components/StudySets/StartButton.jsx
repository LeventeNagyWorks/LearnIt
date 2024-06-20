/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { RiTriangleFill } from "react-icons/ri";

const StartButton = ( ) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`w-10 h-10 flex justify-center items-center rounded-full duration-500 cursor-pointer ${isHovered ? 'bg-green-400' : 'bg-accent_green_dark'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RiTriangleFill className={`w-6 h-6 rotate-90 ${isHovered ? 'text-cstm_white' : 'text-cstm_white'}`}/>
</div>
  )
}

export default StartButton