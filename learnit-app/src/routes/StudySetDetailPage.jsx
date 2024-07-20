/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { startTransitionFromStudySetDetail, startTransitionToStudySetDetail, studySetsData } from '../signals'
import VanillaTilt from "vanilla-tilt"
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel, A11y} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import ArrowButton from '../components/StudySets/StudySetsDetail/ArrowButton';
import BackButton from '../components/BackButton';
import { useSignals } from '@preact/signals-react/runtime';
import CustomizeButton from '../components/StudySets/CustomizeButton';

const StudySetDetailPage = () => {

  useSignals()

  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    startTransitionFromStudySetDetail.value = false;
    startTransitionToStudySetDetail.value = true;
    setTimeout(() => {
      startTransitionToStudySetDetail.value = false;
    }, 1000);
  }, [])

  const navigate = useNavigate();

  const handleClick = (e) => {
    startTransitionFromStudySetDetail.value = true;
    e.preventDefault();
    setTimeout(() => {
      navigate(`/study-sets/`);
    }, 2000);
  }
  

  const swiperRef = useRef(null);
  const MAXGLARE = 0.10;

  // const initializeTilt = (swiper) => {
  //   const tiltElement = swiper.slides[swiper.activeIndex];
  //   if (tiltElement) {
  //     VanillaTilt.init(tiltElement, {
  //       max: 5,
  //       speed: 10,
  //       glare: true,
  //       'max-glare': MAXGLARE,
  //       perspective: 1000,
  //       style: {
  //         'transform-style': 'preserve-3d',
  //       },
  //     });

  //     const innerElements = tiltElement.querySelectorAll('.inner-element-class');
  //     innerElements.forEach(element => {
  //       element.style.transform = 'translateZ(20px)';
  //     });
  //   }
  // };

  useEffect(() => {
    const tiltElement = document.querySelector('.swiper-slide-active');
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
  }, []);

  const { itemName } = useParams();
  const studySets = studySetsData.value;
  
  const studySet = studySets.find(set => set.name === itemName);

  if (!studySet) {
    return <div>Study set not found</div>;
  }
  
  const questionsWithAnswers = studySet.questions.map((question, index) => ({
    index: index + 1,
    question: question.question,
    answers: question.answer,
    rightAnswer: question.right_answer[0]
  }));

  return (
    <div className='h-screen w-screen flex flex-col items-center bg-cstm_bg_dark text-cstm_white font-poppins overflow-y-auto overflow-hidden scrollbar relative selection:bg-accent_green_dark'>

      <svg className='absolute -translate-x-[334px] -translate-y-[500px] -rotate-[65deg] scale-[70%] z-0 duration-[2000ms]' width="1123" height="1128" viewBox="0 0 1123 1128" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      <section className={`w-screen h-screen min-h-screen flex flex-col items-center z-10 pb-8 duration-1000
        ${startTransitionFromStudySetDetail.value ? '-translate-y-full' : ''}
        ${startTransitionToStudySetDetail.value ? '-translate-y-full' : ''}
      `}>
        <div className='w-full flex justify-center items-center py-8 px-5'>
          <BackButton onClick={handleClick} className={'absolute left-6'}/>
          <h1 className='text-6xl font-semibold'>{studySet.name}</h1>
        </div>

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
                      //TODO: the index is not shown
                        return `<span class="${className} bg-accent_green_dark w-6 h-6 m-1 rounded-full font-poppins text-center select-none text-cstm_bg_dark font-semibold">${index + 1}</span>`;
                    },
                }}
                onInit={(swiper) => {
                  const activeSlide = swiper.slides[swiper.activeIndex];
                  if (activeSlide) {
                    VanillaTilt.init(activeSlide, {
                      max: 5,
                      speed: 10,
                      glare: true,
                      'max-glare': MAXGLARE,
                      perspective: 1000,
                    });
                  }
                }}
                onSlideChange={(swiper) => {
                    // Remove tilt effect from all slides
                    const previousActiveSlide = swiper.slides[swiper.previousIndex];
                    if (previousActiveSlide) {
                        const tiltInstance = previousActiveSlide.vanillaTilt;
                        if (tiltInstance) {
                            tiltInstance.destroy();
                            // Force Swiper to update
                            swiper.update();
                        }
                    }
                
                    // Apply tilt effect to the active slide
                    const activeSlideEl = swiper.slides[swiper.activeIndex];
                    VanillaTilt.init(activeSlideEl, {
                        max: 5,
                        speed: 10,
                        glare: true,
                        'max-glare': MAXGLARE,
                        perspective: 1000,
                    });
                }}
                modules={[Pagination, Navigation, Keyboard, Mousewheel, EffectCoverflow, A11y]}
                className="w-full md:h-full h-5/6 lg:pt-16 pt-4 pb-20"
            >
              {questionsWithAnswers.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className='h-full w-[65%] rounded-[30px] lg:rounded-[50px] bg-transparent backdrop-blur-md shadow-lg overflow-hidden z-20 relative'
                >
                  <div className="flex h-full lg:w-full rounded-[30px] lg:rounded-[50px] bg-slate-500/40">
                    <div className="flex flex-col justify-center items-start to-transparent w-full h-full rounded-[30px] lg:rounded-[50px] cursor-pointer">
                      
                      <div className='w-full h-28 flex justify-end items-center px-12'>
                        <div className='flex items-center gap-4 text-[35px]'>
                          <p className=''> {item.index} </p>
                          <span className='w-[3px] h-[40px] bg-accent_green_dark'/>
                          <p className='text-green-400'> {studySet.questions.length} </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-evenly gap-4 lg:gap-8 w-full h-full p-8">

                        <h1 className="dark:text-cstm-white text-cstm-black text-[26px] lg:text-[48px] text-center self-center text-shadow dark:shadow-black dark:font-normal font-semibold">
                          {item.question}
                        </h1>
                        <div className="flex flex-col gap-4">
                          {item.answers.map((answer, answerIndex) => (
                            <div 
                              key={answerIndex} 
                              className={`p-4 rounded-lg bg-slate-700`}
                            >
                              <p className="dark:text-cstm-white text-cstm-black lg:text-[26px] md:text-[16px] text-[14px] text-shadow-lg dark:shadow-black dark:font-normal font-semibold">
                                {answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <ArrowButton onClick={() => swiperRef.current.swiper.slidePrev()} className={`absolute left-10 md:top-[47%] top-[38%] z-10 lg:mx-4 md:mx-2`}/>
              <ArrowButton onClick={() => swiperRef.current.swiper.slideNext()} className={`absolute right-10 md:top-[47%] top-[38%] z-10 lg:mx-4 md:mx-2 transition rotate-180`}/>
            </Swiper>
      </section>
      
      <section className='w-[50%] min-h-screen flex flex-col items-center gap-8 z-10 py-16'>
      {questionsWithAnswers.map((item, index) => (
          <div 
            className='w-full flex flex-col justify-center items-start gap-3 bg-slate-800 rounded-2xl py-3 px-5'
            key={index}
          >
            <div className='w-full flex justify-between items-center'>
              <h2 className='text-2xl'>{item.index}. {item.question}</h2>
              <CustomizeButton 
                index={index}
                isHovered={hoveredItem === index}
                setHoveredItem={setHoveredItem}
              />
            </div>
            
          </div>
        ))}
      </section>

    </div>
  );
};

export default StudySetDetailPage;
