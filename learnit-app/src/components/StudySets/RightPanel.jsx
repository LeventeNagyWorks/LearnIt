/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import OptionsButton from './OptionsButton';
import StartButton from './StartButton';

import { FaStar } from "react-icons/fa";
import QuestionCounter from './QuestionCounter';
import Progress from './Progress';
import OptionsMenu from './OptionsMenu';
import RightPanelHeader from './RightPanelHeader';
import { showOnlyFav, startTransitionFromStudySets, startTransitionToStudySets, studySetsData } from '../../signals';
import { useSignals } from '@preact/signals-react/runtime';

const RightPanel = () => {

  useSignals();

  const [data, setData] = useState([]);
  const [hoverStates, setHoverStates] = useState({});
  const [optionsHoverStates, setOptionsHoverStates] = useState({});
  const [itemSelected, setItemSelected] = useState(
    data.reduce((acc, item) => ({ ...acc, [item.name]: false }), {})
  );
  const [selectedItemNum, setSelectedItemNum] = useState(0);
  const [isFavourite, setIsFavourite] = useState(
    data.reduce((acc, item) => ({ ...acc, [item.name]: false }), {})
  );

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
  
      try {
        const { data: responseData } = await axios.get('/data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Create favorites object from server data
        const favorites = responseData.reduce((acc, item) => {
          acc[item.name] = item.isFavorite;
          return acc;
        }, {});
  
        setData(responseData);
        studySetsData.value = [...responseData];
        setIsFavourite(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

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

  const handleItemSelected = (itemName) => {
    setItemSelected((prevState) => {
      const newState = { ...prevState, [itemName]: !prevState[itemName] };
      const selectedCount = Object.values(newState).filter(Boolean).length;
      setSelectedItemNum(selectedCount);
      return newState;
    });
  };

  return (
    <div className={`w-[85%] flex justify-center items-start relative z-10 pb-6 font-poppins duration-1000`}>
      <div className='w-[90%] h-[100%] flex flex-col justify-center items-center bg-gradient-to-br from-white/30 to-slate-600/30 backdrop-blur-md rounded-[40px] shadow-2xl'>
        
        <RightPanelHeader 
          setData={setData}
          selectedItemNum={selectedItemNum} 
          itemSelected={itemSelected} 
          setItemSelected={setItemSelected} 
          setSelectedItemNum={setSelectedItemNum}
        />

        <div className='w-full h-full flex flex-col rounded-b-[40px] pl-4 pr-2 mb-8 mr-3 overflow-y-auto scrollbar'>
          {!showOnlyFav.value ? data.map((item) => (
            <div
              className={`w-full flex flex-col justify-start gap-5 px-4 py-5 rounded-[20px] duration-500 overflow-hidden ${hoverStates[item.name] ? 'bg-slate-800 min-h-40 h-40' : 'min-h-20 h-20'} ${itemSelected[item.name] ? 'bg-slate-700' : ''}`}
              key={item.name}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave(item.name)}
              onClick={() => handleItemSelected(item.name)}
            >
          
              <div className='flex flex-row items-center justify-between'>
                <div className='flex gap-6'>

                  <div className={`flex gap-5 duration-500 ${hoverStates[item.name] ? 'translate-x-0' : '-translate-x-[65px]'}`}>
                    <StartButton itemName={item.name}/>
                    <h2 className={`text-[28px] font-medium selection:bg-accent_green_dark ${hoverStates[item.name] ? 'text-accent_green_dark selection:text-cstm_white' : 'text-cstm_white'}`}>{item.name}</h2>
                  </div>
                  
                </div>
                <div className='flex justify-center items-center gap-10 relative'>
                  {isFavourite[item.name] && (<FaStar className='w-6 h-6 text-accent_orange_dark '/>)}

                  <QuestionCounter questionLength={item.questions.length}/>

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
                    setItemSelected={setItemSelected}
                    setSelectedItemNum={setSelectedItemNum}
                  />

                </div>
              </div>

              <Progress 
                hoverStates={hoverStates}
                itemName={item.name}
              />

            </div>
          )) : data.filter(item => isFavourite[item.name]).map((item) => (
            <div
              className={`w-full flex flex-col justify-start gap-5 px-4 py-5 rounded-[20px] duration-500 overflow-hidden ${hoverStates[item.name] ? 'bg-slate-800 min-h-40 h-40' : 'min-h-20 h-20'} ${itemSelected[item.name] ? 'bg-slate-700' : ''}`}
              key={item.name}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave(item.name)}
              onClick={() => handleItemSelected(item.name)}
            >

              <div className='flex flex-row items-center justify-between'>
                <div className='flex gap-6'>

                  <div className={`flex gap-5 duration-500 ${hoverStates[item.name] ? 'translate-x-0' : '-translate-x-[65px]'}`}>
                    <StartButton itemName={item.name}/>
                    <h2 className={`text-[28px] font-medium selection:bg-accent_green_dark ${hoverStates[item.name] ? 'text-accent_green_dark selection:text-cstm_white' : 'text-cstm_white'}`}>{item.name}</h2>
                  </div>
                  
                </div>
                <div className='flex justify-center items-center gap-10 relative'>
                  {isFavourite[item.name] && (<FaStar className='w-6 h-6 text-accent_orange_dark '/>)}

                  <QuestionCounter questionLength={item.questions.length}/>

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
                    optionsHoverStates={optionsHoverStates}
                    isFavourite={isFavourite}
                    setIsFavourite={setIsFavourite}
                    handleOptionsMouseEnter={handleOptionsMouseEnter}
                    handleOptionsMouseLeave={handleOptionsMouseLeave}
                    handleMouseLeave={handleMouseLeave}
                    setItemSelected={setItemSelected}
                    setSelectedItemNum={setSelectedItemNum}
                  />

                </div>
              </div>

              <Progress 
                hoverStates={hoverStates}
                itemName={item.name}
              />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
