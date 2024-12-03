/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaRegShareFromSquare } from "react-icons/fa6";

const ShareButton = ({ isWide, onClick, itemName }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`${isWide ? 'w-full h-fit' : 'w-fit h-fit'} flex justify-center items-center duration-500 cursor-pointer gap-2 px-2 py-2 select-none ${isHovered ? 'bg-cyan-500' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(itemName)}
        >
            <FaRegShareFromSquare className={`w-6 h-6 ${isHovered ? 'text-cstm_white' : 'text-cyan-500'}`} />
            <p className={`text-lg font-poppins font-semibold duration-500 ${isWide ? 'block' : 'hidden'} ${isHovered ? 'text-cstm_white' : 'text-cyan-500'}`}>SHARE</p>
        </div>
    )
}

export default ShareButton