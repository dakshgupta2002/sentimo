import { Button, FormControl, TextField, IconButton } from "@mui/material/";
import {
  AccountCircle,
  EnhancedEncryptionOutlined,
} from "@mui/icons-material/";
import React, { useState } from "react";
import { Page, ModalContainer } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import "./index.css";

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="diary-container full-cover">
        <ModalContainer isOpen={open} close={() => setOpen(false)}>
            <div className="form-container">
              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="">
                <TextField
                  id="outlined-basic"
                  label="Content"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="form-footer">
                <Button>Close</Button>
              </div>
            </div>
        </ModalContainer>
        <div className="prev-arrow-and-modal-container">
          <div className="add-btn">
            <Button onClick={() => setOpen(true)}>Add</Button>
          </div>
          <Button variant="contained" onClick={() => previous()}>
            &lt;
          </Button>
        </div>

        <div className="page-container full-cover diary-item">
          <h1>{date.toDateString()}</h1>
          <Page date={date} />
        </div>

        <div>
          <Button variant="contained" onClick={() => next()}>
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
