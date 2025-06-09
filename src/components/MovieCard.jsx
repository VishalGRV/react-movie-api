import "../css/MovieCard.css";
import { useMovieContext } from "../Context/MovieContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MovieCard({ movie, loading }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = movie?.id ? isFavorite(movie.id) : false;
  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      {loading ? (
        <>
          <Skeleton height={470} style={{ marginTop: -5 }} />
          <Skeleton
            height={20}
            width={180}
            style={{ marginTop: 15, marginLeft: 10 }}
          />
          <Skeleton
            height={15}
            width={100}
            style={{ marginTop: 10, marginBottom: 15, marginLeft: 10 }}
          />
        </>
      ) : (
        <>
          <div className="movie-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-overlay">
              <button
                className={`favorite-btn ${favorite ? "active" : ""}  `}
                onClick={onFavoriteClick}
              >
                ♥
              </button>
            </div>
          </div>
          <div className="movie-info">
            <h3>{movie.title || <Skeleton />}</h3>
            <p>{movie.release_date?.split("-")[0] || <Skeleton />}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieCard;
