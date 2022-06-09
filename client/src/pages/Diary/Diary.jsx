import { Button } from "@mui/material/";
import React, { useState } from "react";
import { Page, ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="diary-container full-cover">
        <ModalContainer isOpen={open} close={() => setOpen(false)}>
          make form here
        </ModalContainer>
        <div className='prev-arrow-and-modal-container'>
          <Button onClick={() => setOpen(true)}>
            Add
          </Button>
          <div
            className="full-cover arrow left"
            onClick={() => {
              previous();
            }}
          ></div>
        </div>

        <div className="page-container full-cover diary-item">
          <h1>{date.toDateString()}</h1>
          <Page date={date} />
        </div>

        <div
          className="full-cover arrow right"
          onClick={() => {
            next();
          }}
        ></div>
      </div>
    </div>
  );
}
