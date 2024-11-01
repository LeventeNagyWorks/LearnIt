/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { isLoggedIn } from '../signals';
import { useSignals } from '@preact/signals-react/runtime';
import HeroSectionElements from '../components/HeroSectionElements';
import GirlReading from '../images/hero_girl_reading.png';
import Laptop from '../images/hero_laptop.png';
import Book from '../images/hero_book.png';
import BoyLearning from '../images/hero_boy_learning.png';
import Background from '../images/background.png';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

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

    const [text] = useTypewriter({
        words: [' more enjoyable.', ' more easier.', ' time efficient.'],
        loop: true,
        typeSpeed: 100,
        deleteSpeed: 100,
        delaySpeed: 2000,
    });

  return (
    <>
            <div 
                className="h-screen w-screen font-poppins flex justify-start items-center overflow-hidden flex-grow"
                style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >

                <div className='w-1/2 h-full flex flex-col justify-evenly items-center px-8'>
                    <h1 className="text-cstm_white text-[96px] select-none font-poetsen">Learn <span className="text-accent_green_dark">It</span></h1>

                    <p className='font-poppins font-medium text-center text-4xl mx-24 select-none text-cstm_white'>
                        Turn your handouts into study sets and make learning
                        <span className='text-accent_green_dark'>{text}</span>
                        <Cursor 
                            cursorStyle='|' 
                            cursorColor='#20CC00'
                            cursorBlinking={true}
                        />
                    </p>

                    <button
                        onClick={handleButtonClick}
                        className="w-fit h-fit text-accent_green_dark hover:text-slate-950 font-medium hover:bg-accent_green_dark text-3xl border-2 border-accent_green_dark rounded-xl px-12 py-2 duration-700 select-none hover:shadow-[0_0_36px_rgba(40,255,0,0.7)]"
                    >
                        {isLoggedIn.value ? `Go to Study Sets` : 'Getting Started'}
                    </button>
                </div>

                <div className='w-1/2 h-full grid grid-rows-8 grid-cols-2 gap-8 px-[5%] py-[10%]'>
                    <HeroSectionElements isLarge={false} bgImg={Book} text={"Create Study Sets"} />
                    <HeroSectionElements isLarge={true} bgImg={BoyLearning} text={"Learning Is For Every Age"} />
                    <HeroSectionElements isLarge={true} bgImg={GirlReading} text={"Unlock Achievements"} />
                    <HeroSectionElements isLarge={false} bgImg={Laptop} text={"Use It For Free"} />
                </div>

            </div>
    </>
  )
}

export default HeroSection;