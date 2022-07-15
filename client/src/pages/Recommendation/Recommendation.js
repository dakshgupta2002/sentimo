import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { ModalContainer } from "../../components";
import "./Recommendation.css";
import { useLoading } from "../../utils/hooks/useLoading";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from '../../utils/api/stats';
import { toast } from "react-toastify";

import { MovieCard } from "../../elements";

export default function Recommendation() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState();
  const [genreNames, setGenreNames] = useState({});
  const [emotion, setEmotion] = useState([0, 0, 0, 0, 0]);
  //Happy Sad Angry Surprise Fear
  const [userGenre, setUserGenre] = useState()
  const [genreModalOpen, setGenreModalOpen] = useState(true);

  const { setLoading, setError, LoadingScreen } = useLoading();
  const { date } = useDate();

  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US`;


  useEffect(() => {
    const getStats = async () => {
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
        // toast.error("Something went wrong.") UNCOMMENT DON't FORGET
      }
    };

    const mapStatToGenre = () => {
      //map the emotion to genre
      
    }

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


    setLoading(true);
    setError("Finding the best results");

    getStats();
    getGenreNames();
    mapStatToGenre();

    setLoading(false);
  }, []);

  useEffect(() => {
    //filter the movies with required genre ID for user
    const getMovies = async () => {
      let fetchedMovies = [];
      while (fetchedMovies.length < 100){
        //keep searching for more movies
        const res = await fetch(discoverUrl);
        const body = await res.json();

      }
    };
    getMovies();
  }, [userGenre])
  return (
    <div className="reccomendationContain">
      <Sidebar />
      <LoadingScreen />
      <ModalContainer isOpen={genreModalOpen} close={() => setGenreModalOpen(false)} style={{backgroundColor: '#2A2323'}}>

        {/* <div style={{backgroundImage: 'https://images.unsplash.com/photo-1535446937720-e4cad0145efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvc3RlciUyMG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',height: '100%', width: '100%'}}>
          gh
        </div> */}
    <img src={`https://images.unsplash.com/photo-1535446937720-e4cad0145efe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvc3RlciUyMG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60`} alt="" style={{height: 'fit-content'}}/>
      </ModalContainer>

      <div className="movieCardContainer">
        {movies?.results?.map((movie, i) => {
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
