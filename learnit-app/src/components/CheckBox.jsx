/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

const CheckBox = ({ isChecked, setIsChecked }) => {
  return (
    <div
      onClick={() => {
        setIsChecked(!isChecked);
      }}
      className='w-6 h-6 flex justify-center items-center bg-slate-700 border border-transparent hover:border-accent_green_dark rounded-[8px] hover:cursor-pointer duration-500'
    >
      {isChecked && <FaCheck className='w-5 h-5 text-accent_green_dark' />}
    </div>
  );
};

export default CheckBox;
