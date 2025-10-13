import React from 'react';

const QuestionCounter = ({ questionLength, className }) => {
  return (
    <div
      className={`flex justify-center items-center rounded-lg px-2 py-1 bg-gray-600 ${className}`}
    >
      <span className='text-cstm_white text-sm md:text-base text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 z-10'>
        {questionLength} questions
      </span>
    </div>
  );
};

export default QuestionCounter;
