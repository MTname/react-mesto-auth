import React from 'react';

const Login = ({ onLogin }) => {
    
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
        onLogin(email, password);
    };
    
    return(
        <div className="registration">
            <p className="registration__title">Вход</p>
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
                <button type="submit" className="registration__button">Войти</button>
            </form>
        </div>
    )
    
};

export default Login;