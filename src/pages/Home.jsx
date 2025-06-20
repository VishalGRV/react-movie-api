import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      loadPopularMovies();
    }, 1000);
  }, []);

  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies(page);
      setMovies((prev) => {
        const newMovies = popularMovies.filter(
          (movie) => !prev.some((m) => m.id === movie.id)
        );
        return [...prev, ...newMovies];
      });
      setPage((prev) => prev + 1);
    } catch (err) {
      console.log(err);
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  };

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
      <InfiniteScroll
        dataLength={movies.length}
        next={loadPopularMovies}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="movies-grid">
          {loading
            ? Array(20)
                .fill(0)
                .map((_, i) => <MovieCard loading={true} key={i} />)
            : movies.map((movie) => (
                <MovieCard movie={movie} loading={false} key={movie.id} />
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Home;
