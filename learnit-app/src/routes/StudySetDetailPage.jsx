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
    <div className='h-screen bg-cstm_bg_dark text-cstm_white font-poppins'>
      <h1 className='text-4xl mb-4'>{studySet.name}</h1>
      {questionNames.map((questionName, index) => (
        <h2
          className='text-2xl mb-2'
          key={index}
        >{questionName}</h2>
      ))}
    </div>
  );
};

export default StudySetDetailPage;
