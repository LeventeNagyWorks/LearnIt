/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'

const Error = ({ type, onClick }) => {

    return (
        <div className='absolute w-screen h-screen z-50 bg-black/70'>
            <div className="absolute w-[60%] h-[60%] top-[15%] left-[20%] flex flex-col justify-center items-center bg-gradient-to-br from-50% from-gray-900 to-red-950 backdrop-blur-sm rounded-[40px] font-poppins overflow-hidden select-none">
                <div className='w-full flex justify-evenly items-center gap-5'>
                    <svg className='' width="320" height="320" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_118_4)">
                        <path d="M184.412 27C191.34 15 208.66 15 215.588 27L357.617 273C364.545 285 355.885 300 342.028 300H57.9718C44.1154 300 35.4552 285 42.3834 273L184.412 27Z" fill="url(#paint0_linear_118_4)"/>
                        </g>
                        <path d="M205.559 199C204.892 205.5 203.392 208.75 201.059 208.75C198.725 208.75 197.309 206 196.809 200.5C196.475 197.667 195.975 193.833 195.309 189C194.809 184 194.142 177.917 193.309 170.75C191.642 156.417 190.392 145 189.559 136.5C188.892 128 188.559 121.25 188.559 116.25C188.559 111.25 189.642 106.917 191.809 103.25C194.142 99.5833 197.392 97.75 201.559 97.75C205.725 97.75 208.892 99.5833 211.059 103.25C213.392 106.917 214.559 111.25 214.559 116.25C214.559 119.583 214.392 123.583 214.059 128.25C213.725 132.917 213.309 137.583 212.809 142.25C212.475 146.75 212.059 150.667 211.559 154C210.892 159.167 209.892 167.167 208.559 178L205.559 199ZM216.559 248.5C216.559 252.667 215.059 256.25 212.059 259.25C209.225 262.083 205.725 263.5 201.559 263.5C197.392 263.5 193.809 262.083 190.809 259.25C187.975 256.25 186.559 252.667 186.559 248.5C186.559 244.333 188.059 240.75 191.059 237.75C193.892 234.917 197.392 233.5 201.559 233.5C205.725 233.5 209.225 235 212.059 238C215.059 240.833 216.559 244.333 216.559 248.5Z" fill="white"/>
                        <defs>
                        <filter id="filter0_d_118_4" x="31.945" y="18" width="336.11" height="310" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="20"/>
                        <feGaussianBlur stdDeviation="4"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_118_4"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_118_4" result="shape"/>
                        </filter>
                        <linearGradient id="paint0_linear_118_4" x1="118.5" y1="141.5" x2="293.5" y2="301" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#720000"/>
                        <stop offset="1" stopColor="#FF0000"/>
                        </linearGradient>
                        </defs>
                    </svg>

                    {type === 'StudySetAlreadyExists' && (
                        <div className="flex flex-col justify-start self-start">
                            <h1 className="font-poetsen font-bold text-cstm_white text-[80px] mb-10">Ooops!</h1>
                            <p className="font-bold text-cstm_white text-[28px]">A study set already exists with the same name.</p>
                            <p className="font-bold text-cstm_white text-[28px]">Please rename your file before you drop it in.</p>
                        </div>                      
                    )} 
                    
                </div>

                <div 
                    className='w-fit h-fit px-7 py-1 flex justify-center items-center rounded-xl border-2 border-red-700 hover:bg-red-700 self-end mr-40 cursor-pointer duration-500'
                    onClick={() => onClick()}
                >
                    <p className='font-poppins font-medium text-cstm_white text-[40px]'>OK</p>
                </div>
            </div>
        </div>
    );
  };
  
  export default Error;