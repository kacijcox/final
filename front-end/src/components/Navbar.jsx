import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!authService.getToken());
    const [isAdmin, setIsAdmin] = useState(authService.isAdmin());

    useEffect(() => {
        const handleAuthChange = () => {
            setIsAuthenticated(!!authService.getToken());
            setIsAdmin(authService.isAdmin());
        };

        window.addEventListener('authChange', handleAuthChange);

        return () => {
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    return (
        <nav className="sidebar">
            <div className="sidebar-logo">Hedge Hog</div>
            {isAuthenticated && (
                <div className="sidebar-links">
                    <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
                    <Link to="/about" className="sidebar-link">About</Link>
                    <Link to="/safety" className="sidebar-link">Safety</Link>
                    {isAdmin && (
                        <Link to="/admin" className="sidebar-link">Admin</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
