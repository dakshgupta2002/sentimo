import React, { useState } from "react";
import "./MovieCard.css";
import RatingCircle from "../RatingCircle/RatingCircle";
import Button from "@mui/material/Button";
import { ModalContainer } from "../../components";
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

function ItemSepWithDot(items) {
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

export function MovieCard({
  poster_path,
  title,
  genres,
  release_data,
  overview,
  rating,
}) {
  const [open, setOpen] = useState(false);
  
  const MovieDescription = () => {
    return (
      <div className="overviewContainer">
        <div className="overviewHeader">
          <div className="synopsis">Synopsis</div>
        </div>
        <div className="movieOverview">{overview}</div>
      </div>
    );
  };

  return (
    <div className="movieCardContainer">
      <ModalContainer isOpen={open} close={() => setOpen(false)}>
        <MovieDescription />
      </ModalContainer>

      <div
        className="posterContainer"
        style={{
          backgroundImage: `url(${poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img src={poster_path} alt="Poster" /> */}
        <RatingCircle rating={rating} />
      </div>

      <div className="movieData">
        <div className="movieDetailContainer">
          <div className="movieName">{title}</div>
          <div className="genre">{ItemSepWithDot(genres)}</div>

          <div className="releaseDate">
            <div className="content">{release_data}</div>
            <Button
              variant="contained"
              sx={{
                margin: 0,
                padding: 0,
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#EB5353",
              }}
              onClick={(e) => setOpen(true)}
            >
              More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
