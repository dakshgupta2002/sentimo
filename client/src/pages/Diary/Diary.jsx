import { Button } from "@mui/material/";
import React, { useState } from "react";
import {Page, ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ModalContainer>
        make form here
      </ModalContainer>
      
      <div className="diary-container full-cover">
        
        
        <div className="full-cover arrow left" onClick={() =>{ previous();}}>
        </div>

        <div className='page-container full-cover diary-item'>
          <h1>{date.toDateString()}</h1>
          <Page date={date}/>
        </div>

        <div className="full-cover arrow right" onClick={() =>{ next();}}>
        </div>

      </div>
    </div>
  );
}
