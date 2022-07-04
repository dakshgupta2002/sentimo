import React from "react";
import "./MovieCard.css";
import RatingCircle from "../RatingCircle/RatingCircle";
import Button from "@mui/material/Button";
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

function ItemSepWithDot(items)
{
  var f = items?.length;
  f -= 1;
  const jsx_items = []
  for (let i = 0; i < items?.length; i++)
  {
    jsx_items.push(<div key={i} className="genre-list"> {items[i]} 
    <span className={f-- !== 0 ? `center-dot` : ``}></span>
    </div>);
  }

  return jsx_items;
};

export function MovieCard({poster_path, title, genres, release_data, overview, rating}) {

  return (
    <div className="movieCardContainer">

      <div className="posterContainer" style={{backgroundImage: `url(${poster_path})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}> 
      
        {/* <img src={poster_path} alt="Poster" /> */}
        <RatingCircle rating={rating} />
      </div>

      <div className="movieData">

        {/* Movie Name, Genre, Release Date */}
        <div className="movieDetailContainer">
          <div className="movieName">{title}</div>
            {/* Add comma sep values here later */}
            <div className="genre">
              {
                ItemSepWithDot(genres)
              }
            </div>


            <div className="releaseDate">
              <div className="content">{release_data}</div>

              {/* onClick open MODAL :( */}
              <Button variant="contained" sx={{margin: 0, padding: 0, color: 'white', fontWeight: 'bold', backgroundColor: '#EB5353'}}>More</Button>
            </div>
        </div>

        {/* In Modal everything + synopsis */}
        {/* <div className="overviewContainer">
          <div className="overviewHeader">
            <div className="synopsis">Synopsis</div>
          </div>
          <div className="movieOverview">{overview}</div>
        </div> */}
      </div>

    </div>

  );
}

export default MovieCard;
