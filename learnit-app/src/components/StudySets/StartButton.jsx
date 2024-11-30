/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { RiTriangleFill } from "react-icons/ri";
import { startTransitionFromStudySets } from '../../signals';

const StartButton = ({ itemName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    startTransitionFromStudySets.value = true;
    navigate(`/study-sets/${encodeURIComponent(itemName)}`, { replace: true });
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 flex justify-center items-center rounded-full duration-500 cursor-pointer ${isHovered ? 'bg-green-400' : 'bg-accent_green_dark'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RiTriangleFill className={`w-6 h-6 rotate-90 text-cstm_white`} />
    </button>
  )
}

export default StartButton
