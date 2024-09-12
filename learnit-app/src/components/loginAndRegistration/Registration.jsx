/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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
    const [isChecked, setIsChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [usernameAttempted, setUsernameAttempted] = useState(false);
    const [emailAttempted, setEmailAttempted] = useState(false);
    const [passwordAttempted, setPasswordAttempted] = useState(false);

    async function submit(e) {
        e.preventDefault();
        if (!isChecked) return;
    
        setUsernameAttempted(true);
        setEmailAttempted(true);
        setPasswordAttempted(true);
    
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            console.log({username, email, password});
            try {
                const response = await axios.post("http://localhost:3001/registration", {
                    username, email, password
                });
                console.log(response.data);
                // Sikeres regisztráció kezelése (pl. átirányítás a bejelentkezési oldalra)
            } catch (error) {
                console.error('Regisztrációs hiba:', error.response?.data?.error || error.message);
                // Regisztrációs hiba kezelése (pl. hibaüzenet megjelenítése a felhasználónak)
            }
        }
    }

    const validateUsername = (username) => username.length >= 4;

    const validateEmail = (email) => {
        const emailRegex = /@(gmail\.hu|freemail\.hu)$/i;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8 && (password.match(/\d/g) || []).length >= 2;
    };

    useEffect(() => {
        setIsDisabled(!(isUsernameValid && isEmailValid && isPasswordValid));
    }, [isUsernameValid, isEmailValid, isPasswordValid]);

  return (
    <div className='w-full h-screen flex bg-gradient-to-br from-cstm_bg_dark from-50% to-slate-900 font-poppins text-cstm_white selection:bg-accent_green_dark overflow-hidden'>
        <div className='w-[45%] h-full flex items-center justify-center relative'>
        
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
            <div className='w-[55%] h-[60%] flex flex-col justify-evenly items-center '>

                <Username
                    onChange={(e) => {
                        const value = e.target.value;
                        setUsername(value);
                        setIsUsernameValid(validateUsername(value));
                    }}
                    className={usernameAttempted && !isUsernameValid ? 'border-red-500' : 'border-slate-700'}
                />

                <Email
                    onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        setIsEmailValid(validateEmail(value));
                    }}
                    className={emailAttempted && !isEmailValid ? 'border-red-500' : 'border-slate-700'}
                />

                <Password
                    onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        setIsPasswordValid(validatePassword(value));
                    }}
                    className={passwordAttempted && !isPasswordValid ? 'border-red-500' : 'border-slate-700'}
                />

                <div className='w-full flex justify-center items-center text-xl gap-4'>
                    <CheckBox 
                        isChecked={isChecked} 
                        setIsChecked={setIsChecked} 
                        isDisabled={isDisabled} 
                        setIsDisabled={setIsDisabled}
                    />
                    <p className='select-none'>I accept the Terms of Use</p>
                </div>

                <div className='w-full flex items-center justify-evenly'>
                    <BackButton to={'/'}/>
                    <PrimaryButton 
                        text={'Registration'} 
                        to={'/Login'} 
                        onClick={submit} 
                        isDisabled={!isChecked}
                    />
                </div>

                <div className='w-full flex flex-col items-center justify-evenly select-none relative'>
                    <p className='text-lg'>Already have an account?</p>
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