const KEY = "moviebox_favorites";

export function getFavorites() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id) {
  return getFavorites().some(m => m.id === id);
}

export function toggleFavorite(movie) {
  const favs = getFavorites();
  const exists = favs.some(m => m.id === movie.id);

  const updated = exists
    ? favs.filter(m => m.id !== movie.id)
    : [...favs, movie];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
