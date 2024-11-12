/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import KnowItButton from "./KnowItButton";
import VanillaTilt from 'vanilla-tilt';

const Flashcard = ({
    currentIndex,
    setCurrentIndex,
    isFlipped,
    setIsFlipped,
    currentQuestion,
    totalQuestions
}) => {

    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;

        if (card) {
            VanillaTilt.init(card, {
                max: 6,
                speed: 2000,
                glare: 0.1,
                perspective: 1000,
                scale: 1.0,
                transition: true,
                reset: true
            });

            return () => card.vanillaTilt.destroy();
        }
    }, [isFlipped]);


    return (
        <div className={`w-[65%] h-[100%] relative rounded-[50px] perspective-3000`}>
            <div
                ref={cardRef}
                className={`w-full h-full relative duration-500 cursor-pointer rounded-[50px] transform-style-3d
                ${isFlipped ? 'animate-cardFlip' : 'animate-cardFlipBack'}`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className="card-front absolute w-full h-full rounded-[50px] bg-slate-500/40 backface-hidden">
                    <div className="flex flex-col h-full rounded-[50px]">
                        <div className='w-full h-28 flex justify-between items-center px-12 rounded-t-[50px]'>
                            <KnowItButton />
                            <div className='flex items-center gap-4 text-[35px] select-none'>
                                <p>{currentIndex + 1}</p>
                                <span className='w-[3px] h-[40px] bg-accent_green_dark' />
                                <p className='text-green-400'>{totalQuestions}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-evenly gap-4 lg:gap-8 w-full h-full p-8 rounded-b-[50px]">
                            <h1 className="text-[26px] lg:text-[48px] text-center self-center">
                                {currentQuestion.question}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="card-back absolute w-full h-full rounded-[50px] bg-slate-500/40 backface-hidden rotate-y-180">
                    {/* Back content */}
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
