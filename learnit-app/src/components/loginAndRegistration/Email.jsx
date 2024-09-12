/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react'
import { MdEmail } from "react-icons/md";
import RegInformationButton from './RegInformationButton';

const Email = ({ onChange, className }) => {

    const inputRef = useRef(null);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(true);

  return (
    <div className='w-full flex justify-between items-center gap-2'>
        <div className={`w-full h-12 bg-slate-700 rounded-xl flex justify-start items-center px-3 relative border-[2px] border-slate-700 ${className}`}>
            <h2 
                className={`absolute font-semibold lg:text-xl duration-500 select-none hover:cursor-text
                    ${isEmailFocused ? ' text-accent_green_dark' : ' text-cstm_white'}
                    ${isEmailFocused || !isEmailEmpty ? 'left-2 -top-8 ' : 'left-12 top-[8px]'}
                `}
                onClick={() => inputRef.current.focus()}
            >
                Email
            </h2>
            <MdEmail className={`w-6 h-6 duration-500 ${isEmailFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
            <input 
            ref={inputRef}
                type="email"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={(e) => {
                    setIsEmailEmpty(e.target.value.length === 0);
                    onChange(e);
                }}
                className={`w-full h-12 outline-none bg-transparent lg:text-xl rounded-xl px-3 caret-accent_green_dark ${isEmailFocused ? 'text-accent_green_dark selection:text-cstm_bg_dark' : 'text-cstm_white'}`}
            />
        </div>

        <RegInformationButton />
    </div>
  )
}

export default Email