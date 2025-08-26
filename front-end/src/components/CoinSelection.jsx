import React, {useState} from 'react';
import '../styles/CoinSelection.css';

const CoinSelection = ( {onCoinLoaded}) => {
    const [coinId, setCoinId] = useState('bitcoin');
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //
    // const coins = [
    //     {id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC'},
    //     {id: 'ethereum', name: 'Ethereum', symbol: 'ETH'},
    //     {id: 'ripple', name: 'Ripple', symbol: 'XRP'},
    //     {id: 'solana', name: 'Solana', symbol: 'SOL'},
    //     {id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB'}
    // ];

    // const fetchPrice = async (coinId) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch(
    //             `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${coinId}&include_24hr_change=true`
    //         );
    //         const data = await response.json();
    //         setPriceData(data[coinId]);
    //     } catch (err) {
    //         setError('Failed to fetch price');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    async function fetchPrice(id) {
        setLoading(true);
        setError(null);
        setPriceData(null);
        try {
            const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const res = await fetch(`${API_BASE}/api/prices/${encodeURIComponent(id)}?vs=usd`);
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }
            const data = await res.json();
            const coinData = data[id] || null;
            setPriceData(coinData);
            if (coinData) {
                // tell parent which coin is currently displayed
                onCoinLoaded(id);
            }
        } catch (e) {
            setError('Failed to fetch price.');
        } finally {
            setLoading(false);
        }
    }


    // async function fetchPriceByIdsCsv(idsCsv) {
    //     setLoading(true);
    //     setError(null);
    //     setPriceData(null);
    //     try {
    //         const res = await fetch(`/api/prices?ids=${encodeURIComponent(idsCsv)}&vs=usd`);
    //         if (!res.ok) {
    //             throw.new Error(`request failed: ${res.status}`);
    //         }
    //         const data = await res.json();
    //     }
    //
    // useEffect(() => {
    //     fetchPrice(selectedCoin);
    // }, [selectedCoin]);
    //
    // const handleSelect = (coinId) => {
    //     setSelectedCoin(coinId);
    //     setIsOpen(false);
    // };

    function onSubmit(e) {
        e.preventDefault();
        const id = coinId.trim().toLowerCase();
        if (!id) {
            setError('Please enter a coin id.');
            return;
        }
        fetchPrice(id);
    }

    // const selectedCoinData = coins.find(coin => coin.id === selectedCoin);

    return (
        <div className="coin-selection-wrapper">
            <label className="dropdown-label">Enter A Cryptocurrency</label>
            <p className="select-a-coin">Example: "bitcoin, Bitcoin"</p>

            <form className="input-form" onSubmit={onSubmit}>
                <input
                    className="coin-input"
                    type="text"
                    placeholder='e.g. "bitcoin"'
                    value={coinId}
                    onChange={(e) => setCoinId(e.target.value)}
                />
                <button className="fetch-button" type="submit">Get Price</button>
            </form>

            {(loading || error || priceData) && (
                <div className="price-display-container">
                    {loading && <p className="loading-text">Loading price...</p>}
                    {error && <p className="error-text">{error}</p>}
                    {priceData && !loading && priceData.usd !== undefined && (
                        <div className="price-info">
                            <p className="current-price">${priceData.usd.toLocaleString()}</p>
                            {priceData.usd_24h_change !== undefined && (
                                <>
                                    <p className="price-change">
                                        24hr Change: {priceData.usd_24h_change >= 0 ? '+' : ''}
                                        {priceData.usd_24h_change.toFixed(2)}% (24h)
                                    </p>
                                    <p className="market-cap">
                                        Market Cap: ${priceData.usd_market_cap.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                    </p>
                                    <p className="volume">
                                        24hr Volume: ${priceData.usd_24h_vol.toLocaleString()}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                    {priceData && priceData.usd === undefined && (
                        <p className="error-text">No price data for that coin id.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export { CoinSelection };
export default CoinSelection;