import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            return;
        }
        onRegister(email, password);
    };
    
    return (
        <div className="registration">
            <p className="registration__title">Регистрация</p>
            <form onSubmit={handleSubmit} className="registration__form">
                <input
                    className="registration__input"
                    name="email" 
                    type="email" 
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Email" 
                    autoComplete="off" 
                    minLength={2} 
                    maxLength={30} 
                    required
                />
                <input
                    className="registration__input"
                    name="password" 
                    type="password" 
                    value={password} 
                    onChange={handleChangePassword}
                    placeholder="Пароль" 
                    autoComplete="off" 
                    minLength={2} 
                    maxLength={30} 
                    required 
                />
                <button type="submit" className="registration__button">Зарегистрироваться</button>
            </form>
            <div className="registration__enter">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="registration__enterLink">Войти</Link>
            </div>
        </div>
    );
    
};

export default Register;
