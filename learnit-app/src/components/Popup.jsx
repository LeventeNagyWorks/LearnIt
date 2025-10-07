import PropTypes from 'prop-types';
import { popupIcons } from '../assets/icons/popupIcons';

const Popup = ({
  type,
  title,
  message,
  onClickPrim,
  onClickSec,
  primButtonText,
  secButtonText,
}) => {
  // Runtime validation
  const validTypes = ['error', 'warning', 'successful'];

  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid popup type: ${type}. Must be one of: ${validTypes.join(', ')}`
    );
  }

  if (!title) {
    throw new Error('Popup title is required');
  }

  if (!message) {
    throw new Error('Popup message is required');
  }

  if (!primButtonText) {
    throw new Error('Primary button text is required');
  }

  if (!onClickPrim) {
    throw new Error('Primary button click handler is required');
  }

  return (
    <div className='absolute w-screen h-screen z-50 bg-black/70 backdrop-blur-md flex justify-center items-center px-32'>
      <div
        className={`w-full h-full max-w-[900px] max-h-[600px] flex flex-col justify-center items-center gap-4 bg-gradient-to-br rounded-[40px] font-poppins overflow-hidden select-none 
                ${
                  type === 'error'
                    ? 'from-50% from-gray-900 to-red-950'
                    : type === 'warning'
                    ? 'from-50% from-gray-900 to-yellow-800'
                    : 'from-gray-900 to-green-800'
                }`}
      >
        <div className='w-full flex px-8 items-center gap-10'>
          {popupIcons[type]()}
          <div className='flex flex-col justify-start self-start'>
            <h1 className='font-poetsen font-bold text-cstm_white text-[80px] mb-10'>
              {title}
            </h1>
            <p className='font-bold text-cstm_white text-[28px]'>{message}</p>
          </div>
        </div>

        <div
          className={`w-full flex ${
            secButtonText ? 'justify-between px-52' : 'justify-end px-40'
          } gap-5 `}
        >
          {secButtonText && (
            <button
              className={`w-fit h-fit px-7 py-1 flex justify-center items-center rounded-xl border-2 self-end cursor-pointer duration-500 font-poppins font-medium text-cstm_white text-[40px] ${
                type === 'error'
                  ? `border-red-700 hover:bg-red-700`
                  : type === 'warning'
                  ? `border-accent_orange_dark hover:bg-accent_orange_dark`
                  : type === 'successful'
                  ? `border-accent_green_dark hover:bg-accent_green_dark`
                  : ''
              }`}
              onClick={() => onClickSec()}
            >
              {secButtonText}
            </button>
          )}
          <button
            className={`w-fit h-fit px-7 py-1 flex justify-center items-center rounded-xl border-2 self-end cursor-pointer duration-500 font-poppins font-medium text-cstm_white text-[40px] ${
              type === 'error'
                ? `border-red-700 hover:bg-red-700 ${
                    secButtonText ? 'bg-red-700' : ''
                  } `
                : type === 'warning'
                ? `border-accent_orange_dark  ${
                    secButtonText
                      ? 'bg-accent_orange_dark hover:bg-orange-500 hover:border-orange-500'
                      : 'hover:bg-accent_orange_dark'
                  }`
                : type === 'successful'
                ? `border-accent_green_dark hover:bg-accent_green_dark ${
                    secButtonText ? 'bg-accent_green_dark' : ''
                  }`
                : ''
            }`}
            onClick={() => onClickPrim()}
          >
            {primButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'successful']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  primButtonText: PropTypes.string.isRequired,
  secButtonText: PropTypes.string,
  onClickPrim: PropTypes.func.isRequired,
  onClickSec: PropTypes.func,
};

export default Popup;
