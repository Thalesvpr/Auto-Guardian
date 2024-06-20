import React, { useState, useEffect } from 'react';
import './Login.css';
import InputField from '../../components/Input/InputField';
import { Button } from '../../components/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

        setIsDarkMode(matchMedia.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        matchMedia.addEventListener('change', handleChange);

        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, []);

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className='login-content'>
            <div className="login-container">
                <img className='logo' src={!isDarkMode ? '/png/logo4dark.png' : '/png/logo.png'} />
                <h2>Login</h2>
                <div>
                    <InputField 
                        label={'Email'} 
                        value={''} 
                        onChange={() => {
                            throw new Error('Function not implemented.');
                        }} 
                        name={''}
                    />
                    <InputField 
                        label={'Senha'} 
                        value={''} 
                        onChange={() => {
                            throw new Error('Function not implemented.');
                        }} 
                        name={''}
                    />
                </div>
                <Button onClick={() => navigateTo('/home')} type={'contrast'}>Entrar</Button>
            </div>
        </div>
    );
}

export default Login;
