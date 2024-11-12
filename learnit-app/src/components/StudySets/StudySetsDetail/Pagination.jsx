/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`w-8 h-8 rounded-full font-poppins text-center select-none 
            ${currentPage === index 
              ? 'bg-accent_green_dark text-cstm_bg_dark font-semibold' 
              : 'bg-slate-500/40 text-cstm_white'
            } transition-colors duration-300`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
