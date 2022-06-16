import React, { useEffect, useState } from 'react'
import {Sidebar} from './../../components';
import {Cards} from './../../elements'
import { fetchFavourite } from '../../utils/api/notes';
import './Favorite.css';

export default function Favorite({setLoading}) {

  const [notes, setNotes] = useState([]);

  useEffect( () => {
    const getNotes = async () => {
      // setLoading(true);
      const res = await fetchFavourite();
      if (res.response.status === 200) {
        console.log(res.data.notes)
        setNotes(res.data.notes);
      }
      // setLoading(false);
    };
    getNotes();
  }, []);

  return (
    <div>
        <Sidebar />

        <div className='favorite-container'>
        {notes?.length === 0 ? (
        <h1>No notes added in favourites</h1>
      ) : (
        notes?.map(({ title, content, _id, favourite, protect, createdAt, updatedAt }) => {
          return (
            <section>
              <Cards key={_id} title={title} content={content} noteId={_id} 
              favourite={favourite} createdAt={createdAt} updatedAt={updatedAt}/>
            </section>
          );
        })
      )}
        </div>
    </div>
  )
}
