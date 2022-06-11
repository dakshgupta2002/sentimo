import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../utils/api/userPost";
import { Button } from "@mui/material";
import "./index.css";

const welldoing = require("../../assets/images/welldoing.webp");

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await userLogin(username, password);
    console.log(res);
    if (res.response.status === 200 || res.response.status === 201) {
      localStorage.setItem("jwt", res.data.token);
      navigate("/");
    } else {
      console.log("error: ", res.data.msg);
    }
  };

  const signUpButtonClick = (event) => {
    navigate("/register", { replace: true });
  };

  return (
    <div className="login-form-container">
      <div className="login-form-image">
        <img src={welldoing} alt="man woman and brain" />
      </div>
      <div className="login-container">
        <form>
          <h3>Login to an existing account!</h3>
          <div className="input-container">
            <label>Username: </label>
            <input
              Text="username"
              name="username"
              autoComplete="false"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>

          <div className="input-container">
            <label>Password: </label>
            <input
              Text="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
          </div>

          <div className="button-container">
            <Button variant="contained" onClick={login}>
              LOG IN
            </Button>
            <Button variant="outlined" onClick={signUpButtonClick}>
              DON'T HAVE AN ACCOUNT SIGN UP!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
