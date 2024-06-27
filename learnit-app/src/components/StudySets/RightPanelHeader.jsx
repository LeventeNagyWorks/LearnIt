/* eslint-disable no-unused-vars */
import React from 'react'

import DeleteButton from './DeleteButton'

const RightPanelHeader = () => {
  return (
    <div className='w-full h-24 flex justify-center items-center rounded-t-[40px]'>
    <div className='w-full flex items-center justify-center'>
      <h1 className='w-fit text-5xl font-medium text-cstm_white select-none z-10'>Your Study Sets</h1>
    </div>
    <div className='w-fit h-12 flex justify-end items-center gap-6 pr-6'>
      <DeleteButton isWide={false}/>
    </div>
  </div>
  )
}

export default RightPanelHeader