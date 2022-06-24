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
  return (
    <div className="controller">
      <div className="redirectHome">
        {width < 600 ? (
          <IconButton onClick={() => navigate("/")}><Adb/></IconButton>
        ) : (
          <MenuItem component={Link} to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
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
          <ChevronLeft />
        </IconButton>
        <InputDate date={date} setDate={setDate} />
        <IconButton disabled={today} onClick={next}>
          {" "}
          <ChevronRight />{" "}
        </IconButton>
        <IconButton disabled={today} onClick={reset}>
          {" "}
          <FastForward />{" "}
        </IconButton>
      </div>

      <IconButton disabled={!today} onClick={() => setInputOpen(true)}>
        <Add />
      </IconButton>
    </div>
  );
}
