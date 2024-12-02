/* eslint-disable no-unused-vars */
import React from 'react'
import CloseButton from './CloseButton';
import { isFriendsOpened } from '../../signals';
import { useSignals } from '@preact/signals-react/runtime';
import {
    isMyFriendsOpened,
    isAddFriendsOpened,
    isPendingOpened,
    isMyFriendsHovered,
    isAddFriendsHovered,
    isPendingHovered,
} from '../../signals';

const Friends = () => {

    useSignals();

    const getSpanPosition = () => {
        if (isMyFriendsHovered.value || isMyFriendsOpened.value) return '-115px';
        if (isAddFriendsHovered.value || isAddFriendsOpened.value) return '12px';
        if (isPendingHovered.value || isPendingOpened.value) return '128px';
        return '-115px';
    };

    const getSpanWidth = () => {
        if (isMyFriendsHovered.value || isMyFriendsOpened.value) return '106px';
        if (isAddFriendsHovered.value || isAddFriendsOpened.value) return '109px';
        if (isPendingHovered.value || isPendingOpened.value) return '82px';
        return '106px';
    };

    const handleTabClick = (tab) => {
        isMyFriendsOpened.value = tab === 'MyFriends';
        isAddFriendsOpened.value = tab === 'AddFriends';
        isPendingOpened.value = tab === 'Pending';
    };

    return (
        <div className='absolute w-full h-screen flex items-center justify-center bg-black/80 z-40 selection:text-cstm_bg_dark selection:bg-accent_green_dark'>
            <div className='w-[95%] h-[90%] flex flex-col items-center justify-center bg-slate-800 rounded-3xl'>
                <div className='flex justify-between items-center w-full p-4'>
                    <h1 className='text-2xl font-semibold text-center text-cstm_white'>Friends</h1>

                    <div className='h-full flex justify-center items-center gap-5 relative'>
                        <button
                            className={`font-medium text-xl duration-700 select-none
                                ${isMyFriendsOpened.value ? 'text-accent_green_dark' : 'text-cstm_white'}`}
                            onClick={() => handleTabClick('MyFriends')}
                            onMouseEnter={() => isMyFriendsHovered.value = true}
                            onMouseLeave={() => isMyFriendsHovered.value = false}
                        >
                            My Friends
                        </button>
                        <button
                            className={`font-medium text-xl duration-700 select-none
                                ${isAddFriendsOpened.value ? 'text-accent_green_dark' : 'text-cstm_white'}`}
                            onClick={() => handleTabClick('AddFriends')}
                            onMouseEnter={() => isAddFriendsHovered.value = true}
                            onMouseLeave={() => isAddFriendsHovered.value = false}
                        >
                            Add Friend
                        </button>
                        <button
                            className={`font-medium text-xl duration-700 select-none
                                ${isPendingOpened.value ? 'text-accent_green_dark' : 'text-cstm_white'}`}
                            onClick={() => handleTabClick('Pending')}
                            onMouseEnter={() => isPendingHovered.value = true}
                            onMouseLeave={() => isPendingHovered.value = false}
                        >
                            Pending
                        </button>
                        <span
                            className='absolute -bottom-0 h-[3px] bg-accent_green_dark duration-300'
                            style={{
                                width: getSpanWidth(),
                                transform: `translateX(${getSpanPosition()})`
                            }}
                        />
                    </div>

                    <CloseButton onClick={() => isFriendsOpened.value = false} />
                </div>
                <section className='w-full h-full flex justify-center items-center text-cstm_white'>
                    {isMyFriendsOpened.value && <div>My Friends Content</div>}
                    {isAddFriendsOpened.value && <div>Add Friends Content</div>}
                    {isPendingOpened.value && <div>Pending Content</div>}
                </section>
            </div>
        </div>
    )
}

export default Friends