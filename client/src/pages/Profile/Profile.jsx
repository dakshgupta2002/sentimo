import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../../components";
import { fetchUserProfile } from "../../utils/api/user";
import { useLoading } from "../../utils/hooks/useLoading";

export default function Profile() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();

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
    <Box>
      <Sidebar />
      <h3>hi</h3>{" "}
      <h1>
        {firstName} {lastName}{" "}
      </h1>
    </Box>
  );
}
