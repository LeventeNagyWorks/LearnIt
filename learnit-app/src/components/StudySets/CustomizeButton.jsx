/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FiEdit } from "react-icons/fi";

const CustomizeButton = ({ index, isHovered, setHoveredItem }) => {
  return (
    <div 
        className={`w-8 h-8 flex justify-center items-center p-1 rounded-md cursor-pointer duration-500 ${isHovered ? 'bg-accent_green_dark' : ''}`}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
    >
        <FiEdit className={`w-full h-full duration-500 ${isHovered ? 'text-cstm_bg_dark' : 'text-gray-400'}`}/>
    </div>
  )
}

export default CustomizeButton