/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FiEdit } from "react-icons/fi";
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
    return (
        <div className='w-full h-screen flex flex-col flex-grow bg-gradient-to-tl to-green-950 from-cstm_bg_dark overflow-y-auto font-poppins selection:bg-accent_green_dark selection:text-cstm_white'>

            <ProfileEditButton />

            <section className='w-full h-screen min-h-screen flex flex-col justify-center items-center'>
                <div className='w-[90%] h-[50%] rounded-3xl flex items-center justify-start gap-20'>
                    <img src={DefaultProfilePicture} alt="" className='w-[280px] h-[280px] bg-slate-50 rounded-full' />
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-cstm_white md:text-[94px] font-semibold'>admin</h2>
                        <p className='text-slate-300 md:text-[34px]'>This is my description. Have a nice day. ✌️ </p>
                    </div>
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