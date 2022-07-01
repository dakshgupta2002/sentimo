import React from "react";
import "./RatingCircle.css";

export default function RatingCircle({ rating = 8.3 }) {
  return (
    <div className="ratingCircle__Container">
      <div className="ratingCircle__Internal">{rating.toString()}</div>
    </div>
  );
}
