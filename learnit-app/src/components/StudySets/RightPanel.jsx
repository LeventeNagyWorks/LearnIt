/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import {
  showOnlyFav,
  startTransitionFromStudySets,
  startTransitionToStudySets,
  studySetsData,
  studysetSelected,
  selectedStudysetNum,
} from '../../signals';
import { useSignals } from '@preact/signals-react/runtime';
import RightPanelHeader from './RightPanelHeader';
import StudySetItem from './StudySetItem';

const RightPanel = () => {
  useSignals();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hoverStates, setHoverStates] = useState({});
  const [optionsHoverStates, setOptionsHoverStates] = useState({});
  const [isFavourite, setIsFavourite] = useState(
    data.reduce((acc, item) => ({ ...acc, [item.name]: false }), {})
  );

  useEffect(() => {
    const fetchData = async () => {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const formattedToken = token.startsWith('Bearer ')
          ? token
          : `Bearer ${token}`;

        console.log('Fetching data from /data');
        const { data: responseData } = await axios.get('/data', {
          headers: {
            Authorization: formattedToken,
          },
          timeout: 10000, // 10 second timeout
        });

        console.log('Data fetched successfully:', responseData);
        setData(responseData);
        studySetsData.value = [...responseData];
        const favorites = responseData.reduce((acc, item) => {
          acc[item.name] = item.isFavorite;
          return acc;
        }, {});
        setIsFavourite(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Initialize studysetSelected signal
        const initialSelection = responseData.reduce(
          (acc, item) => ({ ...acc, [item.name]: false }),
          {}
        );
        studysetSelected.value = initialSelection;
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          navigate('/login', { replace: true });
        } else if (error.code === 'ECONNABORTED') {
          console.error('Request timeout - backend may not be running');
        } else {
          console.error('Network error:', error.message);
        }
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    setData(studySetsData.value);
  }, [studySetsData.value]);

  const handleMouseEnter = itemName => {
    setHoverStates(prevHoverStates => ({
      ...prevHoverStates,
      [itemName]: true,
    }));
  };

  const handleMouseLeave = itemName => {
    setHoverStates(prevHoverStates => ({
      ...prevHoverStates,
      [itemName]: false,
    }));
  };

  const handleOptionsMouseEnter = itemName => {
    setOptionsHoverStates(prevOptionsHoverStates => ({
      ...prevOptionsHoverStates,
      [itemName]: true,
    }));
  };

  const handleOptionsMouseLeave = itemName => {
    setOptionsHoverStates(prevOptionsHoverStates => ({
      ...prevOptionsHoverStates,
      [itemName]: false,
    }));
  };

  const handleItemSelected = itemName => {
    const newSelection = {
      ...studysetSelected.value,
      [itemName]: !studysetSelected.value[itemName],
    };
    studysetSelected.value = newSelection;

    const selectedCount = Object.values(newSelection).filter(Boolean).length;
    selectedStudysetNum.value = selectedCount;
  };

  return (
    <div className='w-full max-h-full flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-white/30 to-slate-600/30 backdrop-blur-md rounded-[40px] shadow-2xl relative z-10 pb-6 font-poppins duration-1000'>
      <RightPanelHeader setData={setData} />

      <div className='w-full h-full flex flex-col rounded-b-[40px] pl-4 pr-2 mb-8 mr-3 overflow-y-auto scrollbar'>
        {data.length === 0 && !showOnlyFav.value ? (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className='text-cstm_white text-4xl font-medium select-none'>
              You don't have any{' '}
              <span className='text-accent_green_dark2'>Study Sets</span> yet.
            </h1>
          </div>
        ) : null}

        {!showOnlyFav.value ? (
          data.map(item => (
            <StudySetItem
              key={item.name}
              item={item}
              hoverStates={hoverStates}
              optionsHoverStates={optionsHoverStates}
              isFavourite={isFavourite}
              data={data}
              setData={setData}
              setHoverStates={setHoverStates}
              setOptionsHoverStates={setOptionsHoverStates}
              setIsFavourite={setIsFavourite}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              handleOptionsMouseEnter={handleOptionsMouseEnter}
              handleOptionsMouseLeave={handleOptionsMouseLeave}
              handleItemSelected={handleItemSelected}
            />
          ))
        ) : data.filter(item => isFavourite[item.name]).length === 0 ? (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className='text-cstm_white text-4xl font-medium select-none'>
              You don't have any{' '}
              <span className='text-accent_orange_dark'>Favourite</span> ones
              yet.
            </h1>
          </div>
        ) : (
          data
            .filter(item => isFavourite[item.name])
            .map(item => (
              <StudySetItem
                key={item.name}
                item={item}
                hoverStates={hoverStates}
                optionsHoverStates={optionsHoverStates}
                isFavourite={isFavourite}
                data={data}
                setData={setData}
                setHoverStates={setHoverStates}
                setOptionsHoverStates={setOptionsHoverStates}
                setIsFavourite={setIsFavourite}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleOptionsMouseEnter={handleOptionsMouseEnter}
                handleOptionsMouseLeave={handleOptionsMouseLeave}
                handleItemSelected={handleItemSelected}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default RightPanel;
