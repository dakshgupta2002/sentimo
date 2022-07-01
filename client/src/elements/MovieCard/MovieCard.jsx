import React from "react";
import "./MovieCard.css";

/*
 * original_title / title (any one)
 * overview = content
 * poster_path
 * release_data (maibi not imp)
 * popularity (not imp maibi)
 * vote_average = rating (yes imp show as circle)
 * id = to be used as key
 */
function MovieCard() {
  return (
    <div className="movieCardContainer">
      <div className="posterContainer">
        <img src="https://m.media-amazon.com/images/I/71s4cikZfeL._AC_SY879_.jpg" alt="Movie Poster" />
      </div>

      <div className="overviewContainer">
        <div className="header">Synopsis</div>
        <div className="movieOverview">Overview of movie here.</div>
      </div>
    </div>
  );
}

export default MovieCard;
