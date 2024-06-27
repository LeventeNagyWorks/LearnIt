/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const Progress = ({ hoverStates, itemName }) => {
    const isHovered = hoverStates[itemName] || false;

  return (
    <div className={`w-full flex justify-between duration-700 ${isHovered ? 'translate-x-0' : '-translate-x-64'}`}>
        <div className={`flex flex-col items-start gap-1 mx-5`}>
            <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg relative z-10'>Progress</p>

            <div className='flex items-center gap-2'>
                <div className='w-[300px] h-2 bg-white rounded-full'>
                {/* make the Progress bar here */}
                </div>

                <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>0 learnt</p>
            </div>

        </div>
    </div>
  )
}

export default Progress