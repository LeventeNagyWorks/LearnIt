/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import BackButton from '../../components/BackButton'
import AddStudySetButton from './AddStudySetButton';
import { startTransitionFromStudySets, startTransitionToStudySets } from '../../signals';

const LeftPanel = ({ setIsStudySetAlreadyExistsActive, openAddStudySetPanel }) => {

  return (
    <div className={`w-[15%] flex flex-col justify-end items-end pl-14 py-6 relative z-20 duration-1000`}>
      
      <div className='w-full h-[67%] flex flex-col justify-between items-center relative'>

        <AddStudySetButton 
          className={'self-center'} 
          setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive} 
          onClick={openAddStudySetPanel}
        />

        <BackButton
          className='self-center'
          to={"/"}
        />

      </div>


    </div>
  )
}

export default LeftPanel