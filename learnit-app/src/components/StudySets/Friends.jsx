/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CloseButton from './CloseButton';
import { isFriendsOpened } from '../../signals';
import { useSignals } from '@preact/signals-react/runtime';
import {
  isMyFriendsOpened,
  isAddFriendsOpened,
  isPendingOpened,
} from '../../signals';
import FriendsTabSwitch from './StudySetsDetail/FriendsTabSwitch';
import AddFriends from './AddFriends';
import Pending from './Pending';
import MyFriends from './MyFriends';
import useBreakpoint, { BREAKPOINTS } from '../../hooks/useBreakpoint';
import Dropdown from '../Dropdown';

const Friends = () => {
  useSignals();

  const isMobile = useBreakpoint(BREAKPOINTS.mobile);

  const [selectedTab, setSelectedTab] = useState('myFriends');

  const dropdownOptions = [
    { id: 'myFriends', name: 'My Friends' },
    { id: 'addFriends', name: 'Add Friends' },
    { id: 'pending', name: 'Pending' },
  ];

  switch (selectedTab) {
    case 'myFriends':
      isMyFriendsOpened.value = true;
      isAddFriendsOpened.value = false;
      isPendingOpened.value = false;
      break;

    case 'addFriends':
      isMyFriendsOpened.value = false;
      isAddFriendsOpened.value = true;
      isPendingOpened.value = false;
      break;

    case 'pending':
      isMyFriendsOpened.value = false;
      isAddFriendsOpened.value = false;
      isPendingOpened.value = true;
      break;

    default:
      break;
  }

  return (
    <div className='absolute w-full h-screen flex items-center justify-center bg-black/80 z-40 selection:text-cstm_bg_dark selection:bg-accent_green_dark'>
      <div className='w-[95%] h-[90%] flex flex-col items-center justify-center bg-slate-800 rounded-3xl'>
        <div className='flex justify-between items-center w-full p-4 gap-4'>
          <h1 className='text-2xl font-semibold text-center text-accent_green_dark select-none ml-2'>
            Friends
          </h1>
          {/* TODO: finish the feature */}
          {isMobile ? (
            <Dropdown
              array={dropdownOptions}
              selectedValue={selectedTab}
              onChange={setSelectedTab}
            />
          ) : (
            <FriendsTabSwitch />
          )}

          <CloseButton onClick={() => (isFriendsOpened.value = false)} />
        </div>
        <section className='w-full h-full flex justify-center items-center text-cstm_white'>
          {isMyFriendsOpened.value && <MyFriends />}
          {isAddFriendsOpened.value && <AddFriends />}
          {isPendingOpened.value && <Pending />}
        </section>
      </div>
    </div>
  );
};

export default Friends;
