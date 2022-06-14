import { Box } from "@mui/material";
import React from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
//fetch stats for particulary only this note Id

export default function NoteStat() {
  const noteId = useParams().noteId;
  return (
    <Box>
      <Sidebar />
      <h1>Statistics for date of note</h1>
      {noteId}
    </Box>
  );
}
