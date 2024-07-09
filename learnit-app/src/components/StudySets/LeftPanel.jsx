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

  const [isInformationHovered, setIsInformationHovered] = useState(false);

  return (
    <div className='w-[15%] flex flex-col justify-between items-end py-8 px-5 relative z-20'>

      <InformationButton isInformationHovered={isInformationHovered} setIsInformationHovered={setIsInformationHovered}/>
      
      <AddStudySetButton setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive} onClick={openAddStudySetPanel}/>

      <div className='self-start'>
        <BackButton
          to={"/"}
        />
      </div>

    </div>
  )
}

export default LeftPanel