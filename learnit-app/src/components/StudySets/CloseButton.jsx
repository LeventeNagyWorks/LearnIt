/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

const CloseButton = ({ onClick }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
        className={`flex justify-center items-center border-2 border-red-700 rounded-xl cursor-pointer transition-all duration-500 ${isHovered ? ' bg-red-700' : ''}`}
        onClick={() => onClick()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <IoCloseOutline className={`text-4xl duration-500 ${isHovered ? 'text-cstm_white' : 'text-red-700'}`} />
    </div>
  )
}

export default CloseButton