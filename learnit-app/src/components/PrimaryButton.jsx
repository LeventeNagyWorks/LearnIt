/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PrimaryButton = ({ to, text, className, onClick }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
    <Link 
        to={to}
        onClick={onClick}
        className={`text-cstm_bg_dark bg-accent_green_dark font-poppins font-bold text-2xl rounded-2xl text-center px-8 py-3 cursor-pointer duration-500 z-50 
            ${className}
            ${isHovered ? 'bg-accent_green_dark2 shadow-[0_0_36px_rgba(40,255,0,0.7)]' : 'bg-accent_green_dark'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        {text}
    </Link>
  )
}

export default PrimaryButton