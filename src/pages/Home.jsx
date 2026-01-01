import MovieCard from "../components/MovieCard";

function Home({ movies }) {
  return (
    <div className="page">
      <div className="grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.release_date?.slice(0, 4)}
            rating={movie.vote_average}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
