/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { HiInformationCircle } from "react-icons/hi";

const RegInformationButton = ({ type }) => {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className='font-poppins text-md relative'>
        <HiInformationCircle 
          className='w-6 h-6 text-slate-500 hover:text-accent_green_dark hover:cursor-pointer select-none z-30 relative'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        
        {(type === "username" && isHovered) &&
          <div className={`absolute top-2 -left-[278px] w-[250px] h-fit flex flex-col justify-center items-center gap-2 bg-teal-950 rounded-lg rounded-tr-none py-3 z-20`}>

            <svg className='absolute -right-[27px] -top-[3px] -rotate-90 w-6' width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M155 188L-1.1767e-06 -1.88771e-06L155 5.27406e-06L155 188Z" fill="#042f2e"/>
            </svg>

            <h3 className='text-accent_green_dark font-semibold select-none'>Username</h3>
            <span className='w-[150px] h-[2px] bg-green-700 rounded-sm'/>
            {/* <p className='select-none'>The <span className='text-accent_green_dark'>username</span> must be:</p> */}
            <p className='select-none'>- At least <span className='text-accent_green_dark'>4</span> characters</p>
          </div>
        }

        {(type === "email" && isHovered) &&
          <div className={`absolute top-2 -left-[278px] w-[250px] h-fit flex flex-col justify-center items-center gap-2 bg-teal-950 rounded-lg rounded-tr-none py-3 z-20`}>

            <svg className='absolute -right-[27px] -top-[3px] -rotate-90 w-6' width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M155 188L-1.1767e-06 -1.88771e-06L155 5.27406e-06L155 188Z" fill="#042f2e"/>
            </svg>

            <h3 className='text-accent_green_dark font-semibold select-none'>Email</h3>
            <span className='w-[150px] h-[2px] bg-green-700 rounded-sm'/>
            {/* <p className='select-none'>The <span className='text-accent_green_dark'>username</span> must be:</p> */}
            <p className='select-none'>- Must be <span className='text-accent_green_dark'>valid</span></p>
          </div>
        }

        {(type === "password" && isHovered) &&
          <div className={`absolute top-2 -left-[278px] w-[250px] h-fit flex flex-col justify-center items-center gap-2 bg-teal-950 rounded-lg rounded-tr-none py-3 z-20`}>

            <svg className='absolute -right-[27px] -top-[3px] -rotate-90 w-6' width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M155 188L-1.1767e-06 -1.88771e-06L155 5.27406e-06L155 188Z" fill="#042f2e"/>
            </svg>

            <h3 className='text-accent_green_dark font-semibold select-none'>Password</h3>
            <span className='w-[150px] h-[2px] bg-green-700 rounded-sm'/>
            {/* <p className='select-none'>The <span className='text-accent_green_dark'>username</span> must be:</p> */}
            <p className='select-none'>- At least <span className='text-accent_green_dark'>8</span> characters</p>
            <p className='select-none'>- At least <span className='text-accent_green_dark'>2</span> numbers</p>
          </div>
        }
    </div>
  )
}

export default RegInformationButton