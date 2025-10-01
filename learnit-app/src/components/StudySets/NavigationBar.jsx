/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isFriendsOpened, isLoggedIn, isProfileFocused } from '../../signals';
import { useSignals } from '@preact/signals-react/runtime';
import { getProfileImage } from '../../utils/profileImage';

const NavigationBar = () => {
  useSignals();

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const onClickProfile = () => {
    isProfileFocused.value = !isProfileFocused.value;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token =
          localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await fetch(
          'http://localhost:3001/api/getUserProfile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUsername(userData.username);
        setDisplayName(userData.displayName);
        if (userData.avatar) {
          setAvatar(`data:image/jpeg;base64,${userData.avatar}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('username');
    isLoggedIn.value = false;
    setUsername('');
    navigate('/');
  };

  return (
    <div className='w-full h-full max-h-[68px] flex justify-between items-center bg-zinc-400/40 backdrop-blur-md rounded-[34px] px-8 font-poppins font-semibold text-cstm_white z-20 '>
      <p className='lg:text-[38px] select-none'>
        Welcome back,{' '}
        <span className='text-accent_green_dark2'>
          {displayName ? ` ${displayName}` : ''}
        </span>
        !
      </p>
      <div className='flex justify-center items-center relative'>
        <div
          className={`absolute -bottom-[415%] w-[250px] flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-slate-600 to-slate-900 rounded-2xl z-40 duration-500 px-5 py-5 ${
            isProfileFocused.value
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <svg
            className='absolute -top-[16px] right-[62px]'
            width='30'
            height='20'
            viewBox='0 0 150 100'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M75 0L150 100H0L75 0Z' fill='#323e52' />
          </svg>

          <div
            className='w-full flex justify-center items-center hover:bg-green-600 border-2 border-cstm_white px-4 py-1 rounded-lg cursor-pointer duration-500'
            onClick={() => navigate('/profile')}
          >
            <p className=''>My Profile</p>
          </div>
          <div
            className='w-full flex justify-center items-center hover:bg-green-600 border-2 border-cstm_white px-4 py-1 rounded-lg cursor-pointer duration-500'
            onClick={() => (isFriendsOpened.value = true)}
          >
            <p className=''>Friends</p>
          </div>
          <div
            className='w-full flex justify-center items-center hover:bg-green-600 border-2 border-cstm_white px-4 py-1 rounded-lg cursor-pointer duration-500'
            onClick={handleLogout}
          >
            <p className=''>Logout</p>
          </div>
        </div>

        <div className='flex justify-center items-center px-2 overflow-hidden'>
          <p
            className={`lg:text-2xl duration-500 select-none ${
              isProfileFocused.value ? 'translate-x-0' : 'translate-x-[110%]'
            }`}
          >
            {displayName}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-full cursor-pointer border-2 duration-500 overflow-hidden hover:border-cstm_white ${
            isProfileFocused.value ? 'border-cstm_white' : 'border-transparent'
          }`}
          onClick={e => {
            e.stopPropagation();
            onClickProfile();
          }}
        >
          <img
            src={avatar || getProfileImage(null)}
            alt='Profile'
            className='w-full h-full select-none object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
