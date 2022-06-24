import { Button } from "@mui/material";
import React from "react";
import { InputDate } from "../../../components";
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
      <InputDate date={date} setDate={setDate} />

      {today ? (
        <Button onClick={() => setInputOpen(true)}>ADD</Button>
      ) : (
        <>
          <Button onClick={next}>NEXT</Button>
          <Button onClick={reset}>TODAY</Button>
        </>
      )}

    </div>
  );
}
