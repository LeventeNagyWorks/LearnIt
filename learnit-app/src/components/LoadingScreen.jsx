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
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1a4d01"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#20CC00"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="50 231.7433388230814"
              className="origin-center animate-loadingSpin rotate-[60deg]"
            />
          </svg>
          <span className='absolute top-1/2 left-1/2 w-[50%] h-[50%] bg-gradient-to-br from-green-500 to-green-900 rounded-full transform -translate-x-1/2 -translate-y-1/2'></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen;


