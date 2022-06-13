import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { userRegister } from '../../utils/api/userPost'
import { Box, Button, TextField } from '@mui/material';

import './Register.css'
const welldoing = require("../../assets/images/welldoing.webp");

export default function Resgiter(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  var navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const res = await userRegister(username, password);
    if (res.response.status === 200 || res.response.status === 201){
        localStorage.setItem("jwt", res.data.token);
        navigate("/");
    }else{
        console.log("error", res.data.msg);
    }
}

  const logInButtonClick = (event) => {
    navigate("/login", { replace: true });
  }

  return (
    <div className="register-form-container">
      <div className="register-container">
        <form>
          <h3>Create a new account!</h3>
          <div className="input-container">
            <label>Username: </label>
            <input Text="username" name="username" autoComplete="false" onChange={e => setUsername(e.target.value)} value={username} required />
          </div>

          <div className="input-container">
            <label>Password: </label>
            <input Text="password" name="password" type="password" onChange={e => setPassword(e.target.value)} required value={password} />
          </div>

          <div className="button-container">
            <Button variant="contained" onClick={register}>SIGN UP</Button>
            <Button variant="outlined" onClick={logInButtonClick}>Already have an account? Login</Button>
          </div>

        </form>
      </div>
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Filled" variant="filled" sx={{input: {color: "#fdfdfd", backgroundColor: "#323644"} }}
      InputLabelProps={{style: {color: "grey"}}} />
    </Box>
    </div>
  )
}
