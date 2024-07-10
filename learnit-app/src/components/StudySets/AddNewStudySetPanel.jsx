/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import CloseButton from './CloseButton';
import DragZone from './DragZone';
DragZone

const AddNewStudySetPanel = ({ closeAddStudySetPanel, setIsStudySetAlreadyExistsActive }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='absolute z-30 w-screen h-screen flex justify-center items-center bg-black/70'>
        <div className='w-[85%] h-[90%] bg-gradient-to-br from-slate-800 from-60% to-green-800 rounded-[30px]'>

            <div className='h-[70px] flex justify-end items-center px-[14px]'>
                <CloseButton onClick={closeAddStudySetPanel}/>
            </div>

            <div className='h-full flex justify-center items-center'>
                <DragZone 
                    setIsStudySetAlreadyExistsActive={setIsStudySetAlreadyExistsActive}
                />
            </div>

        </div>
    </div>
  )
}

export default AddNewStudySetPanel