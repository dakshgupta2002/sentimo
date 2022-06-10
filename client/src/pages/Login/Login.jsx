import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from '../../utils/api/userPost'

import "./index.css";

const welldoing = require("../../assets/images/welldoing.webp");

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var navigate = useNavigate();

    const login = async () => {
        const res = await userLogin(username, password);
        if (res.status === 200)
        {
            console.log("Logged in");
            props.close();
        }
        else
        {
            console.log("Not Logged in");
        }
    }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("username and password: ", username, password);

    // Verify username and password form database (await isValidForm function) (TODO)

    // if correct set isSubmitted to true (TODO)
    console.table("Submitted Login Form got: ", event)    

    // else console log some error message and setIsSubmitted to false; (TODO)
  }

  const submitButtonClick = (event) => {
    login();
  }

  const signUpButtonClick = (event) => {
      navigate("/register", { replace: true });
  }

  return (
    <div className="login-form-container">
      <div className="login-form-image">
        <img src={welldoing} alt="man woman and brain" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit} action="" method="post">

          <div className="input-container">
            <label>Username: </label>
            <input Text="username" name="username" autoComplete="false" onChange={e => setUsername(e.target.value)} value={username} required />
          </div>

          <div className="input-container">
            <label>Password: </label>
            <input Text="password" name="password" type="password" onChange={e => setPassword(e.target.value)} required value={password} />
          </div>

          <div className="button-container">
            <button type="submit" onClick={submitButtonClick}>LOG IN</button>
            <button onClick={signUpButtonClick}>DON'T HAVE AN ACCOUNT SIGN UP!</button>
          </div>

        </form>
      </div>
    </div>
  );
}
