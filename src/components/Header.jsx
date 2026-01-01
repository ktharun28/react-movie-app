import { Link } from "react-router-dom";

function Header({ title, theme, setTheme }) {
  return (
    <header className="header">
      <h1>{title}</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ❤️</Link>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(prev => (prev === "dark" ? "light" : "dark"))
          }
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
