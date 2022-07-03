import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../utils/api/user";
import { Button, InputAdornment, TextField, Link } from "@mui/material";
import { toast } from "react-toastify";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../../assets/images/logo.svg";
import signUpImage from "../../assets/images/ClubSignUp.svg";

import "./Register.css";
import { ContactMailSharp, PasswordSharp } from "@mui/icons-material";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  /* <TextField id="filled-basic" label="Filled" variant="filled" sx={{input: {color: "#fdfdfd", backgroundColor: "#323644"} }}
      InputLabelProps={{style: {color: "grey"}}} /> */
  var navigate = useNavigate();

  var normalTextField = {
    input: { backgroundColor: "#f3f6fb", color: "#050516", pl: 1 },
  };
  var specialTextField = {
    input: { backgroundColor: "#FFF", color: "#050516", pl: 1 },
  };

  var normalLabel = { style: { color: "#7F8487" } };
  var specialLabel = { style: { color: "#11468F" } };

  const register = async (e) => {
    e.preventDefault();
    if (!username || !password || !firstName || !lastName || !confirmPassword) {
      var missing = [];

      if (!firstName) missing.push("First Name");
      if (!lastName) missing.push("Last Name");
      if (!username) missing.push("Username");
      if (!password) missing.push("Password");
      if (password && !confirmPassword) missing.push("Confirm Password");

      var errorMsg = `Missing:`;
      for (var i = 0; i < missing.length; i++)
        errorMsg += ` ${missing[i]}` + (i !== missing.length - 1 ? ", " : ".");

      toast.error(errorMsg, {icon: '❌'});
      return;
    }

    if (password !== confirmPassword)
    {
      errorMsg = `Password and Confirm password do not match!`;
      toast.error(errorMsg, {
        duration: 2500,
      });

      // document.getElementById("registerPassword").color = "error"; 
      // Change color of TextField need to search up a little more will add!!

      return;
    }

    const res = await userRegister(username, password, firstName, lastName);
    if (res.response.status === 200 || res.response.status === 201) {
      localStorage.setItem("jwt", res.data.token);
      const name =
        (
          (res?.data?.firstName || "") +
          " " +
          (res?.data?.lastName || "")
        ).trim() || res?.data?.username;
      localStorage.setItem("name", name);

      toast.success("Registration Successful", {duration: 2000});
      navigate("/");
    } else {
      console.log("error", res.data.msg);
      toast.error("Username already Taken", {icon: '❌'});
    }
  };

  const logInButtonClick = (event) => {
    navigate("/login", { replace: true });
  };

  return (
    // Main container contains image and form
    <div className="register-container mv">
      {/* Form Container contains logo and necessary textfield and buttons */}
      <div className="register-form-container">
        {/* Contains Logo and App Name */}
        <div className="register-header text--center">
          {/* <span className="logo">LOGO </span>
          <span className="heading">SENTIMO</span> */}
          <img
            src={logo}
            alt=""
            style={{
              maxHeight: "20vh",
              maxWidth: "20vw",
              minWidth: "100px",
              minHeight: "100px",
            }}
          />
            <div className="large-text heading mv mob-mid">
              Create new account
              <span className="dot">.</span>
            </div>
        </div>

        {/* Create Account Headings mv = margin vertical */}
        <div className="only-form">
          <div className="register-text-container">


            <div className="login-container mv mob-mid">
              <span className="mui-btn-like">Already a member? </span>
              <Button>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>

          <div>
            <form>
              <div className="input-container">
                <div className="name-data-container">
                  <div className="fname-field mh">
                    <TextField
                      label="First name"
                      variant="outlined"
                      sx={normalTextField}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value.trim())}
                      InputLabelProps={normalLabel}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>

                  <div className="lname-field mh">
                    <TextField
                      label="Last name"
                      variant="outlined"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value.trim())}
                      sx={normalTextField}
                      InputLabelProps={normalLabel}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      required
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>

                <div className="username-field mh mv">
                  <TextField
                    label="Username"
                    variant="outlined"
                    autoComplete="false"
                    onChange={(e) => setUsername(e.target.value.trim())}
                    value={username}
                    sx={normalTextField}
                    InputLabelProps={normalLabel}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ContactMailSharp color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                    margin="normal"
                  />
                </div>

                <div className="password-field mh mv">
                  <TextField
                    if="registerPassword"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value.trim())}
                    sx={specialTextField}
                    InputLabelProps={specialLabel}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordSharp color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                    value={password}
                    margin="normal"
                  />
                </div>

                <div className="password-field mh mv">
                  <TextField
                    id="registerConfirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    sx={specialTextField}
                    InputLabelProps={specialLabel}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordSharp color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                    value={confirmPassword}
                    margin="normal"
                  />
                </div>
              </div>

              <div className="button-container">
                <Button
                  variant="contained"
                  sx={{
                    pl: 7,
                    pr: 7,
                    pt: 2,
                    pb: 2,
                    mt: 2,
                    mb: 2,
                    fontSize: "15px",
                    borderRadius: "30px",
                  }}
                  color="primary"
                  onClick={register}
                >
                  SIGN UP
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="register-side-image">
        <img
          src={signUpImage}
          alt="Welcome"
          style={{
            height: "100%",
            width: "100%",
            maxWidth: "60vw",
            maxHeight: "60vh",
          }}
        />
      </div>
    </div>
  );
}
