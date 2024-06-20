/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const RightPanel = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/data')
     .then(({data}) => {
        console.log(data);
        setData(data);
      })
     .catch(error => console.error(error));
  }, []);

  return (
    <div className='w-[70%] flex justify-center items-center relative z-10'>

        <div className='w-[90%] h-[90%] flex flex-col justify-center items-center bg-gradient-to-br from-white/30 to-slate-600/30 backdrop-blur-md rounded-[40px] shadow-2xl'>

            <div className='w-full h-24 flex justify-center items-center rounded-t-[40px]'>
                <h1 className='w-fit text-5xl font-medium text-cstm_white select-none z-10'>Your Study Sets</h1>

            </div>
        
            <div className='w-full h-full flex rounded-b-[40px]'>

            </div>

        </div>

    </div>
  )
}

export default RightPanel