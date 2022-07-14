import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  FavoriteBorderOutlined,
  EnhancedEncryption,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import EditIcon from "@mui/icons-material/Edit";
import { removeNote, updateFav, updateProtect } from "../../utils/api/notes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Diary.css";
import { useLoading } from "../../utils/hooks/useLoading";

export default function Note({
  title,
  content,
  noteId,
  notesAdded,
  setNotesAdded,
  favourite,
  protect,
  createdAt,
  setEditOpen,
  setEditNoteId,
}) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(favourite);
  const [prot, setProt] = useState(protect);
  const { setError, setLoading } = useLoading();

  const deleteNote = async () => {
    setLoading(true); setError('Removing Note...')
    await removeNote(noteId);
    setNotesAdded(notesAdded-1);
    setLoading(false);
  };

  const handleFavourite = async () => {
    const res = await updateFav(noteId); //update on BE for future ref
    if (res?.response?.status !== 200) {
      toast.error(
        fav ? (
          <div>
            Failed to remove note from likes. <br /> Try again
          </div>
        ) : (
          <div>
            {" "}
            Failed to add note in likes. <br /> Try again{" "}
          </div>
        )
      );
    } else setFav(!fav); // update on FE, to show chage
  };

  const handleProtect = async () => {
    //update on backend
    const res = await updateProtect(noteId);
    if (res?.response?.status === 200) {
      var msg = !prot
        ? "Note Added in protected!"
        : "Note removed from protected!";
      toast.success(msg, { duration: 2000 });
      setProt(!prot); //locally update the status
    } else {
      var errMsg = prot
        ? "Failed to remove from protection"
        : "Failed to add in protection!";
      toast.error(errMsg, { duration: 2000 });
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
        width: "97.5%",
        height: "85vh",
        padding: "10vh 0px 5vh 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          className={"title"}
          variant="h4"
          sx={{ overflowX: "scroll", whiteSpace: "nowrap", m: 1, p: 0.5, fontFamily: 'Coda', fontSize: '24px', fontWeight: 600, letterSpacing: '1.5px'}}
        >
          {title}
        </Typography>

        {new Date(createdAt).toDateString() === new Date().toDateString() ? (
          <IconButton
            onClick={() => {
              setEditNoteId(noteId);
              setEditOpen(true);
            }}
          >
            <EditIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        ) : null}
      </Box>

      <Box
        component="span"
        sx={{
          display: "flex",
          p: 1,
          m: 1,
          bgcolor: "#101010",
          color: "grey.300",
          border: "1px solid",
          borderColor: "grey.800",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          flex: "1 auto",
          overflowY: "scroll",
        }}
      >
        <Typography sx={{ wordWrap: "break-word", width: "100%", fontFamily: 'varela' }}>
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
            size={"normal"}
          >
            View Stats
          </Button>

          {fav ? (
            <IconButton sx={{ marginLeft: "10px" }} onClick={handleFavourite}>
              <FavoriteRoundedIcon color="error" sx={{ fontSize: "2.4rem" }} />
            </IconButton>
          ) : (
            <IconButton sx={{ marginLeft: "10px" }} onClick={handleFavourite}>
              <FavoriteBorderOutlined sx={{ fontSize: "2.4rem" }} />
            </IconButton>
          )}
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ marginLeft: "10px" }} onClick={handleProtect}>
            <EnhancedEncryption sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton onClick={deleteNote}>
            <DeleteIcon sx={{ fontSize: "2rem", color: "#398AB9" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
