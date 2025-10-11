/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';

import FavouriteButton from './FavouriteButton';
import DeleteButton from './DeleteButton';
import {
  showDeleteWarningPopup,
  studysetSelected,
  selectedStudysetNum,
} from '../../signals';
import ShareButton from './ShareButton';

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
  setHoverStates,
  setOptionsHoverStates,
  showDeleteWarning,
}) => {
  const isHovered = optionsHoverStates[itemName] || false;

  const handleIsFavourite = async itemName => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      const newFavoriteStatus = !isFavourite[itemName];

      const response = await axios.post(
        '/updateFavorite',
        {
          itemName,
          isFavorite: newFavoriteStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const newFavorites = {
          ...isFavourite,
          [itemName]: newFavoriteStatus,
        };

        setIsFavourite(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        // Update the main data state
        setData(prevData =>
          prevData.map(item =>
            item.name === itemName
              ? { ...item, isFavorite: newFavoriteStatus }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleClick = e => {
    e.stopPropagation(); // Prevent event from bubbling up
  };

  const handleDeleteClick = () => {
    // Set the current item as selected for deletion
    studysetSelected.value = { [itemName]: true };
    selectedStudysetNum.value = 1;
    showDeleteWarningPopup.value = true;
  };

  // TODO: fix the favourite status on delete

  return (
    <div
      className={`w-[250px] h-fit flex flex-col items-start justify-center absolute top-0 right-0 bg-gradient-to-r from-slate-600 to-slate-500 rounded-xl z-20 duration-500 ${
        isHovered ? 'translate-x-0' : 'translate-x-72'
      }`}
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
      <ShareButton isWide={true} onClick={null} itemName={itemName} />
      <DeleteButton
        isWide={true}
        itemName={itemName}
        onClick={handleDeleteClick}
      />
    </div>
  );
};

export default OptionsMenu;
