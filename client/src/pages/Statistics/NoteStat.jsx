import { Box } from "@mui/material";
import React from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  //api is pending
  return (
    <Box>
      <Sidebar />
      <h1>Statistics for date of note</h1>
      {noteId}
    </Box>
  );
}
