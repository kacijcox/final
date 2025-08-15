const authService = {
    register: async (userName, password) => {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName, password})
        });
        return response.text();
    },

    login: async (username, password) => {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: username, password})
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            return data;
        }
        throw new Error('Login failed');
    },

    phantomLogin: async (walletAddress) => {
        const response = await fetch('/api/auth/phantom-login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({walletAddress})
        });

        if (!response.ok) {
            throw new Error('Phantom login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username || walletAddress);
        localStorage.setItem('authType', 'phantom');
        localStorage.setItem('walletAddress', walletAddress);
        return data;
    },

    logout: () => {
        localStorage.clear();
    },

    isLoggedIn: () => !!localStorage.getItem('token'),

    getUsername: () => {
        return localStorage.getItem('username');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getAuthType: () => {
        return localStorage.getItem('authType');
    },

    getWalletAddress: () => {
        return localStorage.getItem('walletAddress');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authService;