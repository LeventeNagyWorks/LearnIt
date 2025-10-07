import Button from '../../Button';
import {
  TbRewindForward10,
  TbRewindBackward10,
  TbArrowBarToLeft,
  TbArrowBarToRight,
} from 'react-icons/tb';

/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePages = 5;
  const halfVisible = Math.floor(visiblePages / 2);

  let startPage = Math.max(0, currentPage - halfVisible);
  let endPage = Math.min(startPage + visiblePages, totalPages);

  if (endPage - startPage < visiblePages) {
    startPage = Math.max(0, endPage - visiblePages);
  }

  const buttonClass =
    'w-[44px] h-8 text-lg rounded-lg font-poppins text-center border border-transparent hover:border-accent_green_dark select-none bg-slate-500/40 text-cstm_white transition-colors duration-500';

  return (
    <div className='flex items-center justify-center gap-2 mt-8'>
      <Button
        icon={<TbArrowBarToLeft className='w-5 h-5' />}
        onClick={() => onPageChange(0)}
        size='small'
        className={buttonClass}
      />
      <Button
        icon={<TbRewindBackward10 className='w-5 h-5' />}
        onClick={() => onPageChange(Math.max(0, currentPage - 10))}
        size='small'
        glow={false}
        className={buttonClass}
      />
      {Array.from({ length: endPage - startPage }, (_, index) => {
        const pageNumber = startPage + index;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`${buttonClass}
                            ${
                              currentPage === pageNumber
                                ? '!bg-accent_green_dark !text-cstm_bg_dark font-semibold'
                                : ''
                            } transition-colors duration-500`}
          >
            {pageNumber + 1}
          </button>
        );
      })}
      <Button
        icon={<TbRewindForward10 className='w-5 h-5' />}
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 10))}
        size='small'
        className={buttonClass}
      />
      <Button
        icon={<TbArrowBarToRight className='w-5 h-5' />}
        onClick={() => onPageChange(totalPages - 1)}
        size='small'
        className={buttonClass}
      />
    </div>
  );
};

export default Pagination;
