/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import DefaultProfilePicture from '../../images/default_profile_pic.png';
import { isProfileFocused } from '../../signals';

const NavigationBar = () => {

  const [username, setUsername] = useState('');

  const onClickProfile = () => {
    isProfileFocused.value = !isProfileFocused.value;
    console.log('Updated isProfileFocused:', isProfileFocused.value);
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className='w-[92%] h-[12%] min-h-[12%] flex flex-col justify-center font-poppins font-semibold text-cstm_white z-20'>
      <div className='w-full h-[65%] min-h-[65%] flex justify-between items-center bg-zinc-400/40 backdrop-blur-md rounded-[34px] px-8'>
          <p className='lg:text-[38px] select-none'>Welcome back, <span className='text-accent_green_dark2'>{username ? ` ${username}` : ''}</span>!</p>
          <div className='flex justify-center items-center relative'>

            <div className={`absolute -bottom-[415%] w-[250px] flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-green-600 to-green-900 rounded-2xl z-40 duration-500 px-5 py-5 ${isProfileFocused.value ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

              <svg className='absolute -top-[16px] right-[62px]' width="30" height="20" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 0L150 100H0L75 0Z" fill="#168640"/>
              </svg>

              <div className='w-full flex justify-center items-center hover:bg-green-600 border-2 border-cstm_white px-4 py-1 rounded-lg cursor-pointer duration-500'>
                <p className=''>My Profile</p>
              </div>
              <div className='w-full flex justify-center items-center hover:bg-green-600 border-2 border-cstm_white px-4 py-1 rounded-lg cursor-pointer duration-500'>
                <p className=''>Friends</p>
              </div>
              <div className='w-full flex justify-center items-center hover:bg-green-600 border-2 border-cstm_white px-4 py-1 rounded-lg cursor-pointer duration-500'>
                <p className=''>Logout</p>
              </div>
              
            </div>

            <div className='flex justify-center items-center px-2 overflow-hidden'>
              <p className={`lg:text-2xl duration-500 select-none ${isProfileFocused.value ? 'translate-x-0' : 'translate-x-[110%]'}`}>{username}</p>
            </div>
            <div 
              className={`w-12 h-12 rounded-full cursor-pointer border-2 duration-500 overflow-hidden hover:border-cstm_white ${isProfileFocused.value ? 'border-cstm_white' : 'border-transparent'}`}
              onClick={(e) => {
                e.stopPropagation();
                onClickProfile();
              }}
            >
              <img src={DefaultProfilePicture} alt="Profile" className="w-full h-full select-none object-cover" />
            </div>
          </div>
      </div>
    </div>
  )
}

export default NavigationBar