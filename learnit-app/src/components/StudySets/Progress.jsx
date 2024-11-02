/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const Progress = ({ hoverStates, itemName }) => {
    const isHovered = hoverStates[itemName] || false;
    const [stats, setStats] = useState({
        mastered: 0,
        learning: 0,
        notStarted: 0,
        total: 0
    });

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/data', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            const studySet = data.find(set => set.name === itemName);
            
            if (studySet) {
                const counts = studySet.questions.reduce((acc, question) => {
                    const state = question.learningState || 'notStarted';
                    acc[state] = (acc[state] || 0) + 1;
                    return acc;
                }, { mastered: 0, learning: 0, notStarted: 0 });

                setStats({
                    ...counts,
                    total: studySet.questions.length
                });
            }
        };

        fetchProgress();
    }, [itemName]);

    const progressWidth = {
        mastered: (stats.mastered / stats.total) * 100,
        learning: (stats.learning / stats.total) * 100,
        notStarted: (stats.notStarted / stats.total) * 100
    };

    return (
        <div className={`w-full flex justify-between duration-700 ${isHovered ? 'translate-x-0' : '-translate-x-64'}`}>
            <div className={`flex flex-col items-start gap-1 mx-5`}>
                <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg relative z-10'>Progress</p>

                <div className='flex items-center gap-2'>
                    <div className='w-[300px] h-2 bg-white rounded-full overflow-hidden'>
                        <div className='h-full flex'>
                            <div className='bg-green-500 h-full' style={{width: `${progressWidth.mastered}%`}}></div>
                            <div className='bg-yellow-500 h-full' style={{width: `${progressWidth.learning}%`}}></div>
                            <div className='bg-gray-500 h-full' style={{width: `${progressWidth.notStarted}%`}}></div>
                        </div>
                    </div>

                    <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>{stats.mastered} Mastered</p>
                    <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>{stats.learning} Learning</p>
                    <p className='text-cstm_white text-lg text-center font-semibold flex items-center justify-center select-none rounded-lg px-3 relative z-10'>{stats.notStarted} Not Started</p>
                </div>
            </div>
        </div>
    )
}

export default Progress