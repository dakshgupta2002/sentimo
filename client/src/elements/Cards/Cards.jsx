import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { EnhancedEncryption, LockOpen } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { updateFav, updateProtect } from "../../utils/api/notes";
import { toast } from "react-toastify";
import "./Cards.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Date, Time, Title, Content
export default function Cards({
  noteId,
  date,
  time,
  title,
  content,
  favourite,
  protect,
  maxwidth = "400px",
  children,
}) {
  const [expanded, setExpanded] = useState(false);
  const [fav, setFav] = useState(favourite);
  const [prot, setProt] = useState(protect);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavourite = async () => {
    const res = await updateFav(noteId); //update on BE for future ref

    if (res?.response?.status === 200) {
      if (!fav) toast.success("Note added to your likes!");
      else toast.success("Note removed from your likes!");
    }

    setFav(!fav); // update on FE, to show change
  };

  const handleProtected = async () => {
    //update on backend
    const res = await updateProtect(noteId);
    if (res?.response?.status === 200) {
      if (!prot) toast.success("Note protected!");
      else toast.success("Note removed from protected!");
    }
    setProt(prot ^ 1);
  };

  return (
    <Card className="card" style={{ maxWidth: maxwidth }}>
      <CardHeader
        title={title}        
        subheader={
          <Typography className="createdAt">
            {date === null || time === null ? `` : `Last updated: ${date} ${time}`}
          </Typography>
          
        }
      />

      {!expanded ? (
        <CardContent>
          <Typography className="previewContent" gutterbottom="true">
            {content}
          </Typography>
        </CardContent>
      ) : null}

      <CardActions disableSpacing>
        {fav === -1 ? null : (
          <IconButton aria-label="add to favorites" onClick={handleFavourite}>
            <FavoriteIcon sx={fav ? { color: "red" } : { color: "black" }} />
          </IconButton>
        )}

        {prot === -1 ? null : prot === 1 ? (
          <IconButton onClick={handleProtected}>
            <EnhancedEncryption sx={{ color: "white" }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleProtected}>
            <LockOpen sx={{ color: "white" }} />
          </IconButton>
        )}

        {children}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{color: 'white'}}/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <hr />
            {content}
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show less"
              >
                <ExpandMoreIcon sx={{color: 'white'}}/>
              </ExpandMore>
            </CardActions>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
