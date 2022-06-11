//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React, { useEffect, useState } from 'react'
import { useLoading } from '../../utils/hooks/useLoading.js';
import Note from './Note.jsx'
import { fetchNotes } from '../../utils/api/notes.js';

export default function Page({date}) {
  const {setLoading} = useLoading();
  const [notes, setNotes] = useState({notes: []});

  useEffect( () => {
    const getNotes = async () => {
      setLoading(true);
      setNotes(await fetchNotes(date));
      setLoading(false);
    }   
    getNotes();
    
  }, [date]); //call fetchNotes when date changes

  return (
    <div>
      {notes?.notes?.length === 0 ? 
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
