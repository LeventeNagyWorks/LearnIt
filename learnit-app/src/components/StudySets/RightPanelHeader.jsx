/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

import DeleteButton from './DeleteButton'

const RightPanelHeader = ({ selectedItemNum }) => {
  return (
    <div className='w-full h-24 flex justify-center items-center rounded-t-[40px]'>
      <div className='w-full flex items-center justify-center'>
        <h1 className='w-fit text-5xl font-medium text-cstm_white select-none z-10'>Your Study Sets</h1>
      </div>
      <div className='w-1/5 h-12 flex justify-end items-center gap-3 pr-6 py-1'>
        {selectedItemNum !== 0 && (
          <div className='w-fit h-full flex justify-center items-center select-none bg-slate-400 px-3 rounded-lg'>
            <p className=''> {selectedItemNum}</p>
          </div>
        )}
        <DeleteButton isWide={false}/>
      </div>
    </div>
  )
}

export default RightPanelHeader