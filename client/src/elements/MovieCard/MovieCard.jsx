import React from "react";
import "./MovieCard.css";
import RatingCircle from "../RatingCircle/RatingCircle";
import { generateUtilityClasses } from "@mui/material";
/*
 * original_title / title (any one)
 * overview = content
 * poster_path
 * genre_ids: [1, 2, 3] get name from these id somehow
 * release_data (maibi not imp)
 * popularity (not imp maibi)
 * vote_average = rating (scale to 10 if not)
 *
 * Change these to prop
 */
const poster_path =
  "https://m.media-amazon.com/images/I/71s4cikZfeL._AC_SY879_.jpg";
const overview = "Overview of movie here.";
const title = "Venom";
const genres = ["Happy", "Action"];
const release_data = "10-05-2018";

function MovieCard() {
  return (
    <div className="movieCardContainer">
      <div className="posterContainer">
        <img src={poster_path} alt="Poster" />
      </div>

      <div className="movieData">
        {/* Movie Name, Genre, Release Date */}
        <div className="movieDetailContainer">
          <div className="movieName">{title}</div>
          <div className="genreAndTime">
            {/* Add comma sep values here later */}
            <div className="genre genreFont">{genres.map((genre) => genre + "  ")}</div>

            <span className="pipe">|</span>

            <div className="releaseDate genreFont">{release_data}</div>
          </div>
        </div>

        <div className="overviewContainer">
          <div className="overviewHeader">
            <div className="ratingCircle">
              <RatingCircle rating={8.3} />
            </div>
            <div className="synopsis">Synopsis</div>
          </div>
          <div className="movieOverview">{overview}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
