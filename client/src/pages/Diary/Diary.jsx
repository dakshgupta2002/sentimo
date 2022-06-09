import { Button } from "@mui/material/";
import React, { useState } from "react";
import Page from "../../components/Page/Page";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();
  
  return (
    <div>
      
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

      <div className='indicator'>
        <div className='indicator-btn'>
          <Button
            onClick={() => {previous();}}
            variant="contained"
          >
            Previous
          </Button>
        </div>

        <div className='indicator-btn'>
          <Button
            onClick={() => {reset();}}
            variant="contained"
          >
            Reset
          </Button>
        </div>
        
        <div className='indicator-btn'>
          <Button
            onClick={() => {next();}}
            variant="contained"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
