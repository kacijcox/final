import React from 'react';
import Navbar from "../components/Navbar.jsx";
import AdminSessionsTable from "../components/AdminSessionsTable.jsx";

const Admin = () => {
    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
                <AdminSessionsTable />
        </div>
            </>
    );
};

export default Admin;
