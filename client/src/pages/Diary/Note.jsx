import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  FavoriteBorderOutlined,
  EnhancedEncryption,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import EditIcon from '@mui/icons-material/Edit';
import { removeNote, updateFav, updateProtect } from "../../utils/api/notes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Diary.css";

export default function Note({title, content, noteId, notesAdded, setNotesAdded, favourite, protect, createdAt, updatedAt, setEditNoteId, setEditOpen}) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(favourite);
  const [prot, setProt] = useState(protect);

  const deleteNote = () => {
    removeNote(noteId, notesAdded, setNotesAdded);
  };

  const handleFavourite = async () => {
    const res = await updateFav(noteId); //update on BE for future ref
    if (res?.response?.status !== 200) {
      toast.error(
        fav ? (<div>Failed to remove note from likes. <br /> Try again</div>
        ) : (<div>Failed to add note in likes. <br /> Try again</div> ), {
          duration: 2000,
          style: { fontWeight: 400, fontFamily: `"Ubuntu", sans-serif` },
          icon: "❌",
          ariaProps: {role: "status", "aria-live": "polite"},
        }
      );
    } // Note change success so change icon color
    else setFav(!fav); // update on FE, to show chage
  };

  const handleProtect = async () => {
    //update on backend
    const res = await updateProtect(noteId);
    if (res?.response?.status === 200) {
      var msg = !prot
        ? "Note Added in protected!"
        : "Note removed from protected!";

      toast.success(msg, {
        duration: 2000,
        style: { fontWeight: 400, fontFamily: `"Ubuntu", sans-serif` },
        icon: "✅",
        ariaProps: { role: "status", "aria-live": "polite", },
      });

      setProt(!prot);
    } else {
      var errMsg = prot
        ? "Failed to remove from protection"
        : "Failed to add in protection!";
      toast.error(errMsg, {
        duration: 2000,
        style: { fontWeight: 400, fontFamily: `"Ubuntu", sans-serif` },
        icon: "❌",
        ariaProps: { role: "status", "aria-live": "polite"},
      });
    }
  };

  if (prot) {
    return <></>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6">Title</Typography>
        {new Date(createdAt).toDateString() === new Date().toDateString() ? <IconButton onClick={() => {setEditNoteId(noteId); setEditOpen(true);}}>
          <EditIcon sx={{ fontSize: "2.4rem" }} />
        </IconButton> : null }
      </Box>
      <Box
        component="span"
        sx={{ display: "flex", p: 1, m: 1, bgcolor: "#101010", color: "grey.300", border: "1px solid", borderColor: "grey.800", borderRadius: 2, fontSize: "0.875rem", fontWeight: "700" }}
      >
        <Typography>{title}</Typography>
      </Box>


      <Typography variant="h6">Content</Typography>

      <Box
        component="span"
        sx={{ display: "flex", p: 1, m: 1, bgcolor: "#101010", color: "grey.300", border: "1px solid", borderColor: "grey.800", borderRadius: 2, fontSize: "0.875rem", fontWeight: "700", flex: "0.75 1 auto", overflowY: "scroll" }}
      >
        <Typography>
          <span>{content}</span>
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // flex: "0 1 40px"
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flex: "0 1 auto",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/statistics/note/${noteId}`)}
          >
            View Stats
          </Button>

          {fav ? (
            <IconButton sx={{ marginLeft: "10px" }} onClick={handleFavourite}>
              <FavoriteRoundedIcon
                color="error"
                sx={{ fontSize: "2.4rem" }}
              />
            </IconButton>
          ) : (
            <IconButton sx={{ marginLeft: "10px" }} onClick={handleFavourite}>
              <FavoriteBorderOutlined
                sx={{ fontSize: "2.4rem" }}
              />
            </IconButton>
          )}
        </Box>

        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton sx={{ marginLeft: "10px" }}>
            <EnhancedEncryption
              onClick={handleProtect}
              sx={{ fontSize: "2.4rem" }}
            />
          </IconButton>
          <IconButton>
            <DeleteIcon
              onClick={deleteNote}
              sx={{ fontSize: "2.4rem", color: "#398AB9" }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
