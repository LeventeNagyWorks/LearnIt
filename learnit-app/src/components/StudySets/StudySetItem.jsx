import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import StartButton from './StartButton';
import QuestionCounter from './QuestionCounter';
import OptionsButton from './OptionsButton';
import OptionsMenu from './OptionsMenu';
import Progress from './Progress';
import { studysetSelected } from '../../signals';

const StudySetItem = ({
  item,
  hoverStates,
  optionsHoverStates,
  isFavourite,
  data,
  setData,
  setHoverStates,
  setOptionsHoverStates,
  setIsFavourite,
  handleMouseEnter,
  handleMouseLeave,
  handleOptionsMouseEnter,
  handleOptionsMouseLeave,
  handleItemSelected,
}) => {
  return (
    <div
      className={`w-full flex flex-col justify-start gap-5 px-4 py-5 rounded-[20px] duration-500 overflow-hidden ${
        hoverStates[item.name] ? 'bg-slate-800 min-h-40 h-fit' : 'min-h-20 h-20'
      } ${studysetSelected.value[item.name] ? 'bg-slate-700' : ''}`}
      key={item.name}
      onMouseEnter={() => handleMouseEnter(item.name)}
      onMouseLeave={() => handleMouseLeave(item.name)}
      onClick={() => handleItemSelected(item.name)}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='flex gap-6'>
          <div
            className={`flex gap-5 duration-500 ${
              hoverStates[item.name] ? 'translate-x-0' : '-translate-x-[65px]'
            }`}
          >
            <StartButton itemName={item.name} />
            <h2
              className={`text-xl md:text-[28px] flex items-center font-medium selection:bg-accent_green_dark ${
                hoverStates[item.name]
                  ? 'text-accent_green_dark selection:text-cstm_white'
                  : 'text-cstm_white'
              }`}
            >
              {item.name}
            </h2>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 md:gap-5 lg:gap-10 relative'>
          {isFavourite[item.name] && (
            <FaStar className='w-6 h-6 text-accent_orange_dark ' />
          )}
          <QuestionCounter
            className={'hidden md:block'}
            questionLength={item.questions.length}
          />
          <div
            onMouseEnter={() => handleOptionsMouseEnter(item.name)}
            onMouseLeave={() => handleOptionsMouseLeave(item.name)}
          >
            <OptionsButton />
          </div>

          <OptionsMenu
            itemName={item.name}
            data={data}
            setData={setData}
            setHoverStates={setHoverStates}
            setOptionsHoverStates={setOptionsHoverStates}
            optionsHoverStates={optionsHoverStates}
            isFavourite={isFavourite}
            setIsFavourite={setIsFavourite}
            handleOptionsMouseEnter={handleOptionsMouseEnter}
            handleOptionsMouseLeave={handleOptionsMouseLeave}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
      </div>

      <Progress hoverStates={hoverStates} itemName={item.name} />
    </div>
  );
};

StudySetItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
  }).isRequired,
  hoverStates: PropTypes.object.isRequired,
  optionsHoverStates: PropTypes.object.isRequired,
  isFavourite: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  setHoverStates: PropTypes.func.isRequired,
  setOptionsHoverStates: PropTypes.func.isRequired,
  setIsFavourite: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleOptionsMouseEnter: PropTypes.func.isRequired,
  handleOptionsMouseLeave: PropTypes.func.isRequired,
  handleItemSelected: PropTypes.func.isRequired,
};

export default StudySetItem;
