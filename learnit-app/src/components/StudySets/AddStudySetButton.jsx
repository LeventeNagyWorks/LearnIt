/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { HiOutlinePlus } from "react-icons/hi2";


const AddStudySetButton = ({ onClick, className}) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
        className={`w-[90%] flex justify-center items-center bg-gradient-to-br from-green-900 to-accent_green_dark rounded-[40px] cursor-pointer duration-700 shadow-2xl hover:shadow-accent_green_dark ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick()}
    >
        <HiOutlinePlus className='w-[90%] h-[9R0%] text-cstm_white'/>
    </div>
  )
}

export default AddStudySetButton