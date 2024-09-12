/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
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

const Login = () => {

    const [isRegisterHovered, setIsRegisterHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/login", {
                email,password
            })
        } catch (e){
            console.log(e);
        }
        
    }

  return (
    <div className='w-full h-screen flex bg-gradient-to-br from-cstm_bg_dark from-50% to-slate-900 font-poppins text-cstm_white selection:bg-accent_green_dark'>
        <div className='w-[45%] h-full flex items-center justify-center relative overflow-hidden'>
        
        <img 
            src={girlReadingImage} 
            alt="Girl reading" 
            className='w-[650px] h-[800px] rounded-3xl object-cover object-center relative z-30'
        />
        </div>
        <div className='w-[55%] h-full flex flex-col items-center justify-center'>
            <h1 className="absolute top-8 right-12 text-cstm_white lg:text-[60px] md:text-[50px] select-none font-poetsen">
            Learn <span className="text-accent_green_dark">It</span>
            </h1>
            <form 
                className='w-[55%] h-[50%] flex flex-col justify-evenly items-center '
                action='POST'
            >

                <Email 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    className={'border-slate-700'}
                />

                <Password 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className={'border-slate-700'}
                />

                <div className='w-full flex justify-center items-center text-xl gap-4'>
                    <CheckBox isChecked={isChecked} setIsChecked={setIsChecked}/>
                    <p className='select-none'>Remember me</p>
                </div>

                <div className='w-full flex items-center justify-evenly'>
                    <BackButton to={'/'}/>
                    <PrimaryButton text={'Login'} to={'/study-sets'} onClick={submit}/>
                </div>

                <div className='w-full flex flex-col items-center justify-evenly select-none relative'>
                    <p className='text-lg'>Or you can create a new account here: </p>
                    <Link 
                            className='font-semibold text-accent_green_dark hover:cursor-pointer text-lg'
                            onMouseEnter={() => setIsRegisterHovered(true)}
                            onMouseLeave={() => setIsRegisterHovered(false)}
                            to={'/registration'}
                        > 
                        Registration
                    </Link>
                    <span className={`absolute -bottom-1 h-[3px] bg-accent_green_dark duration-500 ${isRegisterHovered ? 'w-[110px]' : 'w-0'}`}/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login