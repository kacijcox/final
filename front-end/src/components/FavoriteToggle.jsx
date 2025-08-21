import {useState} from "react";
import favoriteService from "../services/favoriteService.js";


function FavoriteToggle({ coinId, userId, walletAddress, onFavoriteAdded}) {
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const canSave = !!coinId && (!!userId || !!walletAddress);

  async function handleSave(e) {
    e.preventDefault();

        if (!canSave) return;
    setSaving(true);
    setError(null);
    try {
        if (walletAddress) {
            await favoriteService.favoritesWallet(coinId, walletAddress);
        } else if (userId) {
            await favoriteService.favoritesUser(coinId, userId);
        }
        setChecked(true);

        if (onFavoriteAdded) {
            onFavoriteAdded();
        }
    } catch (err) {
      setError('Could not save favorite');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        Save to favorites
      </label>
      <button
        style={{ marginLeft: 8 }}
        onClick={handleSave}
      >
        {saving ? 'Saving...' : 'Submit Favorite'}
      </button>
      {!canSave && <small style={{ marginLeft: 8 }}>(saves coin to favorite list)</small>}
      {error && <div style={{ color: 'red', marginTop: 6 }}>{error}</div>}
    </div>
  );
}

export default FavoriteToggle;
