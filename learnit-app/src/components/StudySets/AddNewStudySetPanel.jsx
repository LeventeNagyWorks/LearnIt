/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CloseButton from './CloseButton';
import DragZone from './DragZone';
import InformationButton from './InformationButton';
import { useSignals } from '@preact/signals-react/runtime';
import { toggleDropBox } from '../../signals';
import ToggleButtons from '../ToggleButtons';
import { TbDragDrop, TbEdit } from 'react-icons/tb';

const AddNewStudySetPanel = ({
  closeAddStudySetPanel,
  setIsStudySetAlreadyExistsActive,
}) => {
  useSignals();

  const [isHovered, setIsHovered] = useState(false);
  const [isInformationHovered, setIsInformationHovered] = useState(false);

  return (
    <div className='absolute z-30 w-full h-screen flex justify-center items-center bg-black/70 backdrop-blur-sm'>
      <div className='w-[85%] h-[90%] bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-[30px] overflow-hidden'>
        <div className='h-[70px] flex justify-between items-center px-[14px]'>
          <InformationButton
            isInformationHovered={isInformationHovered}
            setIsInformationHovered={setIsInformationHovered}
          />
          <ToggleButtons
            onLeftClick={() => (toggleDropBox.value = true)}
            onRightClick={() => (toggleDropBox.value = false)}
            leftIcon={<TbDragDrop className='w-6 h-6' />}
            rightIcon={<TbEdit className='w-6 h-6' />}
            leftButtonColor='accent_green_dark'
            rightButtonColor='accent_green_dark'
            leftShadowColor='rgba(40,255,0,0.7)'
            rightShadowColor='rgba(40,255,0,0.7)'
          />
          <CloseButton onClick={closeAddStudySetPanel} />
        </div>

        <div className='w-full h-[90%] relative overflow-hidden'>
          <div
            className={`absolute inset-0 flex transition-transform duration-700 ${
              toggleDropBox.value ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className='h-full w-full flex justify-center items-center px-6 flex-shrink-0'>
              <DragZone
                setIsStudySetAlreadyExistsActive={
                  setIsStudySetAlreadyExistsActive
                }
              />
            </div>
          </div>

          <div
            className={`absolute inset-0 flex transition-transform duration-700 ${
              toggleDropBox.value ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            <div className='h-full w-full flex justify-center items-center flex-shrink-0'>
              <div className='bg-transparent w-full h-full'>
                {/* //TODO: text editor should be here */}
                <div className='w-full h-full flex items-center justify-center'>
                  <p className='text-white text-2xl'>
                    Text Editor Coming Soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudySetPanel;
