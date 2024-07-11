/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Animated_link } from './LoadingScreen'
import { useSignals } from '@preact/signals-react/runtime'
import { isLoading } from '../signals'

const BackButton = ({ to, className }) => {

  useSignals();

  useEffect(() => {
    setTimeout(() => {
      isLoading.value = { _l: false };
    }, 1500);
  }, []);

  return (
    <Animated_link
        to={to}
        className={`w-fit border-[2px] border-accent_green_dark hover:bg-accent_green_dark py-2 px-10 rounded-2xl text-accent_green_dark hover:text-cstm_bg_dark font-bold text-2xl duration-500 select-none ${className}`}
    >
        Back
    </Animated_link>
  )
}

export default BackButton