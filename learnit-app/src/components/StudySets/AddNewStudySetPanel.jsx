/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import CloseButton from './CloseButton';
import DragZone from './DragZone';
import InformationButton from './InformationButton';
import AddStudySetToggleButton from './AddStudySetToggleButton';
import { useSignals } from '@preact/signals-react/runtime';
import { toggleDropBox } from '../../signals';
DragZone

const AddNewStudySetPanel = ({ closeAddStudySetPanel, setIsStudySetAlreadyExistsActive }) => {

    useSignals();

    const [isHovered, setIsHovered] = useState(false);
    const [isInformationHovered, setIsInformationHovered] = useState(false);

  return (
    <div className='absolute z-30 w-full h-screen flex justify-center items-center bg-black/70'>
        <div className='w-[85%] h-[90%] bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-[30px] overflow-hidden'>

            <div className='h-[70px] flex justify-between items-center px-[14px]'>
                <InformationButton isInformationHovered={isInformationHovered} setIsInformationHovered={setIsInformationHovered}/>
                <AddStudySetToggleButton />
                <CloseButton onClick={closeAddStudySetPanel}/>
            </div>

            <div className={`w-[200%] h-full flex flex-row items-center justify-center duration-700 ${toggleDropBox.value ? 'translate-x-0' : '-translate-x-1/2'}`}>
                <div className={`h-full w-full flex justify-center items-center`}>
                    <DragZone 
                        setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
                    />
                </div>

                <div className={`h-full w-full flex justify-center items-center`}>

                    <div className='bg-transparent w-full h-full'>

                    </div>

                </div>
            </div>

        
        </div>
    </div>
  )
}

export default AddNewStudySetPanel