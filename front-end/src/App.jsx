import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WalletConnectionProvider from './services/WalletConnectionProvider.jsx';
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Safety from "./pages/Safety.jsx";

function Layout() {
    return (
        <div className="app-shell">
            <Navbar/>
            <main style={{marginLeft: 240, padding: 16}}>
                <Outlet/>
            </main>
        </div>
    );
}

function App() {
    return (
        <WalletConnectionProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route
                        element={
                            <ProtectedRoute>
                                <Layout/>
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/safety" element={<Safety/>}/>

                        <Route element={<AdminRoute/>}>
                            <Route path="/admin" element={<Admin/>}/>
                        </Route>

                        <Route path="/" element={<Navigate to="/dashboard"/>}/>
                    </Route>
                </Routes>
            </Router>
        </WalletConnectionProvider>
    );
}

export default App;