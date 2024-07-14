/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { isStudySetAccepted, showSuccessfullyAdded } from '../../signals';

const SuccessfullyAdded = ({ type }) => {

    const handleClose = () => {
        showSuccessfullyAdded.value = false;
        isStudySetAccepted.value = { _a: false };
        console.log("Closing message", showSuccessfullyAdded.value, isStudySetAccepted.value);
    };

    return (
        <div className='fixed inset-0 z-[9999] w-screen h-screen bg-black/70 flex justify-center items-center'>
            <div className="absolute w-[60%] h-[60%] top-[15%] left-[20%] flex flex-col justify-center items-center bg-gradient-to-br from-50% from-gray-900 to-green-800 backdrop-blur-sm rounded-[40px] font-poppins overflow-hidden select-none">
                <div className='w-full flex justify-evenly items-center gap-5'>
                    {/* className='w-80' */}
                    <svg className='w-80' width="450" height="363" viewBox="0 0 450 363" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 184.664L163.03 322.694L425 60.7241" stroke="url(#paint0_linear_133_6)" strokeWidth="50" strokeLinecap="round"/>
                        <path d="M244.76 47.5505L276.921 31.7958L292.31 5.78877e-05L307.62 31.7958L339.416 47.5505L307.62 63.5917L292.31 95.101L276.921 63.5917L244.76 47.5505Z" fill="url(#paint1_linear_133_6)"/>
                        <path d="M68.9518 95.9355L119.338 71.2532L143.447 21.44L167.433 71.2532L217.247 95.9355L167.433 121.067L143.447 170.431L119.338 121.067L68.9518 95.9355Z" fill="url(#paint2_linear_133_6)"/>
                        <path d="M277.991 306.719L315.781 288.207L333.863 250.847L351.852 288.207L389.212 306.719L351.852 325.567L333.863 362.591L315.781 325.567L277.991 306.719Z" fill="url(#paint3_linear_133_6)"/>
                        <defs>
                        <linearGradient id="paint0_linear_133_6" x1="412.015" y1="74.2745" x2="46.1599" y2="212.035" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#28FF00"/>
                        <stop offset="1" stopColor="#0A4000"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_133_6" x1="316.085" y1="23.7753" x2="268.535" y2="71.3258" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E58C23"/>
                        <stop offset="1" stopColor="#473107"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_133_6" x1="180.695" y1="58.6877" x2="106.2" y2="133.183" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E58C23"/>
                        <stop offset="1" stopColor="#473107"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_133_6" x1="361.799" y1="278.783" x2="305.927" y2="334.655" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E58C23"/>
                        <stop offset="1" stopColor="#473107"/>
                        </linearGradient>
                        </defs>
                    </svg>

                    {type === 'StudySetAccepted' && (
                        <div className="flex flex-col justify-start self-start">
                            <h1 className="font-poetsen font-bold text-cstm_white text-[80px] mb-10">Success!</h1>
                            <p className="font-bold text-cstm_white text-[28px]">The study set has added successfully.</p>
                        </div>                 
                    )} 
                    
                </div>

                <div 
                    className='w-fit h-fit px-7 py-1 flex justify-center items-center rounded-xl border-2 border-accent_green_dark hover:bg-accent_green_dark self-end mr-40 cursor-pointer duration-500'
                    onClick={handleClose}
                >
                    <p className='font-poppins font-medium text-cstm_white text-[40px]'>OK</p>
                </div>
            </div>
        </div>
    );
  };
  
  export default SuccessfullyAdded;