import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { EnhancedEncryption } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useState } from "react";
import { updateFav, updateProtect } from "../../utils/api/notes";
import { toast } from "react-toastify";

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
export default function RecipeReviewCard({
  noteId,
  date,
  time,
  title,
  content,
  favourite,
  protect,
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

    setFav(!fav); // update on FE, to show chage
  };

  const handleProtected = async () => {
    //update on backend 
    const res = await updateProtect(noteId);
    if (res?.response?.status === 200){
      if (!prot) toast.success("Note protected!")
      else toast.success("Note removed from protected!")
    }

    setProt(!prot);
  }

  return (
    <Card sx={{ maxWidth: "45%" }}>
      <CardHeader title={date} subheader={`Last updated: ${time}`} />

      <CardContent>
        <Typography variant="h6" gutterbottom>
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {fav === -1 ? null : (
          <IconButton aria-label="add to favorites">
            <FavoriteIcon
              onClick={handleFavourite}
              sx={fav ? { color: "red" } : { color: "black" }}
            />
          </IconButton>
        )}

        {prot === -1 ? null:
        <IconButton aria-label="add to private">
          <EnhancedEncryption
            onClick={handleProtected}
          />
        </IconButton>
        }

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
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
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}