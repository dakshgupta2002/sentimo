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
    <div className="ProfileRoot">
      <Sidebar />
      <div className="profileFormContainer">
        <div className="avatarContainer">
          <Input accept="image/*" type="file" />
          <label htmlFor="contained-button-file">
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

        <div className="profileData mv">
          <div className="mv mh">
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={`${username}`}
            />
          </div>

          <div className="mv mh">
            <TextField
              label="Email"
              variant="outlined"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={email ? email : "Not yet set"}
            />
          </div>
          
          <div className="mv mh">
            <TextField
              label="First Name"
              variant="outlined"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={firstName ? firstName : "Fetching..."}
            />
          </div>

          <div className="mv mh">
            <TextField
              label="Last Name"
              variant="outlined"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={lastName ? lastName : "Fetching..."}
            />
          </div>
              
          <div className="mv mh">
            <TextField
              label="Phone Number"
              variant="outlined"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={phone ? phone : "Not yet set"}
            />
          </div>

          <div className="mv mh">
            <TextField
              label="Gender"
              variant="outlined"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={gender ? gender : "Not yet set"}
            />
          </div>
          
          {/* Age from DOB maibi */}
          <div className="mv mh">
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={age ? age : "Not yet set"}
            />
          </div>

          <div className="mv mh">
            <TextField
              label="Address"
              variant="outlined"
              type="number"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              // defaultValue={`${firstName}`} // doesn't work need to check
              value={age ? age : "Not yet set"}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
