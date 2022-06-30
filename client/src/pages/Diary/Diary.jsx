import React, { useState } from "react";
import { ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import NoteInput from "./Forms//NoteInput";
import NoteEdit from "./Forms/NoteEdit";
import Page from "./Page";
import "./Diary.css";
import Controller from "./Controller/Controller";

export default function Diary() {
  const { date, previous, next, today, reset, setDate } = useDate();
  const [inputOpen, setInputOpen] = useState(true);
  const [notesAdded, setNotesAdded] = useState(0);
  const [notesEdited, setNotesEdited] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  return (
    <div className="diary-body">
      <Controller
        date={date}
        previous={previous}
        next={next}
        today={today}
        reset={reset}
        setDate={setDate}
        setInputOpen={setInputOpen}
      />
      <ModalContainer isOpen={editOpen} close={() => {setEditNoteId(null); setEditOpen(false);}}>
        <NoteEdit
          close={() => { setEditNoteId(null); setEditOpen(false);}}
          editNoteId={editNoteId}
          notesEdited={notesEdited}
          setNotesEdited={setNotesEdited}
        />
      </ModalContainer>

      <ModalContainer isOpen={inputOpen} close={() => setInputOpen(false)}>
        <NoteInput
          close={() => setInputOpen(false)}
          date={date}
          notesAdded={notesAdded}
          setNotesAdded={setNotesAdded}
        />
      </ModalContainer>

      <div className="diary-container">
        <Page
          date={date}
          notesAdded={notesAdded}
          setNotesAdded={setNotesAdded}
          notesEdited={notesEdited}
          setNotesEdited={setNotesEdited}
          setEditOpen={setEditOpen}
          setEditNoteId={setEditNoteId}
        />
      </div>
    </div>
  );
}
