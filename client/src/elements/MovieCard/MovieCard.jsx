import React from "react";
import "./MovieCard.css";
import RatingCircle from "../RatingCircle/RatingCircle";
import { generateUtilityClasses } from "@mui/material";
import { jsx } from "@emotion/react";
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
  "https://images.unsplash.com/photo-1656751609190-e0168efca2da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60";
const overview = "Overview of movie here.";
const title = "Venom";
const genres = ["Happy", "Action"];
const release_data = "10-05-2018";

function ItemSepWithDot(items)
{
  var f = items.length - 1;
  const jsx_items = []
  for (let i = 0; i < items.length; i++)
  {
    jsx_items.push(<div key={i} className="genre-list"> {items[i]} 
    <span className={`{${f-- !== 0} ? ${`center-dot`} : ${""}}`}></span>
    </div>);
  }

  return jsx_items;
};

function MovieCard() {

  return (
    <div className="movieCardContainer">

      <div className="posterContainer" style={{backgroundImage: `url(${poster_path})`}}> 
      
        {/* <img src={poster_path} alt="Poster" /> */}
      </div>

      <div className="movieData">

        {/* Movie Name, Genre, Release Date */}
        <div className="movieDetailContainer">
          <div className="movieName">{title}</div>
            {/* Add comma sep values here later */}
            <div className="genre genreFont">
              {
                ItemSepWithDot(genres)
              }
            </div>

            <div className="releaseDate genreFont">{release_data}</div>
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
