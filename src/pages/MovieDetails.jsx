import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>⏳ Loading movie details...</p>;
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="details">
      <img src={imageUrl} alt={movie.title} />

      <div className="details-info">
        <h1>{movie.title}</h1>

        <div className="meta">
            <span>⭐ {movie.vote_average}</span>
            <span>{movie.runtime} min</span>
            <span>{movie.release_date}</span>
        </div>


        <div className="genres">
          {movie.genres.map(g => (
            <span key={g.id}>{g.name}</span>
          ))}
        </div>

        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
