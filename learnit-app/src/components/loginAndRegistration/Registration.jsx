/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import PrimaryButton from '../PrimaryButton';
import BackButton from '../BackButton';
import Email from './Email';
import Password from './Password';
import girlReadingImageVector from '../../images/girl_reading_vector.png';
import girlReadingImage from '../../images/girl_reading_vector_green_bg.png';
import Username from './Username';
import CheckBox from '../CheckBox';
import { Link } from 'react-router-dom';

const Registration = () => {

    const [isLoginHovered, setIsLoginHovered] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        console.log({username, email, password});
      
        try {
            const response = await axios.post("http://localhost:3001/registration", 
            {
                username, email, password
            });
          console.log(response.data);
          // Handle successful registration (e.g., redirect to login page)
        } catch (error) {
          console.error('Registration error:', error.response?.data?.error || error.message);
          // Handle registration error (e.g., display error message to user)
        }
    }

  return (
    <div className='w-full h-screen flex bg-gradient-to-br from-cstm_bg_dark from-50% to-slate-900 font-poppins text-cstm_white selection:bg-accent_green_dark'>
        <div className='w-[50%] h-full flex items-center justify-center relative'>
        
        <img 
            src={girlReadingImage} 
            alt="Girl reading" 
            className='w-[650px] h-[800px] rounded-3xl object-cover object-center relative z-30'
        />
        </div>
        <div className='w-[50%] h-full flex flex-col items-center justify-center'>
            <h1 className="absolute top-8 right-12 text-cstm_white lg:text-[60px] md:text-[50px] select-none font-poetsen">
            Learn <span className="text-accent_green_dark">It</span>
            </h1>
            <div className='w-[50%] h-[60%] flex flex-col justify-evenly items-center '>

                <Username onChange={(e) =>setUsername(e.target.value)}/>

                <Email onChange={(e) => setEmail(e.target.value)}/>

                <Password onChange={(e) => setPassword(e.target.value)}/>

                <div className='w-full flex justify-center items-center text-xl gap-4'>
                    <CheckBox />
                    <p className='select-none'>I accept the Terms of Use</p>
                </div>

                <div className='w-full flex items-center justify-evenly'>
                    <BackButton to={'/'}/>
                    <PrimaryButton text={'Registration'} to={'/Login'} onClick={submit}/>
                </div>

                <div className='w-full flex flex-col items-center justify-evenly select-none relative'>
                    <p className='text-lg'>Or you can create a new account here: </p>
                    <Link 
                        className='font-semibold text-accent_green_dark hover:cursor-pointer text-lg'
                        onMouseEnter={() => setIsLoginHovered(true)}
                        onMouseLeave={() => setIsLoginHovered(false)}
                        to={'/login'}
                    > 
                        Login
                    </Link>
                    <span className={`absolute -bottom-1 h-[3px] bg-accent_green_dark duration-500 ${isLoginHovered ? 'w-[55px]' : 'w-0'}`}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registration