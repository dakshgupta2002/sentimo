//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React, { useEffect, useState } from 'react'
import { useLoading } from '../../utils/hooks/useLoading.js';
import { get } from './../../utils/api/get.js'
import Note from './Note.jsx'

export default function Page({date}) {
  const {setLoading} = useLoading();
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    setLoading(true); //set page loading to true

    const notes = await get(`notes?date=${date.toDateString()}`); //get notes for the date
    setNotes(notes);  

    setLoading(false); 
  }
  
  useEffect( () => {
    fetchNotes();
  }, [date]); //call fetchNotes when date changes

  return (
    <div>
      {notes.length === 0 ? 
        <h1>No notes for this date</h1> :

        notes.map(({title, content, noteId}) => {
          return <Note title = {title} content = {content} noteId={noteId}/>
        })
      }
      
    </div>
  )
}
