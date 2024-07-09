/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios';

import FavouriteButton from './FavouriteButton';
import DeleteButton from './DeleteButton';

const OptionsMenu = ({ 
  optionsHoverStates, 
  itemName, 
  isFavourite, 
  setIsFavourite, 
  handleOptionsMouseEnter, 
  handleOptionsMouseLeave, 
  handleMouseLeave, 
  data, 
  setData,
  setItemSelected,
  setSelectedItemNum
}) => {

    const isHovered = optionsHoverStates[itemName] || false;

    const handleIsFavourite = (itemName) => {
        setIsFavourite((prevState) => {
          const newState = { ...prevState, [itemName]: !prevState[itemName] };
          localStorage.setItem('favorites', JSON.stringify(newState));
          return newState;
        });
    };

    const handleDelete = async (itemName) => {
      try {
        setItemSelected((prevState) => {
          const newState = { ...prevState, [itemName]: false };
          const selectedCount = Object.values(newState).filter(Boolean).length;
          setSelectedItemNum(selectedCount);
          return newState;
        });
        await handleMouseLeave(itemName);
        await handleOptionsMouseLeave(itemName);
        await axios.delete(`/delete/${itemName}`);
        // Update the local state by filtering out the deleted item
        setData(data.filter((item) => item.name !== itemName));
      } catch (error) {
        console.error(error);
      }
    };
      
    const handleClick = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
    };

  return (
    <div
      className={`w-[250px] h-fit flex flex-col items-start justify-center absolute top-0 right-0 bg-gradient-to-r from-slate-600 to-slate-500 rounded-xl z-20 duration-500 ${isHovered ? 'translate-x-0' : 'translate-x-72'}`}
      onMouseEnter={() => handleOptionsMouseEnter(itemName)}
      onMouseLeave={() => handleOptionsMouseLeave(itemName)}
      onClick={handleClick}
    >
      <FavouriteButton 
        isWide={true} 
        isFavourite={isFavourite[itemName] || false}
        onClick={handleIsFavourite} 
        itemName={itemName}
      />
      <DeleteButton 
          isWide={true}
          itemName={itemName}
          onClick={handleDelete}
      />
    </div>
  )
}

export default OptionsMenu