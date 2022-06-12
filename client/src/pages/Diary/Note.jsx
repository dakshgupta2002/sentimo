import React from "react";
import "./Diary.css";
import { Box, Typography } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { removeNote } from "../../utils/api/notes";

export default function Note({
  title,
  content,
  noteId,
  notesAdded,
  setNotesAdded,
}) {
  const deleteNote = () => {
    removeNote(noteId, notesAdded, setNotesAdded);
  };

  return (
    
<Box style={{ width: '100%', height: 'auto', justifyContent: 'center' }}>
    <Typography variant="h6">Title
      <DeleteRounded onClick={deleteNote} />
    </Typography>
    <Box
      component="span"
      sx={{
        display: "block",
        p: 1,
        m: 1,
        bgcolor: "#101010",
        color: "grey.300",
        border: "1px solid",
        borderColor: "grey.800",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <Typography>
        <span>{title}</span>
      </Typography>
    </Box>

    <Typography variant="h6">Content</Typography>

    <Box
      component="span"
      sx={{
        display: "block",
        p: 1,
        m: 1,
        bgcolor: "#101010",
        color: "grey.300",
        border: "1px solid",
        borderColor: "grey.800",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        height: '55vh',
        overflowY: "scroll"
      }}
    >
      <Typography>
        <span>{content}</span>
      </Typography>
    </Box>
  </Box>
  );
}
