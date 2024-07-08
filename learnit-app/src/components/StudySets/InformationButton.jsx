/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const InformationButton = ({ isInformationHovered, setIsInformationHovered }) => {
  return (
    <div className='self-start flex relative'>
        <div 
            onMouseEnter={() => setIsInformationHovered(true)}
            onMouseLeave={() => setIsInformationHovered(false)}
            className='w-16 h-16 bg-gradient-to-br from-zinc-700 to-zinc-900 border-2 border-zinc-900 rounded-full hover:border-accent_green_dark cursor-pointer duration-500 relative'
        >
            <p className=' text-center text-[40px] text-accent_green_dark font-poetsen select-none'>i</p>
        </div>

        <div className={`absolute flex z-50 left-32 -translate-x-[65px] translate-y-[30px] transition-transform duration-500 ${isInformationHovered ? 'block' : 'hidden'}`}>

            <svg className='w-16 h-16 translate-x-2 fill-' width="155" height="188" viewBox="0 0 155 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M155 188L-1.1767e-06 -1.88771e-06L155 5.27406e-06L155 188Z" fill="#1e293b"/>
            </svg>

            <div className='w-[540px] h-[400px] py-2 px-5 flex flex-col justify-start items-start gap-6 text-[18px] font-poppins bg-gradient-to-br from-slate-800 from-40% to-teal-900 rounded-[25px] rounded-tl-none'>
                <h1 className='text-[26px] text-accent_green_dark font-medium text-center self-center'>Information</h1>
                
                <p className='text-cstm_white'>You can add your study sets by <span className='text-accent_green_dark'>drag and drop</span> method or by <span className='text-accent_green_dark'>clicking on the huge hand icon</span>.</p>
                <p className='text-cstm_white'>I work with .txt files so I do <span className='text-accent_green_dark'>NOT</span> accept any other extension of files.</p>
                <p className='text-cstm_white'>By clicking on me you can open my <span className='text-accent_green_dark'>detailed documentation</span> about how to <span className='text-accent_green_dark'>set up your .txt files</span> so I can build your study set from it.</p>
                <p className=' text-cstm_white'>For further information you can click on me.</p>
            </div>
        </div>
    </div>
  )
}

export default InformationButton