// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";

const Email = () => {

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isEmailEmpty, setIsEmailEmpty] = useState(true);

  return (
    <div className='w-full h-12 bg-slate-700 rounded-xl flex justify-start items-center px-3 relative'>
        <h2 className={`absolute font-semibold lg:text-xl duration-500 select-none
            ${isEmailFocused ? ' text-accent_green_dark' : ' text-cstm_white'}
            ${isEmailFocused || !isEmailEmpty ? 'left-2 -top-8 ' : 'left-12 top-[10px]'}
        `}>
            Email
        </h2>
        <MdEmail className={`w-6 h-6 duration-500 ${isEmailFocused ? 'text-accent_green_dark' : 'text-cstm_white'}`}/>
        <input 
            type="email"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            onChange={(e) => setIsEmailEmpty(e.target.value.length === 0)}
            className={`w-full h-12 outline-none bg-transparent lg:text-xl rounded-xl px-3 caret-accent_green_dark ${isEmailFocused ? 'text-accent_green_dark selection:text-cstm_bg_dark' : 'text-cstm_white'}`}
        />
    </div>
  )
}

export default Email