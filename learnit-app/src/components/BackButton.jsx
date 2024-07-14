/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSignals } from '@preact/signals-react/runtime'
import { isLoading, startTransitionFromStudySetDetail } from '../signals'

const BackButton = ({ to, className, onClick }) => {

  useSignals();

  return (
    <a
        className={`w-fit border-[2px] border-accent_green_dark hover:bg-accent_green_dark py-2 px-10 rounded-2xl text-accent_green_dark hover:text-cstm_bg_dark font-bold text-2xl duration-500 select-none cursor-pointer ${className}`}
        href={to}
        onClick={onClick}
    >
        Back
    </a>
  )
}

export default BackButton