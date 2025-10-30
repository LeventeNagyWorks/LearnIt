/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSignals } from '@preact/signals-react/runtime';
import ToggleButtons from '../ToggleButtons';
import { FaFolder, FaStar } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoTrashOutline } from 'react-icons/io5';
import {
  showDeleteWarningPopup,
  showOnlyFav,
  selectedStudysetNum,
  studysetSelected,
  showAddNewStudyset,
} from '../../signals';
import Button from '../Button';

const RightPanelHeader = () => {
  useSignals();

  const handleDeleteSelected = () => {
    const selectedItems = Object.keys(studysetSelected.value).filter(
      item => studysetSelected.value[item]
    );

    if (selectedItems.length > 0) {
      showDeleteWarningPopup.value = true;
    }
  };

  return (
    <div
      className={`w-full h-full max-h-[80px] md:max-h-[64px] flex flex-col md:flex-row justify-center items-center gap-2 rounded-t-[40px] px-7 py-1`}
    >
      <div className='w-full flex items-center justify-center'>
        <h1 className='w-fit text-xl md:text-3xl font-medium text-accent_green_dark select-none z-10'>
          Your Study Sets
        </h1>
      </div>
      <div className='flex w-full gap-4 items-center justify-between md:justify-end'>
        <Button
          className='block md:hidden'
          icon={<FiPlus className='w-5 h-5' />}
          size='small'
          onClick={() => (showAddNewStudyset.value = true)}
        />
        <div className='flex gap-4'>
          <ToggleButtons
            onLeftClick={() => (showOnlyFav.value = false)}
            onRightClick={() => (showOnlyFav.value = true)}
            leftIcon={<FaFolder />}
            rightIcon={<FaStar />}
            leftButtonColor='accent_green_dark'
            rightButtonColor='orange-400'
            leftShadowColor='rgba(40,255,0,0.7)'
            rightShadowColor='rgba(255,165,0,0.7)'
          />
          {selectedStudysetNum.value !== 0 && (
            <div className='w-fit h-full max-h-10 flex justify-center items-center gap-1 px-3 select-none bg-gray-600 rounded-full font-poppins font-medium text-2xl text-cstm_bg_dark'>
              <p className='text-accent_green_dark px-2'>
                {selectedStudysetNum.value}
              </p>
              <span className='rounded bg-cstm_white w-[2px] h-[20px]' />
              <Button
                color='red'
                severity='noBg'
                icon={<IoTrashOutline />}
                size='small'
                onClick={handleDeleteSelected}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPanelHeader;
