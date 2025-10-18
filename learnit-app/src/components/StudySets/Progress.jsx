/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const Progress = ({ hoverStates = {}, isDetailedPage = false, itemName }) => {
  const isHovered = isDetailedPage || hoverStates[itemName] || false;
  const [stats, setStats] = useState({
    mastered: 0,
    learning: 0,
    notStarted: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchProgress = async () => {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      try {
        console.log('Fetching progress data from /api/data');
        const response = await fetch('/api/data', {
          headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, '')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Progress data fetched successfully:', data);
        const studySet = data.find(set => set.name === itemName);

        if (studySet) {
          const counts = studySet.questions.reduce(
            (acc, question) => {
              const state = question.learningState || 'notStarted';
              acc[state] = (acc[state] || 0) + 1;
              return acc;
            },
            { mastered: 0, learning: 0, notStarted: 0 }
          );

          setStats({
            ...counts,
            total: studySet.questions.length,
          });
        } else {
          console.warn('Study set not found:', itemName);
          setStats({
            mastered: 0,
            learning: 0,
            notStarted: 0,
            total: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
        // Reset stats on error
        setStats({
          mastered: 0,
          learning: 0,
          notStarted: 0,
          total: 0,
        });
      }
    };

    if (itemName) {
      fetchProgress();
    }
  }, [itemName]);

  const progressWidth = {
    mastered: (stats.mastered / stats.total) * 100,
    learning: (stats.learning / stats.total) * 100,
    notStarted: (stats.notStarted / stats.total) * 100,
  };

  const getRoundedClasses = type => {
    const hasMastered = progressWidth.mastered > 0;
    const hasLearning = progressWidth.learning > 0;
    const hasNotStarted = progressWidth.notStarted > 0;

    switch (type) {
      case 'mastered':
        return `${
          hasMastered && !hasLearning && !hasNotStarted
            ? 'rounded-xl'
            : 'rounded-l-xl'
        }`;
      case 'learning':
        return `${
          !hasMastered && hasLearning && !hasNotStarted
            ? 'rounded-xl'
            : !hasMastered
            ? 'rounded-l-xl'
            : !hasNotStarted
            ? 'rounded-r-xl'
            : ''
        }`;
      case 'notStarted':
        return `${
          !hasMastered && !hasLearning && hasNotStarted
            ? 'rounded-xl'
            : 'rounded-r-xl'
        }`;
      default:
        return '';
    }
  };

  return (
    <div
      className={`w-full flex justify-between duration-700 ${
        isHovered ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <div
        className={`w-full flex gap-4 lg:gap-1 mx-5 ${
          isDetailedPage
            ? 'flex-col md:flex-row items-center lg:min-w-[800px]'
            : 'flex-col items-start'
        }`}
      >
        <p
          className={`text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg relative z-10 ${
            isDetailedPage ? 'mr-4' : ''
          }`}
        >
          Progress
        </p>

        <div className='w-full flex flex-col lg:flex-row lg:items-center gap-6 md:gap-4'>
          <div className='relative min-[200px] max-w-[300px] w-full'>
            <div className='relative w-full h-2 rounded-xl'>
              <div className='w-full h-full flex rounded-xl'>
                {progressWidth.mastered > 0 && (
                  <div
                    className={`bg-green-500 h-full shadow-[0_0_16px_2px_#22c55e] ${getRoundedClasses(
                      'mastered'
                    )}`}
                    style={{ width: `${progressWidth.mastered}%` }}
                  ></div>
                )}
                {progressWidth.learning > 0 && (
                  <div
                    className={`bg-yellow-500 h-full shadow-[0_0_16px_2px_#eab308] ${getRoundedClasses(
                      'learning'
                    )}`}
                    style={{ width: `${progressWidth.learning}%` }}
                  ></div>
                )}
                {progressWidth.notStarted > 0 && (
                  <div
                    className={`bg-gray-500 h-full ${getRoundedClasses(
                      'notStarted'
                    )}`}
                    style={{ width: `${progressWidth.notStarted}%` }}
                  ></div>
                )}
              </div>
            </div>
          </div>

          <div className='max-w-[380px] w-full flex flex-col sm:flex-row justify-start sm:justify-between gap-4'>
            <p className='text-green-500 text-lg text-center font-semibold flex items-center select-none rounded-lg relative z-10'>
              {stats.mastered} Mastered
            </p>
            <p className='text-yellow-500 text-lg text-center font-semibold flex items-center select-none rounded-lg relative z-10'>
              {stats.learning} Learning
            </p>
            <p className='text-gray-400 text-lg text-center font-semibold flex items-center select-none rounded-lg relative z-10'>
              {stats.notStarted} Not Started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
