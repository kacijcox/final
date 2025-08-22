import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useWallet} from '@solana/wallet-adapter-react';
import authService from '../services/authService';
import CoinSelection from './CoinSelection'
import '../styles/Dashboard.css';
import Chart from "./Chart.jsx";
import FavoriteToggle from "./FavoriteToggle.jsx";
import ShowFavorites from "./ShowFavorites.jsx";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const username = authService.getUsername();
    const authType = authService.getAuthType();
    const isWalletAuth = authType === 'phantom';
    const [currentCoinId, setCurrentCoinId] = useState(null);
    const showFavoritesRef = useRef();


    const {connected, disconnect: disconnectWallet, publicKey} = useWallet();

    const getWalletAddress = () => {
        if (isWalletAuth) {
            const storedAddress = localStorage.getItem('walletAddress');
            if (storedAddress) {
                return storedAddress;
            }
            return publicKey ? publicKey.toString() : null;
        }
        return null;
    };

    const walletAddress = getWalletAddress();

    useEffect(() => {
        if (connected && publicKey && isWalletAuth) {
            const address = publicKey.toString();
            localStorage.setItem('walletAddress', address);
        }
    }, [connected, publicKey, isWalletAuth]);

    const displayName = username && username.includes('@')
        ? username.split('@')[0]
        : username;

    const walletName = walletAddress
        ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
        : null;

    const userIdForFavorites = isWalletAuth ? null : username;
    const walletAddressForFavorites = isWalletAuth ? walletAddress : null;

    const handleFavoriteAdded = () => {
        if (showFavoritesRef.current && showFavoritesRef.current.refreshFavorites) {
            showFavoritesRef.current.refreshFavorites();
        }
    };

    const handleRegularLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const handleWalletLogout = async () => {
        try {
            if (connected) {
                await disconnectWallet();
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.warn('Wallet disconnect error:', error);
        } finally {
            localStorage.removeItem('walletAddress');
            localStorage.removeItem('walletName');
            localStorage.clear();
            sessionStorage.clear();

            authService.logout();
            navigate('/login');
        }
    };

    return (
        <>
            <div className="header-section">
                <h1 className="welcome-header">
                    Welcome{isWalletAuth && walletName ? `, ${walletName}` : displayName ? `, ${displayName}` : ''}!
                </h1>
                <h1 className="dashboard-header">HedgeHog Dashboard</h1>
                {isWalletAuth ? (
                    <>
                        {connected && (
                            <button className="logout-button" onClick={handleWalletLogout}>
                                Disconnect Wallet
                            </button>
                        )}
                        <button className="logout-button" onClick={handleRegularLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button className="logout-button" onClick={handleRegularLogout}>
                        Logout
                    </button>
                )}

            </div>

            <div className="coin-selection">
                <CoinSelection onCoinLoaded={setCurrentCoinId}/>

                <FavoriteToggle
                    coinId={currentCoinId}
                    userId={userIdForFavorites}
                    walletAddress={walletAddressForFavorites}
                    onFavoriteAdded={handleFavoriteAdded}
                />

                <ShowFavorites
                    ref={showFavoritesRef}
                    userId={userIdForFavorites}
                    walletAddress={walletAddressForFavorites}
                />
            </div>
             <Chart/>
        </>
    );
};

export default Dashboard;