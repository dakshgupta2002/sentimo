import { Button, FormControl, TextField, IconButton } from "@mui/material/";
import {
  AccountCircle,
  EnhancedEncryptionOutlined,
} from "@mui/icons-material/";
import React, { useState } from "react";
import { Page, ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";
import NoteInput from "./NoteInput";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ModalContainer isOpen={open} close={() => setOpen(false)}>
        <NoteInput />
      </ModalContainer>

      <div className="diary-container full-cover">
        <div className="add-btn">
          <Button variant="outlines" onClick={() => setOpen(true)}>
            Add
          </Button>
        </div>

        <div className="prev-arrow-and-modal-container">
          <Button variant="contained" onClick={() => previous()}>
            &lt;
          </Button>
        </div>

        <div className="page-container full-cover diary-item">
          <h1>{date.toDateString()}</h1>
          <Page date={date} />
        </div>

        <div>
          <Button variant="contained" onClick={() => next()}>
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
