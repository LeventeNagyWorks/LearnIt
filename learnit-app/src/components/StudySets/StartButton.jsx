/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import { RiTriangleFill } from "react-icons/ri";
import { startTransitionFromStudySets } from '../../signals';

const StartButton = ({ itemName }) => {

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    startTransitionFromStudySets.value = true;
    e.preventDefault();
    setTimeout(() => {
      navigate(`/study-sets/${itemName}`);
    }, 0);
  }

  return (
    <a
      href={`/study-sets/${itemName}`}
      onClick={handleClick}
      className={`w-10 h-10 flex justify-center items-center rounded-full duration-500 cursor-pointer ${isHovered ? 'bg-green-400' : 'bg-accent_green_dark'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RiTriangleFill className={`w-6 h-6 rotate-90 ${isHovered ? 'text-cstm_white' : 'text-cstm_white'}`}/>
    </a>
  )
}

export default StartButton