/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { isLoadingEnabled } from '../signals';
import { useSignal } from '@preact/signals-react';
import { useRive } from 'rive-react';

function LoadingScreen() {
  useSignal();

  useEffect(() => {
    setTimeout(() => {
      isLoadingEnabled.value = false;
    }, 3500);
  }, []);

  const { RiveComponent } = useRive({
    src: "light_bulb.riv",
    animations: "timeline",
    autoplay: true,
    onLoadError: () => console.log("ERROR LOADING RIVE"),
    onLoad: () => console.log("LOADED RIVE"),
  });

  return (
    <div className={`absolute w-full h-screen bg-cstm_bg_dark flex justify-center items-center font-poppins font-medium text-cstm_white text-5xl select-none duration-500`}>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className="text-cstm_white text-[150px] mb-14 select-none font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>
        {/* <RiveComponent /> */}
      </div>
    </div>
  )
}

export default LoadingScreen;


