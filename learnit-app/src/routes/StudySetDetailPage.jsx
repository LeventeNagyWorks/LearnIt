/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { studySetsData } from '../signals'
import VanillaTilt from "vanilla-tilt"
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel, A11y} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ArrowButton from '../components/StudySets/StudySetsDetail/ArrowButton';

const StudySetDetailPage = () => {

  const swiperRef = useRef(null);
  const MAXGLARE = 0.20;

  const initializeTilt = (swiper) => {
    const tiltElement = swiper.slides[swiper.activeIndex];
    if (tiltElement) {
      VanillaTilt.init(tiltElement, {
        max: 5,
        speed: 10,
        glare: true,
        'max-glare': MAXGLARE,
        perspective: 1000,
        style: {
          'transform-style': 'preserve-3d',
        },
      });

      const innerElements = tiltElement.querySelectorAll('.inner-element-class');
      innerElements.forEach(element => {
        element.style.transform = 'translateZ(20px)';
      });
    }
  };

  const { itemName } = useParams();
  const studySets = studySetsData.value;
  
  if (!Array.isArray(studySets) || studySets.length === 0) {
    return <div>Loading...</div>;
  }

  const studySet = studySets.find(set => set.name === itemName);

  if (!studySet) {
    return <div>Study set not found</div>;
  }

  const questions = studySet.questions;
  const questionNames = questions.map(question => question.question);

  return (
    <div className='h-screen w-screen flex flex-col items-center bg-cstm_bg_dark text-cstm_white font-poppins overflow-y-auto overflow-hidden scrollbar relative'>

      <svg className='absolute left-40 -top-96 -rotate-[65deg] scale-[70%] z-0' width="1123" height="1128" viewBox="0 0 1123 1128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="163.5" cy="964.5" r="163.5" fill="url(#paint0_linear_150_2)"/>
        <circle cx="585.5" cy="814.5" r="54.5" fill="url(#paint1_linear_150_2)"/>
        <circle cx="203" cy="521" r="98" fill="url(#paint2_linear_150_2)"/>
        <ellipse cx="777" cy="342.535" rx="346" ry="342.535" fill="url(#paint3_linear_150_2)"/>
        <defs>
        <linearGradient id="paint0_linear_150_2" x1="230" y1="1085" x2="44" y2="853" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0D5200"/>
        <stop offset="1" stopColor="#1DB800"/>
        </linearGradient>
        <linearGradient id="paint1_linear_150_2" x1="624" y1="851" x2="552" y2="783" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0D5200"/>
        <stop offset="1" stopColor="#1DB800"/>
        </linearGradient>
        <linearGradient id="paint2_linear_150_2" x1="272" y1="583" x2="118" y2="461" gradientUnits="userSpaceOnUse">
        <stop stopColor="#007728"/>
        <stop offset="1" stopColor="#00DD4B"/>
        </linearGradient>
        <linearGradient id="paint3_linear_150_2" x1="549.508" y1="100.561" x2="1018.73" y2="578.757" gradientUnits="userSpaceOnUse">
        <stop stopColor="#20CC00"/>
        <stop offset="0.453063" stopColor="#189C00"/>
        <stop offset="1" stopColor="#106600"/>
        </linearGradient>
        </defs>
      </svg>

      <div className='w-screen h-screen flex flex-col items-center z-10'>
        <h1 className='text-6xl my-8 font-semibold'>{studySet.name}</h1>

        <Swiper
                ref={swiperRef}
                slidesPerView='auto'
                spaceBetween={100}
                centeredSlides={true}
                keyboard={{
                    enabled: true,
                }}
                effect={'coverflow'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                loop={false}
                grabCursor={true}
                followFinger={true}
                mousewheel={true}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return '<span class="' + className + ' dark:bg-accent_green_dark bg-cstm-teal w-3 h-3 m-1 rounded-full"></span>';
                    },
                }}
                onSwiper={(swiper) => {
                  initializeTilt(swiper);
                }}
                onSlideChange={(swiper) => {
                  // Remove tilt effect from all slides
                  swiper.slides.forEach(slide => {
                    if (slide.vanillaTilt) {
                      slide.vanillaTilt.destroy();
                    }
                  });
                  
                  // Apply tilt effect to the active slide
                  initializeTilt(swiper);
                }}
                modules={[Pagination, Navigation, Keyboard, Mousewheel, EffectCoverflow, A11y]}
                className="w-full md:h-full h-5/6 lg:pt-16 pt-4 pb-20"
            >
                {questionNames.map((questionName, index) => (
                    <SwiperSlide 
                        key={questionName.id} 
                        className='h-full w-[70%] rounded-[30px] lg:rounded-[50px] bg-transparent backdrop-blur-md shadow-lg overflow-hidden z-20 relative'
                    >

                        <div
                            className="flex h-full lg:w-full rounded-[30px] lg:rounded-[50px] bg-slate-500/40"
                        >
                            <div 
                                className="flex justify-center to-transparent w-full h-full rounded-[30px] lg:rounded-[50px] cursor-pointer"
                                onClick={() => true}
                            >
                                <div className="flex flex-col gap-4 lg:gap-8 w-fit h-fit mt-4 lg:mt-12">
                                    <div className="flex flex-row gap-2 lg:gap-6 justify-center">
                                        <h1 className="dark:text-cstm-white text-cstm-black text-[26px] lg:text-[48px] text-center self-center text-shadow dark:shadow-black dark:font-normal font-semibold">{questionName} </h1>
                                    </div>
                                    {/* questin answers here */}
                                    <p className="dark:text-cstm-white text-cstm-black lg:text-[26px] md:text-[20px] text-[16px] mx-8 lg:mx-28 text-shadow-lg dark:shadow-black dark:font-normal font-semibold">{} </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <ArrowButton onClick={() => swiperRef.current.swiper.slidePrev()} className={`absolute left-0 md:top-[47%] top-[38%] z-10 lg:mx-4 md:mx-2`}/>
                <ArrowButton onClick={() => swiperRef.current.swiper.slideNext()} className={`absolute right-0 md:top-[47%] top-[38%] z-10 lg:mx-4 md:mx-2 transition rotate-180`}/>
            </Swiper>
      </div>
      
      <div className='w-[50%] flex flex-col items-center gap-8 mb-16 z-10'>
        {questionNames.map((questionName, index) => (
          <div 
            className='w-full flex flex-col justify-center items-start gap-3 bg-slate-800 rounded-2xl py-3 px-5'
            key={index}
          >
            <h2 className='text-2xl mb-3 text-center'>{questionName}</h2>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudySetDetailPage;
