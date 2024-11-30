/* eslint-disable no-empty-pattern */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";

const ProfileEditButton = ({ }) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute right-8 top-8 w-16 h-16 min-w-8 min-h-8 flex justify-center items-center p-1 rounded-xl cursor-pointer duration-500 ${isHovered ? 'bg-accent_green_dark' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FiEdit className={`w-full h-full duration-500 ${isHovered ? 'text-cstm_bg_dark' : 'text-accent_green_dark'}`} />
    </div>
  )
}

export default ProfileEditButton