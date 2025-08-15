import React from 'react';
import {useNavigate} from 'react-router-dom';
import authService from '../services/authService';
import CoinSelection from './CoinSelection'
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const username = authService.getUsername();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <>
            <div className="header-section">
                <h1 className="welcome-header">Welcome, {username}!</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <h2 className="dashboard-header">HedgeHog Dashboard</h2>
            </div>
            <div className="coin-selection">
                <CoinSelection/>
            </div>
        </>
    );
};

export default Dashboard;