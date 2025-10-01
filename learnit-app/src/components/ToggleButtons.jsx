import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSignals } from '@preact/signals-react/runtime';

const ToggleButtons = ({
  onLeftClick,
  onRightClick,
  leftIcon,
  rightIcon,
  leftButtonColor,
  rightButtonColor,
  leftShadowColor,
  rightShadowColor,
}) => {
  useSignals();

  const [activeButton, setActiveButton] = useState('left');
  const isActive = button => button === activeButton;

  const handleLeftClick = () => {
    setActiveButton('left');
    if (onLeftClick) onLeftClick();
  };

  const handleRightClick = () => {
    setActiveButton('right');
    if (onRightClick) onRightClick();
  };

  const getButtonClass = (side, buttonColor) => {
    const baseClass =
      side === 'left'
        ? 'p-2 rounded-l-full border border-transparent'
        : 'p-2 rounded-r-full border border-transparent';
    const activeClass = isActive(side)
      ? buttonColor === 'accent_green_dark'
        ? 'bg-accent_green_dark'
        : 'bg-accent_orange_dark'
      : 'bg-gray-600';
    const hoverClass =
      buttonColor === 'accent_green_dark'
        ? 'hover:border-accent_green_dark'
        : 'hover:border-accent_orange_dark';

    return `${baseClass} ${activeClass} ${hoverClass} duration-500 transition-all`;
  };

  return (
    <div className='w-fit max-h-10 h-full flex rounded-full bg-gray-700 text-cstm_white'>
      <button
        onClick={handleLeftClick}
        className={getButtonClass('left', leftButtonColor)}
        style={{
          boxShadow: isActive('left')
            ? `0 0 36px ${leftShadowColor || 'rgba(40,255,0,0.7)'}`
            : 'none',
        }}
        onMouseEnter={e => {
          if (!isActive('left')) {
            e.target.style.boxShadow = `0 0 36px ${
              leftShadowColor || 'rgba(40,255,0,0.7)'
            }`;
          }
        }}
        onMouseLeave={e => {
          if (!isActive('left')) {
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        {leftIcon}
      </button>
      <button
        onClick={handleRightClick}
        className={getButtonClass('right', rightButtonColor)}
        style={{
          boxShadow: isActive('right')
            ? `0 0 36px ${rightShadowColor || 'rgba(255,165,0,0.7)'}`
            : 'none',
        }}
        onMouseEnter={e => {
          if (!isActive('right')) {
            e.target.style.boxShadow = `0 0 36px ${
              rightShadowColor || 'rgba(255,165,0,0.7)'
            }`;
          }
        }}
        onMouseLeave={e => {
          if (!isActive('right')) {
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        {rightIcon}
      </button>
    </div>
  );
};

ToggleButtons.propTypes = {
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  leftButtonColor: PropTypes.string,
  rightButtonColor: PropTypes.string,
  leftShadowColor: PropTypes.string,
  rightShadowColor: PropTypes.string,
};

export default ToggleButtons;
