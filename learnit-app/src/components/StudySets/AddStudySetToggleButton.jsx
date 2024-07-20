/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { toggleDropBox } from '../../signals';

const AddStudySetToggleButton = () => {

    const showTextEditor = () => {
        toggleDropBox.value = false;
        console.log(toggleDropBox.value);
    }

    const showDropBox = () => {
        toggleDropBox.value = true;
        console.log(toggleDropBox.value);
    }

    const shadowStyle = { boxShadow: '12px 18px 28px -10px #000000' };

  return (
    <div 
        className='w-[400px] flex items-center font-poppins font-medium text-lg rounded-full bg-slate-300 duration-500 select-none relative'
        style={shadowStyle}
    >

        <span className={`w-[200px] h-full absolute bg-gradient-to-br from-slate-600 to-slate-800 rounded-full z-0 
        ${!toggleDropBox.value //&& isClicked
            ? 'animate-showFav' 
            : 'animate-showAll'
        }`}>
        </span>

        <div 
            className={`w-1/2 h-full flex justify-center items-center cursor-pointer rounded-l-full z-10 duration-700 ${!toggleDropBox.value ? 'text-cstm_bg_dark' : 'text-slate-300'}`}
            onClick={showDropBox}
        >
            <p className='py-1 px-3'>Drag 'N Drop</p>
        </div>

        <div 
            className={`w-1/2 h-full flex justify-center items-center cursor-pointer rounded-r-full z-10 duration-700 ${toggleDropBox.value ? 'text-cstm_bg_dark' : 'text-slate-300'}`}
            onClick={showTextEditor}
        >
            <p className='py-1 px-3'>Text Editor</p>
        </div>
    </div>
  )
}

export default AddStudySetToggleButton