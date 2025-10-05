/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = ({
  severity = 'primary',
  text,
  size = 'normal',
  color = 'green',
  onClick,
  icon,
  glow = false,
  className = '',
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses =
    'w-full h-full flex justify-center gap-2 items-center font-poppins text-center duration-500 select-none cursor-pointer';

  const sizeClasses = {
    small: `text-md rounded-lg p-2 ${
      !text && icon ? 'max-w-8 max-h-8' : 'max-w-fit max-h-8 font-medium'
    }`,
    normal: `text-lg px-4 py-3 max-w-24 max-h-12 rounded-xl font-semibold ${
      !text && icon ? 'max-w-10 !max-h-10' : 'max-w-fit max-h-12'
    }`,
    large: `text-xl px-8 py-4 rounded-2xl font-bold ${
      !text && icon ? 'max-w-12 max-h-20' : 'max-w-fit max-h-20'
    }`,
  };

  const severityClasses = {
    primary:
      color === 'red'
        ? `text-white bg-red-600 ${
            isHovered && !disabled ? 'bg-red-700' : 'bg-red-600'
          }`
        : `text-cstm_bg_dark bg-accent_green_dark ${
            isHovered && !disabled
              ? 'bg-accent_green_dark2'
              : 'bg-accent_green_dark'
          }`,
    outline:
      color === 'red'
        ? `border-[2px] border-red-600 text-red-600 ${
            isHovered && !disabled ? 'bg-red-600 !text-white' : 'bg-transparent'
          }`
        : `border-[2px] border-accent_green_dark text-accent_green_dark ${
            isHovered && !disabled
              ? 'bg-accent_green_dark text-cstm_bg_dark'
              : 'bg-transparent'
          }`,
    noBg:
      color === 'red'
        ? `border-[2px] border-transparent text-red-600 ${
            isHovered && !disabled ? 'bg-red-600 !text-white' : 'bg-transparent'
          }`
        : `border-[2px] border-transparent text-accent_green_dark ${
            isHovered && !disabled
              ? 'bg-accent_green_dark text-cstm_bg_dark'
              : 'bg-transparent'
          }`,
  };

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';

  const glowEffect =
    glow && isHovered && !disabled
      ? severity === 'red' || color === 'red'
        ? 'shadow-[0_0_36px_rgba(255,0,0,0.7)]'
        : 'shadow-[0_0_36px_rgba(40,255,0,0.7)]'
      : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${severityClasses[severity]} ${disabledClasses} ${glowEffect} ${className}`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {icon && <span className='flex items-center'>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
