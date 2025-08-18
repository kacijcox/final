import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useWallet} from '@solana/wallet-adapter-react';
import authService from '../services/authService';
import CoinSelection from './CoinSelection'
import '../styles/Dashboard.css';
import Chart from "./Chart.jsx";
import FavoriteToggle from "./FavoriteToggle.jsx";


const Dashboard = () => {
    const navigate = useNavigate();
    const username = authService.getUsername();
    const[currentCoinId, setCurrentCoinId] = useState(null);

    const {connected, disconnect: disconnectWallet, publicKey} = useWallet();
    const walletAddress = publicKey ? publicKey.toString() : null;

    const handleRegularLogout = () => {
        authService.logout();
        navigate('/login');
    };

    // this was an issue i faced: proper logging out of the wallet and loading of the login page
    const handleWalletLogout = async () => {
        try {
            if (connected) {
                await disconnectWallet();
                // waiting for wallet to fully disconnect
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.warn('Wallet disconnect error:', error);
        } finally {
            // clear wallet storage
            localStorage.removeItem('walletName');
            sessionStorage.clear();

            authService.logout();
            navigate('/login');
        }
    };


    return (
        <>

            <div className="header-section">
                <h1 className="welcome-header">Welcome, {username}!</h1>

                {connected ? (
                    <>
                        <button className="logout-button" onClick={handleWalletLogout}>
                            Disconnect Wallet
                        </button>
                        <button className="logout-button" onClick={handleRegularLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="logout-button" onClick={handleRegularLogout}>
                        Logout
                    </button>
                )}

                <h2 className="dashboard-header">HedgeHog Dashboard</h2>
            </div>
            <div className="coin-selection">
                <CoinSelection onCoinLoaded={setCurrentCoinId}/>
                <FavoriteToggle
                coinId={currentCoinId}
                userId={username || null}
                walletAddress={walletAddress || null}
                />
            </div>
            <div className="chart-container">
                <Chart/>
            </div>

        </>
    );
};

export default Dashboard;