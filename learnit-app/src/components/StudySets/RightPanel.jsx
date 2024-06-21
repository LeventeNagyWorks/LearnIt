/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react'

import DeleteButton from './DeleteButton';
import OptionsButton from './OptionsButton';
import StartButton from './StartButton';

import { IoChatbox } from "react-icons/io5";

const RightPanel = () => {

  const [data, setData] = useState([]);
  const [hoverStates, setHoverStates] = useState({});
  const [isOptionsOpen, setIsOptionsOpen] = useState({});

  useEffect(() => {
    axios.get('/data')
     .then(({data}) => {
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

  const handleOptionsClick = (itemName) => {
    setIsOptionsOpen((prevIsOptionsOpen) => ({...prevIsOptionsOpen, [itemName]:!prevIsOptionsOpen[itemName] }));
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
                  className={`w-full h-20 flex items-center justify-between px-4 rounded-[20px] duration-500 ${hoverStates[item.name] ? 'bg-slate-800' : ''}`}
                  key={item.name}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={() => handleMouseLeave(item.name)}
                >
                  <div className='flex gap-6'>
                    <div className={`${hoverStates[item.name] ? 'block' : 'hidden'}`}>
                      <StartButton />
                    </div>
                    <h2 className={`text-[28px] font-medium ${hoverStates[item.name] ? 'text-accent_green_dark' : 'text-cstm_white'}`}>{item.name}</h2>
                  </div>

                  <div className='flex justify-center items-center gap-10 relative'>
                    <div className='w-14 flex justify-center items-center relative'>
                      <p className='text-cstm_bg_dark text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>{item.questions.length}</p>
                      <IoChatbox className={`w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-slate-300 z-0`}/>
                    </div>

                    <OptionsButton data-item-name={item.name} onClick={() => handleOptionsClick(item.name)} />

                    <div className={`w-[250px] h-32 flex absolute top-0 right-0 bg-slate-600 z-20 ${isOptionsOpen[item.name]? 'block' : 'hidden'} options-menu`}>
                      {isOptionsOpen[item.name] && (
                        <div>
                          {/* Options menu content goes here */}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>

        </div>

    </div>
  )
}

export default RightPanel