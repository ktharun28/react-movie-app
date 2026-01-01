import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  if (movies.length === 0) {
    return <p style={{ textAlign: "center" }}>💔 No favorites yet</p>;
  }

  return (
    <div className="page">
      <div className="grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
