/* eslint-disable no-unused-vars */
import React from 'react'
import RightPanel from '../components/StudySets/RightPanel'
import LeftPanel from '../components/StudySets/LeftPanel'
import Error from '../components/errors/Error'
import { useState } from 'react'
import { isLoading, isStudySetAccepted, showSuccessfullyAdded } from '../signals'
import { useEffect } from 'react'
import AddNewStudySetPanel from '../components/StudySets/AddNewStudySetPanel'
import SuccessfullyAdded from '../components/StudySets/SuccessfullyAdded'
import { useSignals } from '@preact/signals-react/runtime'

const StudySetsPage = () => {

  useSignals();

  const [isStudySetAlreadyExistsActive, setIsStudySetAlreadyExistsActive] = useState(false);
  const [isAddStudySetOpened, setIsAddStudySetOpened] = useState(false);

  const closeStudySetAlreadyExistsMessage = () => {
    setIsStudySetAlreadyExistsActive(false);
  }
  const openAddStudySetPanel = () => {
    setIsAddStudySetOpened(true);
  }
  const closeAddStudySetPanel = () => {
    setIsAddStudySetOpened(false);
  }

  return (
    <div className='w-screen h-screen font-poppins bg-cstm_bg_dark flex overflow-hidden relative'>

      {(showSuccessfullyAdded.value || isStudySetAccepted.value._a) && (
        <SuccessfullyAdded
          type={'StudySetAccepted'}
          setShowSuccessfullyAdded={() => {
            showSuccessfullyAdded.value = false;
            isStudySetAccepted.value = { _a: false };
          }}
        />
      )}
      {isStudySetAlreadyExistsActive && (
        <Error 
          type={'StudySetAlreadyExists'} 
          onClick={closeStudySetAlreadyExistsMessage}
        />
      )}
      {isAddStudySetOpened && (
        <AddNewStudySetPanel 
          closeAddStudySetPanel={closeAddStudySetPanel}         
          isStudySetAlreadyExistsActive={isStudySetAlreadyExistsActive} 
          setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
        />
      )}

      <LeftPanel 
        isStudySetAlreadyExistsActive={isStudySetAlreadyExistsActive} 
        setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
        openAddStudySetPanel={openAddStudySetPanel}
      />

      <RightPanel />

      <svg className='absolute -right-20 -top-20 scale-[85%] z-0' width="1016" height="974" viewBox="0 0 1016 974" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="163.5" cy="810.5" r="163.5" fill="#0D5200"/>
          <circle cx="585.5" cy="660.5" r="54.5" fill="#0D5200"/>
          <circle cx="203" cy="367" r="98" fill="#007728"/>
          <ellipse cx="777" cy="188.535" rx="346" ry="342.535" fill="url(#paint0_linear_57_103)"/>
          <defs>
          <linearGradient id="paint0_linear_57_103" x1="549.508" y1="-53.4392" x2="1018.73" y2="424.757" gradientUnits="userSpaceOnUse">
          <stop stopColor="#20CC00"/>
          <stop offset="0.453063" stopColor="#189C00"/>
          <stop offset="1" stopColor="#106600"/>
          </linearGradient>
          </defs>
      </svg>

    </div>
  )
}

export default StudySetsPage