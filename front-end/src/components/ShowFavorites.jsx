import {forwardRef, useCallback, useEffect, useImperativeHandle, useState} from "react";
import favoriteService from "../services/favoriteService.js";

const ShowFavorites = forwardRef(({userId, walletAddress}, ref) => {
    const [show, setShow] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");
    const [removing, setRemoving] = useState(null);

    const canLoad = !!userId || !!walletAddress;

    const loadFavorites = useCallback(async () => {
        setError("");
        try {
            if (userId) {
                const data = await favoriteService.listByUser(userId);
                setFavorites(Array.isArray(data) ? data : []);
            } else if (walletAddress) {
                const data = await favoriteService.listByWallet(walletAddress);
                setFavorites(Array.isArray(data) ? data : []);
            } else {
                setFavorites([]);
            }
        } catch {
            setError("Could not load favorites.");
            setFavorites([]);
        }
    }, [userId, walletAddress])

    //handle removing a favorite
    const handleRemoveFavorite = async (coinId) => {
        setRemoving(coinId);
        setError("");
        try {
            if (userId) {
                await favoriteService.removeForUser(userId, coinId);
            } else if (walletAddress) {
                await favoriteService.removeForWallet(walletAddress, coinId);
            }
            //update favorite list after removal
            setFavorites(favorites.filter(f => f.coinId !== coinId));
        } catch (err) {
            setError("Could not remove favorite.");
        } finally {
            setRemoving(null);
        }
    };

    useImperativeHandle(ref, () => ({
        refreshFavorites: async () => {
            if (show && canLoad) {
                await loadFavorites();
            }
        }
    }), [show, canLoad, loadFavorites]);

    useEffect(() => {
        if (show && canLoad) {
            loadFavorites();
        } else if (!show) {
            setFavorites([]);
        }
    }, [show, canLoad, loadFavorites]);

    const toggleShow = () => setShow((prev) => !prev);

    return (
        <div>
            <button onClick={toggleShow} disabled={!canLoad}>
                {show ? "Hide Favorites" : "Show Favorites"}
            </button>

            {show && (
                <>
                    {error && <div style={{color: "red", marginTop: 6}}>{error}</div>}

                    {!error && favorites.length === 0 && (
                        <div style={{marginTop: 6}}>No favorites yet.</div>
                    )}

                    {!error && favorites.length > 0 && (
                        <ul>
                            {favorites.map((f, i) => (
                                <li key={f.id ?? `${f.coinId}-${i}`}>
                                    {f.coinId.charAt(0).toUpperCase() + f.coinId.slice(1)}
                                    {" "}
                                    <button
                                        onClick={() => handleRemoveFavorite(f.coinId)}
                                        disabled={removing === f.coinId}
                                    >
                                        {removing === f.coinId ? "..." : "-"}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
});

export default ShowFavorites;
