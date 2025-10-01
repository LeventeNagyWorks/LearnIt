/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { FaRegStar, FaStar } from 'react-icons/fa';

const FavouriteButton = ({ isWide, isFavourite, onClick, itemName }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${
        isWide ? 'w-full h-fit rounded-t-xl' : 'w-fit h-fit rounded-xl'
      } flex justify-center items-center duration-500 cursor-pointer gap-2 px-2 py-2 select-none ${
        isHovered ? 'bg-accent_orange_dark' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(itemName)}
    >
      {isFavourite === false && (
        <FaRegStar
          className={`w-6 h-6 ${
            isHovered ? 'text-cstm_white' : 'text-accent_orange_dark'
          }`}
        />
      )}
      {isFavourite && (
        <FaStar
          className={`w-6 h-6 ${
            isHovered ? 'text-cstm_white' : 'text-accent_orange_dark'
          }`}
        />
      )}
      <p
        className={`text-lg font-poppins font-semibold duration-500 ${
          isWide ? 'block' : 'hidden'
        } ${isHovered ? 'text-cstm_white' : 'text-accent_orange_dark'}`}
      >
        FAVOURITE
      </p>
    </div>
  );
};

export default FavouriteButton;
