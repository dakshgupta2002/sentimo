import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import './Register.css'
const welldoing = require("../../assets/images/welldoing.webp");

export default function Resgiter() {
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

  const logInButtonClick = (event) => {
    navigate("/login", { replace: true });
  }

  const submitButtonClick = (event) => {
      // TODO
  }

  return (
    <div className="register-form-container">
      <div className="register-form-image">
        <img src={welldoing} alt="man woman and brain" />
      </div>
      <div className="register-container">
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
            <button onClick={submitButtonClick}>SIGN UP</button>
            <button type="submit" onClick={logInButtonClick}>LOG IN</button>
          </div>

        </form>
      </div>
    </div>
  )
}
