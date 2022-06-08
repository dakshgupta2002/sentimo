import { Button } from "@mui/material";
import React from "react";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();

  return (
    <div>
      <div className="diary-container">
        <h2 className="xx"> Date is : {date.toDateString()} </h2>
      </div>

      <div className='indicator'>
        <Button
          onClick={() => {previous();}}
          variant="contained"
        >
          Previous
        </Button>

        <Button
          onClick={() => {next();}}
          variant="contained"
        >
          Next
        </Button>

        <Button
          onClick={() => {reset();}}
          variant="contained"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
