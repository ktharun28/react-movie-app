import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/favorites";

import { getMoviesByCategory, searchMovies } from "./services/tmdb";

function App() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        let data;
        if (query.trim() !== "") {
          data = await searchMovies(query);
        } else {
          data = await getMoviesByCategory(category);
        }

        setMovies(data);
      } catch {
        setError("Failed to load movies 😢");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [category, query]);

  return (
    <div>
      <Header title="🎬 MovieBox" theme={theme} setTheme={setTheme} />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filters">
        <button
          className={category === "popular" && !query ? "active" : ""}
          onClick={() => {
            setCategory("popular");
            setQuery("");
          }}
        >
          Popular
        </button>

        <button
          className={category === "top_rated" && !query ? "active" : ""}
          onClick={() => {
            setCategory("top_rated");
            setQuery("");
          }}
        >
          Top Rated
        </button>

        <button
          className={category === "upcoming" && !query ? "active" : ""}
          onClick={() => {
            setCategory("upcoming");
            setQuery("");
          }}
        >
          Upcoming
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>⏳ Loading movies...</p>}
      {error && <p style={{ textAlign: "center" }}>{error}</p>}

      {!loading && !error && (
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
