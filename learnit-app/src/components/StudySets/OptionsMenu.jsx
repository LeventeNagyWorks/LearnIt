/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios';

import FavouriteButton from './FavouriteButton';
import DeleteButton from './DeleteButton';
import { showOnlyFav } from '../../signals';

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
  setSelectedItemNum,
  setHoverStates,
  setOptionsHoverStates
}) => {

    const isHovered = optionsHoverStates[itemName] || false;

    const handleIsFavourite = async (itemName) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      try {
        const newFavoriteStatus = !isFavourite[itemName];
        
        await axios.post('/updateFavorite', {
          itemName,
          isFavorite: newFavoriteStatus
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        setIsFavourite(prev => ({
          ...prev,
          [itemName]: newFavoriteStatus
        }));
    
        setData(prevData => prevData.map(item =>
          item.name === itemName ? {...item, isFavorite: newFavoriteStatus} : item
        ));
      } catch (error) {
        console.error('Error updating favorite status:', error);
      }
    };
    

    const handleDelete = async (itemName) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      try {
        await setItemSelected((prevState) => {
          const newState = { ...prevState, [itemName]: false };
          const selectedCount = Object.values(newState).filter(Boolean).length;
          setSelectedItemNum(selectedCount);
          return newState;
        });
        await handleMouseLeave(itemName);
        await handleOptionsMouseLeave(itemName);
        
        await axios.delete(`/delete/${itemName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
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