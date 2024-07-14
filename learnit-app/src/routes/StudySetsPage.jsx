/* eslint-disable no-unused-vars */
import React from 'react'
import RightPanel from '../components/StudySets/RightPanel'
import LeftPanel from '../components/StudySets/LeftPanel'
import Error from '../components/errors/Error'
import { useState } from 'react'
import { isStudySetAccepted, showNotAcceptableFileErrorMessage, showSuccessfullyAdded, startTransitionFromStudySets } from '../signals'
import { useEffect } from 'react'
import AddNewStudySetPanel from '../components/StudySets/AddNewStudySetPanel'
import SuccessfullyAdded from '../components/StudySets/SuccessfullyAdded'
import { useSignals } from '@preact/signals-react/runtime'

const StudySetsPage = () => {

  useSignals();

  useEffect(() => {
    startTransitionFromStudySets.value = false;
  }, [])
   

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
      {showNotAcceptableFileErrorMessage.value && (
        <Error 
          type={'FileFormatIsNotAcceptable'} 
          onClick={() => showNotAcceptableFileErrorMessage.value = false}
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

      <svg className={`absolute z-0 duration-[3500ms] ${startTransitionFromStudySets.value ? 'translate-x-[60px] -translate-y-[500px] -rotate-[65deg] scale-[70%]' : 'translate-x-[1100px] -translate-y-[320px] scale-[85%]'}`} width="1123" height="1128" viewBox="0 0 1123 1128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="163.5" cy="964.5" r="163.5" fill="url(#paint0_linear_150_2)"/>
        <circle cx="585.5" cy="814.5" r="54.5" fill="url(#paint1_linear_150_2)"/>
        <circle cx="203" cy="521" r="98" fill="url(#paint2_linear_150_2)"/>
        <ellipse cx="777" cy="342.535" rx="346" ry="342.535" fill="url(#paint3_linear_150_2)"/>
        <defs>
        <linearGradient id="paint0_linear_150_2" x1="230" y1="1085" x2="44" y2="853" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0D5200"/>
        <stop offset="1" stopColor="#1DB800"/>
        </linearGradient>
        <linearGradient id="paint1_linear_150_2" x1="624" y1="851" x2="552" y2="783" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0D5200"/>
        <stop offset="1" stopColor="#1DB800"/>
        </linearGradient>
        <linearGradient id="paint2_linear_150_2" x1="272" y1="583" x2="118" y2="461" gradientUnits="userSpaceOnUse">
        <stop stopColor="#007728"/>
        <stop offset="1" stopColor="#00DD4B"/>
        </linearGradient>
        <linearGradient id="paint3_linear_150_2" x1="549.508" y1="100.561" x2="1018.73" y2="578.757" gradientUnits="userSpaceOnUse">
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