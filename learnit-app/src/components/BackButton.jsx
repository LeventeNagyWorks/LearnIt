/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { Animated_link } from './LoadingScreen'

const BackButton = ( {to} ) => {
  return (
    <Animated_link
        to={to}
        className=' w-fit border-[2px] border-accent_green_dark hover:bg-accent_green_dark py-2 px-10 rounded-2xl text-accent_green_dark hover:text-cstm_bg_dark font-bold text-2xl duration-500 select-none'
    >
        Back
    </Animated_link>
  )
}

export default BackButton