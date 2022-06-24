import React, { useState } from "react";
import { ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import NoteInput from "./NoteInput";
import Page from "./Page";
import "./Diary.css";

export default function Diary() {
  const {date, previous, next, today} = useDate();
  const [inputOpen, setInputOpen] = useState(true);
  const [notesAdded, setNotesAdded] = useState(0);
  const [notesEdited, setNotesEdited] = useState(0);

  return (
    <div className="diaryBody">

      <ModalContainer isOpen={inputOpen} close={() => setInputOpen(false)}>
        <NoteInput
          close={() => setInputOpen(false)}
          date={date}
          notesAdded={notesAdded}
          setNotesAdded={setNotesAdded}
        />
      </ModalContainer>

      <div className="diary-container">
        {/* Flex Item-2 (Title Content) */}
        <div className="diary-mid-container">
          <Page
            date={date}
            notesAdded={notesAdded}
            setNotesAdded={setNotesAdded}
            notesEdited={notesEdited}
            setNotesEdited={setNotesEdited}
          />
        </div>
      </div>
    </div>
  );
}
