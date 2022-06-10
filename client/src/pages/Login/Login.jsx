import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const welldoing = require("../../assets/images/welldoing.webp");

export default function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("username and password: ", username, password);

    // Verify username and password form database (await isValidForm function) (TODO)

    // if correct set isSubmitted to true (TODO)
    setIsSubmitted(true);
    console.table("Submitted Login Form got: ", event)    

    // else console log some error message and setIsSubmitted to false; (TODO)
  }

  const submitButtonClick = (event) => {
    console.log(isSubmitted)
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
            <button onClick={signUpButtonClick}>DON't HAVE AN ACCOUNT SIGN UP!</button>
          </div>

        </form>
      </div>
    </div>
  );
}
