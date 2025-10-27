/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import KnowItButton from './KnowItButton';
import VanillaTilt from 'vanilla-tilt';

const Flashcard = ({
  currentIndex,
  setCurrentIndex,
  isFlipped,
  setIsFlipped,
  currentQuestion,
  totalQuestions,
  setDisplayedContent,
  displayedContent,
  setTextRotation,
  textRotation,
}) => {
  const cardRef = useRef(null);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setTimeout(() => {
        setDisplayedContent(false);
        setTextRotation(true);
        setTimeout(() => {
          setTextRotation(false);
        }, 250);
      }, 250);
    } else {
      setIsFlipped(false);
      setTextRotation(true);
      setTimeout(() => {
        setDisplayedContent(true);
        setTextRotation(false);
      }, 250);
    }
  };

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      VanillaTilt.init(card, {
        max: 6,
        speed: 3000,
        glare: 0.1,
        perspective: 1000,
        scale: 1.0,
        transition: true,
        reset: true,
      });

      return () => card.vanillaTilt.destroy();
    }
  }, [isFlipped]);

  return (
    <div
      className={`max-w-[300px] md:max-w-[700px] lg:md:max-w-[1000px] w-full h-[100%] max-h-[600px] relative rounded-[50px] perspective-3000 select-none`}
    >
      <div
        ref={cardRef}
        className={`w-full h-full relative duration-500 cursor-pointer rounded-[50px] transform-style-3d
                ${isFlipped ? 'animate-cardFlip' : 'animate-cardFlipBack'}`}
        onClick={handleFlip}
      >
        {displayedContent ? (
          <div className='w-full h-full rounded-[50px] bg-slate-500/40'>
            <div className='flex flex-col h-full rounded-[50px]'>
              <div className='w-full h-28 flex justify-between items-center px-12 rounded-t-[50px]'>
                <KnowItButton />
                <div className='flex items-center gap-4 text-[35px] select-none'>
                  <p>{currentIndex + 1}</p>
                  <span className='w-[3px] h-[40px] bg-accent_green_dark' />
                  <p className='text-green-400'>{totalQuestions}</p>
                </div>
              </div>

              <div className='flex flex-col justify-evenly gap-4 lg:gap-8 w-full h-full p-8 rounded-b-[50px]'>
                <h1 className='text-center self-center w-full h-full flex items-center justify-center text-[min(4vw,_2.5rem)] leading-tight'>
                  {currentQuestion.question}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`w-full h-full rounded-[50px] bg-slate-500/40 ${
              textRotation ? 'rotate-y-180' : ''
            }`}
          >
            <div className='flex flex-col h-full rounded-[50px]'>
              <div className='w-full h-28 flex justify-between items-center px-12 rounded-t-[50px]'>
                <KnowItButton />
                <div className='flex items-center gap-4 text-[35px] select-none'>
                  <p>{currentIndex + 1}</p>
                  <span className='w-[3px] h-[40px] bg-accent_green_dark' />
                  <p className='text-green-400'>{totalQuestions}</p>
                </div>
              </div>

              <div className='flex flex-col justify-evenly gap-4 lg:gap-8 w-full h-full p-8 rounded-b-[50px]'>
                <h1 className='text-center self-center w-full h-full flex items-center justify-center text-[min(4vw,_2.5rem)] leading-tight'>
                  {currentQuestion.answer?.find(ans => ans.right)?.text ||
                    'No correct answer found'}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
