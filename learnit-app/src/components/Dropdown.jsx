import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa6';

const Dropdown = ({ array, placeholder, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedValue, setInternalSelectedValue] = useState(
    selectedValue || ''
  );
  const dropdownRef = useRef(null);

  // Sync internal state with prop changes
  useEffect(() => {
    setInternalSelectedValue(selectedValue || '');
  }, [selectedValue]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = item => {
    setInternalSelectedValue(item.id);
    setIsOpen(false);
    if (onChange) {
      onChange(item.id);
    }
  };

  const selectedItem = array.find(item => item.id === internalSelectedValue);
  const displayText = selectedItem ? selectedItem.name : placeholder;

  return (
    <div className='relative w-full max-w-sm h-full max-h-8' ref={dropdownRef}>
      <button
        type='button'
        className='w-full h-full px-4 py-[6px] rounded-xl border border-accent_green_dark focus:ring-4 ring-accent_green_dark/20 outline-none bg-slate-800 text-cstm_white font-poppins text-sm flex items-center justify-between'
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className={selectedItem ? 'text-cstm_white' : 'text-gray-400'}>
          {displayText}
        </span>
        <FaChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-2 bg-slate-800 border border-accent_green_dark rounded-xl shadow-lg max-h-60 overflow-auto p-3'>
          {array.map(item => (
            <button
              key={item.id}
              type='button'
              className={`w-full p-2 text-left text-cstm_white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none rounded-lg transition-colors duration-150 ${
                item.id === internalSelectedValue ? 'bg-slate-700' : ''
              }`}
              onClick={() => handleSelect(item)}
              role='option'
              aria-selected={item.id === internalSelectedValue}
            >
              <div className='flex items-center justify-between w-full'>
                <span>{item.name}</span>
                {item.id === internalSelectedValue && (
                  <FaCheck className='w-4 h-4 text-accent_green_dark' />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default Dropdown;
