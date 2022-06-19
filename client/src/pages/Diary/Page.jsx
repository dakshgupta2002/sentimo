//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React, { useEffect, useState } from "react";
import { useLoading } from "../../utils/hooks/useLoading.js";
import Note from "./Note.jsx";
import { fetchNotes } from "../../utils/api/notes.js";
import './Diary.css';

export default function Page({date, notesAdded, setNotesAdded, setEditOpen, setEditNoteId}) {
  const {setLoading} = useLoading();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      const res = await fetchNotes(date);
      if (res.response.status === 200) {
        setNotes(res.data.notes);
      }
      setLoading(false);
    };
    getNotes();
  }, [date, notesAdded]); //call fetchNotes when date changes

  return (
    <div className="page-container">
      {notes?.length === 0 ? (
        <h1>No notes for this date</h1>
      ) : (
        notes?.map(({ title, content, _id, favourite, protect, createdAt, updatedAt }) => {
          return (
            <section className="note-container">
              <Note key={_id} title={title} content={content} noteId={_id} 
                favourite={favourite} createdAt={createdAt} updatedAt={updatedAt}
                notesAdded={notesAdded} setNotesAdded={setNotesAdded} protect={protect} 
                setEditNoteId={setEditNoteId} setEditOpen={setEditOpen}/>
            </section>
          );
        })
      )}
    </div>
  );
}
