import React, { useState } from "react";

const WalletViewer = () => {
    const [wallet, setWallet] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchResults = async () => {
        setError("");
        setResults([]);

        if (!wallet) {
            setError("Please enter a wallet address.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8080/token-balances?walletAddress=${wallet}`);
            if (!res.ok) {
                setError("Error: " + res.status);
                setLoading(false);
                return;
            }
            const data = await res.json();
            if (!Array.isArray(data)) {
                setError("Unexpected response format.");
                setLoading(false);
                return;
            }

            //called jupiter's mint end point to retrieve the token's metadata!
            const enriched = await Promise.all(
                data.map(async (item) => {
                    try {
                        const metaRes = await fetch(`https://tokens.jup.ag/token/${item.mint}`);
                        if (!metaRes.ok) throw new Error("No metadata");
                        const meta = await metaRes.json();
                        return {
                            ...item,
                            name: meta.name || item.mint,
                            symbol: meta.symbol || "",
                            logo: meta.logoURI
                        };
                    } catch {
                        return {
                            ...item,
                            name: item.mint,
                            symbol: "",
                        };
                    }
                })
            );

            setResults(enriched);
        } catch (e) {
            setError("Failed to fetch results");
        }
        setLoading(false);
    };

    return (
        <div>
            <input
                type="text"
                value={wallet}
                placeholder="Wallet address"
                onChange={(e) => setWallet(e.target.value)}
            />
            <button onClick={fetchResults} disabled={loading}>
                {loading ? "Loading..." : "Get Balances"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {results.length === 0 && !error && <li>No results yet.</li>}
                {results.map((item, i) => (
                    <li key={i}>
                        <div>Name: {item.name}</div>
                        <div>Symbol: {item.symbol}</div>
                        <div>Mint: {item.mint}</div>
                        <div>Amount: {item.amount}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WalletViewer;
