import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WalletConnectionProvider from './services/WalletConnectionProvider.jsx';
import About from "./components/About";
import Navbar from "./components/Navbar.jsx";
import Admin from "./components/Admin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

function App() {
    return (
        <WalletConnectionProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard"/>}/>
                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                </Routes>
            </Router>
        </WalletConnectionProvider>
    );
}

export default App;