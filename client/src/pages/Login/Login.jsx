import React from "react";
import { TextField, Button, IconButton } from "@mui/material";
import {
  AccountCircle,
  EnhancedEncryptionOutlined,
} from "@mui/icons-material/";
import "./index.css";

const welldoing = require("../../assets/images/welldoing.webp");

export default function Login() {
  return (
    <div className="login-page-container">
      <div className="login-page-image">
        <img src={welldoing} alt="man woman and brain" />
      </div>
      <div className="login-container">
        <div className="username-field">

          <IconButton>
            <AccountCircle style={{fontSize: "30px"}} />
          </IconButton>

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            helperText="Enter your username"
          />
        </div>

        <div className="password-field">

          <IconButton>
            <EnhancedEncryptionOutlined style={{fontSize: "30px"}}/>
          </IconButton>

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            helperText="Enter your password"
          />
        </div>
        <div className="login-btn">
          <Button variant="contained">LOG IN</Button>
        </div>
      </div>
    </div>
  );
}
