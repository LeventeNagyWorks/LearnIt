/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { HiOutlinePlus } from "react-icons/hi2";


const AddStudySetButton = ({ onClick, className}) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
        className={`w-32 h-32 flex justify-center items-center bg-gradient-to-br from-green-900 to-accent_green_dark2 rounded-full cursor-pointer duration-700 hover:shadow-[0_0_50px_rgba(40,255,0,0.7)] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick()}
    >
        <HiOutlinePlus className='w-[90%] h-[90%] text-cstm_white'/>
    </div>
  )
}

export default AddStudySetButton