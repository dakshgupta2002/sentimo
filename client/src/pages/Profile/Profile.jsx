import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { fetchUserProfile, updateUserProfile } from "../../utils/api/user";
import { useLoading } from "../../utils/hooks/useLoading";
import { Avatar, IconButton } from "@mui/material";
import { toast } from 'react-toastify';

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
  const [DOB, setDOB] = useState(null);

  const { setLoading, LoadingScreen, setError } = useLoading();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      setError("Fetching Information");

      const res = await fetchUserProfile();
      if (res?.response?.status === 401) {
        console.log(res?.data?.msg);
      } else {
        const { username, password, email, firstName, lastName, phone, address, image, gender, dob } = res?.data;
        setUsername(username);
        setPassword(password);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email || "");
        setPhone(phone || "");
        setAddress(address || "");
        setImage(image);
        setGender(gender || "");
        setDOB(dob);
      }
      setLoading(false);
    };

    getUserProfile();
  }, []);

  const updateInformation = async () => {
    setLoading(true); setError("Updating Information");
    const res = await updateUserProfile({ username, password, email, firstName, lastName, phone, address, image, gender})
    if (res?.response?.status === 200){
      toast.success("Information Updated");
    }else{
      console.log(res?.data?.msg);
    }
  }

  return (
    <div className="profileFormContainer">
      <LoadingScreen/>
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
        <TextField InputLabelProps={{ shrink: true }} label="Username" required={true} variant="outlined" type="text" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value.trim())} //no space in username
        />

        <TextField InputLabelProps={{ shrink: true }} label="First Name" required={true} variant="outlined" type="text" onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" value={firstName}
        />

        <TextField InputLabelProps={{ shrink: true }} label="Last Name" required={true} variant="outlined" type="text" onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" value={lastName}
        />
        <TextField label="Email" variant="outlined" type="text" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} value={email}
        />

        <TextField label="Phone Number" variant="outlined" type="number" fullWidth margin="normal" onChange={(e) => setPhone(e.target.value)} value={phone}
        />

        <TextField value={gender} onChange={(e) => setGender(e.target.value)} select fullWidth margin="normal" label="Gender"
        >
          <MenuItem key={1} value="Male">Male</MenuItem>
          <MenuItem key={2} value="Female">Female</MenuItem>
          <MenuItem key={2} value="Others">Others</MenuItem>
        </TextField>

        <TextField label="Date of Birth" variant="outlined" type="Date" fullWidth margin="normal" onChange={e => setDOB(new Date(e.target.value).toLocaleDateString())} value={DOB?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]}
        />

        <TextField label="Address" multiline rows={2} variant="outlined" type="text" fullWidth margin="normal" onChange={e => setAddress(e.target.value)} value={address || ""}
        />
      </div>

      <Button variant="contained">Update Information</Button>
    </div>
  );
}
