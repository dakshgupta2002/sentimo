import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components';

export default function Recommendation() {

    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState();

    const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
    const genreUrl =`https://api.themoviedb.org/3/genre/movie/list?api_key=4d3bc810d8690d3649ca4f41960de9b4&language=en-US`;

    useEffect( () => {
        
    }, []);

    return (
        <div>
            <Sidebar />
            Recommendations
        </div>
    )
}
