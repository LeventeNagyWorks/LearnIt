/* eslint-disable no-unused-vars */
import React from 'react'
import RightPanel from '../components/StudySets/RightPanel'
import LeftPanel from '../components/StudySets/LeftPanel'
import Error from '../components/errors/Error'
import { useState } from 'react'
import { showDeleteWarningPopup, isFriendsOpened, isProfileFocused, isStudySetAccepted, showNotAcceptableFileErrorMessage, showSuccessfullyAdded, startTransitionFromStudySets, startTransitionToStudySets } from '../signals'
import { useEffect } from 'react'
import AddNewStudySetPanel from '../components/StudySets/AddNewStudySetPanel'
import SuccessfullyAdded from '../components/StudySets/SuccessfullyAdded'
import { useSignals } from '@preact/signals-react/runtime'
import NavigationBar from '../components/StudySets/NavigationBar'
import Friends from '../components/StudySets/Friends'
import Popup from '../components/Popup'

const StudySetsPage = () => {

  useSignals();

  useEffect(() => {
    startTransitionFromStudySets.value = false;
    startTransitionToStudySets.value = true;
    setTimeout(() => {
      startTransitionToStudySets.value = false;
    }, 1000);
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
  const closeAddStudySetSuccessMessage = () => {
    showSuccessfullyAdded.value = false;
    setIsAddStudySetOpened(false);
  }

  return (
    <div
      className='w-screen h-screen flex flex-col items-center font-poppins bg-cstm_bg_dark overflow-hidden'
      onClick={() => isProfileFocused.value = false}
    >
      {(showSuccessfullyAdded.value || isStudySetAccepted.value._a) && (
        <Popup type="successful" title="Success" message={"You have successfully added a new study set!"} primButtonText='OK' onClickPrim={closeAddStudySetSuccessMessage} />
        //TODO:: not closing it
      )}
      {showDeleteWarningPopup.value && (
        <Popup type="warning" title="Are you sure?" message={"Are you sure you want to delete these study sets?"} primButtonText='Yes' onClickPrim={() => console.log('lel')} secButtonText='No' onClickSec={() => showDeleteWarningPopup.value = false}  />
      )}
      {showNotAcceptableFileErrorMessage.value && (
        <Popup type="error" title="Ooops!" message={"The file format you uploaded is not acceptable."} primButtonText='OK' onClickPrim={null} />
        //TODO:: not closing it
      )}
      {isStudySetAlreadyExistsActive && (
        <Popup type="error" title="Ooops!" message={"A study set with this name already exists."} primButtonText='OK' onClickPrim={closeStudySetAlreadyExistsMessage} />
      )}
      {isAddStudySetOpened && (
        <AddNewStudySetPanel
          closeAddStudySetPanel={closeAddStudySetPanel}
          isStudySetAlreadyExistsActive={isStudySetAlreadyExistsActive}
          setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
        />
      )}
      {isFriendsOpened.value && (
        <Friends />
      )}

      <NavigationBar />

      <div className='w-screen h-[88%] min-h-[88%] flex relative'>

        <LeftPanel
          isStudySetAlreadyExistsActive={isStudySetAlreadyExistsActive}
          setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
          openAddStudySetPanel={openAddStudySetPanel}
        />

        <RightPanel />

        <svg className={`absolute z-0 translate-x-[1100px] -translate-y-[320px] scale-[85%] duration-[2000ms]`} width="1123" height="1128" viewBox="0 0 1123 1128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="163.5" cy="964.5" r="163.5" fill="url(#paint0_linear_150_2)" />
          <circle cx="585.5" cy="814.5" r="54.5" fill="url(#paint1_linear_150_2)" />
          <circle cx="203" cy="521" r="98" fill="url(#paint2_linear_150_2)" />
          <ellipse cx="777" cy="342.535" rx="346" ry="342.535" fill="url(#paint3_linear_150_2)" />
          <defs>
            <linearGradient id="paint0_linear_150_2" x1="230" y1="1085" x2="44" y2="853" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0D5200" />
              <stop offset="1" stopColor="#1DB800" />
            </linearGradient>
            <linearGradient id="paint1_linear_150_2" x1="624" y1="851" x2="552" y2="783" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0D5200" />
              <stop offset="1" stopColor="#1DB800" />
            </linearGradient>
            <linearGradient id="paint2_linear_150_2" x1="272" y1="583" x2="118" y2="461" gradientUnits="userSpaceOnUse">
              <stop stopColor="#007728" />
              <stop offset="1" stopColor="#00DD4B" />
            </linearGradient>
            <linearGradient id="paint3_linear_150_2" x1="549.508" y1="100.561" x2="1018.73" y2="578.757" gradientUnits="userSpaceOnUse">
              <stop stopColor="#20CC00" />
              <stop offset="0.453063" stopColor="#189C00" />
              <stop offset="1" stopColor="#106600" />
            </linearGradient>
          </defs>
        </svg>

      </div>

    </div>

  )
}

export default StudySetsPage