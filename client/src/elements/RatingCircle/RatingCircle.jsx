import React from "react";
import "./RatingCircle.css";

export default function RatingCircle({ vote_average = 0.1 }) {
  return (
    <div className="ratingCircle__Container">
      <div className="ratingCircle__Internal">{vote_average.toString()}</div>
    </div>
  );
}
