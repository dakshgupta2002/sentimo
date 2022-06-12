import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import "./Diary.css";
<<<<<<< HEAD
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
=======
>>>>>>> ca2073721c1d291aa79850006f9494c45d06adb8

  return (
<<<<<<< HEAD
    <Box style={{ width: "100%", height: "100%", justifyContent: "center" }}>
      <Typography variant="h6">
        Title
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
          height: "20em",
          overflowY: "scroll",
        }}
      >
        <Typography>
          <span>{content}</span>
        </Typography>
      </Box>
=======
    
<Box style={{ width: '100%', height: 'auto', justifyContent: 'center' }}>
    <Typography variant="h6">Title</Typography>
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
>>>>>>> ca2073721c1d291aa79850006f9494c45d06adb8
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
