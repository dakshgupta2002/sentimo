import { Button, FormControl, TextField, IconButton } from "@mui/material/";
import React, { useState } from "react";
import { ModalContainer, Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import NoteInput from "./NoteInput";
import Page from "./Page";

import "./Diary.css";
import { AddCircleOutline } from "@mui/icons-material";

export default function Diary() {
  const [date, setDate, reset, previous, next, today] = useDate();
  const [open, setOpen] = useState(true);
  const [notesAdded, setNotesAdded] = useState(0)
  return (
    <div>
      <Sidebar />
      <ModalContainer isOpen={open} close={() => setOpen(false)}>
        <NoteInput close={() => setOpen(false)} date={date} notesAdded={notesAdded} setNotesAdded={setNotesAdded}/>
      </ModalContainer>

      <div className="diary-container">
        {/* Flex Item-1 (DATE, ARROW KEY, blank space) */}
        <div className="diary-left-container">
          <div className="date-show">
            <Button variant="contained">{date.toLocaleDateString()}</Button>
          </div>

          <div className="arrow left" onClick={() => previous()}></div>

          <div></div>
        </div>

        {/* Flex Item-2 (Title Content) */}
        <div style={{width: '70%', height: '80vh', overflow: 'hidden'}}>
          <Page date={date} notesAdded={notesAdded}/>
        </div>

        {/* Flex Item-3 (Fiteness Quotient, Next, ADD BUTTON) */}
        <div className="diary-right-container">
          <Button variant="contained">Fitness Quotient</Button>
          <div className="arrow right" onClick={() => next()}></div>

          {today ? 
            <AddCircleOutline
              className="add-icon"
              onClick={() => setOpen(true)}
              display={false}
            />
          : null}

        </div>
      </div>
    </div>
  );
}
