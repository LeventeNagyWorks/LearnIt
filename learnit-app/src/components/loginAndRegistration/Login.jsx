import React, { useState, useEffect } from 'react';
import axios from 'axios'
import PrimaryButton from '../PrimaryButton';
import BackButton from '../BackButton';
import Email from './Email';
import Password from './Password';
import girlReadingImageVector from '../../images/girl_reading_vector.png';
import girlReadingImage from '../../images/girl_reading_vector_green_bg.png';
import Username from './Username';1
import CheckBox from '../CheckBox';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../signals';
import debounce from 'lodash/debounce';
import Popup from '../Popup';

const Login = () => {
    const [isRegisterHovered, setIsRegisterHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const debouncedNavigate = debounce((path) => {
        navigate(path);
    }, 300);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            isLoggedIn.value = true;
            debouncedNavigate('/study-sets');
        }
    }, []);

    async function submit(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:3001/login", {
                email, password, rememberMe
            });
            console.log(response.data);
            localStorage.setItem('username', response.data.username);
            if (rememberMe) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }
            isLoggedIn.value = true;
            debouncedNavigate('/study-sets');
        } catch (error) {
            console.error('Login error:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'Failed to login');
            setShowError(true);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit(e);
        }
    };

    // TODO: login with username

    return (
        <div className='w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-cstm_bg_dark from-50% to-slate-900 font-poppins text-cstm_white selection:bg-accent_green_dark'>
            {showError && <Popup type="error" title="Ooops!" message={"Login error"} primButtonText="OK" onClickPrim={() => setShowError(false)} />}

            <div className='w-full md:w-[45%] h-full flex items-center justify-center relative overflow-hidden'>
                <img
                    src={girlReadingImage}
                    alt="Girl reading"
                    className='w-fit h-[85%] md:h-[75%] rounded-3xl object-cover object-center relative z-30'
                />
            </div>
            <div className='w-full md:w-[55%] h-full flex flex-col items-center justify-center'>
                <h1 className="absolute top-8 right-12 text-cstm_white lg:text-[60px] md:text-[50px] select-none font-poetsen">
                    Learn <span className="text-accent_green_dark">It</span>
                </h1>
                <form
                    className='w-[80%] md:w-[55%] h-[50%] flex flex-col justify-center items-center gap-10 relative z-20'
                    action='POST'
                    onKeyDown={handleKeyDown}
                >
                    <Email
                        onChange={(e) => { setEmail(e.target.value) }}
                        className={'border-slate-700'}
                    />

                    <Password
                        onChange={(e) => { setPassword(e.target.value) }}
                        className={'border-slate-700'}
                    />

                    <div className='w-full flex justify-center items-center text-xl gap-4'>
                        <CheckBox isChecked={rememberMe} setIsChecked={setRememberMe} />
                        <p className='select-none'>Remember me</p>
                    </div>

                    <div className='w-full flex items-center justify-evenly'>
                        <BackButton to={'/'} />
                        <PrimaryButton text={'Login'} to={'/study-sets'} onClick={submit} />
                    </div>

                    <div className='w-full flex flex-col items-center justify-evenly select-none relative pb-4'>
                        <p className='text-lg text-center'>Or you can create a new account here: </p>
                        <Link
                            className='font-semibold text-accent_green_dark hover:cursor-pointer text-lg'
                            onMouseEnter={() => setIsRegisterHovered(true)}
                            onMouseLeave={() => setIsRegisterHovered(false)}
                            to={'/registration'}
                        >
                            Registration
                        </Link>
                        <span className={`absolute bottom-3 h-[3px] bg-accent_green_dark duration-500 ${isRegisterHovered ? 'w-[110px]' : 'w-0'}`} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
