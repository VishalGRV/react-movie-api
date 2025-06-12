import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useState, useEffect } from "react";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading</p>;
  else
    return (
      <div className="movie-detail-container">
        <div className="movie-title">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
          <div className="movie-date-runtime">
            <p>{movie.release_date.split("-")[0]} </p>
            <p>
              ⏱{Math.floor(movie.runtime / 60)}hr{movie.runtime % 60}m
            </p>
          </div>
        </div>
        <div className="movie-content">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <div className="movie-info1">
            <p></p>

            <p>{movie.overview}</p>
            <p>Rating:{Number(movie.vote_average.toFixed(1))}</p>
            <div className="genres">
              {movie.genres.map((genre, i) => (
                <span key={i} className="genre-badge">
                  {genre.name}
                  {i !== movie.genres.length - 1 && (
                    <span className="separator"> | </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default MovieDetails;
