import React, { useEffect, useState } from "react";
import { Button } from "@mui/material/";
import { ModalContainer, Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import NoteInput from "./NoteInput";
import Page from "./Page";

import "./Diary.css";
import NoteEdit from "./NoteEdit";

export default function Diary() {
  document.body.style.overflow = "hidden";

  const [date, setDate, reset, previous, next, today] = useDate();
  const [inputOpen, setInputOpen] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [notesAdded, setNotesAdded] = useState(0);
  const [editNoteId, setEditNoteId] = useState(null);

  return (
    <div>
      <Sidebar />
      <ModalContainer isOpen={inputOpen} close={() => setInputOpen(false)}>
        <NoteInput
          close={() => setInputOpen(false)}
          date={date}
          notesAdded={notesAdded}
          setNotesAdded={setNotesAdded}
        />
      </ModalContainer>

      <ModalContainer isOpen={editOpen} close={() => {setEditNoteId(null); setEditOpen(false);}}>
        <NoteEdit
          close={() => {setEditNoteId(null); setEditOpen(false)}}
          editNoteId={editNoteId}
        />
      </ModalContainer>

      <div className="diary-container">
        {/* Flex Item-1 (DATE, ARROW KEY, blank space) */}
        <div className="diary-left-container">
          <div className="date-show">
            <Button variant="contained">
              {date.toLocaleDateString("en-GB")}
            </Button>
          </div>

          <div className="arrow left" onClick={() => previous()}></div>

          <div></div>
        </div>

        {/* Flex Item-2 (Title Content) */}
        <div className="diary-mid-container">
          <Page
            date={date}
            notesAdded={notesAdded}
            setNotesAdded={setNotesAdded} setEditNoteId={setEditNoteId}
            setEditOpen={setEditOpen}
          />
        </div>

        {/* Flex Item-3 (Filter, Next, ADD BUTTON) */}
        <div className="diary-right-container">
          <Button variant="contained">Filter</Button>

          {today ? (
            <AddBoxRoundedIcon
              className="add-icon"
              onClick={() => setInputOpen(true)}
              display={false}
            />
          ) : (
            <div className="arrow right" onClick={() => next()}></div>
          )}
        </div>
      </div>
    </div>
  );
}
