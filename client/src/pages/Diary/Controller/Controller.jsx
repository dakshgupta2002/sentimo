import { Button } from "@mui/material";
import React from "react";
import "./Controller.css";

export default function Controller({
  date,
  setDate,
  next,
  previous,
  reset,
  today,
  setInputOpen,
}) {

  return (
    <div className="controller">
      <Button onClick={previous}>PREVIOUS</Button>
      <span>Date: {`${date.toLocaleDateString()}`}</span>
      
      {today ? (
        <Button onClick={() => setInputOpen(true)}>ADD</Button>
      ) : (
        <Button onClick={next}>NEXT</Button>
      )}
    </div>
  );
}
