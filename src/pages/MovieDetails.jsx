import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useState, useEffect } from "react";
import "../css/MovieDetails.css";
import Skeleton from "react-loading-skeleton";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setTimeout(() => getMovieDetails(id).then(setMovie), 1000);
  }, [id]);

  if (!movie) {
    return (
      <div className="movie-detail-container">
        <div className="movie-title">
          <Skeleton width={600} height={30} style={{ marginBottom: "5px" }} />
          <Skeleton width={200} height={15} />
          <Skeleton width={150} height={10} />
        </div>
        <div
          className="movie-content"
          style={{ justifyContent: "space-around", width: "700" }}
        >
          <Skeleton width={300} height={400} />
          <div>
            <Skeleton
              width={450}
              height={100}
              style={{ marginBottom: "10px" }}
            />
            <Skeleton width={100} height={30} />
          </div>
        </div>
      </div>
    );
  } else
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
