/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import BackButton from '../../components/BackButton'
import AddStudySetButton from './AddStudySetButton';
import { startTransitionFromStudySets, startTransitionToStudySets } from '../../signals';

const LeftPanel = ({ setIsStudySetAlreadyExistsActive, openAddStudySetPanel }) => {

  return (
    <div className={`w-full max-w-[200px] flex flex-col justify-end items-end  relative z-20 duration-1000`}>
      <div className='w-full h-full flex flex-col justify-center items-center relative'>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <AddStudySetButton
            className={'self-center'}
            setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
            onClick={openAddStudySetPanel}
          />
        </div>
        <BackButton
          className='self-center'
          to={"/"}
        />
      </div>
    </div>
  )
}

export default LeftPanel