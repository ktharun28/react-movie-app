import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function MovieCard({ id, title, year, rating, poster }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(id));
  }, [id]);

  const imageUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  function handleFav(e) {
    e.preventDefault(); // prevent card navigation
    toggleFavorite({ id, title, year, rating, poster });
    setFav(prev => !prev);
  }

  return (
    <div className="movie-card">
      <Link to={`/movie/${id}`}>
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
      </Link>

      <p>⭐ {rating}</p>

      <button
        className={`like-btn ${fav ? "liked" : ""}`}
        onClick={handleFav}
        aria-label="Toggle favorite"
      >
        ♥
      </button>
    </div>
  );
}

export default MovieCard;
