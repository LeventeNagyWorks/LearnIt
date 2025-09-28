/* eslint-disable no-unused-vars */
import React from 'react'
import RightPanel from '../components/StudySets/RightPanel'
import LeftPanel from '../components/StudySets/LeftPanel'
import Error from '../components/errors/Error'
import { useState } from 'react'
import { showDeleteWarningPopup, isFriendsOpened, isProfileFocused, isStudySetAccepted, showNotAcceptableFileErrorMessage, showSuccessfullyAdded, startTransitionFromStudySets, startTransitionToStudySets, itemToDeleteSignal, refreshStudySetsData, studySetsData } from '../signals'
import { useEffect } from 'react'
import AddNewStudySetPanel from '../components/StudySets/AddNewStudySetPanel'
import SuccessfullyAdded from '../components/StudySets/SuccessfullyAdded'
import { useSignals } from '@preact/signals-react/runtime'
import NavigationBar from '../components/StudySets/NavigationBar'
import Friends from '../components/StudySets/Friends'
import Popup from '../components/Popup'
import axios from 'axios'

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
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  const handleDeleteStudySet = async () => {
    const itemsToDelete = itemToDeleteSignal.value;
    console.log('handleDeleteStudySet called with items:', itemsToDelete);
    
    if (!itemsToDelete || itemsToDelete.length === 0) {
      console.error('Cannot delete study sets: no items specified');
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      // Delete all items in parallel
      const deletePromises = itemsToDelete.map(itemName => 
        axios.delete(`/delete/${itemName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      );

      await Promise.all(deletePromises);

      // Fetch updated study sets data from server
      const dataResponse = await axios.get('/data', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update the studySetsData signal with fresh data
      studySetsData.value = dataResponse.data;

      // Close the warning popup and clear the signal
      showDeleteWarningPopup.value = false;
      itemToDeleteSignal.value = [];

      // Trigger other refresh mechanisms
      setRefreshTrigger(prev => prev + 1);
      refreshStudySetsData.value = refreshStudySetsData.value + 1;
      
      console.log(`Study sets deleted successfully: ${itemsToDelete.join(', ')}`);
    } catch (error) {
      console.error('Error deleting study sets:', error);
    }
  };

  const cancelDelete = () => {
    showDeleteWarningPopup.value = false;
    itemToDeleteSignal.value = [];
  };

  return (
    <div
      className='w-full h-screen flex flex-col items-center font-poppins bg-cstm_bg_dark overflow-hidden'
      onClick={() => isProfileFocused.value = false}
    >
      {(showSuccessfullyAdded.value || isStudySetAccepted.value._a) && (
        <Popup type="successful" title="Success" message={"You have successfully added a new study set!"} primButtonText='OK' onClickPrim={closeAddStudySetSuccessMessage} />
      )}
      {showDeleteWarningPopup.value && (
        <Popup 
          type="warning" 
          title="Are you sure?" 
          message={`Are you sure you want to delete ${itemToDeleteSignal.value.length === 1 ? 'this study set' : 'these study sets'}?`} 
          primButtonText='Yes' 
          onClickPrim={handleDeleteStudySet} 
          secButtonText='No' 
          onClickSec={cancelDelete}  
        />
      )}
      {showNotAcceptableFileErrorMessage.value && (
        <Popup type="error" title="Ooops!" message={"The file format you uploaded is not acceptable."} primButtonText='OK' onClickPrim={null} />
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
      
      <div className='flex flex-col w-full flex-1 py-4 px-4 gap-6 relative z-10 overflow-hidden'>
        <NavigationBar />

        <div className='w-full h-0 flex-1 flex gap-10 relative overflow-hidden'>

          <LeftPanel
            isStudySetAlreadyExistsActive={isStudySetAlreadyExistsActive}
            setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
            openAddStudySetPanel={openAddStudySetPanel}
            refreshTrigger={refreshTrigger}
          />

          <RightPanel />


        </div>
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