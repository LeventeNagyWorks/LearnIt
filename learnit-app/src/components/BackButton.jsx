/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to, className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`w-fit border-[2px] border-accent_green_dark hover:bg-accent_green_dark py-2 px-8 rounded-2xl text-accent_green_dark hover:text-cstm_bg_dark font-bold md:text-2xl duration-500 select-none cursor-pointer ${className}`}
      onClick={() => navigate(to)}
    >
      Back
    </button>
  );
};

export default BackButton;
