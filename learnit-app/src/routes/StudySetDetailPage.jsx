/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { studySetsData } from '../signals'
import { useSignals } from '@preact/signals-react/runtime'

const StudySetDetailPage = () => {
  const studySets = useSignals(studySetsData);
  const studySet = studySets[0]; // get the first study set

  if (!studySet) {
    return <div>Loading...</div>; // or some other fallback component
  }

  const questions = studySet.questions;
  const questionNames = questions.map(question => question.question);

  return (
    <div className='h-screen bg-cstm_bg_dark text-cstm_white font-poppins'>
      {questionNames.map((questionName, index) => (
        <h1
          className='text-3xl'
          key={index}
        >{questionName}</h1>
      ))}
    </div>
  );
};

export default StudySetDetailPage;