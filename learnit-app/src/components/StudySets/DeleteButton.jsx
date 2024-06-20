/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { FaTrashCan } from "react-icons/fa6";

const DeleteButton = () => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`w-10 h-10 flex justify-center items-center rounded-full duration-500 cursor-pointer ${isHovered ? 'bg-red-800' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <FaTrashCan className={`w-6 h-6 ${isHovered ? 'text-cstm_white' : 'text-red-900'}`}/>
        </div>
    )
}

export default DeleteButton