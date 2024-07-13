/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
//import { ThemeContext } from '../../contexts/ThemeContext';

// eslint-disable-next-line react/prop-types
const ArrowButton = ({ className, onClick }) => {

    const [isHovered, setIsHovered] = useState(false);
    //const { darkMode } = useContext(ThemeContext);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    const shadowStyle = { boxShadow: '0 0 28px 3px #20CC00' };

    return (
        <button
            onClick={onClick}
            className="bg-transparent w-fit h-fit"
        >
            <div 
                id='icon-bg' 
                className={`${className} lg:w-14 md:w-11 w-10 lg:h-14 md:h-11 h-10 bg-transparent flex items-center justify-center hover:animate-pulse`} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    className={`lg:w-[5px] md:w-[4px] w-[3px] lg:h-10 md:h-8 h-6 absolute transform lg:-translate-y-[0.8rem] md:-translate-y-[0.6rem] -translate-y-[0.5rem] rotate-45 dark:bg-cstm-yellow bg-green-500 z-10 rounded-full`}
                    style={shadowStyle}
                />
                <div 
                    className='lg:w-[5px] md:w-[4px] w-[3px] lg:h-10 md:h-8 h-6 absolute transform lg:translate-y-[0.8rem] md:translate-y-[0.6rem] translate-y-[0.5rem] rotate-[135deg] dark:bg-cstm-yellow bg-green-500 z-10 rounded-full'
                    style={shadowStyle}
                />
            </div>
        </button>
    )
}

export default ArrowButton;

