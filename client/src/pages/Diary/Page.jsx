//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React, { useEffect, useState } from 'react'
import { useLoading } from '../../utils/hooks/useLoading.js';
import Note from './Note.jsx'
import { fetchNotes } from '../../utils/api/notes.js';

export default function Page({date}) {
  const {setLoading} = useLoading();
  const [notes, setNotes] = useState([]);

  useEffect( () => {
    setLoading(true);
    setNotes(fetchNotes(date));
    setLoading(false);

  }, [date]); //call fetchNotes when date changes

  return (
    <div>
      {notes?.length === 0 ? 
        <h1>No notes for this date</h1> :

        notes?.notes?.map(({title, content, noteId}) => {
          return <div>

            <Note title = {title} content = {content} noteId={noteId}/>

          </div>
        })
      }
      
    </div>
  )
}
