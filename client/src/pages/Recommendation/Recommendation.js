import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { MovieCard } from "../../elements";

import "./Recommendation.css";

export default function Recommendation() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState();
  const [genre, setGenre] = useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US`;

  useEffect(() => {
    const getGenre = async () => {
      const res = await fetch(genreUrl);
      const body = await res.json();
      // console.log("genre:", body);
      const genreObj = {};
      for (let i = 0; i < body?.genres?.length; i++) {
        genreObj[body.genres[i].id] = body.genres[i].name;
      }
      setGenre(genreObj);
    };

    const getMovies = async () => {
      const res = await fetch(discoverUrl);
      const body = await res.json();
      // console.log("movie:", body.results);
      console.log(body.results);
      setMovies(body);
    };

    getGenre();
    getMovies();
  }, []);

  return (
    <div className="reccomendationContain">
      <Sidebar />
      <div className="movieCardContainer">
        {movies?.results?.map((movie, i) => {
          return (
            <div className="movieCard" key={i}>
              <MovieCard
                poster_path={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
                title={movie?.title}
                genres={movie?.genre_ids?.map((genreID, i) => genre[genreID])}
                release_data={movie?.release_date}
                rating={movie?.vote_average?.toFixed(1)} /* Only 1 decimal digit */
                overview={movie?.overview}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
