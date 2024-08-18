/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { isLoadingEnabled } from '../signals';
import { useSignal } from '@preact/signals-react';

function LoadingScreen() {

  useSignal();

  useEffect(() => {
    setTimeout(() => {
      isLoadingEnabled.value = false;
    }, 2000);
  }, []);

  return (
    <div className={`absolute w-full h-screen bg-cstm_bg_dark flex justify-center items-center font-poppins font-medium text-cstm_white text-5xl select-none duration-500`}>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className="text-cstm_white text-[150px] mb-14 select-none font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>
        <div className='w-[50%] h-16 flex items-center overflow-x-hidden overflow-y-visible relative'>
          <span className='absolute z-30 w-[102%] h-4 bg-gradient-to-l from-accent_green_dark to-green-600 rounded-r-full shadow-lg shadow-accent_green_dark animate-loading'/>
          <span className='absolute z-20 w-[100%] h-4 bg-slate-600'/>
        </div>
      </div>
    </div>
  )
}
  
export default LoadingScreen;

