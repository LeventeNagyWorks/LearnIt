/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const QuestionCounter = ({ questionLength }) => {
  return (
    <div className='flex justify-center items-center rounded-lg px-2 py-1 bg-gray-600'>
        <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 z-10'>{questionLength} questions</p>
  </div>
  )
}

export default QuestionCounter