import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../utils/api/userPost";
import { Button, InputAdornment, TextField, Link } from "@mui/material";
import { toast } from "react-toastify";
import { ContactMailSharp, PasswordSharp } from "@mui/icons-material";

import "./Login.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await userLogin(username, password);
    if (res.response.status === 200 || res.response.status === 201) {
      localStorage.setItem("jwt", res.data.token);
      const name =
        (
          (res?.data?.firstName || "") +
          " " +
          (res?.data?.lastName || "")
        ).trim() || res?.data?.username;
      localStorage.setItem("name", name);
      // don't keep any toast for successful login!

      navigate("/");
    } else {
      toast.error("Incorrect Username or Password");
    }
  };

  // const signUpButtonClick = (event) => {
  //   navigate("/register", { replace: true });
  // };

  // Mobile: background IMG, Desktop show on left
  return (
    <div className="login-form-container">
      {/* Hidden in Mobile */}
      <div className="login-form-header">
        <section className="login-form-image"></section>
        {/* This class Only for Desktop */}
      </div>

      <div className="login-input-container">
        <div className="login-logo-header">SENTIMO</div>
        <div className="login-text-header heading large-login-text">
          Login<span className="login-dot">.</span>
        </div>
        <div className="input-field-container medium-text">
          <div>Log in to your account</div>
          <div>&nbsp;</div>
          <div className="input-container">
            <TextField
              label="Username"
              text="username"
              name="username"
              autoComplete="false"
              onChange={(e) => setUsername(e.target.value.trim())}
              value={username}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMailSharp color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="input-container">
            <TextField
              label="Password"
              text="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value.trim())}
              required
              fullWidth
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordSharp color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="login-button-container">
            <Button variant="contained" onClick={login} fullWidth>
              LOG IN
            </Button>
          </div>
        </div>

        <div className="sign-up-button">
          <div className="sign-up-text">Don't Have an account yet? &nbsp;</div>
          <Link href="/register">
            Create a free account
          </Link>
        </div>
      </div>
    </div>
  );
}
