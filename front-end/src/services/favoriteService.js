const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';


const favoriteService = {
    //add favorite for user
    favoritesUser: async (coinId, userId) => {
        const res = await fetch(`${API_BASE}/api/favorites/favorites-user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({coinId, userId}),
        });
        if (!res.ok) throw new Error(`Failed to save favorite (user): ${res.status}`);
        return res.json(); // controller returns the saved CoinFavorite
    },

    //add favorite for wallet user
    favoritesWallet: async (coinId, walletAddress) => {
        const res = await fetch(`${API_BASE}/api/favorites/favorites-wallet`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({coinId, walletAddress}),
        });
        if (!res.ok) throw new Error(`Failed to save favorite (wallet): ${res.status}`);
        return res.json();
    },

    //list favorites for user
    listByUser: async (userId) => {
        const res = await fetch(`${API_BASE}/api/favorites/user/${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error(`Failed to fetch favorites (user): ${res.status}`);
        return res.json();
    },

    //list favorites for wallet user
    listByWallet: async (walletAddress) => {
        const res = await fetch(`${API_BASE}/api/favorites/wallet/${encodeURIComponent(walletAddress)}`);
        if (!res.ok) throw new Error(`Failed to fetch favorites (wallet): ${res.status}`);
        return res.json();
    },

    //remove favorite for user
    removeForUser: async (userId, coinId) => {
        const res = await fetch(`${API_BASE}/api/favorites/user/${encodeURIComponent(userId)}/${encodeURIComponent(coinId)}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(`Failed to remove favorite (user): ${res.status}`);
    },

    //remove favroite for wallet user
    removeForWallet: async (walletAddress, coinId) => {
        const res = await fetch(`${API_BASE}/api/favorites/wallet/${encodeURIComponent(walletAddress)}/${encodeURIComponent(coinId)}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(`Failed to remove favorite (wallet): ${res.status}`);
    },
};

    export default favoriteService;





