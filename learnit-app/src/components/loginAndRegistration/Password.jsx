// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { FaLock } from "react-icons/fa";

const Password = () => {

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  return (
    <div className='w-full h-12 bg-slate-700 rounded-xl flex justify-start items-center px-3 relative'>
        <h2 className={`absolute font-semibold lg:text-xl duration-500 select-none
            ${isPasswordFocused ? ' text-accent_green_dark' : ' text-cstm_white'}
            ${isPasswordFocused || !isPasswordEmpty ? 'left-2 -top-8 ' : 'left-12 top-[10px]'}
        `}>
            Password
        </h2>
        <FaLock className={`w-5 h-5 duration-500 ${isPasswordFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
        <input 
            type="password"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onChange={(e) => setIsPasswordEmpty(e.target.value.length === 0)}
            className={`w-full h-12 outline-none bg-transparent lg:text-xl rounded-xl px-3 caret-accent_green_dark ${isPasswordFocused ? 'text-accent_green_dark selection:text-cstm_bg_dark' : 'text-cstm_white'}`}
        />
    </div>
  )
}

export default Password