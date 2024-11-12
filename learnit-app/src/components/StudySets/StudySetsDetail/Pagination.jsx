/* eslint-disable react/prop-types */
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    // Calculate start page to keep current page centered
    const startPage = Math.max(0, Math.min(totalPages - 9, currentPage - 4));
    const endPage = Math.min(startPage + 9, totalPages);

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: endPage - startPage }, (_, index) => {
                const pageNumber = startPage + index;
                const distance = Math.abs(currentPage - pageNumber);

                const sizeClass = distance > 3
                    ? 'w-6 h-6 text-sm'
                    : distance > 2
                        ? 'w-7 h-7 text-base'
                        : 'w-8 h-8 text-lg';

                return (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`${sizeClass} rounded-full font-poppins text-center select-none
                            ${currentPage === pageNumber
                                ? 'bg-accent_green_dark text-cstm_bg_dark font-semibold'
                                : 'bg-slate-500/40 text-cstm_white'
                            } transition-colors duration-500`}
                    >
                        {pageNumber + 1}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
