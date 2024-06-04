/* eslint-disable no-unused-vars */
import React from 'react'
import BackButton from '../components/BackButton'

const StudySetsPage = () => {
  return (
    <div className='w-screen h-screen font-poppins bg-bg_white flex overflow-hidden relative'>

      <div className='w-[38%] flex relative'>

        <div className='w-[80%] h-[95%] flex flex-col justify-center items-center gap-20 relative'>

          <p className='w-[56px] h-[56px] bg-bg_white_darker rounded-full absolute left-6 top-6 text-center text-[40px] text-bg_white font-poetsen cursor-pointer'>
            i
          </p>

          <h1 className='text-5xl font-medium text-center text-bg_dark select-none'>Add Study Sets</h1>
          
          <div className='w-[80%] h-[50%] bg-bg_white_darker rounded-[28px] flex justify-center items-center'>
            <p className='text-[45px] text-bg_white font-bold select-none'>Drag Here</p>
          </div>
        
        </div>

        <div className='absolute left-8 bottom-10'>
            <BackButton
              to={"/"}
            />
          </div>
        
        <svg className='absolute -right-2 z-0' width="164" height="1080" viewBox="0 0 164 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_26_7)">
        <path d="M51.9332 1086.15L57.2162 1072.09C62.2999 1058.11 73.1647 1029.92 67.5755 1001.86C61.9871 974.032 40.9399 945.805 48.6637 917.699C56.688 889.971 93.4824 862.136 109.483 833.998C125.184 805.711 120.094 777.804 103.884 749.786C87.9739 721.768 60.9442 693.791 66.3245 665.693C71.7053 637.747 108.498 609.381 121.856 581.253C135.215 553.505 124.143 525.848 108.232 497.83C92.0217 469.585 70.9762 441.813 68.0297 413.747C65.2822 385.603 81.1337 357.543 86.3644 329.445C91.3962 301.501 86.305 273.29 75.3806 245.253C64.6568 217.519 48.5955 189.198 40.516 161.909C32.4326 133.558 32.3292 105.784 34.8674 77.697C37.6045 49.4574 42.4867 21.5133 45.2751 7.08471L47.867 -6.58433L159.557 -6.99995L159.609 7.03868C159.661 21.0014 159.765 49.1546 159.87 77.2319C159.974 105.081 160.079 133.386 160.183 161.464C160.286 189.162 160.39 216.859 160.494 244.937C160.599 273.166 160.703 301.091 160.807 329.168C160.912 357.246 161.016 385.323 161.121 413.4C161.225 441.326 161.33 469.555 161.434 497.632C161.537 525.33 161.64 553.028 161.745 581.105C161.85 609.41 161.954 637.26 162.058 665.337C162.163 693.49 162.267 721.491 162.372 749.569C162.476 777.494 162.581 805.723 162.685 833.8C162.789 861.574 162.894 889.955 162.996 917.273C163.102 945.654 163.205 973.428 163.309 1001.51C163.414 1029.73 163.518 1057.66 163.572 1072.08L163.623 1085.74L51.9332 1086.15Z" fill="#1D2D50"/>
        </g>
          <defs>
            <clipPath id="clip0_26_7">
            <rect width="1092.74" height="159.558" fill="white" transform="translate(4.06628 1086.33) rotate(-90.2132)"/>
            </clipPath>
          </defs>
        </svg>

      </div>

      <div className='w-[62%] bg-bg_dark flex flex-col justify-evenly items-center relative'>
        <h1 className='w-fit text-5xl font-medium text-bg_white select-none'>Your Study Sets</h1>

        <div className='w-[92%] h-[75%] bg-bg_darker rounded-[35px] flex p-2'>
          
        </div>

      </div>

    </div>
  )
}

export default StudySetsPage