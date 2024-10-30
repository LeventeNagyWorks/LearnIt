/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { isLoggedIn } from '../signals';
import { useSignals } from '@preact/signals-react/runtime';
import HeroSectionVisuals from '../components/HeroSectionVisuals';
import GirlReading from '../images/hero_girl_reading.png';

const HeroSection = () => {

    const navigate = useNavigate();

    useSignals();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        isLoggedIn.value = !!token;
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn.value) {
            navigate('/study-sets');
        } else {
            navigate('/login');
        }
    };

  return (
    <>
            <div 
                className="h-screen w-screen font-poppins flex justify-start items-center bg-cstm_bg_dark overflow-hidden flex-grow"
            >

                <div className='w-1/2 h-full flex flex-col justify-evenly items-center px-8'>
                    <h1 className="text-cstm_white text-[96px] select-none font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>
                    <p className='font-poppins font-medium text-center text-4xl text-cstm_white mx-24'>Turn your handouts into study sets and make learning more enjoyable.</p>
                    <button
                        onClick={handleButtonClick}
                        className="w-fit h-fit text-accent_green_dark hover:text-slate-950 font-medium hover:bg-accent_green_dark text-3xl border-2 border-accent_green_dark rounded-xl px-12 py-2 duration-700 select-none"
                    >
                        {isLoggedIn.value ? 'Go to Study Sets' : 'Getting Started'}
                    </button>
                </div>

                <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                    <div className='flex justify-center items-center px-[12%]'>
                        <img
                            className='w-full h-full object-cover rounded-[40px]'
                            src={GirlReading} 
                            alt="" 
                        />
                    </div>
                </div>


            
            </div>
    </>
  )
}

export default HeroSection;