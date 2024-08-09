/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from "react-router-dom"

import darkHatImage from './../images/dark_hat_fixed.png';
import { useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { isLoading } from '../signals';
import { useSignals } from '@preact/signals-react/runtime';
import HeroSectionVisuals from '../components/HeroSectionVisuals';

const HeroSection = () => {

    useSignals();

  return (
    <>

            <div 
                className="h-screen w-screen font-poppins flex justify-end items-end bg-cstm_bg_dark overflow-hidden"
            >

                <div className='w-full self-start px-12'>
                    <h1 className="text-cstm_white lg:text-[100px] md:text-[110px] mb-14 select-none self-end font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>
                </div>

                <HeroSectionVisuals />

                <div className="w-[45%] h-full flex flex-col justify-evenly items-center px-8 py-36">

                    <div className="flex flex-col justify-between items-end">
                        <p className="text-white lg:text-[53px] text-right select-none font-poppins self-end">LEARN EVERYTHING</p>
                        <p className="text-white lg:text-[92px] text-right select-none font-poppins self-end">YOU WANT</p>
                        <p className="text-white lg:text-[61px] select-none self-end">LET ME HELP YOU</p>
                    </div>
                
                    <Link
                        to="/study-sets"
                        className="w-fit text-accent_green_dark hover:text-slate-950 font-medium hover:bg-accent_green_dark text-3xl border-2 border-accent_green_dark rounded-xl px-12 py-2 duration-700 select-none self-end mr-24"
                    >
                        Getting Started
                    </Link>

                </div>
            
            </div>
    </>
  )
}

export default HeroSection;