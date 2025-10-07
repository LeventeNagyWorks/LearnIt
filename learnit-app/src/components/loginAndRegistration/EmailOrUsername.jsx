/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const EmailOrUsername = ({ onChange, className }) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const [inputValue, setInputValue] = useState('');

    // Function to detect if input looks like an email
    const isEmail = (value) => {
        return value.includes('@');
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIsEmpty(value.length === 0);
        onChange(e);
    };

    return (
        <div className='w-full flex justify-between items-center gap-2'>
            <div className={`w-full h-12 bg-slate-700 rounded-xl flex justify-start items-center px-3 relative border-[2px] ${className}`}>
                <h2
                    className={`absolute font-semibold lg:text-xl duration-500 select-none hover:cursor-text
                        ${isFocused ? ' text-accent_green_dark' : ' text-cstm_white'}
                        ${isFocused || !isEmpty ? 'left-2 -top-8 ' : 'left-12 top-[8px]'}
                    `}
                    onClick={() => inputRef.current.focus()}
                >
                    Email or Username
                </h2>
                {/* Dynamic icon based on input content */}
                {isEmail(inputValue) ? (
                    <MdEmail className={`w-6 h-6 duration-500 ${isFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
                ) : (
                    <FaUser className={`w-5 h-5 duration-500 ${isFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                    className={`w-full h-12 outline-none bg-transparent lg:text-xl rounded-xl px-3 caret-accent_green_dark ${isFocused ? 'text-accent_green_dark selection:text-cstm_bg_dark' : 'text-cstm_white'}`}
                />
            </div>
        </div>
    )
}

export default EmailOrUsername