/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react'
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = () => {
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const inputRef = useRef(null);

    const handleShowPassword = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPasswordShowed(prev => !prev);
        inputRef.current.focus();
    }

    return (
        <div className='w-full h-12 bg-slate-700 rounded-xl flex justify-start items-center px-3 relative'>
            <h2 
                className={`absolute font-semibold lg:text-xl duration-500 select-none
                    ${isPasswordFocused ? ' text-accent_green_dark' : ' text-cstm_white hover:cursor-text'}
                    ${isPasswordFocused || !isPasswordEmpty ? 'left-2 -top-8 ' : 'left-12 top-[10px]'}
                `}
                onClick={() => inputRef.current.focus()}
            >
                Password
            </h2>
            <FaLock className={`w-5 h-5 duration-500 ${isPasswordFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
            <input
                ref={inputRef}
                type={isPasswordShowed ? "text" : "password"}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={(e) => setIsPasswordEmpty(e.target.value.length === 0)}
                className={`w-full h-12 outline-none bg-transparent lg:text-xl rounded-xl px-3 caret-accent_green_dark 
                    ${isPasswordFocused ? 'text-accent_green_dark selection:text-cstm_bg_dark' : 'text-cstm_white'}
                `}
            />
            <div
                className={`w-9 h-8 flex justify-center items-center rounded-full duration-500 hover:bg-slate-500 
                    ${isPasswordFocused ? 'opacity-100 hover:cursor-pointer' : 'opacity-0 hover:cursor-default'}
                `}
                onClick={handleShowPassword}
            >
                {isPasswordShowed ? 
                    <FaRegEyeSlash className='w-5 h-5 text-accent_green_dark'/> :
                    <FaRegEye className='w-5 h-5 text-accent_green_dark'/>
                }
            </div>
        </div>
    )
}

export default Password