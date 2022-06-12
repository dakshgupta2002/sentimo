import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import "./Diary.css";

export default function Note({ title, content }) {
  return (
    
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
