/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import ProfileEditButton from '../components/StudySets/ProfileEditButton';
import DefaultProfilePicture from '../images/default_profile_pic.png';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Counter = ({ value, className }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    React.useEffect(() => {
        const animation = animate(count, value, {
            duration: 2,
            ease: [0.40, 0, 0.20, 1]
        });
        return animation.stop;
    }, [value]);

    return <motion.p className={className}>{rounded}</motion.p>;
};

const MyProfile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('user');
    const [displayName, setDisplayName] = useState('user');
    const [description, setDescription] = useState("This is my description. Have a nice day. ✌️");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                if (!token) {
                    console.log('No token found');
                    return;
                }

                const response = await fetch('http://localhost:3001/api/getUserProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUsername(userData.username);
                setDisplayName(userData.displayName);
                setDescription(userData.description);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:3001/api/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username,
                    displayName,
                    description
                })
            });

            if (response.ok) {
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    const handleEditClick = () => {
        if (isEditing) {
            handleSave();
        }
        setIsEditing(!isEditing);
    };

    // TODO: username shouldn't be existing if the user wants to edit it
    // TODO: editable profile picture
    // TODO: change hardcoded stats to dynamic stats

    return (
        <div className='w-full h-screen flex flex-col flex-grow bg-gradient-to-tl to-green-950 from-cstm_bg_dark overflow-y-auto font-poppins selection:bg-accent_green_dark selection:text-cstm_white relative'>

            <div className={`absolute top-5 left-1/2 -translate-x-1/2 bg-accent_green_dark/80 text-white px-4 py-2 rounded-lg shadow-lg duration-500 z-50 ${isEditing ? 'translate-y-0' : '-translate-y-[150%]'}`}>
                <p className='font-medium select-none'>You are editing your profile now!</p>
            </div>

            <ProfileEditButton
                onEditClick={handleEditClick}
                isEditing={isEditing}
            />

            <section className='w-full h-screen min-h-screen flex flex-col justify-center items-center'>
                <div className='w-[90%] h-[50%] rounded-3xl flex items-center justify-start gap-20 relative'>

                    <div className='w-[280px] h-[280px] min-w-[280px] min-h-[280px] flex relative'>
                        {isEditing ? (
                            <div className='absolute w-full h-full bg-slate-900/80 rounded-full flex items-center justify-center cursor-pointer'>
                                <p className='text-cstm_white font-semibold text-xl text-center select-none'>Click here to change picture</p>
                            </div>
                        ) : null}

                        <img src={DefaultProfilePicture} alt="" className='w-[280px] h-[280px] bg-slate-50 rounded-full select-none' />
                    </div>

                    {isEditing ? (
                        <div className='caret-accent_green_dark'>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className='w-[80%] text-cstm_white md:text-[94px] font-semibold bg-transparent border-b border-accent_green_dark outline-none'
                            />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='w-[30%] text-gray-500 md:text-[32px] font-semibold bg-transparent border-b border-accent_green_dark outline-none'
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-[80%] h-36 text-slate-300 md:text-[34px] bg-transparent border-b border-accent_green_dark outline-none resize-none'
                            />
                        </div>
                    ) : (
                        <div className='w-[80%]'>
                            <h2 className='text-cstm_white md:text-[94px] font-semibold'>{displayName}</h2>
                            <h3 className='pl-1 text-gray-500 md:text-[32px] font-semibold mb-4'>{username}</h3>
                            <p className='pl-1 h-fit max-w-[90%] text-slate-300 md:text-[34px] line-clamp-3 break-words'>{description}</p>
                        </div>
                    )}
                </div>
                <div className='w-[90%] h-[50%] rounded-3xl flex items-center justify-evenly'>
                    <div className='w-fit flex flex-col items-center text-green-600'>
                        <Counter value={182} className='text-[64px] font-semibold' />
                        <p className='text-[42px]'>Mastered</p>
                    </div>
                    <span className='w-[2px] h-14 bg-slate-700'></span>
                    <div className='w-fit flex flex-col items-center text-accent_orange_dark'>
                        <Counter value={234} className='text-[64px] font-semibold' />
                        <p className='text-[42px]'>Learning</p>
                    </div>
                    <span className='w-[2px] h-14 bg-slate-700'></span>
                    <div className='w-fit flex flex-col items-center text-gray-400'>
                        <Counter value={126} className='text-[64px] font-semibold' />
                        <p className='text-[42px]'>Not Started</p>
                    </div>
                </div>
            </section>
            {/* <section className='w-full h-screen min-h-screen flex justify-center items-center'>

            </section> */}
        </div>
    )
}

export default MyProfile