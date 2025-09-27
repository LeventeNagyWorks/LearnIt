/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { IoTrashOutline } from "react-icons/io5";

const DeleteButton = ({ isWide, itemName, onClick, size = 'medium' }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`${isWide ? 'w-full h-fit rounded-b-xl' : 'w-fit h-fit rounded-xl'} ${size === 'small' ? 'p-1' : 'p-2'} flex justify-center items-center duration-500 cursor-pointer gap-2 select-none ${isHovered ? 'bg-red-700' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(itemName)}
        >
            <IoTrashOutline className={`w-6 h-6 ${isHovered ? 'text-cstm_white' : 'text-red-700'}`} />
            <p className={`text-lg font-poppins font-semibold duration-500 ${isWide ? 'block' : 'hidden'} ${isHovered ? 'text-cstm_white' : 'text-red-800'}`}>DELETE</p>
        </div>
    )
}

export default DeleteButton