import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { ModalContainer } from "../../components";
import "./Recommendation.css";
import { useLoading } from "../../utils/hooks/useLoading";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from '../../utils/api/stats';
import { toast } from "react-toastify";

import { MovieCard, ModalMovieCard } from "../../elements";
import { MapGenre } from '../../utils/MapGenre'

export default function Recommendation() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genreNames, setGenreNames] = useState({});
  const [emotion, setEmotion] = useState([0, 0, 0, 0, 0]);
  const [userGenre, setUserGenre] = useState()
  const [genreModalOpen, setGenreModalOpen] = useState(true);
  const [lazyFetch, setLazyFetch] = useState(0);
  const { setLoading, setError, LoadingScreen } = useLoading();
  const { date } = useDate();

  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US`;

  const getMoviesOnPage = async (page) => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`);
    const body = await res.json();
    return body.results;
  }

  window.addEventListener('scroll', (e) => {
    if ( //buggy this code not working right
      document.documentElement.scrollTop +
      document.documentElement.clientHeight ===
      document.documentElement.scrollHeight) {
      setLazyFetch(lazyFetch + 1);
    }
    console.log("Reached end of the movies...")
  })

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      setError("Finding the best results");
      //get the emotion stats of last month
      const res = await fetchStats(date, 30);
      if (res?.response?.status === 201 || res?.response?.status === 200) {
        //clear and update the emotions array
        const updatedEmotion = [0, 0, 0, 0, 0];
        res?.data?.map((e) => {
          updatedEmotion[0] += e.emotion.Happy * 100
          updatedEmotion[1] += e.emotion.Sad * 100
          updatedEmotion[2] += e.emotion.Angry * 100
          updatedEmotion[3] += e.emotion.Surprise * 100
          updatedEmotion[4] += e.emotion.Fear * 100
          return e;
        });
        setEmotion(updatedEmotion);
      } else {
        toast.error("Something went wrong.")
      }
      setLoading(false);
    };

    //maps the genre ID to genre name as used by TMDB
    const getGenreNames = async () => {
      const res = await fetch(genreUrl);
      const body = await res.json();
      const genreObj = {};
      for (let i = 0; i < body?.genres?.length; i++) {
        genreObj[body.genres[i].id] = body.genres[i].name;
      }
      setGenreNames(genreObj);
    };

    getGenreNames();
    getStats();
  }, []);

  useEffect(() => {
    const genreSelected = MapGenre(emotion);
    setUserGenre(genreSelected)
  }, [emotion])

  useEffect(() => {
    //filter the movies with required genre ID for user
    const getMovies = async () => {
      let fetchedMovies = [];
      let currentPage = page;
      while (fetchedMovies.length < 20) {
        //keep searching for more movies
        const res = await getMoviesOnPage(currentPage);
        fetchedMovies.push(...res)
        currentPage += 1;
      }
      //get next 20 movies and push to original array
      console.log(fetchedMovies);
      setMovies([...movies, ...fetchedMovies]);
      setPage(currentPage);
    };
    getMovies();
  }, [lazyFetch]) //fetch 20 more movies every time lazy fetch changes

  return (
    <div className="reccomendationContain">
      <Sidebar />
      <LoadingScreen />
      <ModalContainer isOpen={genreModalOpen} close={() => setGenreModalOpen(false)} style={{ backgroundColor: '#2A2323' }}>
        Show pie chart of emotion
        show genre list selected
      </ModalContainer>

      <div className="movieCardContainer">
        {movies?.map((movie, i) => {
          return (
            <div className="movieCard" key={i}>

              <MovieCard
                poster_path={`https://image.tmdb.org/t/p/w185${movie?.poster_path}`}
                title={movie?.title}
                genres={movie?.genre_ids?.map((genreId, i) => genreNames[genreId])}
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
