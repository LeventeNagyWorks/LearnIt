import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSignals } from '@preact/signals-react/runtime';

const ToggleButtons = ({ onLeftClick, onRightClick, leftIcon, rightIcon, leftButtonColor, rightButtonColor, leftShadowColor, rightShadowColor }) => {

    useSignals()

    const [activeButton, setActiveButton] = useState('left');
    const isActive = (button) => button === activeButton;
    
    const handleLeftClick = () => {
        setActiveButton('left');
        if (onLeftClick) onLeftClick();
    };

    const handleRightClick = () => {
        setActiveButton('right');
        if (onRightClick) onRightClick();
    };
    
    return (
        <div className="w-fit max-h-10 h-full flex rounded-full bg-gray-700 text-cstm_white">
            <button 
                onClick={handleLeftClick}
                className={`p-2 rounded-l-full border border-transparent hover:border-${leftButtonColor} ${isActive('left') ? 'bg-' + leftButtonColor : 'bg-gray-600'} duration-500 transition-all`}
                style={{
                    boxShadow: isActive('left') ? `0 0 36px ${leftShadowColor || 'rgba(40,255,0,0.7)'}` : 'none'
                }}
                onMouseEnter={(e) => {
                    if (!isActive('left')) {
                        e.target.style.boxShadow = `0 0 36px ${leftShadowColor || 'rgba(40,255,0,0.7)'}`;
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive('left')) {
                        e.target.style.boxShadow = 'none';
                    }
                }}
            >
                {leftIcon}
            </button>
            <button 
                onClick={handleRightClick}
                className={`p-2 rounded-r-full border border-transparent hover:border-${rightButtonColor} ${isActive('right') ? 'bg-' + rightButtonColor : 'bg-gray-600'} transition-all duration-500`}
                style={{
                    boxShadow: isActive('right') ? `0 0 36px ${rightShadowColor || 'rgba(255,165,0,0.7)'}` : 'none'
                }}
                onMouseEnter={(e) => {
                    if (!isActive('right')) {
                        e.target.style.boxShadow = `0 0 36px ${rightShadowColor || 'rgba(255,165,0,0.7)'}`;
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive('right')) {
                        e.target.style.boxShadow = 'none';
                    }
                }}
            >
                {rightIcon}
            </button>
        </div>
    );
}

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