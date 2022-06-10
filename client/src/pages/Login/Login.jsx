import React, { useState } from "react";
import "./index.css";

const welldoing = require("../../assets/images/welldoing.webp");

export default function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    var username = event.target[0].value;
    var password = event.target[1].value;
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

  return (
    <div className="login-form-container">
      <div className="login-form-image">
        <img src={welldoing} alt="man woman and brain" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit} action="a.php" method="post">

          <div className="input-container">
            <label>Username: </label>
            <input Text="username" name="username" autoComplete="false" required />
          </div>

          <div className="input-container">
            <label>Password: </label>
            <input Text="password" name="password" type="password" required />
          </div>

          <div className="button-container">
            <button type="submit" onClick={submitButtonClick}>LOG IN</button>
          </div>

        </form>
      </div>
    </div>
  );
}
