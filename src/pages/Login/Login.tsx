import React from 'react';
import './Login.css';
import InputField from '../../components/Input/InputField';
import { Button } from '../../components/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {

    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <div className='login-content'>

            <div className="login-container">
                <img className='logo' src='/png/logo.png' />
                <h2>Login</h2>
                <div>
                    <InputField label={'Email'} value={''} onChange={() => {
                        throw new Error('Function not implemented.');
                    } } name={''}></InputField>
                    <InputField label={'Senha'} value={''} onChange={() => {
                        throw new Error('Function not implemented.');
                    } } name={''}></InputField>
                </div>
                <Button onClick={() => navigateTo('/home') } type={'contrast'}>Entrar</Button>
            </div>
        </div>
    );
}

export default Login;
