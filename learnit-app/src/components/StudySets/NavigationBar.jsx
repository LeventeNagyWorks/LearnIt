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
          <div className='flex'>
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