import React, {useState} from "react";
import "../styles/WalletViewer.css";

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
            //get balances from backend
            const res = await fetch(
                `http://localhost:8080/token-balances?walletAddress=${wallet}`
            );
            if (!res.ok) throw new Error("Backend error: " + res.status);

            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("Unexpected response format.");

            //collect unique mints from all balances
            const mints = [
                ...new Set(
                    data
                        .map((x) => (x.mint || "").trim())
                        .filter((m) => m && typeof m === "string")
                ),
            ];

            //query jupiter meta data for each mint
            const metaById = new Map();
            for (let i = 0; i < mints.length; i += 100) {
                const chunk = mints.slice(i, i + 100); //chunk was key in getting the desired enrichment b/c
                //jupiter's API doesn't handle thousands of mints in one request well so slicing mints into chunks
                //of 100 seemed to worked. chunk converts arrays into comma sep string and let me retrieve everthing in
                //one request
                const url = `https://lite-api.jup.ag/tokens/v2/search?query=${encodeURIComponent(
                    chunk.join(",")
                )}`;
                try {
                    const metaRes = await fetch(url);
                    if (!metaRes.ok) continue;
                    const arr = await metaRes.json();
                    (arr || []).forEach((t) => {
                        if (t?.id) metaById.set(t.id.toLowerCase(), t);
                    });
                } catch {

                }
            }

            //enrich metadata from jupiter
            const enriched = data.map((item) => {
                const key = (item.mint || "").trim().toLowerCase();
                const meta = metaById.get(key);
                return {
                    ...item,
                    name: meta?.name || item.name || item.mint,
                    symbol: meta?.symbol || item.symbol || "",
                    icon: meta?.icon || null,
                    decimals: meta?.decimals,
                };
            });

            setResults(enriched);
        } catch (e) {
            console.error(e);
            setError(e.message || "Failed to fetch results");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wallet-viewer-container">
            <div className="wallet-input-section">
                <input
                    type="text"
                    value={wallet}
                    placeholder="Wallet address"
                    onChange={(e) => setWallet(e.target.value)}
                />
                <button onClick={fetchResults} disabled={loading}>
                    {loading ? "Loading..." : "Get Balances For Wallets On Solana"}
                </button>
            </div>

            <div className="what-is-solana">
                <a href="https://solana.com/" target="_blank" rel="noopener noreferrer">
                    What is Solana?
                </a>
            </div>
            <div className="what-is-solana">
                <a
                    href="https://solana.com/developers"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Build on Solana
                </a>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="wallet-results">
                <ul>
                    {results.length === 0 && !error && <li>No results yet.</li>}
                    {results.map((item, i) => (
                        <li key={i}>
                            <div style={{display: "flex", alignItems: "center", gap: 8}}>
                                {item.icon && (
                                    <img
                                        src={item.icon}
                                        alt={item.symbol || item.name}
                                        style={{width: 20, height: 20, borderRadius: 4}}
                                    />
                                )}
                                <strong>{item.name}</strong>
                                {item.symbol ? <span>({item.symbol})</span> : null}
                            </div>
                            <div>Mint: {item.mint}</div>
                            <div>Amount: {item.amount}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WalletViewer;
