/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ( {to} ) => {
  return (
    <Link
        to={to}
        className='border-[2px] border-accent_green_dark hover:bg-accent_green_dark py-2 px-10 rounded-2xl text-accent_green_dark hover:text-bg_white font-bold text-2xl duration-500 select-none'
    >
        Back
    </Link>
  )
}

export default BackButton