import { useEffect, useState } from "react";
import favoriteService from "../services/favoriteService.js";

const ShowFavorites = ({ userId, walletAddress }) => {
  const [show, setShow] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  const canLoad = !!userId || !!walletAddress;

  async function loadFavorites() {
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
  }

  useEffect(() => {
    if (show && canLoad) {
      loadFavorites();
    }
    if (!show) {
      setFavorites([]);
    }
  }, [show, userId, walletAddress]);

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <div>
      <button onClick={toggleShow} disabled={!canLoad}>
        {show ? "Hide Favorites" : "Show Favorites"}
      </button>

      {show && (
        <>
          {error && <div style={{ color: "red", marginTop: 6 }}>{error}</div>}

          {!error && favorites.length === 0 && (
            <div style={{ marginTop: 6 }}>No favorites yet.</div>
          )}

          {!error && favorites.length > 0 && (
            <ul>
              {favorites.map((f, i) => (
                <li key={f.id ?? `${f.coinId}-${i}`}>
                  {f.coinId}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ShowFavorites;