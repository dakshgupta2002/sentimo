import { Box } from "@mui/material";
import React from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchNoteStats } from "../../utils/api/stats";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  useEffect( () => {
    const fetchStat = async () => {
      const res = await fetchNoteStats(noteId);
      return res;
    }
    fetchStat();
  }, [])

  return (
    <Box>
      <Sidebar />
      <h1>Statistics for date of note</h1>
      {noteId}
    </Box>
  );
}
