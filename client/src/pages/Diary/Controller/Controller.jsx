import { Button, Icon, IconButton, MenuItem, Typography } from "@mui/material";
import React from "react";
import { InputDate } from "../../../components";
import "./Controller.css";
import { Link, useNavigate } from "react-router-dom";
import { useWidth } from '../../../utils/hooks/useWidth.js';
import {
  ChevronLeft,
  FastForward,
  ChevronRight,
  Add,
  Adb,
} from "@mui/icons-material";
export default function Controller({
  date,
  setDate,
  next,
  previous,
  reset,
  today,
  setInputOpen,
}) {
  const { width } = useWidth();
  const navigate = useNavigate();
  const IconStyle = {fontSize: '1.7rem', color: '#FDFBF9'}
  const DisabledIcon = {cursor: 'not-allowed', fontSize: '1.6rem'}
  
  return (
    <div className="controller">
      <div className="redirectHome">  
        {width < 915 ? (
          <IconButton sx={IconStyle} onClick={() => navigate("/")}><Adb/></IconButton>
        ) : (
          <MenuItem component={Link} to="/">
            <Typography
              sx={{
                mr: 2,
                fontSize: '1.4rem',
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#FDFBF9",
                textDecoration: "none",
              }}
            >
              SENTIMO
            </Typography>
          </MenuItem>
        )}
      </div>

      <div className="dateController">
        <IconButton onClick={previous}>
          <ChevronLeft sx={IconStyle} /> { "  " }
        </IconButton>

        <InputDate date={date} setDate={setDate} />

        <IconButton disabled={today} onClick={next}>
          {"  "}
          <ChevronRight sx={today? DisabledIcon: IconStyle} />{" "}
        </IconButton>
        <IconButton disabled={today} onClick={reset}>
          {"  "}
          <FastForward sx={today? DisabledIcon: IconStyle} />{" "}
        </IconButton>
      </div>

      <IconButton disabled={!today} onClick={() => setInputOpen(true)}>
        <Add sx={!today? DisabledIcon: IconStyle} />
      </IconButton>
    </div>
  );
}
