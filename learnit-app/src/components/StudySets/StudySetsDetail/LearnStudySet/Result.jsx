/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import PrimaryButton from '../../../PrimaryButton'
import BackButton from '../../../BackButton'

const Result = ({ score, itemName, }) => {

    const refreshPage = () => {
        window.location.reload();
    };
    
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-8 text-3xl px-[15%] py-[5%] font-poppins text-cstm_white bg-cstm_bg_dark selection:bg-accent_green_dark selection:text-cstm_bg_dark select-none'>

        <div className='h-40 flex justify-center items-center pb-28'>
            <h1 className='text-[100px] text-center text-accent_green_dark'>Congratulations!</h1>
        </div>

        <div className='w-full h-fit flex flex-col justify-center items-center gap-10 bg-slate-500/40 rounded-[30px] py-5'>
            <p className='text-[50px] text-center'>Score earned in this session: </p>
            <p className='text-accent_green_dark text-[70px]'>{score}</p>
        </div>

        <div className='w-full h-fit flex flex-col justify-center items-center gap-10 bg-slate-500/40 rounded-[30px] py-5'>
            <p className='text-[50px] text-center'>Number of learned question in this session: </p>
            <p className='text-accent_green_dark text-[70px]'></p>
        </div>

        <div className='w-full h-36 flex justify-evenly items-center'>
            <BackButton to={`/study-sets/${itemName}`}/>
            <PrimaryButton onClick={refreshPage} text='Next Round'/>
        </div>

    </div>
  )
}

export default Result