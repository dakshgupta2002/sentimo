import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { fetchUserProfile, updateUserProfile } from "../../utils/api/user";
import { useLoading } from "../../utils/hooks/useLoading";
import { Avatar, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./Profile.css";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState(new Date());

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
          dob,
        } = res?.data;
        setUsername(username);
        setPassword(password);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
        setImage(image);
        setGender(gender);
        if (dob) setDOB(dob);
      }
      setLoading(false);
    };

    getUserProfile();
  }, []);

  const updateInformation = async () => {
    console.log("Updating...");
    setLoading(true);
    setError("Updating Information");
    const res = await updateUserProfile({
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
      address,
      image,
      gender,
      DOB,
    });
    if (res?.response?.status !== 204) {
      toast.error("Landed into a error. Try again.");
    } else {
      toast.success("Your profile has been updated.");
    }
    setLoading(false);
  };

  const saveImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(null);
      return;
    }
    setImage(e.target.files[0]);
  };

  const previewImg = () => {
    if (!image) {
      setPreviewImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  useEffect(() => {
    previewImg();
  }, [image]);

  return (
    <div className="profileFormContainer">
      <LoadingScreen />
      <div className="avatarContainer">
        <div className="backdropAvatar">
          <h1>S</h1> <h1>E</h1> <h1>N</h1> <h1>T</h1> <h1>I</h1> <h1>M</h1>
          <h1>O</h1>
        </div>
        <Button
          variant="contained"
          component="label"
          color="warning"
          sx={{
            borderRadius: "50%",
            height: "200px",
            width: "200px",
            top: "-50px",
          }}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt="User"
              style={{
                borderRadius: "50%",
                height: "200px",
                width: "200px",
              }}
            />
          ) : (
            <h1>
              {" "}
              {firstName ? firstName[0] : ""} {lastName ? lastName[0] : ""}{" "}
            </h1>
          )}
          <TextField
            type="file"
            accept="[jpg, jpeg, png]"
            sx={{ display: "none" }}
            onChange={saveImage}
          />
        </Button>
      </div>

      <div className="profileFormData">
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Username"
          required={true}
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())} //no space in username
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          label="First Name"
          required={true}
          variant="outlined"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          value={firstName}
        />

        <TextField
          InputLabelProps={{ shrink: true }}
          label="Last Name"
          required={true}
          variant="outlined"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          value={lastName}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
          value={email ? email : ""}
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => setPhone(e.target.value)}
          value={phone ? phone : ""}
        />

        <TextField
          value={gender ? gender : ""}
          onChange={(e) => setGender(e.target.value)}
          select
          fullWidth
          margin="normal"
          label="Gender"
        >
          <MenuItem key={1} value="Male">
            Male
          </MenuItem>
          <MenuItem key={2} value="Female">
            Female
          </MenuItem>
          <MenuItem key={3} value="Others">
            Others
          </MenuItem>
        </TextField>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            sx={{ border: "none", fontSize: "2rem" }}
            inputFormat="DD/MM/YYYY"
            label="Date of Birth"
            value={DOB}
            onChange={(e) => setDOB(new Date(e?._d))}
            renderInput={(params) => <TextField margin="normal" {...params} />}
          />
        </LocalizationProvider>

        <TextField
          label="Address"
          multiline
          rows={2}
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={(e) => setAddress(e.target.value)}
          value={address ? address : ""}
        />
      </div>

      <Button
        variant="contained"
        color="warning"
        sx={{ my: "30px" }}
        onClick={updateInformation}
      >
        Update Information
      </Button>
    </div>
  );
}
