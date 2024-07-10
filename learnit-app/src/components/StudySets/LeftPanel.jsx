/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';

import BackButton from '../../components/BackButton'
import InformationButton from './InformationButton';
import AddStudySetButton from './AddStudySetButton';
import AddNewStudySetPanel from './AddNewStudySetPanel';

const LeftPanel = ({ setIsStudySetAlreadyExistsActive, openAddStudySetPanel }) => {

  return (
    <div className='w-[15%] flex flex-col justify-end items-end pl-5 py-8 relative z-20'>
      
      <div className='w-full h-[60%] flex flex-col justify-between items-center'>

        <AddStudySetButton 
          className={'self-end'} 
          setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive} 
          onClick={openAddStudySetPanel}
        />

        <BackButton
          className='self-start'
          to={"/"}
        />

      </div>


    </div>
  )
}

export default LeftPanel