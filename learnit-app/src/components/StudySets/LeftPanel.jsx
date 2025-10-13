/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from 'react';
import BackButton from '../../components/BackButton';
import AddStudySetButton from './AddStudySetButton';
import {
  showAddNewStudyset,
  startTransitionFromStudySets,
  startTransitionToStudySets,
} from '../../signals';

const LeftPanel = ({ setIsStudySetAlreadyExistsActive }) => {
  return (
    <div
      className={`hidden md:block w-full max-w-[240px] flex flex-col relative z-20 duration-1000`}
    >
      <div className='w-full h-full flex flex-col relative'>
        <div className='w-full h-full flex flex-1 flex-col justify-center items-center'>
          <AddStudySetButton
            className={'self-center'}
            setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
            onClick={() => (showAddNewStudyset.value = true)}
          />
        </div>
        <BackButton className='self-center' to={'/'} />
      </div>
    </div>
  );
};

export default LeftPanel;
