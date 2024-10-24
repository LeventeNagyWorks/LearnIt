/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { FiCheck } from "react-icons/fi";

const KnowItButton = () => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`w-14 h-14 flex justify-center items-center rounded-[12px] cursor-pointer duration-500 ${isHovered ? 'bg-green-600' : ''}`}
        onClick={null}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <FiCheck className={`w-14 h-14 duration-500 ${isHovered ? 'text-white' : 'text-green-500'}`}/>
    </div>
  )
}

export default KnowItButton