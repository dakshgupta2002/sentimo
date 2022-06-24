import { Button, IconButton } from "@mui/material";
import React from "react";
import { InputDate } from "../../../components";
import "./Controller.css";
import { ChevronLeft, FastForward, ChevronRight, Add } from "@mui/icons-material";
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

      <div className="dateController">
        <IconButton onClick={previous}><ChevronLeft /></IconButton>
        <InputDate date={date} setDate={setDate} />
        <IconButton disabled={today} onClick={next}>{" "}<ChevronRight />{" "}</IconButton>
        <IconButton disabled={today} onClick={reset}>{" "}<FastForward />{" "}</IconButton>
      </div>

      <IconButton disabled={!today} onClick={()=> setInputOpen(true)}><Add/></IconButton>

    </div>
  );
}
