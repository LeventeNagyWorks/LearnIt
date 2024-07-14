/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

import DeleteButton from './DeleteButton'
import { LuTextSelect } from "react-icons/lu";
import ShowOnlyFavouriteToggleButton from './ShowOnlyFavouriteToggleButton';
import axios from 'axios';

const RightPanelHeader = ({ selectedItemNum, itemSelected, setItemSelected, setSelectedItemNum, setData  }) => {


  const handleDelete = async () => {
    const selectedItems = Object.keys(itemSelected).filter(item => itemSelected[item]);
    
    for (const item of selectedItems) {
      try {
        await axios.delete(`/delete/${item}`);
        setData(prevData => prevData.filter(dataItem => dataItem.name !== item));
      } catch (error) {
        console.error(`Error deleting ${item}:`, error);
      }
    }

    setItemSelected({});
    setSelectedItemNum(0);
  };

  return (
    <div className={`w-full h-24 flex justify-center items-center rounded-t-[40px] px-7`}>
      <div className='w-full flex items-center justify-start'>
        <h1 className='w-fit text-5xl font-medium text-cstm_white select-none z-10'>Your Study Sets</h1>
      </div>
      <div className={`w-fit h-12 flex justify-end items-center gap-3 py-1`}>
        <ShowOnlyFavouriteToggleButton />
        {selectedItemNum !== 0 && (
          <div className='w-fit h-full flex justify-center items-center gap-2 select-none bg-slate-800 px-3 rounded-lg font-poppins font-medium text-2xl text-cstm_bg_dark'>
            <LuTextSelect className='w-7 h-7 text-cstm_white'/>
            <span className='rounded bg-cstm_white w-[2px] h-[20px]'/>
            <p className='text-accent_green_dark'>{selectedItemNum}</p>
          </div>
        )}
        <DeleteButton 
          isWide={false}
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default RightPanelHeader