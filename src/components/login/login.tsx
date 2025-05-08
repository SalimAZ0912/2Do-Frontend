import React, { useState } from 'react';
import './login.css';
import Button from '../button/button.tsx';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Hier kannst du die Login-Logik hinzufügen
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login into 2Do</h2>
                <div className="input-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <Button
                    label="Login"
                    onClick={() => console.log('Button clicked')}
                    customClass="login-button"
                />
            </form>
        </div>
    );
};

export default Login;
