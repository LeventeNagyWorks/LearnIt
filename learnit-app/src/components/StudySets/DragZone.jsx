/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  isStudySetAccepted,
  showSuccessfullyAdded,
  showNotAcceptableFileErrorMessage,
  studySetsData,
} from '../../signals';

const DragZone = ({ setIsStudySetAlreadyExistsActive }) => {
  const [onDrag, setOnDrag] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onDrop = useCallback(
    async acceptedFiles => {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');

      for (const file of acceptedFiles) {
        if (!file.name.toLowerCase().endsWith('.txt')) {
          showNotAcceptableFileErrorMessage.value = true;
          continue;
        }

        const cleanFileName = decodeURIComponent(file.name).replace(
          /\.txt$/i,
          ''
        );
        const existingData = await axios.get('/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const existingNames = existingData.data.map(item => item.name);

        if (existingNames.includes(cleanFileName)) {
          setIsStudySetAlreadyExistsActive(true);
          continue;
        }

        const formData = new FormData();
        formData.append(
          'file',
          new File([file], cleanFileName + '.txt', { type: file.type })
        );

        try {
          const response = await axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });

          const { data: newData } = await axios.get('/data', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          studySetsData.value = [...newData];

          console.log(response.data);
          isStudySetAccepted.value = { _a: true };
          showSuccessfullyAdded.value = true;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    },
    [setIsStudySetAlreadyExistsActive]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.txt',
    onDrop,
    onDragEnter: () => setOnDrag(true),
    onDragLeave: () => setOnDrag(false),
  });

  const shadowStyle = isDragActive ? { boxShadow: '0 0 50px 3px #20CC00' } : {};

  return (
    <div
      {...getRootProps()}
      className={`dropzone w-[60%] h-[500px] flex justify-center items-center rounded-[40px]  bg-zinc-800 cursor-pointer border-2 border-dashed duration-300 ${
        isDragActive
          ? 'border-accent_green_dark'
          : 'border-cstm_white shadow-none'
      }`}
      style={shadowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input {...getInputProps()} className='h-full w-full bg-gray-200' />

      <svg
        className={`h-80 ${
          isDragActive || isHovered ? 'animate-handRotation' : ''
        }`}
        width='234'
        height='284'
        viewBox='0 0 234 284'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect x='116' y='23' width='118' height='96' rx='20' fill='#007728' />
        <path
          d='M77.9756 162.585C62.8264 142.323 50.0148 99.5376 119.962 90.502'
          stroke='#007728'
          strokeWidth='35'
          strokeLinecap='round'
        />
        <path
          d='M18.341 68.9915C36.4082 55.4168 82.8104 35.8932 123.881 66.3967'
          stroke='#007728'
          strokeWidth='35'
          strokeLinecap='round'
        />
        <path
          d='M28.3561 112.745C42.1189 92.5772 82.6285 58.0227 134.565 81.1474'
          stroke='#007728'
          strokeWidth='35'
          strokeLinecap='round'
        />
        <path
          d='M37.8371 24.1856C53.7611 18.1164 92.7462 11.5619 121.295 33.8971'
          stroke='#007728'
          strokeWidth='35'
          strokeLinecap='round'
        />
        <path
          d='M17.5436 51.4045C35.6109 37.8298 82.013 18.3062 123.084 48.8096'
          stroke='#0D5200'
          strokeWidth='5'
          strokeLinecap='round'
        />
        <path
          d='M21.4224 96.9855C32.0529 81.1035 63.4755 54.0273 104.122 72.7784'
          stroke='#0D5200'
          strokeWidth='5'
          strokeLinecap='round'
        />
        <rect
          x='22.6624'
          y='182.196'
          width='109'
          height='109'
          rx='18'
          transform='rotate(-25.2719 22.6624 182.196)'
          fill='white'
          stroke='#9DB2BF'
          strokeWidth='4'
        />
        <path
          d='M71.1007 228.545C72.0122 228.115 72.7709 228.035 73.3767 228.307C73.9723 228.556 74.4596 229.083 74.8387 229.886C74.9924 230.211 75.1283 230.611 75.2464 231.086C75.3543 231.54 75.376 232.007 75.3114 232.489C75.2583 232.939 75.0871 233.391 74.7977 233.846C74.498 234.28 74.0118 234.655 73.339 234.973C72.3407 235.444 71.55 235.512 70.9671 235.177C70.374 234.82 69.8981 234.262 69.5395 233.502C69.3346 233.068 69.189 232.619 69.1029 232.156C69.0167 231.692 69.0162 231.241 69.1012 230.803C69.1862 230.365 69.3888 229.95 69.709 229.56C70.0291 229.17 70.493 228.832 71.1007 228.545Z'
          fill='#026825'
        />
        <path
          d='M80.0855 208.698L87.3782 227.35C87.5102 227.685 87.4677 227.905 87.2506 228.007L85.4601 228.852C84.2448 229.426 83.2639 229.597 82.5177 229.366C81.7714 229.134 81.1882 228.573 80.7681 227.684C80.6144 227.358 80.3947 226.865 80.1091 226.203C79.8451 225.532 79.5407 224.746 79.196 223.848C78.841 222.927 78.4553 221.941 78.0389 220.891C77.6339 219.808 77.2289 218.725 76.8239 217.642C76.4086 216.538 75.9877 215.449 75.561 214.377C75.156 213.294 74.776 212.293 74.421 211.372L69.2123 213.831C68.9736 213.944 68.7825 213.848 68.639 213.544L67.876 211.675C67.7645 211.383 67.6799 211.091 67.622 210.8C67.5756 210.477 67.588 210.166 67.6592 209.867C67.7304 209.568 67.8654 209.292 68.0644 209.038C68.285 208.775 68.5907 208.551 68.9814 208.367L83.5332 201.497C83.6634 201.435 83.7982 201.411 83.9374 201.425C84.0767 201.439 84.1873 201.533 84.2693 201.707L85.0458 203.689C85.3098 204.36 85.3763 204.979 85.2455 205.545C85.126 206.079 84.578 206.577 83.6014 207.038L80.0855 208.698ZM113.686 214.691C113.829 214.995 113.737 215.277 113.409 215.538C113.103 215.789 112.624 216.068 111.973 216.375C111.148 216.765 110.423 217.054 109.796 217.244C109.169 217.434 108.608 217.539 108.114 217.56C107.641 217.571 107.218 217.519 106.845 217.403C106.462 217.265 106.112 217.059 105.796 216.783L100.372 212.377C100.166 213.908 99.9753 215.444 99.8009 216.986C99.6163 218.507 99.4024 220.134 99.1593 221.867C99.1467 221.953 99.0505 222.171 98.8708 222.521C98.7128 222.861 98.4819 223.103 98.1781 223.246C97.8742 223.39 97.4501 223.391 96.9058 223.25C96.3729 223.077 95.8361 222.839 95.2954 222.537C94.7444 222.213 94.2375 221.842 93.7746 221.424C93.3014 220.984 92.9726 220.568 92.7882 220.178C92.573 219.722 92.5556 219.067 92.7359 218.212C92.906 217.335 93.1903 216.392 93.5889 215.381C93.9772 214.348 94.4301 213.311 94.9474 212.271C95.4864 211.22 96.0071 210.271 96.5093 209.424C94.9023 208.325 93.4059 207.319 92.02 206.408C90.624 205.474 89.4133 204.652 88.3879 203.942C87.3626 203.232 86.5488 202.661 85.9466 202.228C85.3444 201.796 85.0177 201.526 84.9665 201.417C84.9153 201.309 85.0485 201.113 85.3662 200.83C85.6839 200.548 86.1901 200.242 86.8846 199.915C87.731 199.515 88.4945 199.221 89.1751 199.032C89.8774 198.833 90.5179 198.757 91.0967 198.802C91.6971 198.837 92.2734 198.989 92.8255 199.26C93.3777 199.53 93.9434 199.913 94.5227 200.409L98.2343 203.633C98.4134 202.832 98.5537 202.089 98.655 201.404C98.7564 200.719 98.8583 200.008 98.9609 199.269C99.0634 198.531 99.178 197.734 99.3047 196.878C99.4314 196.022 99.5879 195.032 99.7743 193.909C99.8467 193.556 100.057 193.298 100.404 193.134C100.794 192.95 101.272 192.95 101.837 193.134C102.413 193.287 102.982 193.536 103.543 193.881C104.094 194.205 104.59 194.581 105.032 195.01C105.484 195.407 105.782 195.757 105.926 196.061C106.12 196.473 106.106 197.117 105.882 197.992C105.68 198.857 105.369 199.8 104.949 200.822C104.528 201.843 104.06 202.874 103.542 203.914C103.015 204.933 102.533 205.797 102.099 206.506C102.605 206.904 103.228 207.353 103.969 207.853C104.699 208.331 105.471 208.842 106.285 209.387C107.111 209.899 107.942 210.423 108.778 210.957C109.604 211.469 110.355 211.964 111.031 212.441C111.729 212.908 112.321 213.345 112.805 213.753C113.28 214.14 113.573 214.452 113.686 214.691ZM118.617 190.507L125.909 209.159C126.041 209.495 125.999 209.714 125.782 209.816L123.991 210.662C122.776 211.235 121.795 211.407 121.049 211.175C120.303 210.943 119.719 210.383 119.299 209.493C119.146 209.167 118.926 208.674 118.64 208.013C118.376 207.341 118.072 206.556 117.727 205.657C117.372 204.736 116.987 203.751 116.57 202.7C116.165 201.617 115.76 200.534 115.355 199.452C114.94 198.347 114.519 197.259 114.092 196.186C113.687 195.104 113.307 194.102 112.952 193.181L107.744 195.64C107.505 195.753 107.314 195.658 107.17 195.354L106.407 193.485C106.296 193.192 106.211 192.9 106.153 192.609C106.107 192.286 106.119 191.975 106.191 191.676C106.262 191.377 106.397 191.101 106.596 190.848C106.816 190.584 107.122 190.361 107.513 190.176L122.065 183.306C122.195 183.245 122.329 183.221 122.469 183.235C122.608 183.249 122.719 183.342 122.801 183.516L123.577 185.498C123.841 186.17 123.908 186.789 123.777 187.355C123.657 187.889 123.109 188.386 122.133 188.847L118.617 190.507Z'
          fill='#20CC00'
        />
        <path
          d='M112.624 166.443C127.288 161.635 152.405 143.216 135.56 108'
          stroke='#007728'
          strokeWidth='35'
          strokeLinecap='round'
        />
        <path
          d='M96.2524 105.359C103.414 103.597 119.977 103.854 128.938 118.981'
          stroke='#007728'
          strokeWidth='10'
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
};

export default DragZone;
