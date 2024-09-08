/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import PrimaryButton from '../PrimaryButton';
import BackButton from '../BackButton';
import Email from './Email';
import Password from './Password';
import girlReadingImage from '../../images/girl_reading.png';
import Username from './Username';
import CheckBox from '../CheckBox';

const Login = () => {

  return (
    <div className='w-full h-screen flex bg-gradient-to-br from-cstm_bg_dark from-50% to-slate-900 font-poppins text-cstm_white selection:bg-accent_green_dark'>
      <div className='w-[38%] h-full flex items-center justify-center'>
        <div className='w-[95%] h-[95%] rounded-3xl bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${girlReadingImage})`}}></div>
      </div>
      <div className='w-[62%] h-full flex flex-col items-center justify-center'>
        <h1 className="absolute top-8 right-12 text-cstm_white lg:text-[60px] md:text-[50px] select-none font-poetsen">
          Learn <span className="text-accent_green_dark">It</span>
        </h1>
        <div className='w-[50%] h-[40%] flex flex-col justify-evenly items-center '>

            <Username />

            <Password />

            <div className='w-full flex justify-center items-center text-xl gap-4'>
                <CheckBox />
                <p className='select-none'>Remember me</p>
            </div>

            <div className='w-full flex items-center justify-evenly'>
                <BackButton to={'/'}/>
                <PrimaryButton text={'Login'}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login