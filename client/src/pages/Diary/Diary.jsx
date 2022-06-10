import { Button, FormControl, TextField, IconButton } from "@mui/material/";
import React, { useState } from "react";
import { ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";
import NoteInput from "./NoteInput";
import Page from "./Page";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <ModalContainer isOpen={open} close={() => setOpen(false)}>
        <NoteInput close={() => setOpen(false)} />
      </ModalContainer>

      <div className="diary-container full-cover">
        <div
          className="date-but prev-date-but"
          onClick={() => previous()}
        ></div>

        <div className="page-container full-cover diary-item">
          <div>
            <h1>{date.toLocaleDateString()}</h1>
            <Button variant="outlines" onClick={() => setOpen(true)}>
              Add
            </Button>
          </div>
          
          <Page date={date} />
        </div>

        <div className="date-but next-date-but" onClick={() => next()}></div>
      </div>
    </div>
  );
}
