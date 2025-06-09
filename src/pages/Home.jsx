import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err);
          setError("Failed to load");
        } finally {
          setLoading(false);
        }
      };
      loadPopularMovies();
    }, 3000);
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError("Failed to search movies");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {loading
          ? Array(20)
              .fill(0)
              .map((_, i) => <MovieCard loading={true} key={i} />)
          : movies.map((movie) => (
              <MovieCard movie={movie} loading={false} key={movie.id} />
            ))}
      </div>
    </div>
  );
}

export default Home;
