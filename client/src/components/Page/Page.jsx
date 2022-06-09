//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React, { useEffect, useState } from 'react'
import { get } from './../../utils/api/get.js'
import Note from './Note.jsx'

export default function Page({date, setIsLoading}) {
  
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    setIsLoading(true); //set page loading to true

    const notes = await get(`/notes/${date}`); //get notes for the date
    setNotes(notes);  

    setIsLoading(false); 
  }
  
  useEffect( () => {
    fetchNotes();
  }, [date]); //call fetchNotes when date changes

  return (
    <div>
      {notes.length === 0 ? 
        <h1>No notes for this date</h1> :

        notes.map(({title, content}) => {
          return <Note title = {title} content = {content} />
        })
      }
      
    </div>
  )
}
