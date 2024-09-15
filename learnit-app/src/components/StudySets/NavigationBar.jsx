/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const NavigationBar = () => {
  return (
    <div className='w-[92%] h-[12%] min-h-[12%] flex flex-col justify-center font-poppins font-semibold text-cstm_white z-20'>
            <div className='w-full h-[65%] min-h-[65%] flex justify-between items-center bg-zinc-400/40 backdrop-blur-md rounded-[34px] px-8'>
                <p className='lg:text-[42px] select-none'>Welcome back!</p>
                <div className='w-12 h-12 bg-slate-700 rounded-full cursor-pointer border-2 border-slate-700 hover:border-cstm_white'>
                </div>
            </div>
    </div>
  )
}

export default NavigationBar