/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from "react-router-dom"

import darkHatImage from './../images/dark_hat_fixed.png';

const HeroSection = () => {
  return (
    <>
        <div 
            className="h-screen w-screen font-poppins flex justify-end items-center bg-cover overflow-hidden"
            style={{ backgroundImage: `url(${darkHatImage})` }}
        >

            <div className="w-[60%] h-[90%] flex flex-col justify-start items-center px-8 py-36 gap-40">

                <div className="flex flex-col justify-between gap-5">
                    <h1 className="text-black text-[150px] mb-14 select-none self-end font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>
                    <p className="text-white text-7xl select-none font-poppins">Learn everything you want.</p>
                    <p className="text-white text-5xl select-none self-end">Let me help you.</p>
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