import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Sidebar } from "../../components";
import { fetchUserProfile } from "../../utils/api/user";
import { useLoading } from "../../utils/hooks/useLoading";
import { Avatar, IconButton, Input } from "@mui/material";

import "./Profile.css";

export default function Profile() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);

  const { setLoading, LoadingScreen, setError } = useLoading();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      setError("Fetching Information");

      const res = await fetchUserProfile();
      if (res?.response?.status === 401) {
        console.log(res?.data?.msg);
      } else {
        const {
          username,
          password,
          email,
          firstName,
          lastName,
          phone,
          address,
          image,
          gender,
          age,
        } = res?.data;
        setUsername(username);
        setPassword(password);
        setEmail(email);
        setFirstName(firstName);
        setLastName(lastName);
        setPhone(phone);
        setAddress(address);
        setImage(image);
        setGender(gender);
        setAge(age);
      }
      setLoading(false);
    };

    getUserProfile();
  }, []);

  return (
    <div className="profileFormContainer">
      <div className="avatarContainer">
        <input accept="image/*" type="file" />
        <label
          htmlFor="contained-button-file"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton>
            <Avatar
              img={image}
              style={{
                margin: "10px",
                width: "60px",
                height: "60px",
              }}
            >
              {firstName ? firstName[0] : ""}
              {lastName ? lastName[0] : ""}
            </Avatar>
          </IconButton>
        </label>
      </div>

      <div className="profileFormData">
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          margin="normal"
          value={`${username}`}
        />

        <TextField
          label="Email"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          value={email ? email : ""}
        />

        <TextField
          label="First Name"
          variant="outlined"
          type="text"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          margin="normal"
          value={firstName ? firstName : "Fetching..."}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          type="text"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          margin="normal"
          value={lastName ? lastName : "Fetching..."}
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          value={phone ? phone : "Not yet set"}
        />

        <TextField
          label="Gender"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          value={gender ? gender : "Not yet set"}
        />

        <TextField
          label="Age"
          variant="outlined"
          type="number"
          InputProps={{ inputProps: { min: 5 } }}
          fullWidth
          margin="normal"
          value={age ? age : ""}
        />

        <TextField
          label="Address"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          value={address ? address : ""}
        />
      </div>
    </div>
  );
}
