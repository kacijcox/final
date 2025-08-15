import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import authService from '../services/authService';
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {useWallet} from "@solana/wallet-adapter-react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {connected, publicKey, disconnect} = useWallet();

    const handleRegularLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    useEffect(() => {
        if (connected && publicKey) {
            handlePhantomLogin();
        }
    }, [connected, publicKey]);

    const handlePhantomLogin = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const walletAddress = publicKey.toString();

            const response = await fetch('http://localhost:8080/api/phantom/connect', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({walletAddress})
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', walletAddress);
                localStorage.setItem('username', walletAddress);
                localStorage.setItem('authType', 'phantom');
                navigate('/dashboard');
            } else {
                setError('Phantom authentication failed');
                disconnect();
            }
        } catch (err) {
            setError('Error connecting to Phantom wallet');
            disconnect();
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleRegularLogin}>
                {error && <div style={{color: 'red'}}>{error}</div>}
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
                <button type="submit">Login</button>
            </form>

            <div className="login-divider">
                <span>OR</span>
            </div>

            <div className="phantom-login">
                <h3>Sign in with Phantom Wallet</h3>
                <WalletMultiButton/>
            </div>

            {error && <p className="error">{error}</p>}

            <p>
                Don't have account?
                <button onClick={() => navigate('/register')}>Register</button>
            </p>
        </div>
    )
}


export default Login;