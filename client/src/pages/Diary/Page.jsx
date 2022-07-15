//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React, { useEffect, useState } from "react";
import { useLoading } from "../../utils/hooks/useLoading.js";
// import Note from "./Note.jsx";
import { fetchNotes } from "../../utils/api/notes.js";
import './Diary.css';

const Note = React.lazy(() => import('./Note.jsx'));

export default function Page({date, notesAdded, setNotesAdded, notesEdited, setNotesEdited, setEditOpen, setEditNoteId}) {
  const { setLoading, LoadingScreen, setError } = useLoading();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true); setError('Fetching Notes')
      const res = await fetchNotes(date);
      if (res.response.status === 200) {
        setNotes(res.data.notes);
      }
      setLoading(false);
    };
    getNotes();
  }, [date, notesAdded, notesEdited]); //call fetchNotes when date changes

  return (
    <div className="page-container">
      <LoadingScreen />
      {notes?.length === 0 ? (
        <h1 style={{fontFamily: 'Montserrat', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px'}}>No notes for this date !</h1>
      ) : (
        notes?.map(({ title, content, _id, favourite, protect, createdAt, updatedAt }) => {
          return (
            <section key={_id} className="note-container">
              <Note title={title} content={content} noteId={_id} 
                favourite={favourite} protect={protect}
                createdAt={createdAt} updatedAt={updatedAt}
                notesAdded={notesAdded} setNotesAdded={setNotesAdded} 
                setEditOpen={setEditOpen} setEditNoteId={setEditNoteId}/>
            </section>
          );
        })
      )}
    </div>
  );
}
