import React, {useState} from "react";
import "./Diary.css";
import { Box, Typography, Button } from "@mui/material";
import {
  DeleteRounded,
  EnhancedEncryption,
  Favorite,
} from "@mui/icons-material";
import { removeNote, updateFav } from "../../utils/api/notes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Note({
  title,
  content,
  noteId,
  notesAdded,
  setNotesAdded,
  favourite,
  createdAt,
  updatedAt,
}) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(favourite);

  const deleteNote = () => {
    removeNote(noteId, notesAdded, setNotesAdded);
  };

  const handleFavourite = async () => {
    const res = await updateFav(noteId) //update on BE for future ref
    
    if (res?.response?.status === 200){
      if (!fav) toast.success("Note added to your likes!")
      else toast.success("Note removed from your likes!")
    }
    
    setFav(!fav); // update on FE, to show chage
  }
  return (
    <Box style={{ width: "100%", height: "auto", justifyContent: "center" }}>
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
          height: "52vh",
          overflowY: "scroll",
        }}
      >
        <Typography>
          <span>{content}</span>
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Button variant="contained" color="secondary" onClick={()=>navigate(`/statistics/note/${noteId}`)}>
            View Stats
          </Button>
          <Favorite onClick={handleFavourite} sx={fav ? { color: "red" } : { color: "black" }} />
        </Box>

        <Box>
          <EnhancedEncryption />
          <DeleteRounded onClick={deleteNote} />
        </Box>
      </Box>
    </Box>
  );
}
