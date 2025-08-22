import React, { useEffect, useState } from "react";
import "../styles/AdminSessionsTable.css";

const AdminSessionsTable = () => {
    const [rows, setRows] = useState([]);
    const [state, setState] = useState({ loading: true, error: null });

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const res = await fetch("http://localhost:8080/api/user-sessions");
                if (!res.ok) throw new Error(`Failed to load sessions: ${res.status}`);
                const data = await res.json();
                if (active) {
                    setRows(Array.isArray(data) ? data : []);
                    setState({ loading: false, error: null });
                }
            } catch (e) {
                if (active) setState({ loading: false, error: e.message || "Error" });
            }
        })();

        return () => { active = false; };
    }, []);

    if (state.loading) return <div>Loading sessions…</div>;
    if (state.error) return <div style={{ color: "red" }}>Error: {state.error}</div>;
    if (!rows.length) return <div>No sessions found.</div>;

    const fmt = (v) => (v ? new Date(v).toLocaleString() : "");

    return (
        <div className="table-container">
            <table className="sessions-table">
                <thead>
                <tr>
                    <th>Session Token Hash</th>
                    <th>User ID</th>
                    <th>Wallet Address</th>
                    <th>IP Address</th>
                    <th>User Agent</th>
                    <th>Created At</th>
                    <th>Last Seen At</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((r) => (
                    <tr key={r.sessionTokenHash}>
                        <td className="mono">{r.sessionTokenHash}</td>
                        <td>{r.userId || ""}</td>
                        <td className="mono">{r.walletAddress}</td>
                        <td>{r.ipAddress || ""}</td>
                        <td>{r.userAgent || ""}</td>
                        <td>{fmt(r.createdAt)}</td>
                        <td>{fmt(r.lastSeenAt)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSessionsTable;
