import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const AdminRoute = () => {
    //if the user is an admin then render admin page
    //if not then redirect to dashboard
    return authService.isAdmin() ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;