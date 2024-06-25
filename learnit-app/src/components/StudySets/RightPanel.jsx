/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import DeleteButton from './DeleteButton';
import OptionsButton from './OptionsButton';
import StartButton from './StartButton';

import { IoChatbox } from "react-icons/io5";

const RightPanel = () => {
  const [data, setData] = useState([]);
  const [hoverStates, setHoverStates] = useState({});
  const [optionsHoverStates, setOptionsHoverStates] = useState({});

  useEffect(() => {
    axios.get('/data')
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));
  }, [setData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get('/data')
        .then(({ data }) => {
          console.log(data);
          setData(data);
        })
        .catch(error => console.error(error));
    }, 1000); // Fetch data every 1 second

    return () => clearInterval(intervalId);
  }, [setData]); // Add setData as a dependency

  const handleMouseEnter = (itemName) => {
    setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [itemName]: true }));
  };

  const handleMouseLeave = (itemName) => {
    setHoverStates((prevHoverStates) => ({ ...prevHoverStates, [itemName]: false }));
  };

  const handleOptionsMouseEnter = (itemName) => {
    setOptionsHoverStates((prevOptionsHoverStates) => ({ ...prevOptionsHoverStates, [itemName]: true }));
  };

  const handleOptionsMouseLeave = (itemName) => {
    setOptionsHoverStates((prevOptionsHoverStates) => ({ ...prevOptionsHoverStates, [itemName]: false }));
  };

  return (
    <div className='w-[70%] flex justify-center items-center relative z-10 font-poppins'>
      <div className='w-[90%] h-[90%] flex flex-col justify-center items-center bg-gradient-to-br from-white/30 to-slate-600/30 backdrop-blur-md rounded-[40px] shadow-2xl'>
        <div className='w-full h-24 flex justify-center items-center rounded-t-[40px]'>
          <div className='w-full flex items-center justify-center'>
            <h1 className='w-fit text-5xl font-medium text-cstm_white select-none z-10'>Your Study Sets</h1>
          </div>
          <div className='w-fit h-12 flex justify-end items-center gap-6 pr-6'>
            <DeleteButton />
          </div>
        </div>
        <div className='w-full h-full flex flex-col rounded-b-[40px] px-4'>
          {data.map((item) => (
            <div
              className={`w-full flex flex-col justify-start gap-5 px-4 py-5 rounded-[20px] duration-500 overflow-hidden ${hoverStates[item.name] ? 'bg-slate-800 h-40' : 'h-20'}`}
              key={item.name}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave(item.name)}
            >

              <div className='flex flex-row items-center justify-between'>
                <div className='flex gap-6'>

                  <div className={`flex gap-5 duration-500 ${hoverStates[item.name] ? 'translate-x-0' : '-translate-x-[65px]'}`}>
                    <StartButton />
                    <h2 className={`text-[28px] font-medium ${hoverStates[item.name] ? 'text-accent_green_dark' : 'text-cstm_white'}`}>{item.name}</h2>
                  </div>
                  
                </div>
                <div className='flex justify-center items-center gap-10 relative'>
                  <div className='flex justify-center items-center rounded-lg px-2 py-1 bg-gray-600'>
                    <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>{item.questions.length} questions</p>
                  </div>

                  <div
                    onMouseEnter={() => handleOptionsMouseEnter(item.name)}
                    onMouseLeave={() => handleOptionsMouseLeave(item.name)}
                  >
                    <OptionsButton />
                  </div>

                  <div
                    className={`w-[250px] h-32 flex items-start justify-center absolute top-0 right-0 bg-slate-600 rounded-xl z-20 duration-500 ${optionsHoverStates[item.name] ? 'block' : 'hidden'}`}
                    onMouseEnter={() => handleOptionsMouseEnter(item.name)}
                    onMouseLeave={() => handleOptionsMouseLeave(item.name)}
                  >
                    <DeleteButton />
                  </div>

                </div>
              </div>

              <div className={`w-full flex justify-between duration-700 ${hoverStates[item.name] ? 'translate-x-0' : '-translate-x-64'}`}>
                <div className={`flex flex-col items-start gap-1 mx-5`}>
                  <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg relative z-10'>Progress</p>

                  <div className='flex items-center gap-2'>
                    <div className='w-[300px] h-2 bg-white rounded-full'>
                      {/* make the Progress bar here */}
                    </div>

                    <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>0 learnt</p>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
