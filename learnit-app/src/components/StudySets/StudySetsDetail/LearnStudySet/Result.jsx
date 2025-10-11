/* eslint-disable react/prop-types */
import Progress from '../../Progress';
import { GiCrownCoin } from 'react-icons/gi';
import Button from '../../../Button';
import { useNavigate } from 'react-router-dom';
import Counter from '../../../Counter';

const Result = ({ score, itemName }) => {
  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-8 text-3xl px-[15%] py-[5%] font-poppins text-cstm_white bg-cstm_bg_dark selection:bg-accent_green_dark selection:text-cstm_bg_dark select-none'>
      <div className='h-40 flex justify-center items-center'>
        <h1 className='text-3xl md:text-7xl text-center text-accent_green_dark'>
          Congratulations!
        </h1>
      </div>

      <div className='w-fit h-fit flex flex-col justify-center items-center gap-10 bg-slate-500/40 rounded-[30px] py-5'>
        <Progress isDetailedPage={true} itemName={itemName} />
      </div>

      <div className='w-full h-fit flex flex-col justify-center items-center gap-10 rounded-[30px] py-5'>
        <div className='flex gap-6 items-center'>
          <GiCrownCoin className='text-accent_green_dark text-[70px]' />
          <div className='flex items-center gap-1 text-cstm_white text-[70px]'>
            <Counter value={score} />
          </div>
        </div>
      </div>

      <div className='w-full h-36 flex flex-row justify-center items-center gap-10'>
        <Button
          text='Back'
          severity='outline'
          onClick={() => navigate(`/study-sets/${itemName}`)}
        />
        <Button text='Next Round' glow={true} onClick={refreshPage} />
      </div>
    </div>
  );
};

export default Result;
