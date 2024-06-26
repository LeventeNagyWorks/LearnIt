/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { IoTrashOutline } from "react-icons/io5";

const DeleteButton = ({ isWide, onClick }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`${isWide ? 'w-full h-fit rounded-b-xl' : 'w-fit h-fit rounded-xl'} flex justify-center items-center duration-500 cursor-pointer gap-2 px-2 py-2 ${isHovered ? 'bg-red-800' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <IoTrashOutline className={`w-6 h-6 ${isHovered ? 'text-cstm_white' : 'text-red-800'}`}/>
            <p className={`text-lg font-poppins font-semibold duration-500 ${isWide ? 'block' : 'hidden'} ${isHovered ? 'text-cstm_white' : 'text-red-800'}`}>DELETE</p>
        </div>
    )
}

export default DeleteButton