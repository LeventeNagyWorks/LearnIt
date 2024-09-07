/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import PrimaryButton from '../PrimaryButton';
import BackButton from '../BackButton';
import Email from './Email';

const Login = () => {

    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);

  return (
    <div className='w-full h-screen flex bg-gradient-to-br from-cstm_bg_dark from-50% to-slate-900 font-poppins selection:bg-accent_green_dark'>
      <div className='w-[38%] h-full flex items-center justify-center'>
        <div className='w-[95%] h-[95%] bg-green-900 rounded-3xl'></div>
      </div>
      <div className='w-[62%] h-full flex flex-col items-center justify-center'>
        <h1 className="absolute top-8 right-12 text-cstm_white lg:text-[60px] md:text-[50px] select-none font-poetsen">
          Learn <span className="text-accent_green_dark">It</span>
        </h1>
        <div className='w-[50%] h-[40%] flex flex-col justify-evenly items-center '>
            <div className='w-full h-12 bg-slate-700 rounded-xl flex justify-start items-center px-3 relative'>
                <h2 className={`absolute font-semibold lg:text-xl duration-500 select-none
                    ${isUsernameFocused ? ' text-accent_green_dark' : ' text-cstm_white'}
                    ${isUsernameFocused || !isUsernameEmpty ? 'left-2 -top-8 ' : 'left-12 top-[10px]'}
                `}>
                    Username
                </h2>
                <FaUser className={`w-5 h-5 duration-500 ${isUsernameFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
                <input 
                    type="text"
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                    onChange={(e) => setIsUsernameEmpty(e.target.value.length === 0)}
                    className={`w-full h-12 outline-none bg-transparent lg:text-xl rounded-xl px-3 caret-accent_green_dark ${isUsernameFocused ? 'text-accent_green_dark selection:text-cstm_bg_dark' : 'text-cstm_white'}`}
                />
            </div>

            <Email />

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