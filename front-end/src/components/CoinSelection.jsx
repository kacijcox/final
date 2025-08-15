import React, {useState, useEffect} from 'react';
import '../styles/CoinSelection.css';

const CoinSelection = () => {
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [isOpen, setIsOpen] = useState(false);
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const coins = [
        {id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC'},
        {id: 'ethereum', name: 'Ethereum', symbol: 'ETH'},
        {id: 'solana', name: 'Solana', symbol: 'SOL'}
    ];

    const fetchPrice = async (coinId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${coinId}&include_24hr_change=true`
            );
            const data = await response.json();
            setPriceData(data[coinId]);
        } catch (err) {
            setError('Failed to fetch price');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrice(selectedCoin);
    }, [selectedCoin]);

    const handleSelect = (coinId) => {
        setSelectedCoin(coinId);
        setIsOpen(false);
    };

    const selectedCoinData = coins.find(coin => coin.id === selectedCoin);

    return (
        <div className="coin-selection-wrapper">
            <label className="dropdown-label">Select Cryptocurrency</label>
            <p className="select-a-coin">Select Coin</p>

            <div className="dropdown-container">
                <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span className="selected-coin-display">{selectedCoinData.name} ({selectedCoinData.symbol})</span>
                    <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                    <div className="dropdown-menu">
                        {coins.map((coin) => (
                            <button className="dropdown-item"
                                    key={coin.id}
                                    onClick={() => handleSelect(coin.id)}
                            >
                                {coin.name} ({coin.symbol})
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="price-display-container">
                <p className="selected-coin-text">Selected: {selectedCoinData.name}</p>

                {loading && <p className="loading-text">Loading price...</p>}

                {error && <p className="error-text">{error}</p>}

                {priceData && !loading && (
                    <div className="price-info">
                        <p className="current-price">${priceData.usd.toLocaleString()}</p>
                        {priceData.usd_24h_change && (
                            <p className="price-change">
                                {priceData.usd_24h_change >= 0 ? '+' : ''}
                                {priceData.usd_24h_change.toFixed(2)}% (24h)
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export {CoinSelection};
export default CoinSelection;