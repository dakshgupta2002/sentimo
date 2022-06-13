import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../utils/api/userPost";
import { Button, TextField } from "@mui/material";

import "./Register.css";

export default function Resgiter(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const res = await userRegister(username, password);
    if (res.response.status === 200 || res.response.status === 201) {
      localStorage.setItem("jwt", res.data.token);
      navigate("/");
    } else {
      console.log("error", res.data.msg);
    }
  };

  const logInButtonClick = (event) => {
    navigate("/login", { replace: true });
  };

  return (
    // Main container contains image and form
    <div className="register-container">
      {/* Form Container contains logo and necessary textfield and buttons */}
      <div className="register-form-container">
        {/* Contains Logo and App Name */}
        <div className="register-header">
          <span className="logo">LOGO HERE </span>
          <span className="heading">SENTIMO</span>
        </div>

        {/* Create Account Headings mv = margin vertical */}
        <div>
          <div className="register-text-container">
            <div className="medium-text mv">START FOR FREE</div>

            <div className="large-text heading mv">
              Create new account
              <span className="dot">.</span>
            </div>

            <div className="login-container mv">
              <span className="small-text">Already a member? </span>
              <Button variant="standard" onClick={logInButtonClick}
              sx={{color: "#508afa", margin: "0", padding: "0"}}>
                Log In
              </Button>
            </div>
          </div>

          <div className="register-container">
            <form>
              <div className="input-container">
                <div className="name-data-container">
                  <div className="fname-field mh">
                    <TextField label="First name" variant="filled" required />
                  </div>

                  <div className="lname-field mh">
                    <TextField label="Last name" variant="filled" required />
                  </div>
                </div>

                <div className="username-field mh mv">
                  <TextField
                    label="Username"
                    variant="filled"
                    autoComplete="false"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </div>

                <div className="password-field mh mv">
                  <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    value={password}
                  />
                </div>
              </div>

              <div className="button-container">
                <Button variant="contained" onClick={register}>
                  SIGN UP
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Blank Div */}
        <div></div>
      </div>

      <section className="register-side-image"></section>
    </div>
  );
}

/* <TextField id="filled-basic" label="Filled" variant="filled" sx={{input: {color: "#fdfdfd", backgroundColor: "#323644"} }}
      InputLabelProps={{style: {color: "grey"}}} /> */
