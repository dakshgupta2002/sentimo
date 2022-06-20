import React, { useState } from "react";
import { Button } from "@mui/material/";
import { ModalContainer, Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import NoteInput from "./NoteInput";
import Page from "./Page";

import "./Diary.css";

export default function Diary() {
  document.body.style.overflow = "hidden";

  const [date, setDate, reset, previous, next, today] = useDate();
  const [open, setOpen] = useState(true);
  const [notesAdded, setNotesAdded] = useState(0)
  return (
    <div>
      <Sidebar />
      <ModalContainer isOpen={open} close={() => setOpen(false)}>
        <NoteInput close={() => setOpen(false)} date={date} notesAdded={notesAdded} setNotesAdded={setNotesAdded} />
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
        <div className="diary-mid-container" >
          <Page date={date} notesAdded={notesAdded} setNotesAdded={setNotesAdded} />
        </div>

        {/* Flex Item-3 (Filter, Next, ADD BUTTON) */}
        <div className="diary-right-container">
          <Button variant="contained">Filter</Button>
          <div className="arrow right" onClick={() => next()}></div>

          {today ? 
            <AddBoxRoundedIcon
              className="add-icon"
              onClick={() => setOpen(true)}
            />
          : <div></div>}

        </div>
      </div>
    </div>
  );
}
