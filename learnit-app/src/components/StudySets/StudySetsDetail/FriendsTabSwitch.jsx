/* eslint-disable no-unused-vars */
import React from 'react'
import {
    isMyFriendsOpened,
    isAddFriendsOpened,
    isPendingOpened,
    isMyFriendsHovered,
    isAddFriendsHovered,
    isPendingHovered,
} from '../../../signals';
import { motion } from 'framer-motion';
import { useSignals } from '@preact/signals-react/runtime';

const FriendsTabSwitch = () => {

    useSignals();

    const getPosition = () => {
        if (isMyFriendsHovered.value) return -115;
        if (isAddFriendsHovered.value) return 12;
        if (isPendingHovered.value) return 128;
        if (isMyFriendsOpened.value) return -115;
        if (isAddFriendsOpened.value) return 12;
        if (isPendingOpened.value) return 128;
        return -115;
    };

    const getWidth = () => {
        if (isMyFriendsHovered.value) return 106;
        if (isAddFriendsHovered.value) return 109;
        if (isPendingHovered.value) return 82;
        if (isMyFriendsOpened.value) return 106;
        if (isAddFriendsOpened.value) return 109;
        if (isPendingOpened.value) return 82;
        return 106;
    };

    const handleTabClick = (tab) => {
        isMyFriendsOpened.value = tab === 'MyFriends';
        isAddFriendsOpened.value = tab === 'AddFriends';
        isPendingOpened.value = tab === 'Pending';
    };

    return (
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
            <motion.span
                className='absolute -bottom-0 h-[3px] bg-accent_green_dark'
                layoutId="underline"
                animate={{
                    x: getPosition(),
                    width: getWidth()
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40
                }}
            />
        </div>
    )
}

export default FriendsTabSwitch