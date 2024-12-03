/* eslint-disable no-unused-vars */
import React from 'react'
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

const Friends = () => {

    useSignals();

    return (
        <div className='absolute w-full h-screen flex items-center justify-center bg-black/80 z-40 selection:text-cstm_bg_dark selection:bg-accent_green_dark'>
            <div className='w-[95%] h-[90%] flex flex-col items-center justify-center bg-slate-800 rounded-3xl'>
                <div className='flex justify-between items-center w-full p-4'>
                    <h1 className='text-2xl font-semibold text-center text-accent_green_dark select-none'>Friends</h1>

                    <FriendsTabSwitch />

                    <CloseButton onClick={() => isFriendsOpened.value = false} />
                </div>
                <section className='w-full h-full flex justify-center items-center text-cstm_white'>
                    {isMyFriendsOpened.value && <MyFriends />}
                    {isAddFriendsOpened.value && <AddFriends />}
                    {isPendingOpened.value && <Pending />}
                </section>
            </div>
        </div>
    )
}

export default Friends
