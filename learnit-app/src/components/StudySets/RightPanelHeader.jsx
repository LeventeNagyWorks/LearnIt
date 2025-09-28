/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

import DeleteButton from './DeleteButton'
import { LuTextSelect } from "react-icons/lu";
import ShowOnlyFavouriteToggleButton from './ShowOnlyFavouriteToggleButton';
import axios from 'axios';
import { useSignals } from '@preact/signals-react/runtime';
import ToggleButtons from '../ToggleButtons';
import { FaFolder, FaStar } from 'react-icons/fa';
import { showDeleteWarningPopup, showOnlyFav, itemToDeleteSignal } from '../../signals';

const RightPanelHeader = ({ selectedItemNum, itemSelected, setItemSelected, setSelectedItemNum, setData }) => {

  useSignals();

  const handleDeleteSelected = () => {
    const selectedItems = Object.keys(itemSelected).filter(item => itemSelected[item]);
    
    if (selectedItems.length > 0) {
      // Set all selected items to delete
      itemToDeleteSignal.value = selectedItems;
      showDeleteWarningPopup.value = true;
    }
  };

  return (
    <div className={`w-full h-full max-h-[64px] flex justify-center items-center rounded-t-[40px] px-7`}>
      <div className='w-full flex items-center justify-center'>
        <h1
          className='w-fit text-3xl font-medium text-accent_green_dark select-none z-10'
        >Your Study Sets</h1>
      </div >
      <div className='flex gap-4 items-center'>
        <ToggleButtons
          onLeftClick={() => showOnlyFav.value = false }
          onRightClick={() => showOnlyFav.value = true }
          leftIcon={<FaFolder />}
          rightIcon={<FaStar />}
          leftButtonColor="accent_green_dark"
          rightButtonColor="orange-400"
          leftShadowColor="rgba(40,255,0,0.7)"
          rightShadowColor="rgba(255,165,0,0.7)"
        />
        {selectedItemNum !== 0 && (
            <div className='w-fit h-full max-h-10 flex justify-center items-center gap-1 px-3 select-none bg-gray-500 rounded-full font-poppins font-medium text-2xl text-cstm_bg_dark'>
              <p className='text-accent_green_dark px-2'>{selectedItemNum}</p>
              <span className='rounded bg-cstm_white w-[2px] h-[20px]' />
              <DeleteButton
                isWide={false}
                size='small'
                onClick={handleDeleteSelected}
              />
            </div>
        )}
      </div>
    </div>
  )
}

export default RightPanelHeader