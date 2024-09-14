/* eslint-disable no-unused-vars */
import React from 'react'

const NavigationBar = () => {
  return (
    <div className='w-[98%] h-[8%] min-h-[8%] flex flex-col justify-end font-poppins font-semibold text-cstm_white z-20'>
            <div className='w-full h-[90%] min-h-[90%] flex justify-between items-center bg-zinc-400/40 backdrop-blur-md rounded-[24px] px-8'>
                <p className='text-3xl select-none'>Welcome back!</p>
                <div className='w-12 h-12 bg-slate-700 rounded-full'>
                </div>
            </div>
    </div>
  )
}

export default NavigationBar