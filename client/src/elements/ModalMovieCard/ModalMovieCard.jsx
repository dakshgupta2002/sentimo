import React from "react";
import {RatingCircle} from "./../RatingCircle";
import {Divider} from "../Divider";

import "./ModalMovieCard.css";

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

// const poster_path =
//   "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60";
// const title = "Spiderman: Something home";
// const genres = ["Happy", "Action", "Sad"];
// const vote_average = 8.7;
// const overview =
//   "Spiderman not going home coz home not coming one thing or other thing make him stay away from home but to make it bigger let's talk about something which will never really happen but overview should be bigger so yes this a good movie but marvel going downhill these days..";

function DotSepPrint(items) {
  var f = items?.length;
  f -= 1;
  const jsx_items = [];
  for (let i = 0; i < items?.length; i++) {
    jsx_items.push(
      <div key={i} className="genre-list">
        {" "}
        {items[i]}
        <span className={f-- !== 0 ? `center-dot` : ``}></span>
      </div>
    );
  }

  return jsx_items;
}

function ModalMovieCard({poster_path, title, genres, rating, overview, release_data}) {
  return (
    <div>
      <div className="movieCardRoot">

        <img src={poster_path} alt={`${title} poster`} className="moviePoster" />

        <div className="movieDetails">
          <div className="_movieData pad-10">
            <div className="nameAndRating">
              <div className="movieName">{title}</div>
              <div>
                <RatingCircle rating={rating} />
              </div>
            </div>

            <div className="releaseDate medium-text">{release_data}</div>

            <div className="genreList medium-text">{DotSepPrint(genres)}</div>
          </div>

          <div style={{ width: "100%", borderBottom: "4px solid #de1818" }} />

          <div className="overviewContainer pad-10">
            <div className="overviewHeader orangeLine">Overview</div>
            <div className="movieOverview">{overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMovieCard;
