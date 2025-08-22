import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await authService.register(username, password);
            setMessage(result);
            if (result.includes('successfully')) {
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setMessage('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {message && <div>{message}</div>}
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>
                Have account?
                <button onClick={() => navigate('/login')}>Login</button>
            </p>
        </div>
    );
};

export default Register;