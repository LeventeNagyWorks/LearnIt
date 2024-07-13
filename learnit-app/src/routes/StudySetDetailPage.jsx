/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { studySetsData } from '../signals'

const StudySetDetailPage = () => {
  const { itemName } = useParams();
  const studySets = studySetsData.value;
  
  if (!Array.isArray(studySets) || studySets.length === 0) {
    return <div>Loading...</div>;
  }

  const studySet = studySets.find(set => set.name === itemName);

  if (!studySet) {
    return <div>Study set not found</div>;
  }

  const questions = studySet.questions;
  const questionNames = questions.map(question => question.question);

  return (
    <div className='h-screen flex flex-col items-center bg-cstm_bg_dark text-cstm_white font-poppins overflow-y-auto scrollbar'>
      <h1 className='text-6xl my-8 font-semibold'>{studySet.name}</h1>

      <div className=''>

      </div>
      
      <div className='w-[50%] flex flex-col items-center gap-8 mb-16'>
        {questionNames.map((questionName, index) => (
          <div 
            className='w-full flex flex-col justify-center items-start gap-3 bg-slate-800 rounded-2xl py-3 px-5'
            key={index}
          >
            <h2 className='text-2xl mb-3 text-center'>{questionName}</h2>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudySetDetailPage;
