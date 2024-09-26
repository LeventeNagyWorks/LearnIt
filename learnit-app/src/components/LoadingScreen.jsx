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
      isLoadingEnabled.value = true;
    }, 2000);
  }, []);

  return (
    <div className={`absolute w-full h-screen bg-cstm_bg_dark flex justify-center items-center font-poppins font-medium text-cstm_white text-5xl select-none duration-500`}>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className="text-cstm_white text-[150px] mb-14 select-none font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>
        <div className='w-[200px] h-[200px] relative'>
          <div className='w-full h-full rounded-full border-4 border-accent_green_dark'></div>
          <div className='absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2'>
            <div className='w-full h-full bg-accent_green_dark rounded-full animate-spin'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen;


