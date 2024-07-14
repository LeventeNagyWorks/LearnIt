/* eslint-disable no-unused-vars */
import React from 'react'
import { showOnlyFav } from '../../signals';

const ShowOnlyFavouriteToggleButton = () => {

    const showFav = () => {
        showOnlyFav.value = true;
        console.log(showOnlyFav.value);
    }

    const showAll = () => {
        showOnlyFav.value = false;
        console.log(showOnlyFav.value);
    }

    const shadowStyle = { boxShadow: '12px 18px 28px -10px #000000' };

  return (
    <div 
        className='w-[400px] flex items-center font-poppins font-medium text-lg rounded-full bg-slate-300 duration-500 select-none relative'
        style={shadowStyle}
    >

        <span className={`w-[200px] h-full absolute bg-slate-800 rounded-full z-0 ${showOnlyFav.value ? 'right-0' : 'left-0'}`}/>

        <div 
            className={`w-1/2 h-full flex justify-center items-center cursor-pointer rounded-l-full z-10 ${showOnlyFav.value ? 'text-cstm_bg_dark' : 'text-slate-300'}`}
            onClick={showAll}
        >
            <p className='py-1 px-3'>ALL</p>
        </div>

        <div 
            className={`w-1/2 h-full flex justify-center items-center cursor-pointer rounded-r-full z-10 ${!showOnlyFav.value ? 'text-cstm_bg_dark' : 'text-slate-300'}`}
            onClick={showFav}
        >
            <p className='py-1 px-3'>FAVOURITE</p>
        </div>
    </div>
  )
}

export default ShowOnlyFavouriteToggleButton